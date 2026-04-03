"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaChartLine,
  FaUserTie,
  FaTrophy,
  FaMoneyBillWave,
  FaClock,
  FaCheckDouble,
  FaArrowRight,
} from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import Container from "./Container";

const BENEFITS = [
  {
    icon: FaChartLine,
    title: "Taxas reduzidas",
    description: "100% sem juros. Descubra quanto você economiza com a gente.",
    highlight: "Até 70% menos que financiamento",
    accent: "#0487D9",
    featured: true,
  },
  {
    icon: FaUserTie,
    title: "Acompanhamento personalizado",
    description: "Um consultor dedicado para cuidar do seu processo.",
    highlight: "Consultor exclusivo 24/7",
    accent: "#035AA6",
    featured: false,
  },
  {
    icon: FaTrophy,
    title: "Maior chance de contemplação",
    description: "Sistema inteligente que aumenta suas chances.",
    highlight: "+40% de chances",
    accent: "#0487D9",
    featured: false,
  },
  {
    icon: FaMoneyBillWave,
    title: "Economia garantida",
    description: "Economize milhares de reais comparado ao financiamento tradicional.",
    highlight: "Economia média de R$ 50.000",
    accent: "#035AA6",
    featured: false,
  },
  {
    icon: FaClock,
    title: "Processo simplificado",
    description: "Documentação reduzida e aprovação em até 48 horas.",
    highlight: "Aprovação em 48h",
    accent: "#0487D9",
    featured: false,
  },
  {
    icon: FaCheckDouble,
    title: "Segurança total",
    description: "Consórcios regulamentados pelo Banco Central do Brasil.",
    highlight: "100% regulamentado",
    accent: "#035AA6",
    featured: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function BenefitsV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id="vantagens"
      className="relative py-16 sm:py-24 md:py-28 overflow-hidden scroll-mt-24 md:scroll-mt-0"
    >
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #021D40 0%, #022859 35%, #021D40 100%)",
        }}
      />
      {/* Radial glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(4, 135, 217, 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(3, 90, 166, 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(4, 135, 217, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0487D9] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0487D9]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0487D9]">
                Vantagens exclusivas
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4 max-w-4xl mx-auto">
              Vantagens do{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #0487D9 0%, #5BB8FF 50%, #0487D9 100%)",
                }}
              >
                consórcio sem juros
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Condições exclusivas que fazem a diferença para realizar seus sonhos com segurança e economia
            </p>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                className={benefit.featured ? "sm:col-span-2" : ""}
              >
                <motion.div
                  className="group relative h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div
                    className="relative h-full rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 group-hover:bg-white/[0.09] group-hover:border-[#0487D9]/40 group-hover:shadow-[0_0_30px_-16px_rgba(4,135,217,0.25)]"
                    style={{
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                    }}
                  >
                    {/* Number badge */}
                    <span className="absolute top-4 right-4 sm:top-5 sm:right-5 text-4xl sm:text-5xl font-black text-white/[0.06] leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      <motion.div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${benefit.accent}30 0%, ${benefit.accent}10 100%)`,
                          boxShadow: `0 4px 16px -4px ${benefit.accent}30`,
                        }}
                      >
                        <benefit.icon
                          className="text-xl sm:text-2xl transition-colors"
                          style={{ color: benefit.accent }}
                        />
                      </motion.div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#5BB8FF] transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-4">
                        {benefit.description}
                      </p>

                      <div
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border backdrop-blur-sm"
                        style={{
                          backgroundColor: "rgba(16, 185, 129, 0.15)",
                          borderColor: "rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        <FaCheckDouble className="text-emerald-400 text-sm shrink-0" />
                        <span className="text-sm font-bold text-emerald-300">
                          {benefit.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick("simular_agora", "benefits_section");
                handleWhatsAppClick(WHATSAPP_LINK, e, "benefits_section");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, rgba(4, 135, 217, 0.25) 0%, rgba(3, 90, 166, 0.2) 50%, rgba(2, 29, 64, 0.3) 100%)",
                border: "1px solid rgba(4, 135, 217, 0.25)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(4, 135, 217, 0.2) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Quer saber quanto você pode economizar?
                  </h3>
                  <p className="text-sm sm:text-base text-white/70">
                    Simule agora em menos de 30 segundos, é grátis!
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[var(--primary-1)] transition-all group-hover:bg-[#0487D9] group-hover:text-white shadow-md">
                  <span>Simular agora</span>
                  <FaArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
