import { SITE_NAME, SITE_URL } from "./seo";

export const CONTACT_EMAIL = "luciano@lacostacorretora.com.br";
export const CONTACT_PHONE_DISPLAY = "(41) 3076-1050";
export const CONTACT_PHONE_TEL = "+554130761050";

export const ADDRESS_LINES = [
  "Rua da Capitania, 127",
  "Guabirotuba, Curitiba, PR",
  "CEP: 81520-590",
] as const;

/**
 * Legal name (razão social). Override with `NEXT_PUBLIC_COMPANY_LEGAL_NAME` in `.env.local` if needed.
 * Registry: La Costa Corretora de Seguros Ltda, Curitiba/PR.
 */
export const LEGAL_COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME?.trim() ??
  "La Costa";

/**
 * CNPJ digits or formatted; UI uses `formatCnpj` when 14 digits.
 * Override with `NEXT_PUBLIC_CNPJ` in `.env.local` if needed.
 */
export const COMPANY_CNPJ_RAW =
  process.env.NEXT_PUBLIC_CNPJ?.trim() ?? "03447378000126";

/** ISO date of incorporation (08/10/1999). */
export const COMPANY_FOUNDING_DATE_ISO = "1999-10-08";

export const COOKIE_CONSENT_STORAGE_KEY = "lacosta_cookie_consent_v1";

export const LAST_LEGAL_UPDATE = "3 de abril de 2026";

export const SITE_DISPLAY_NAME = SITE_NAME;
export const SITE_PUBLIC_URL = SITE_URL;

export function formatCnpj(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 14) return raw;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12, 14)}`;
}
