"use client";

import { useState, useEffect } from "react";
import { buildWhatsAppLink, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import { trackEvent } from "../lib/trackEvent";
import { COOKIE_CONSENT_STORAGE_KEY } from "../lib/legal";

function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.choice === "accept" && parsed.v === 1;
  } catch {
    return false;
  }
}

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [cookieBannerDismissed, setCookieBannerDismissed] = useState(false);

  useEffect(() => {
    setCookieBannerDismissed(hasCookieConsent());

    const onConsentChange = () => setCookieBannerDismissed(true);
    window.addEventListener("cookie-consent-changed", onConsentChange);
    return () =>
      window.removeEventListener("cookie-consent-changed", onConsentChange);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("simulacao");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const link = buildWhatsAppLink("sticky_cta");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackButtonClick("sticky_cta", "mobile_bar");
    trackEvent("whatsapp_click", { source: "sticky_cta" });
    handleWhatsAppClick(link, e, "sticky_cta");
  };

  const show = visible && cookieBannerDismissed;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] border-t border-neutral-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 md:hidden ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-neutral-900">
            Simule grátis agora
          </p>
          <p className="truncate text-xs text-neutral-500">
            Sem juros, sem compromisso
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="shrink-0 rounded-xl bg-[var(--primary-1)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--primary-2)]"
        >
          Simular
        </a>
      </div>
    </div>
  );
}
