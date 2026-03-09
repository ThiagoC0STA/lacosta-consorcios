"use client";

import { useEffect, useState } from "react";

export type SectionTheme =
  | "hero"
  | "conteudos"
  | "parceiros"
  | "vantagens"
  | "oferta"
  | "como-funciona"
  | "depoimentos"
  | "faq"
  | "contato"
  | "light";

const SECTION_ORDER: SectionTheme[] = [
  "hero",
  "conteudos",
  "parceiros",
  "vantagens",
  "oferta",
  "como-funciona",
  "depoimentos",
  "contato",
];

const SECTION_IDS: [SectionTheme, string][] = [
  ["hero", "simulacao"],
  ["conteudos", "conteudos"],
  ["parceiros", "parceiros"],
  ["vantagens", "vantagens"],
  ["oferta", "oferta"],
  ["como-funciona", "como-funciona"],
  ["depoimentos", "depoimentos"],
  ["faq", "faq"],
  ["contato", "contato"],
];

const DESKTOP_TRIGGER_OFFSET = 80;
const MOBILE_TRIGGER_OFFSET = 125;

export function useActiveSection(): SectionTheme {
  const [activeSection, setActiveSection] = useState<SectionTheme>("hero");

  useEffect(() => {
    const updateActive = () => {
      const triggerOffset =
        typeof window !== "undefined" && window.innerWidth < 768
          ? MOBILE_TRIGGER_OFFSET
          : DESKTOP_TRIGGER_OFFSET;

      let bestTheme: SectionTheme = "hero";
      let bestOrder = -1;

      const seen = new Set<SectionTheme>();
      for (const [theme, id] of SECTION_IDS) {
        if (seen.has(theme)) continue;
        seen.add(theme);

        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerOffset && rect.bottom > triggerOffset) {
          const order = SECTION_ORDER.indexOf(theme);
          if (order > bestOrder) {
            bestOrder = order;
            bestTheme = theme;
          }
        }
      }

      if (bestOrder >= 0) {
        setActiveSection(bestTheme);
        return;
      }

      for (const [theme, id] of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setActiveSection(theme);
          return;
        }
      }
    };

    const handleUpdate = () => requestAnimationFrame(updateActive);
    const t = setTimeout(handleUpdate, 100);
    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, []);

  return activeSection;
}
