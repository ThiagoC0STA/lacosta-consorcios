/**
 * Creates a row in a Notion database for calculator leads.
 * Requires a Notion integration with access to the target database.
 */

const NOTION_API = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";

export interface LeadForNotion {
  name: string;
  phone: string;
  objective: string;
  simulationType: "parcela" | "credito";
  value: number;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  timestamp: string;
}

function notionDatabaseId(): string | null {
  const raw = process.env.NOTION_LEADS_DATABASE_ID?.trim();
  return raw || null;
}

function notionToken(): string | null {
  const t = process.env.NOTION_API_KEY?.trim();
  return t || null;
}

/** Notion property names in your database (override via env if Portuguese, etc.) */
function propertyNames() {
  return {
    title: process.env.NOTION_PROP_TITLE?.trim() || "Name",
    phone: process.env.NOTION_PROP_PHONE?.trim() || "Phone",
    objective: process.env.NOTION_PROP_OBJECTIVE?.trim() || "Objective",
    simulationType:
      process.env.NOTION_PROP_SIMULATION_TYPE?.trim() || "Simulation type",
    value: process.env.NOTION_PROP_VALUE?.trim() || "Value",
    source: process.env.NOTION_PROP_SOURCE?.trim() || "Source",
    utm: process.env.NOTION_PROP_UTM?.trim() || "UTM",
    /** Set NOTION_PROP_CREATED_AT to a Date property name (e.g. Created at) to store submission time */
    createdAt: process.env.NOTION_PROP_CREATED_AT?.trim() || "",
  };
}

function formatPhoneE164(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) return `+${d}`;
  if (d.length >= 10 && d.length <= 11) return `+55${d}`;
  return d ? `+${d}` : "";
}

function buildUtmSummary(lead: LeadForNotion): string {
  const parts: string[] = [];
  if (lead.utm_source) parts.push(`source=${lead.utm_source}`);
  if (lead.utm_medium) parts.push(`medium=${lead.utm_medium}`);
  if (lead.utm_campaign) parts.push(`campaign=${lead.utm_campaign}`);
  if (lead.utm_content) parts.push(`content=${lead.utm_content}`);
  if (lead.utm_term) parts.push(`term=${lead.utm_term}`);
  return parts.join(" | ") || "—";
}

function richText(content: string) {
  return {
    rich_text: [{ type: "text" as const, text: { content: content.slice(0, 2000) } }],
  };
}

function titleContent(content: string) {
  return {
    title: [{ type: "text" as const, text: { content: content.slice(0, 2000) } }],
  };
}

/**
 * Returns true if Notion is configured (caller may still get API errors).
 */
export function isNotionLeadsConfigured(): boolean {
  return Boolean(notionToken() && notionDatabaseId());
}

export async function createNotionLead(
  lead: LeadForNotion
): Promise<{ ok: boolean; error?: string }> {
  const token = notionToken();
  const dbId = notionDatabaseId();
  if (!token || !dbId) {
    return { ok: false, error: "notion_not_configured" };
  }

  const p = propertyNames();
  const phoneDisplay = formatPhoneE164(lead.phone) || lead.phone;
  const utmSummary = buildUtmSummary(lead);
  const usePhoneNumberType =
    process.env.NOTION_PHONE_PROPERTY_TYPE === "phone_number";

  const properties: Record<string, unknown> = {
    [p.title]: titleContent(lead.name),
    [p.objective]: richText(lead.objective),
    [p.simulationType]: richText(lead.simulationType),
    [p.value]: { number: lead.value },
    [p.source]: richText(lead.source),
    [p.utm]: richText(utmSummary),
  };

  if (usePhoneNumberType) {
    properties[p.phone] = { phone_number: phoneDisplay };
  } else {
    properties[p.phone] = richText(phoneDisplay);
  }

  if (p.createdAt) {
    properties[p.createdAt] = { date: { start: lead.timestamp } };
  }

  const body = {
    parent: { database_id: dbId },
    properties,
  };

  try {
    const res = await fetch(NOTION_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[notion] create page failed:", res.status, errText);
      return { ok: false, error: `notion_${res.status}` };
    }

    return { ok: true };
  } catch (e) {
    console.error("[notion] request error:", e);
    return { ok: false, error: "notion_network" };
  }
}
