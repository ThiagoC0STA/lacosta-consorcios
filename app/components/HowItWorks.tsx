"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

const steps = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Escolha seu plano",
    description:
      "Selecione o tipo de consórcio e o valor que melhor se adequa ao seu perfil.",
  },
  {
    icon: DocumentTextIcon,
    title: "Faça sua proposta",
    description:
      "Preencha o formulário com seus dados e escolha o prazo de pagamento.",
  },
  {
    icon: ClockIcon,
    title: "Aguarde a contemplação",
    description:
      "Acompanhe seu processo através do seu email ou com nossos corretores",
  },
  {
    icon: SparklesIcon,
    title: "Realize seu sonho",
    description:
      "Após contemplado, receba seu bem e comece a usufruir imediatamente.",
  },
];

export default function HowItWorks() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // useInView para cada passo
  const stepInViews = steps.map((_, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
    return { ref, inView };
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  // Framer Motion useScroll para animar a linha
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 40%"],
  });
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      id="como-funciona"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-1)]/10 text-[var(--primary-1)] text-sm font-semibold mb-4">
            Processo Simplificado
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-1)] mb-6">
            Como funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Em apenas 4 passos você começa a realizar seu sonho
          </p>
        </motion.div>

        <div
          ref={timelineRef}
          className="relative grid grid-cols-3 grid-rows-4 gap-x-8 gap-y-0"
        >
          {/* Linha azul central animada com scrollYProgress */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-4)] z-0"
            style={{ height: timelineHeight }}
          />

          {/* Passo 1 - esquerda, linha 1 */}
          <div
            ref={stepInViews[0].ref}
            className="flex flex-col items-end justify-start md:col-start-1 md:row-start-1 md:row-span-2 z-10"
          >
            <div className="max-w-sm w-full flex flex-col items-center md:items-end bg-white">
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-3">
                <Image
                  src="/plan.jpg"
                  alt={steps[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-1)] mb-1 text-center md:text-right">
                {steps[0].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center md:text-right">
                {steps[0].description}
              </p>
            </div>
          </div>
          {/* Passo 2 - direita, linha 2 */}
          <div
            ref={stepInViews[1].ref}
            className="flex flex-col items-start justify-start md:col-start-3 md:row-start-2 md:row-span-2 z-10 -mt-20"
          >
            <div className="max-w-sm w-full flex flex-col items-center md:items-start bg-white">
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-3">
                <Image
                  src="/papelada.jpg"
                  alt={steps[1].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-1)] mb-1 text-center md:text-left">
                {steps[1].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                {steps[1].description}
              </p>
            </div>
          </div>
          {/* Passo 3 - esquerda, linha 3 */}
          <div
            ref={stepInViews[2].ref}
            className="flex flex-col items-end justify-start md:col-start-1 md:row-start-3 md:row-span-2 z-10 -mt-20"
          >
            <div className="max-w-sm w-full flex flex-col items-center md:items-end bg-white">
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-3">
                <Image
                  src="/time-is-money.jpg"
                  alt={steps[2].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-1)] mb-1 text-center md:text-right">
                {steps[2].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center md:text-right">
                {steps[2].description}
              </p>
            </div>
          </div>
          {/* Passo 4 - direita, linha 4 */}
          <div
            ref={stepInViews[3].ref}
            className="flex flex-col items-start justify-start md:col-start-3 md:row-start-4 md:row-span-2 z-10 -mt-20"
          >
            <div className="max-w-sm w-full flex flex-col items-center md:items-start bg-white">
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-3">
                <Image
                  src="/couple.jpg"
                  alt={steps[3].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-1)] mb-1 text-center md:text-left">
                {steps[3].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center md:text-left">
                {steps[3].description}
              </p>
            </div>
          </div>

          {/* Ícones centralizados na timeline, animados */}
          <div className="hidden md:flex flex-col items-center justify-between md:col-start-2 md:row-start-1 md:row-end-5 z-20 relative">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex-1 flex items-center justify-center relative -mt-40"
                style={{ minHeight: "32px" }}
              >
                <motion.div
                  animate={
                    stepInViews[idx].inView ? { scale: 1.18 } : { scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-14 h-14 rounded-full bg-white border-4 border-[var(--primary-1)] flex items-center justify-center shadow-lg z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] flex items-center justify-center text-white">
                    <step.icon className="h-6 w-6" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
