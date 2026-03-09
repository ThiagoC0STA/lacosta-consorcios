"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";

type Variant = "default" | "compact";

interface HowItWorksCTAV2Props {
  variant?: Variant;
  inView?: boolean;
  animationDelay?: number;
}

export default function HowItWorksCTAV2({
  variant = "default",
  inView = true,
  animationDelay = 0.5,
}: HowItWorksCTAV2Props) {
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={isCompact ? "mt-8" : "mt-16 sm:mt-20"}
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          trackButtonClick(
            "comecar_agora",
            isCompact ? "how_it_works_mobile" : "how_it_works"
          );
          handleWhatsAppClick(
            WHATSAPP_LINK,
            e,
            isCompact ? "how_it_works_mobile" : "how_it_works"
          );
        }}
        className="group/cta relative flex flex-col items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border border-white/5"
        style={{
          background:
            "linear-gradient(135deg, #0A1D39 0%, #021D40 50%, #022859 100%)",
          boxShadow:
            "0 4px 24px rgba(2, 51, 115, 0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Accent glow - centered top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(4, 135, 217, 0.5) 0%, transparent 70%)",
          }}
        />

        <div
          className={`relative z-10 flex w-full flex-col items-center justify-center text-center ${
            isCompact ? "p-6" : "p-8 sm:p-10 md:p-12"
          }`}
        >
          <h3
            className={`font-bold text-white mb-2 ${
              isCompact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl md:text-[1.75rem]"
            }`}
          >
            Pronto para dar o primeiro passo?
          </h3>
          <p
            className={`text-white/80 mb-6 max-w-xl mx-auto leading-relaxed ${
              isCompact ? "text-sm mb-5" : "text-sm sm:text-base"
            }`}
          >
            O caminho para o seu sonho é mais simples do que você imagina. Fale
            com um especialista agora.
          </p>
          <span
            className={`group/btn inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[var(--primary-1)] transition-all group-hover/cta:scale-[1.02] group-hover/cta:shadow-lg active:scale-[0.98] ${
              isCompact ? "shadow-sm" : "shadow-md"
            }`}
          >
            Começar agora
            <FaArrowRight className="text-sm transition-transform group-hover/btn:translate-x-1" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}
