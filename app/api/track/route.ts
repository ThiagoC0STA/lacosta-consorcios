import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/server";

function classifySource(
  referrer: string | null,
  utmSource?: string | null,
  utmMedium?: string | null
): string {
  if (utmMedium === "cpc" || utmMedium === "ppc" || utmSource === "google_ads")
    return "paid";
  if (utmSource) return "campaign";
  if (!referrer) return "direct";
  if (/google|bing|yahoo|duckduckgo|baidu/i.test(referrer)) return "organic";
  if (/instagram|facebook|twitter|tiktok|linkedin|youtube/i.test(referrer))
    return "social";
  return "referral";
}

function parseDevice(ua: string): string {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

function parseBrowser(ua: string): string {
  if (/Edg/i.test(ua)) return "Edge";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua)) return "Safari";
  return "Other";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const type = String(body.type || "");
    const db = supabaseAdmin();

    if (type === "pageview") {
      const ua = String(body.user_agent || "");
      const referrer = body.referrer ? String(body.referrer) : null;
      const utmSource = body.utm_source ? String(body.utm_source) : null;
      const utmMedium = body.utm_medium ? String(body.utm_medium) : null;

      const { data, error } = await db
        .from("page_views")
        .insert({
          session_id: String(body.session_id || ""),
          page: String(body.page || "/"),
          referrer,
          traffic_source: classifySource(referrer, utmSource, utmMedium),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: body.utm_campaign ? String(body.utm_campaign) : null,
          utm_content: body.utm_content ? String(body.utm_content) : null,
          utm_term: body.utm_term ? String(body.utm_term) : null,
          device: parseDevice(ua),
          browser: parseBrowser(ua),
        })
        .select("id")
        .single();

      if (error) {
        console.error("[track] pageview insert error:", error);
        return NextResponse.json({ ok: false }, { status: 500 });
      }

      return NextResponse.json({ ok: true, id: data?.id });
    }

    if (type === "duration") {
      const id = String(body.id || "");
      const seconds = Math.min(Number(body.duration_seconds) || 0, 3600);
      if (id && seconds > 0) {
        await db
          .from("page_views")
          .update({ duration_seconds: seconds })
          .eq("id", id);
      }
      return NextResponse.json({ ok: true });
    }

    if (type === "event") {
      await db.from("events").insert({
        session_id: String(body.session_id || ""),
        event_name: String(body.event_name || ""),
        event_data: body.event_data ?? {},
        page: body.page ? String(body.page) : null,
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "unknown type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
