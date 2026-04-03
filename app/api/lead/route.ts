import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/server";

interface LeadBody {
  name: string;
  phone: string;
  objective?: string;
  simulationType?: string;
  value?: number;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function isValid(body: unknown): body is LeadBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length >= 2 &&
    typeof b.phone === "string" &&
    b.phone.replace(/\D/g, "").length >= 10
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    if (!isValid(body)) {
      return NextResponse.json(
        { error: "name and phone are required" },
        { status: 400 }
      );
    }

    const lead = {
      name: String(body.name).trim(),
      phone: String(body.phone).replace(/\D/g, ""),
      objective: String(body.objective ?? ""),
      simulation_type:
        body.simulationType === "parcela" ? "parcela" : "credito",
      value: Number(body.value) || 0,
      source: String(body.source ?? "calculator"),
      status: "new" as const,
      utm_source: body.utm_source ? String(body.utm_source) : null,
      utm_medium: body.utm_medium ? String(body.utm_medium) : null,
      utm_campaign: body.utm_campaign ? String(body.utm_campaign) : null,
      utm_content: body.utm_content ? String(body.utm_content) : null,
      utm_term: body.utm_term ? String(body.utm_term) : null,
    };

    const db = supabaseAdmin();
    const { error } = await db.from("leads").insert(lead);

    if (error) {
      console.error("[lead] supabase insert error:", error);
      return NextResponse.json(
        { error: "failed to save lead" },
        { status: 500 }
      );
    }

    console.log("[lead] captured:", lead.name, lead.phone);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
