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
import { FaCheckCircle } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import Container from "./Container";

const steps = [
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

export default function HowItWorksDesktop() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const stepInViews = steps.map(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
    return { ref, inView };
  });
  const timelineRef = useRef<HTMLDivElement>(null);
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
      <Container>
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
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-4)] z-0"
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
                  <p className="text-lg text-gray-600 leading-relaxed text-center md:text-left mb-6">
                    {steps[0].description}
                  </p>
                  <ul className="space-y-3 text-left">
                    {steps[0].details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
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
                  <p className="text-lg text-gray-600 leading-relaxed text-center md:text-left mb-6">
                    {steps[1].description}
                  </p>
                  <ul className="space-y-3 text-left">
                    {steps[1].details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
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
                  <p className="text-lg text-gray-600 leading-relaxed text-center md:text-left mb-6">
                    {steps[2].description}
                  </p>
                  <ul className="space-y-3 text-left">
                    {steps[2].details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
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
                  <p className="text-lg text-gray-600 leading-relaxed text-center md:text-left mb-6">
                    {steps[3].description}
                  </p>
                  <ul className="space-y-3 text-left">
                    {steps[3].details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-5)] p-8 md:p-12 rounded-2xl text-white max-w-8xl mx-auto shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para dar o primeiro passo?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              O caminho para o seu sonho é mais simples do que você imagina.{" "}
              <br /> Fale com um especialista agora e comece seu planejamento.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleWhatsAppClick(WHATSAPP_LINK, e)}
              className="inline-block bg-white text-[var(--primary-1)] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              COMEÇAR AGORA 🚀
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
