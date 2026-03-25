"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";

interface OpportunityCardProps {
  src: string;
  alt: string;
  index: number;
}

export default function OpportunityCard({
  src,
  alt,
  index,
}: OpportunityCardProps) {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackButtonClick(
          "oportunidade_card",
          `opportunity_card_${index + 1}`
        );
        handleWhatsAppClick(
          WHATSAPP_LINK,
          e,
          `opportunity_card_${index + 1}`
        );
      }}
      className="group relative block cursor-pointer select-none"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md ring-1 ring-black/[0.05] transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#035AA6]/10 group-hover:ring-[#0487D9]/20">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 480px) 75vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 280px"
          priority={index < 2}
        />

        {/* Hover overlay with WhatsApp CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <span className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-lg">
            <FaWhatsapp className="text-base" />
            Tenho interesse
          </span>
        </div>
      </div>
    </motion.a>
  );
}
