"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_STORAGE_KEY } from "../lib/legal";

type StoredConsent = { v: number; at: number; choice: "accept" };

function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.choice === "accept" && parsed.v === 1) return parsed;
  } catch {
    return null;
  }
  return null;
}

export default function CookieConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!readConsent());
  }, []);

  const accept = () => {
    const payload: StoredConsent = { v: 1, at: Date.now(), choice: "accept" };
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage blocked */
    }
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "cookie_consent_accepted" });
    }
    setOpen(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };

  if (!open) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] border-t border-neutral-200 bg-white/95 shadow-[0_-8px_30px_rgba(2,29,64,0.12)] backdrop-blur-md"
      role="dialog"
      aria-modal="false"
      aria-label="Aviso sobre cookies"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-3 lg:px-8">
        <p className="text-sm leading-snug text-neutral-700">
          Utilizamos cookies e tecnologias semelhantes para medir audiência, melhorar o site e apoiar
          campanhas de marketing, conforme descrito na nossa{" "}
          <Link
            href="/privacidade"
            className="font-semibold text-[var(--primary-1)] underline underline-offset-2 hover:text-[var(--primary-4)]"
          >
            Política de Privacidade
          </Link>
          . Ao clicar em Aceitar, você concorda com esse uso.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <Link
            href="/privacidade#cookies"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            Saiba mais
          </Link>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary-1)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-2)]"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
