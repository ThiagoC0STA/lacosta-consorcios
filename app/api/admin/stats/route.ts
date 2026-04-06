import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/server";
import { getAuthUser } from "../../../lib/supabase/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const RANGE_MS: Record<string, number> = {
  "7d": 7 * 24 * 3600_000,
  "30d": 30 * 24 * 3600_000,
  "90d": 90 * 24 * 3600_000,
  "1y": 365 * 24 * 3600_000,
};

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const range = req.nextUrl.searchParams.get("range") || "30d";
  const db = supabaseAdmin();
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 3600_000).toISOString();
  const fiveMinAgo = new Date(now.getTime() - 5 * 60_000).toISOString();

  const rangeMs = RANGE_MS[range];
  const rangeStart = rangeMs ? new Date(now.getTime() - rangeMs).toISOString() : "2000-01-01T00:00:00Z";
  const prevRangeStart = rangeMs ? new Date(now.getTime() - rangeMs * 2).toISOString() : "2000-01-01T00:00:00Z";

  const noBots = { column: "is_bot" as const, value: false };

  const [
    { count: totalLeads },
    { count: leadsToday },
    { count: leadsWeek },
    { count: pvToday },
    { data: pvDurations },
    { data: leadsRange },
    { data: pvRange },
    { data: trafficRaw },
    { data: topPagesRaw },
    { data: devicesRaw },
    { data: recentLeadsRaw },
    { data: leadsForObjective },
    { data: sessionsRaw },
    { data: eventsRaw },
    { data: pvUtmRaw },
    { data: leadsUtmRaw },
    { data: activeNowRaw },
    { count: prevLeadsCount },
    { count: prevPvCount },
    { data: browsersRaw },
    { data: leadsStatusRaw },
    { data: countryRaw },
    { count: botCount },
  ] = await Promise.all([
    db.from("leads").select("*", { count: "exact", head: true }),
    db.from("leads").select("*", { count: "exact", head: true }).gte("created_at", todayStart),
    db.from("leads").select("*", { count: "exact", head: true }).gte("created_at", weekAgo),
    db.from("page_views").select("*", { count: "exact", head: true }).eq(noBots.column, noBots.value).gte("created_at", todayStart),
    db.from("page_views").select("duration_seconds").eq(noBots.column, noBots.value).gte("created_at", rangeStart).gt("duration_seconds", 0),
    db.from("leads").select("created_at").gte("created_at", rangeStart).order("created_at", { ascending: true }),
    db.from("page_views").select("created_at, session_id").eq(noBots.column, noBots.value).gte("created_at", rangeStart).order("created_at", { ascending: true }),
    db.from("page_views").select("traffic_source").eq(noBots.column, noBots.value).gte("created_at", rangeStart),
    db.from("page_views").select("page").eq(noBots.column, noBots.value).gte("created_at", rangeStart),
    db.from("page_views").select("device").eq(noBots.column, noBots.value).gte("created_at", rangeStart),
    db.from("leads").select("id, name, phone, objective, status, value, created_at").order("created_at", { ascending: false }).limit(5),
    db.from("leads").select("objective").gte("created_at", rangeStart),
    db.from("page_views").select("session_id").eq(noBots.column, noBots.value).gte("created_at", rangeStart),
    db.from("events").select("event_name, session_id").gte("created_at", rangeStart),
    db.from("page_views").select("utm_campaign, session_id").eq(noBots.column, noBots.value).gte("created_at", rangeStart).not("utm_campaign", "is", null),
    db.from("leads").select("utm_campaign").gte("created_at", rangeStart).not("utm_campaign", "is", null),
    db.from("page_views").select("session_id").eq(noBots.column, noBots.value).gte("created_at", fiveMinAgo),
    db.from("leads").select("*", { count: "exact", head: true }).gte("created_at", prevRangeStart).lt("created_at", rangeStart),
    db.from("page_views").select("*", { count: "exact", head: true }).eq(noBots.column, noBots.value).gte("created_at", prevRangeStart).lt("created_at", rangeStart),
    db.from("page_views").select("browser").eq(noBots.column, noBots.value).gte("created_at", rangeStart),
    db.from("leads").select("status"),
    db.from("page_views").select("country").eq(noBots.column, noBots.value).gte("created_at", rangeStart).not("country", "is", null),
    db.from("page_views").select("*", { count: "exact", head: true }).eq("is_bot", true).gte("created_at", rangeStart),
  ]);

  const avgDuration =
    pvDurations && pvDurations.length > 0
      ? Math.round(pvDurations.reduce((s, r) => s + (r.duration_seconds || 0), 0) / pvDurations.length)
      : 0;

  const sessionCounts: Record<string, number> = {};
  (sessionsRaw ?? []).forEach((r) => {
    sessionCounts[r.session_id] = (sessionCounts[r.session_id] || 0) + 1;
  });
  const uniqueSessions = Object.keys(sessionCounts).length;
  const bounceSessions = Object.values(sessionCounts).filter((c) => c === 1).length;
  const bounceRate = uniqueSessions > 0 ? Math.round((bounceSessions / uniqueSessions) * 100) : 0;

  const activeNow = new Set((activeNowRaw ?? []).map((r) => r.session_id)).size;

  const leadsInRange = leadsRange?.length ?? 0;
  const pvInRange = pvRange?.length ?? 0;
  const prevLeads = prevLeadsCount ?? 0;
  const prevPv = prevPvCount ?? 0;
  const pagesPerSession = uniqueSessions > 0 ? Number((pvInRange / uniqueSessions).toFixed(1)) : 0;

  const leadsOverTime = aggregateByDay(leadsRange ?? []);
  const pvOverTime = aggregateByDay(pvRange ?? []);

  const trafficSources: Record<string, number> = {};
  (trafficRaw ?? []).forEach((r) => {
    const src = r.traffic_source || "direct";
    trafficSources[src] = (trafficSources[src] || 0) + 1;
  });

  const topPages: Record<string, number> = {};
  (topPagesRaw ?? []).forEach((r) => {
    topPages[r.page || "/"] = (topPages[r.page || "/"] || 0) + 1;
  });

  const devices: Record<string, number> = {};
  (devicesRaw ?? []).forEach((r) => {
    devices[r.device || "desktop"] = (devices[r.device || "desktop"] || 0) + 1;
  });

  const objectives: Record<string, number> = {};
  (leadsForObjective ?? []).forEach((r) => {
    objectives[r.objective || "outro"] = (objectives[r.objective || "outro"] || 0) + 1;
  });

  const browsers: Record<string, number> = {};
  (browsersRaw ?? []).forEach((r) => {
    const b = r.browser || "Other";
    browsers[b] = (browsers[b] || 0) + 1;
  });

  const statusBreakdown: Record<string, number> = {};
  (leadsStatusRaw ?? []).forEach((r) => {
    const s = r.status || "new";
    statusBreakdown[s] = (statusBreakdown[s] || 0) + 1;
  });

  const eventCounts: Record<string, Set<string>> = {};
  (eventsRaw ?? []).forEach((r) => {
    if (!eventCounts[r.event_name]) eventCounts[r.event_name] = new Set();
    eventCounts[r.event_name].add(r.session_id);
  });
  const funnelSessions = (name: string) => eventCounts[name]?.size ?? 0;

  const funnel = [
    { stage: "Visitantes", count: uniqueSessions },
    { stage: "Calculadora", count: funnelSessions("calculator_step2") },
    { stage: "Simulação", count: funnelSessions("calculator_simulate") },
    { stage: "Lead capturado", count: funnelSessions("lead_submit") },
    { stage: "WhatsApp", count: funnelSessions("whatsapp_click") },
  ];

  const heatmap: Record<string, number> = {};
  (pvRange ?? []).forEach((r) => {
    const d = new Date(r.created_at);
    const key = `${d.getDay()}-${d.getHours()}`;
    heatmap[key] = (heatmap[key] || 0) + 1;
  });

  const campaignVisits: Record<string, Set<string>> = {};
  (pvUtmRaw ?? []).forEach((r) => {
    if (!campaignVisits[r.utm_campaign]) campaignVisits[r.utm_campaign] = new Set();
    campaignVisits[r.utm_campaign].add(r.session_id);
  });
  const campaignLeads: Record<string, number> = {};
  (leadsUtmRaw ?? []).forEach((r) => {
    campaignLeads[r.utm_campaign] = (campaignLeads[r.utm_campaign] || 0) + 1;
  });
  const allCampaigns = new Set([...Object.keys(campaignVisits), ...Object.keys(campaignLeads)]);
  const utmCampaigns = Array.from(allCampaigns)
    .map((c) => ({
      campaign: c,
      visits: campaignVisits[c]?.size ?? 0,
      leads: campaignLeads[c] ?? 0,
      rate:
        (campaignVisits[c]?.size ?? 0) > 0
          ? Number((((campaignLeads[c] ?? 0) / (campaignVisits[c]?.size ?? 1)) * 100).toFixed(1))
          : 0,
    }))
    .sort((a, b) => b.visits - a.visits);

  const durationBuckets = [0, 10, 30, 60, 120, 300, 600];
  const durationLabels = ["0-10s", "10-30s", "30s-1m", "1-2m", "2-5m", "5-10m", "10m+"];
  const durationHist = durationLabels.map(() => 0);
  (pvDurations ?? []).forEach((r) => {
    const s = r.duration_seconds || 0;
    let idx = durationBuckets.length - 1;
    for (let i = 0; i < durationBuckets.length - 1; i++) {
      if (s >= durationBuckets[i] && s < durationBuckets[i + 1]) { idx = i; break; }
    }
    durationHist[idx]++;
  });

  const countries: Record<string, number> = {};
  (countryRaw ?? []).forEach((r) => {
    const c = r.country || "??";
    countries[c] = (countries[c] || 0) + 1;
  });

  return NextResponse.json({
    range,
    overview: {
      totalLeads: totalLeads ?? 0,
      leadsToday: leadsToday ?? 0,
      leadsWeek: leadsWeek ?? 0,
      pageViewsToday: pvToday ?? 0,
      avgSessionDuration: avgDuration,
      uniqueSessions,
      activeNow,
      leadsInRange,
      pvInRange,
      prevLeads,
      prevPv,
      bounceRate,
      pagesPerSession,
      conversionRate:
        uniqueSessions > 0 ? Number(((leadsInRange / uniqueSessions) * 100).toFixed(1)) : 0,
    },
    leadsOverTime,
    pvOverTime,
    trafficSources: Object.entries(trafficSources).map(([source, count]) => ({ source, count })),
    topPages: Object.entries(topPages).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([page, views]) => ({ page, views })),
    devices: Object.entries(devices).map(([device, count]) => ({ device, count })),
    browsers: Object.entries(browsers).sort((a, b) => b[1] - a[1]).map(([browser, count]) => ({ browser, count })),
    objectives: Object.entries(objectives).sort((a, b) => b[1] - a[1]).map(([objective, count]) => ({ objective, count })),
    statusBreakdown: Object.entries(statusBreakdown).map(([status, count]) => ({ status, count })),
    durationHistogram: durationLabels.map((label, i) => ({ label, count: durationHist[i] })),
    recentLeads: recentLeadsRaw ?? [],
    funnel,
    heatmap: Object.entries(heatmap).map(([k, count]) => {
      const [day, hour] = k.split("-").map(Number);
      return { day, hour, count };
    }),
    utmCampaigns,
    countries: Object.entries(countries).sort((a, b) => b[1] - a[1]).map(([country, count]) => ({ country, count })),
    botsFiltered: botCount ?? 0,
  });
}

function aggregateByDay(rows: { created_at: string }[]) {
  const map: Record<string, number> = {};
  rows.forEach((r) => {
    const day = r.created_at.slice(0, 10);
    map[day] = (map[day] || 0) + 1;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}
