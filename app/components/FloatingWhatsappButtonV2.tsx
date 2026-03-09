"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { motion } from "framer-motion";
import { trackButtonClick } from "../lib/analytics";

export default function FloatingWhatsappButtonV2() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackButtonClick("floating_whatsapp", "floating_button");
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
      className="fixed right-4 bottom-4 sm:right-5 sm:bottom-5 z-50 flex items-center gap-2 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      {/* Label - visible on larger screens */}
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
        className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-neutral-800 font-semibold text-sm shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] border border-neutral-100 whitespace-nowrap transition-all duration-200 group-hover:shadow-md group-hover:border-green-200"
      >
        Fale conosco
      </motion.span>

      {/* WhatsApp icon button */}
      <motion.span
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white transition-all duration-200 group-hover:bg-[#20BD5A]"
        style={{
          boxShadow: "0 4px 20px -4px rgba(37, 211, 102, 0.4)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Subtle pulse ring - single, refined */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
          animate={{
            scale: [1, 1.4, 1.4],
            opacity: [0.4, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <FaWhatsapp className="text-2xl sm:text-3xl relative z-10" />
      </motion.span>
    </motion.a>
  );
}
