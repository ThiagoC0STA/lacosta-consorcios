"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import {
  FaFire,
  FaExclamationTriangle,
  FaGift,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import Container from "./Container";

const OFFER_BENEFITS = [
  {
    icon: FaGift,
    title: "Consultoria gratuita",
    description: "Análise personalizada + orientação especializada + acompanhamento completo",
    accent: "#F59E0B",
  },
  {
    icon: FaUsers,
    title: "Especialistas dedicados",
    description: "Equipe experiente para te orientar em cada etapa do processo",
    accent: "#FBBF24",
  },
  {
    icon: FaCheckCircle,
    title: "Garantia total",
    description: "100% seguro e regulamentado pelo Banco Central do Brasil",
    accent: "#F59E0B",
  },
];

export default function UrgencySectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
    { value: "Hoje", label: "Último dia", isText: true },
  ];

  return (
    <section id="oferta" className="relative py-16 sm:py-24 md:py-28 overflow-hidden scroll-mt-24 md:scroll-mt-0">
      {/* Dark warm gradient - urgency feel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a0a0a 0%, #2d0f0f 30%, #4a1515 70%, #1a0a0a 100%)",
        }}
      />
      {/* Amber/orange glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)",
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
            className="text-center mb-10 sm:mb-14"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 mb-8 backdrop-blur-sm"
            >
              <FaFire className="text-xl text-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
                Oferta por tempo limitado
              </span>
              <FaExclamationTriangle className="text-xl text-amber-400" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-4">
              Consultoria gratuita
            </h2>
            <p className="text-xl md:text-2xl font-semibold max-w-2xl mx-auto mb-2">
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Análise personalizada + orientação especializada
              </span>
            </p>
            <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto">
              Comece seu planejamento hoje mesmo
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 sm:mb-16"
          >
            <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8">
              <p className="text-center text-sm font-semibold text-amber-400/90 mb-5 uppercase tracking-wider">
                Oferta válida hoje
              </p>
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {countdownItems.map((item, i) => (
                  <div
                    key={item.label}
                    className="text-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-5 transition-all hover:border-amber-500/30 hover:bg-white/[0.08]"
                  >
                    <div
                      className={`text-2xl sm:text-3xl md:text-4xl font-black tabular-nums leading-none mb-1 ${
                        item.isText ? "text-amber-400" : "text-white"
                      }`}
                      style={
                        item.isText
                          ? {}
                          : {
                              textShadow: "0 0 30px rgba(245, 158, 11, 0.3)",
                            }
                      }
                    >
                      {item.isText
                        ? item.value
                        : String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Benefit cards */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-16"
          >
            {OFFER_BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group"
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-amber-500/25 group-hover:bg-white/[0.06] group-hover:shadow-[0_0_24px_-12px_rgba(245,158,11,0.12)]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${benefit.accent}25`,
                      boxShadow: `0 4px 12px -4px ${benefit.accent}25`,
                    }}
                  >
                    <benefit.icon
                      className="text-xl"
                      style={{ color: benefit.accent }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick("consultoria_gratuita", "urgency_section");
                handleWhatsAppClick(WHATSAPP_LINK, e, "urgency_section");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(220, 38, 38, 0.15) 50%, rgba(26, 10, 10, 0.4) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Quero minha consultoria gratuita!
                  </h3>
                  <p className="text-sm text-white/70">
                    Simule agora, é grátis e sem compromisso
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-amber-900 transition-all group-hover:bg-amber-500 group-hover:text-white shadow-md">
                  <span>Simular agora</span>
                  <FaArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
            <p className="text-center text-xs text-white/40 mt-4">
              Atenção: consultoria gratuita por tempo limitado
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
