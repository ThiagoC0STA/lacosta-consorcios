import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/server";

const BOT_PATTERNS =
  /bot|crawl|spider|slurp|mediapartners|adsbot|bingpreview|googlebot|google-inspectiontool|storebot|google-extended|apis-google|feedfetcher|lighthouse|pagespeed|chrome-lighthouse|headlesschrome|phantomjs|prerender|snap|ahref|semrush|mj12bot|dotbot|petalbot|bytespider|yandexbot|baiduspider|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|pinterestbot|discordbot|dataprovider|gptbot|claudebot|anthropic|ccbot|ia_archiver|archive\.org|screaming frog|sitebulb|deepcrawl|httrack|wget|curl|python-requests|go-http-client|java\/|node-fetch|axios|httpie|postman|insomnia|uptimerobot|pingdom|statuscake|newrelic|datadog|monitor|checker/i;

function isBot(ua: string): boolean {
  return BOT_PATTERNS.test(ua);
}

function classifySource(
  referrer: string | null,
  utmSource?: string | null,
  utmMedium?: string | null,
  gclid?: string | null,
  fbclid?: string | null,
): string {
  if (gclid) return "paid";
  if (utmMedium === "cpc" || utmMedium === "ppc" || utmSource === "google_ads")
    return "paid";
  if (/googleadservices|doubleclick|googlesyndication/i.test(referrer ?? ""))
    return "paid";

  if (fbclid) return "social";

  if (utmSource) return "campaign";
  if (!referrer) return "direct";

  if (/google\.com|google\.com\.br|bing\.com|yahoo\.com|duckduckgo|baidu/i.test(referrer))
    return "organic";
  if (/instagram|facebook|twitter|x\.com|tiktok|linkedin|youtube|threads\.net|pinterest/i.test(referrer))
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
      const gclid = body.gclid ? String(body.gclid) : null;
      const fbclid = body.fbclid ? String(body.fbclid) : null;
      const country = req.headers.get("x-vercel-ip-country") || null;

      const { data, error } = await db
        .from("page_views")
        .insert({
          session_id: String(body.session_id || ""),
          page: String(body.page || "/"),
          referrer,
          traffic_source: classifySource(referrer, utmSource, utmMedium, gclid, fbclid),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: body.utm_campaign ? String(body.utm_campaign) : null,
          utm_content: body.utm_content ? String(body.utm_content) : null,
          utm_term: body.utm_term ? String(body.utm_term) : null,
          device: parseDevice(ua),
          browser: parseBrowser(ua),
          is_bot: isBot(ua),
          country,
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
