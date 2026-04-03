"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "../lib/useReducedMotion";
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
import { useUtmParams, inferCategoryFromUtm } from "../lib/useUtmParams";

const TRUST_ITEMS = [
  { icon: FaAward, value: "+25 anos", label: "Mercado", accent: "var(--primary-5)" },
  { icon: FaUsers, value: "+5.000", label: "Clientes", accent: "var(--primary-4)" },
  { icon: FaChartLine, value: "4.9/5", label: "Avaliação", accent: "var(--primary-5)" },
];

const UTM_HEADLINES: Record<string, { main: string; sub: string }> = {
  imoveis: { main: "Consórcio de Imóvel", sub: "A casa própria sem juros está mais perto do que você imagina." },
  veiculos: { main: "Consórcio de Veículo", sub: "Seu carro zero sem juros. Parcelas que cabem no bolso." },
  investimento: { main: "Consórcio como Investimento", sub: "Planejamento financeiro inteligente, sem juros bancários." },
  embarcacoes: { main: "Consórcio de Embarcações", sub: "Lancha, veleiro ou barco sem juros. Realize seu sonho náutico." },
  estetica: { main: "Consórcio para Estética", sub: "Harmonização e autocuidado com parcelas sem juros." },
};

export default function HeroV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const [simulationCount, setSimulationCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const utm = useUtmParams();
  const utmCategory = inferCategoryFromUtm(utm);
  const utmHeadline = utmCategory ? UTM_HEADLINES[utmCategory] : null;

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
          fetchPriority="high"
          src="/hero-6.jpg"
          alt="Consórcio Servopa e Rodobens sem juros em todo o Brasil — assessoria especializada Lacosta Consórcios"
          className="object-cover opacity-40"
          sizes="100vw"
          quality={75}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 14, 36, 0.82) 0%, rgba(0, 22, 52, 0.76) 50%, rgba(1, 38, 82, 0.70) 100%)",
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
        <div className="flex w-full flex-col gap-8 px-4 pt-5 pb-12 sm:px-6 md:pt-10 md:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <motion.div
            ref={ref}
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : reducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex min-w-0 flex-1 flex-col gap-4 text-center lg:max-w-xl lg:flex-none lg:text-left xl:max-w-2xl"
          >
            {/* Headline */}
            <div className="space-y-2">
              {utmHeadline ? (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-[3.05rem] md:leading-[1.12] leading-tight">
                    <span className="font-extrabold text-white">{utmHeadline.main}</span>
                    <span className="font-bold text-white"> sem juros em todo o Brasil</span>
                  </h1>
                  <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto lg:mx-0">
                    {utmHeadline.sub}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-[3.05rem] md:leading-[1.12] leading-tight">
                    <span className="font-bold text-white">Consórcio </span>
                    <span className="font-extrabold text-[#B9073C]">Servopa</span>
                    <span className="font-bold text-white"> e </span>
                    <span className="font-extrabold text-[#249AAA]">Rodobens</span>
                    <span className="font-bold text-white"> em todo o Brasil</span>
                  </h1>
                  <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto lg:mx-0">
                    Quanto você pagaria de juros no banco sem perceber?{" "}
                    <span className="font-semibold text-white">Consórcio não tem juros.</span>
                  </p>
                </>
              )}
            </div>

            {/* Benefit pills - compact */}
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : {}}
              transition={reducedMotion ? { duration: 0 } : { delay: 0.1 }}
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
              initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : reducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={reducedMotion ? { duration: 0 } : { delay: 0.15 }}
              className="grid grid-cols-3 gap-2 sm:gap-3"
            >
              {TRUST_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="isolate overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm"
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
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : {}}
              transition={reducedMotion ? { duration: 0 } : { delay: 0.2 }}
              className="isolate overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20">
                <span className="text-sm font-bold" style={{ color: "var(--primary-5)" }}>
                  {simulationCount}
                </span>
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full motion-reduce:animate-none animate-ping rounded-full bg-emerald-400/50" />
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
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : {}}
              transition={reducedMotion ? { duration: 0 } : { delay: 0.25 }}
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
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : reducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
            className="hidden shrink-0 justify-center lg:flex lg:justify-end"
          >
            <HeroCalculatorV2 initialCategory={utmCategory ?? undefined} />
          </motion.div>
        </div>
      </Container>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div
            initial={{ y: reducedMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              <HeroCalculatorV2 initialCategory={utmCategory ?? undefined} />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
