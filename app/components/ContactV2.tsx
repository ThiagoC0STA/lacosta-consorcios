"use client";

import HeroCalculatorV2 from "./HeroCalculatorV2";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaClock, FaCheckCircle, FaShieldAlt, FaUserTie } from "react-icons/fa";
import Container from "./Container";

const STATS = [
  { icon: FaClock, value: "2min", label: "Tempo médio resposta" },
  { icon: FaCheckCircle, value: "24/7", label: "Atendimento" },
  { icon: FaShieldAlt, value: "100%", label: "Seguro" },
  { icon: FaUserTie, value: "4.9", label: "Avaliação" },
];

const GUARANTEES = [
  {
    icon: FaCheckCircle,
    title: "100% Seguro",
    description: "Consórcios regulamentados pelo Banco Central",
    accent: "#10b981",
  },
  {
    icon: FaClock,
    title: "Sem Compromisso",
    description: "Simulação gratuita e sem obrigação de contratação",
    accent: "#0487D9",
  },
  {
    icon: FaUserTie,
    title: "Atendimento VIP",
    description: "Consultor dedicado para acompanhar todo o processo",
    accent: "#035AA6",
  },
];

export default function ContactV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id="contato"
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden scroll-mt-24 md:scroll-mt-0"
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
              "radial-gradient(circle, rgba(4, 135, 217, 0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(3, 90, 166, 0.5) 0%, transparent 70%)",
          }}
        />
      </div>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0487D9] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0487D9]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0487D9]">
                Fale com um especialista
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-3 max-w-2xl mx-auto">
              Simule e{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #0487D9 0%, #5BB8FF 50%, #0487D9 100%)",
                }}
              >
                realize seu sonho
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-6">
              Nossa equipe está pronta para ajudar. Simule seu consórcio e tire
              todas as suas dúvidas.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                >
                  <stat.icon className="h-4 w-4 text-[#0487D9]" />
                  <span className="font-bold text-white text-sm">
                    {stat.value}
                  </span>
                  <span className="text-white/50 text-xs">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <HeroCalculatorV2 />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {GUARANTEES.map((g) => (
              <div
                key={g.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-[#0487D9]/30"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    background: `${g.accent}20`,
                    boxShadow: `0 2px 8px -2px ${g.accent}40`,
                  }}
                >
                  <g.icon className="text-lg" style={{ color: g.accent }} />
                </div>
                <h4 className="font-semibold text-white mb-1">{g.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {g.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
