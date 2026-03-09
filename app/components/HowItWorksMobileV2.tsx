"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import HowItWorksCTAV2 from "./HowItWorksCTAV2";
import Container from "./Container";

const STEPS = [
  {
    title: "Simule e Escolha",
    description:
      "Use nosso simulador para encontrar o plano perfeito para seu sonho.",
    details: [
      "Simulação online em 1 minuto",
      "Planos para imóveis e carros",
      "Flexibilidade total de crédito",
    ],
    img: "/plan.jpg",
  },
  {
    title: "Análise e Contrato",
    description:
      "Nossos especialistas analisam seu perfil e enviam o contrato digital.",
    details: [
      "Análise de crédito simplificada",
      "Contrato 100% digital e seguro",
      "Consultor dedicado para te auxiliar",
    ],
    img: "/papelada.jpg",
  },
  {
    title: "Participe e Contemple",
    description:
      "Aumente suas chances de ser contemplado com lances estratégicos.",
    details: [
      "Contemplação por sorteio ou lance",
      "Orientação para os melhores lances",
      "Acompanhe online seu grupo",
    ],
    img: "/time-is-money.jpg",
  },
  {
    title: "Realize Seu Sonho",
    description:
      "Com a carta de crédito em mãos, você tem poder de compra à vista.",
    details: [
      "Liberação rápida do crédito",
      "Poder de negociação à vista",
      "Suporte total na aquisição do bem",
    ],
    img: "/couple.jpg",
  },
];

export default function HowItWorksMobileV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;
    setProgress(maxScroll > 0 ? current / maxScroll : 0);
  };

  return (
    <section
      id="como-funciona"
      className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white scroll-mt-24 md:scroll-mt-0 min-h-[600px]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0487D9]/5 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <Container className="relative z-10" padding={false}>
        <div className="px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-1)]/10 px-3 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0487D9] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary-1)]">
                Processo simplificado
              </span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Como{" "}
              <span className="bg-gradient-to-r from-[#0487D9] to-[#035AA6] bg-clip-text text-transparent">
                funciona
              </span>
            </h2>
            <p className="text-sm text-neutral-600">
              Em 4 passos você realiza seu sonho
            </p>
          </motion.div>

          {/* Progress line - uses scaleX (GPU) instead of width to avoid layout thrashing */}
          <div className="flex items-center gap-1 mb-6 px-1">
            {STEPS.map((_, idx) => {
              const threshold = idx / (STEPS.length - 1) - 0.08;
              const isActive = progress >= threshold;
              return (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full bg-neutral-200 overflow-hidden"
                >
                  <motion.div
                    className="h-full w-full rounded-full origin-left"
                    style={{
                      background: "linear-gradient(90deg, #0487D9 0%, #035AA6 100%)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <div className="flex gap-6 min-w-max">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + idx * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="w-[300px] flex-shrink-0 snap-center flex flex-col items-center group"
                >
                  <motion.div
                    className="w-full rounded-2xl border border-neutral-200 bg-white p-5 min-h-[400px] relative overflow-hidden transition-all duration-300 group-hover:border-[#0487D9]/25 group-hover:shadow-md"
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-[var(--primary-4)] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0 text-xs" />
                          <span className="text-xs text-neutral-700">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <HowItWorksCTAV2
            variant="compact"
            inView={inView}
            animationDelay={0.4}
          />
        </div>
      </Container>
    </section>
  );
}
