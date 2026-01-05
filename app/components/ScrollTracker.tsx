"use client";

import { useEffect } from "react";
import { trackScrollDepth } from "../lib/analytics";

export default function ScrollTracker() {
  useEffect(() => {
    const trackedDepths = new Set<number>();
    const thresholds = [25, 50, 75, 90, 100];

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

