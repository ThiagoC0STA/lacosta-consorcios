"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { motion } from "framer-motion";
import { trackButtonClick } from "../lib/analytics";
import { trackEvent } from "../lib/trackEvent";
import { useState, useEffect } from "react";

export default function FloatingWhatsappButtonV2() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (!isDesktop) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackButtonClick("floating_whatsapp", "floating_button");
    trackEvent("whatsapp_click", { source: "floating_button" });
    handleWhatsAppClick(WHATSAPP_LINK, e, "floating_button");
  };

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-neutral-800 font-semibold text-sm shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] border border-neutral-100 whitespace-nowrap transition-all duration-200 group-hover:shadow-md group-hover:border-green-200"
      >
        Fale conosco
      </motion.span>

      <motion.span
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white transition-transform duration-200 group-hover:bg-[#20BD5A]"
        style={{ boxShadow: "0 4px 20px -4px rgba(37, 211, 102, 0.4)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-whatsapp-pulse"
          aria-hidden="true"
        />
        <FaWhatsapp className="text-3xl relative z-10" />
      </motion.span>
    </motion.a>
  );
}
