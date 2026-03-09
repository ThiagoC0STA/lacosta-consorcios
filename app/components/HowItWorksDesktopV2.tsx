"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import HowItWorksCTAV2 from "./HowItWorksCTAV2";
import Container from "./Container";

const STEPS = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Simule e Escolha",
    description:
      "Use nosso simulador para encontrar o plano perfeito para seu sonho, com parcelas que cabem no seu bolso.",
    details: [
      "Simulação online em 1 minuto",
      "Planos para imóveis, carros e serviços",
      "Flexibilidade total de crédito e prazo",
    ],
    image: "/plan.jpg",
  },
  {
    icon: DocumentTextIcon,
    title: "Análise e Contrato",
    description:
      "Nossos especialistas analisam seu perfil e enviam o contrato digital para sua assinatura, sem burocracia.",
    details: [
      "Análise de crédito simplificada",
      "Contrato 100% digital e seguro",
      "Consultor dedicado para te auxiliar",
    ],
    image: "/papelada.jpg",
  },
  {
    icon: ClockIcon,
    title: "Participe e Contemple",
    description:
      "Participe das assembleias mensais e aumente suas chances de ser contemplado com lances estratégicos.",
    details: [
      "Contemplação por sorteio ou lance",
      "Orientação para os melhores lances",
      "Acompanhamento online do seu grupo",
    ],
    image: "/time-is-money.jpg",
  },
  {
    icon: SparklesIcon,
    title: "Realize Seu Sonho",
    description:
      "Com a carta de crédito em mãos, você tem poder de compra à vista para negociar e adquirir seu bem.",
    details: [
      "Liberação rápida do crédito",
      "Poder de negociação à vista",
      "Suporte total na aquisição do bem",
    ],
    image: "/couple.jpg",
  },
];

export default function HowItWorksDesktopV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 40%"],
  });
  const timelineHeight = useTransform(scrollYProgress, [0, 0.75], ["0%", "100%"]);
  const icon0Reached = useTransform(scrollYProgress, [0.05, 0.18, 0.28], [0, 1, 1]);
  const icon1Reached = useTransform(scrollYProgress, [0.28, 0.42, 0.55], [0, 1, 1]);
  const icon2Reached = useTransform(scrollYProgress, [0.55, 0.65, 0.72], [0, 1, 1]);
  const icon3Reached = useTransform(scrollYProgress, [0.68, 0.76, 0.85], [0, 1, 1]);
  const iconScale0 = useTransform(icon0Reached, [0, 0.5, 1], [1, 1.25, 1]);
  const iconScale1 = useTransform(icon1Reached, [0, 0.5, 1], [1, 1.25, 1]);
  const iconScale2 = useTransform(icon2Reached, [0, 0.5, 1], [1, 1.25, 1]);
  const iconScale3 = useTransform(icon3Reached, [0, 0.5, 1], [1, 1.25, 1]);
  const iconScales = [iconScale0, iconScale1, iconScale2, iconScale3];

  return (
    <section
      id="como-funciona"
      ref={timelineRef}
      className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white scroll-mt-24 md:scroll-mt-0"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0487D9]/5 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#035AA6]/5 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-14 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-1)]/10 px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0487D9] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary-1)]">
                Processo simplificado
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 leading-tight mb-3">
              Como{" "}
              <span className="bg-gradient-to-r from-[#0487D9] to-[#035AA6] bg-clip-text text-transparent">
                funciona
              </span>
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              Em apenas 4 passos você começa a realizar seu sonho
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-x-4 lg:gap-x-6 gap-y-8 md:gap-y-0 md:-mt-4">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-neutral-200 z-0" />
            <motion.div
              className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px rounded-full z-0 overflow-hidden"
              style={{
                height: timelineHeight,
                background: "linear-gradient(180deg, #0487D9 0%, #035AA6 50%, #0487D9 100%)",
              }}
            />

            {STEPS.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`flex flex-col items-center md:items-${
                    isLeft ? "end" : "start"
                  } z-10 ${idx > 0 ? "md:-mt-20" : ""}`}
                  style={{
                    gridColumn: isLeft ? 1 : 3,
                    gridRow: idx + 1,
                  }}
                >
                  <motion.div
                    className="w-full max-w-xl group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white p-6 sm:p-8 transition-all duration-300 hover:border-[#0487D9]/25 group-hover:shadow-md"
                      style={{
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-6">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-[var(--primary-4)] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-5">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + idx * 0.12 + i * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-neutral-700">
                              {detail}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            <div className="hidden md:flex flex-col items-center justify-around col-start-2 row-start-1 row-end-5 z-20 min-h-[560px] py-4">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.25 + idx * 0.15,
                  }}
                  className="relative flex flex-col items-center"
                >
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      scale: iconScales[idx],
                      background: "linear-gradient(135deg, #fff 0%, #f8fafc 100%)",
                      boxShadow: "0 4px 14px rgba(4, 135, 217, 0.25), 0 0 0 2px rgba(4, 135, 217, 0.3)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #0487D9 0%, #035AA6 100%)",
                      }}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <HowItWorksCTAV2
            variant="default"
            inView={inView}
            animationDelay={0.6}
          />
        </div>
      </Container>
    </section>
  );
}
