"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_PHONE_NUMBER, handleWhatsAppClick } from "../lib/constants";

export default function PartnerLogos() {
  const partnerWhatsappMsg =
    "Olá! Vim pelo site e gostaria de saber mais sobre os consórcios parceiros.";
  const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    partnerWhatsappMsg
  )}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => handleWhatsAppClick(whatsappLink, e)}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed bottom-2 md:bottom-8 left-1 md:left-24 z-40 bg-white backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200/80 w-auto"
    >
      <div className="flex gap-6 items-center">
        {/* Logo Servopa */}
        <Image
          src="/consorcio-servopa0.png"
          alt="Servopa Consórcios"
          width={100}
          height={40}
          quality={100}
          className="h-12 w-auto object-cover"
        />

        {/* Logo Rodobens */}
        <Image
          src="/rodobens.jpg"
          alt="Rodobens"
          width={200}
          height={80}
          quality={100}
          className="h-20 w-auto object-cover"
        />
      </div>
    </motion.a>
  );
}
