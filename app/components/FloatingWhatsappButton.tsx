"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";

export default function FloatingWhatsappButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleWhatsAppClick(WHATSAPP_LINK, e);
  };

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed right-1 bottom-0 -translate-y-1/2 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center w-16 h-16 transition-all duration-300 group
      md:right-4 md:bottom-0 md:-translate-y-1/2
      sm:right-2 sm:top-auto sm:bottom-4 sm:translate-y-0"
      aria-label="Fale pelo WhatsApp"
      style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.18)" }}
    >
      <FaWhatsapp className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-200" />
    </a>
  );
}
