"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppLink, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import {
  FaCheckDouble,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { trackEvent } from "../lib/trackEvent";

const STORAGE_KEY = "lacosta_exit_popup_dismissed";
const DISMISS_HOURS = 24;
const MIN_TIME_ON_PAGE_MS = 5_000;
const SCROLL_UP_RATIO = 0.3;

function wasDismissedRecently(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_HOURS * 3_600_000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* storage blocked */
  }
}

const HIGHLIGHTS = [
  { text: "100% sem juros", accent: "#0487D9" },
  { text: "Economia média de R$ 45 mil", accent: "#10B981" },
  { text: "Simulação em 30 segundos", accent: "#0487D9" },
];

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const loaded = useRef(Date.now());
  const maxScroll = useRef(0);

  const show = useCallback(() => {
    if (shown.current) return;
    if (Date.now() - loaded.current < MIN_TIME_ON_PAGE_MS) return;
    if (wasDismissedRecently()) return;
    shown.current = true;
    setOpen(true);
    trackButtonClick("exit_intent_popup", "shown");
    trackEvent("exit_popup_shown");
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    markDismissed();
  }, []);

  useEffect(() => {
    const onMouseOut = (e: MouseEvent) => {
      if (
        !e.relatedTarget &&
        (e.clientY <= 0 ||
          (e as unknown as { toElement: unknown }).toElement == null)
      ) {
        show();
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") show();
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y > maxScroll.current) maxScroll.current = y;
      if (
        maxScroll.current > 400 &&
        y < maxScroll.current * (1 - SCROLL_UP_RATIO)
      ) {
        show();
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  const whatsappLink = buildWhatsAppLink("exit_intent");

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackButtonClick("exit_intent_cta", "popup");
    trackEvent("whatsapp_click", { source: "exit_popup" });
    trackEvent("exit_popup_cta", { action: "whatsapp" });
    handleWhatsAppClick(whatsappLink, e, "exit_intent");
    dismiss();
  };

  const handleSimulate = () => {
    trackEvent("exit_popup_cta", { action: "simulate" });
    dismiss();
    const el = document.getElementById("simulacao");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              background:
                "linear-gradient(160deg, #021D40 0%, #022859 40%, #023373 100%)",
              boxShadow:
                "0 32px 64px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Glow orbs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(4,135,217,0.5) 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(3,90,166,0.6) 0%, transparent 70%)" }} />

            {/* Dot grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
              aria-label="Fechar"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10 px-6 pb-7 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0487D9]/30 bg-[#0487D9]/10 px-4 py-2 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0487D9] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0487D9]" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0487D9]">
                  Antes de sair
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-2 text-2xl font-bold leading-tight text-white sm:text-[28px]"
              >
                Quanto você{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #0487D9 0%, #5BB8FF 50%, #0487D9 100%)",
                  }}
                >
                  perderia de juros
                </span>{" "}
                no financiamento?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mb-6 text-[15px] leading-relaxed text-white/55"
              >
                Descubra em 30 segundos quanto pode economizar com consórcio. Grátis, sem compromisso.
              </motion.p>

              {/* Highlights */}
              <div className="mb-7 space-y-2.5">
                {HIGHLIGHTS.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${item.accent}25`,
                        boxShadow: `0 4px 12px -4px ${item.accent}25`,
                      }}
                    >
                      <FaCheckDouble className="text-xs" style={{ color: item.accent }} />
                    </div>
                    <span className="text-sm font-semibold text-white/90">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <motion.button
                  type="button"
                  onClick={handleSimulate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-[15px] font-bold text-[var(--primary-1)] shadow-lg transition-all hover:bg-[#0487D9] hover:text-white"
                >
                  <span>Simular agora · é grátis</span>
                  <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCta}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-[15px] font-bold text-white/90 backdrop-blur-sm transition-all hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
                >
                  <svg className="h-[18px] w-[18px] text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Falar com especialista</span>
                </motion.a>
              </div>

              {/* Trust footer */}
              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-white/35">
                <FaShieldAlt className="text-[10px]" />
                <span>+5.000 clientes · +25 anos · Regulamentado pelo Banco Central</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
