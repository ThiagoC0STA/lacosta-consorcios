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
import { useRef } from "react";
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
  const stepInViews = steps.map(() => {
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
          className="relative grid grid-cols-1 md:grid-cols-[1fr_260px_1fr] grid-rows-4 gap-x-8 gap-y-0"
        >
          {/* Linha azul central animada com scrollYProgress - Desktop */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-4)] z-0"
            style={{ height: timelineHeight }}
          />

          {/* Linha azul animada - Mobile */}
          <motion.div
            className="md:hidden absolute left-8 top-0 w-1 bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-4)] z-0"
            style={{ height: timelineHeight }}
          />

          {/* Passo 1 - esquerda, linha 1 */}
          <div
            ref={stepInViews[0].ref}
            className="flex flex-col items-center md:items-end justify-start md:col-start-1 md:row-start-1 md:row-span-2 z-10"
          >
            <div className="max-w-xl w-full flex flex-col items-center md:items-end bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-10 group">
                <Image
                  src="/plan.jpg"
                  alt={steps[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <span className="text-base font-bold text-[var(--primary-1)]">
                    Passo 1
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-8 w-full">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[var(--primary-1)] relative mb-8">
                    {steps[0].title}
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] rounded-full"></span>
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed text-center md:text-left">
                    {steps[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Passo 2 - direita, linha 2 */}
          <div
            ref={stepInViews[1].ref}
            className="flex flex-col items-center md:items-start justify-start md:col-start-3 md:row-start-2 md:row-span-2 z-10 md:-mt-40"
          >
            <div className="max-w-xl w-full flex flex-col items-center md:items-start bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-10 group">
                <Image
                  src="/papelada.jpg"
                  alt={steps[1].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <span className="text-base font-bold text-[var(--primary-1)]">
                    Passo 2
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-8 w-full">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[var(--primary-1)] relative mb-8">
                    {steps[1].title}
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] rounded-full"></span>
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed text-center md:text-left">
                    {steps[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Passo 3 - esquerda, linha 3 */}
          <div
            ref={stepInViews[2].ref}
            className="flex flex-col items-center md:items-end justify-start md:col-start-1 md:row-start-3 md:row-span-2 z-10 md:-mt-32"
          >
            <div className="max-w-xl w-full flex flex-col items-center md:items-end bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-10 group">
                <Image
                  src="/time-is-money.jpg"
                  alt={steps[2].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <span className="text-base font-bold text-[var(--primary-1)]">
                    Passo 3
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-8 w-full">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[var(--primary-1)] relative mb-8">
                    {steps[2].title}
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] rounded-full"></span>
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed text-center md:text-left">
                    {steps[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Passo 4 - direita, linha 4 */}
          <div
            ref={stepInViews[3].ref}
            className="flex flex-col items-center md:items-start justify-start md:col-start-3 md:row-start-4 md:row-span-2 z-10 md:-mt-32"
          >
            <div className="max-w-xl w-full flex flex-col items-center md:items-start bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative w-full h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-10 group">
                <Image
                  src="/couple.jpg"
                  alt={steps[3].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <span className="text-base font-bold text-[var(--primary-1)]">
                    Passo 4
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 mb-8 w-full">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[var(--primary-1)] relative mb-8">
                    {steps[3].title}
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] rounded-full"></span>
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed text-center md:text-left">
                    {steps[3].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ícones centralizados na timeline, animados */}
          <div className="hidden md:flex flex-col items-center justify-between md:col-start-2 md:row-start-1 md:row-end-5 z-20 relative max-w-[100px] mx-auto">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex-1 flex items-center justify-center relative md:-mt-40"
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
