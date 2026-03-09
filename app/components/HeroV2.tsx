"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import {
  FaAward,
  FaUsers,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";
import HeroCalculatorV2 from "./HeroCalculatorV2";
import Image from "next/image";
import Container from "./Container";

const TRUST_ITEMS = [
  { icon: FaAward, value: "+25 anos", label: "Mercado", accent: "var(--primary-5)" },
  { icon: FaUsers, value: "+5.000", label: "Clientes", accent: "var(--primary-4)" },
  { icon: FaChartLine, value: "4.9/5", label: "Avaliação", accent: "var(--primary-5)" },
];

export default function HeroV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [simulationCount, setSimulationCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTargetCount(Math.floor(Math.random() * 15) + 34);
  }, []);

  useEffect(() => {
    if (inView && targetCount > 0) {
      const interval = setInterval(() => {
        setSimulationCount((prev) => {
          if (prev < targetCount) return prev + 1;
          clearInterval(interval);
          return targetCount;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [inView, targetCount]);

  return (
    <section
      id="simulacao"
      className="relative flex items-center overflow-hidden bg-neutral-900 pt-36 md:pt-24 scroll-mt-36 md:scroll-mt-24 md:pb-16"
    >
      <div className="absolute inset-0 z-0">
        <Image
          fill
          priority
          src="/hero-6.jpg"
          alt="Professional consorcio advisory"
          className="object-cover opacity-40"
          sizes="100vw"
          quality={75}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(2, 29, 64, 0.95) 0%, rgba(2, 40, 89, 0.9) 50%, rgba(3, 90, 166, 0.85) 100%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, var(--primary-5) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, var(--primary-4) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <Container className="relative z-10 w-full flex items-center" padding={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full px-4 sm:px-6 pt-5 pb-12 md:pt-10 md:pb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4 text-center lg:text-left"
          >
            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                Consórcio com{" "}
                <span className="bg-gradient-to-r from-[#0487D9] to-[#035AA6] bg-clip-text text-transparent">
                  planejamento e segurança
                </span>
              </h1>
              <p className="text-sm md:text-base text-neutral-400 max-w-lg mx-auto lg:mx-0">
                Imóvel, veículo ou investimento.{" "}
                <span className="font-semibold text-white">100% sem juros.</span>
              </p>
            </div>

            {/* Benefit pills - compact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5"
            >
              {[
                { text: "100% Sem juros", highlight: true },
                { text: "Economize milhares", highlight: false },
                { text: "Descubra sua economia", highlight: false },
              ].map((pill, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                    pill.highlight
                      ? "bg-[var(--primary-5)]/30 text-white ring-1 ring-[var(--primary-5)]/50"
                      : "bg-white/10 text-white/90"
                  }`}
                >
                  <FaCheckCircle className="text-[10px]" style={{ color: "var(--primary-5)" }} />
                  {pill.text}
                </span>
              ))}
            </motion.div>

            {/* Stats cards + social proof - compact grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-3 gap-2 sm:gap-3"
            >
              {TRUST_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm"
                >
                  <item.icon
                    className="mx-auto mb-1 text-base"
                    style={{ color: item.accent }}
                  />
                  <div className="text-sm md:text-base font-bold text-white">{item.value}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-400">{item.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20">
                <span className="text-sm font-bold" style={{ color: "var(--primary-5)" }}>
                  {simulationCount}
                </span>
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Simulações hoje</p>
                <p className="text-xs text-neutral-400">Atividade em tempo real</p>
              </div>
            </motion.div>

            {/* CTA Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="lg:hidden"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-xl bg-white px-6 py-3.5 text-base font-bold text-[var(--primary-1)] transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-neutral-50"
              >
                Simular consórcio
              </button>
            </motion.div>
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:flex justify-center lg:justify-end items-center"
          >
            <HeroCalculatorV2 />
          </motion.div>
        </div>
      </Container>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex max-h-[95vh] w-full max-w-md flex-col rounded-t-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shrink-0 flex items-center justify-between border-b border-neutral-100 px-4 py-3">
              <span className="text-base font-semibold text-neutral-900">Simular consórcio</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto flex justify-center p-4 pb-6">
              <HeroCalculatorV2 />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
