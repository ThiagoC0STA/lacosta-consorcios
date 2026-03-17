"use client";

import { useEffect, useState } from "react";

export type SectionTheme =
  | "hero"
  | "conteudos"
  | "parceiros"
  | "vantagens"
  | "investimento"
  | "oferta"
  | "como-funciona"
  | "depoimentos"
  | "faq"
  | "contato"
  | "light";

const SECTION_ORDER: SectionTheme[] = [
  "hero",
  "parceiros",
  "vantagens",
  "investimento",
  "oferta",
  "como-funciona",
  "depoimentos",
  "faq",
  "contato",
  "conteudos",
];

const SECTION_IDS: [SectionTheme, string][] = [
  ["hero", "simulacao"],
  ["conteudos", "conteudos"],
  ["parceiros", "parceiros"],
  ["vantagens", "vantagens"],
  ["investimento", "investimento"],
  ["oferta", "oferta"],
  ["como-funciona", "como-funciona"],
  ["depoimentos", "depoimentos"],
  ["faq", "faq"],
  ["contato", "contato"],
];

const DESKTOP_TRIGGER = 80;
const MOBILE_TRIGGER = 125;

/**
 * Uses IntersectionObserver and entry.boundingClientRect instead of
 * scroll + getBoundingClientRect to reduce forced reflows.
 */
export function useActiveSection(): SectionTheme {
  const [activeSection, setActiveSection] = useState<SectionTheme>("hero");

  useEffect(() => {
    const rects = new Map<SectionTheme, DOMRect>();

    const getTrigger = () =>
      typeof window !== "undefined" && window.innerWidth < 768
        ? MOBILE_TRIGGER
        : DESKTOP_TRIGGER;

    const computeActive = () => {
      const trigger = getTrigger();
      let bestTheme: SectionTheme = "hero";
      let bestOrder = -1;

      for (const [theme] of SECTION_IDS) {
        const rect = rects.get(theme);
        if (!rect) continue;
        if (rect.top <= trigger && rect.bottom > trigger) {
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

      for (const [theme] of SECTION_IDS) {
        const rect = rects.get(theme);
        if (!rect) continue;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setActiveSection(theme);
          return;
        }
      }
    };

    const elementToTheme = new Map<Element, SectionTheme>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const theme = elementToTheme.get(entry.target);
          if (theme !== undefined) {
            rects.set(theme, entry.boundingClientRect);
          }
        }
        requestAnimationFrame(computeActive);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.01, 0.1, 0.5, 1],
      }
    );

    const init = () => {
      for (const [theme, id] of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        elementToTheme.set(el, theme);
        rects.set(theme, el.getBoundingClientRect());
        observer.observe(el);
      }
      computeActive();
    };

    const t = setTimeout(init, 100);
    const onResize = () => {
      requestAnimationFrame(() => {
        for (const [theme, id] of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el) rects.set(theme, el.getBoundingClientRect());
        }
        computeActive();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
