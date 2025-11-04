"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaRocket,
  FaFire,
  FaExclamationTriangle,
} from "react-icons/fa";
import HeroCalculator from "./HeroCalculator";
import Image from "next/image";
import { useState, useEffect } from "react";
import Container from "./Container";

const destaqueCards = [
  {
    icon: (
      <FaUsers
        style={{ color: "var(--primary-5)" }}
        className="text-2xl md:text-3xl mb-1"
      />
    ),
    title: "+25 anos",
    subtitle: "de experiência",
  },
  {
    icon: (
      <FaStar
        style={{ color: "var(--primary-5)" }}
        className="text-2xl md:text-3xl mb-1"
      />
    ),
    title: "4.9/5",
    subtitle: "avaliação média",
  },
  {
    icon: (
      <FaCheckCircle
        style={{ color: "var(--primary-5)" }}
        className="text-2xl md:text-3xl mb-1"
      />
    ),
    title: "+5.000",
    subtitle: "clientes atendidos",
  },
];

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [simulationCount, setSimulationCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Gera um número aleatório entre 34 e 48
    const randomTarget = Math.floor(Math.random() * 15) + 34; // (48 - 34 + 1) = 15
    setTargetCount(randomTarget);
  }, []);

  useEffect(() => {
    if (inView && targetCount > 0) {
      const interval = setInterval(() => {
        setSimulationCount((prev) => {
          if (prev < targetCount) {
            return prev + 1;
          }
          clearInterval(interval);
          return targetCount;
        });
      }, 40); // Velocidade da animação

      return () => clearInterval(interval);
    }
  }, [inView, targetCount]);

  return (
    <section
      id="#simulacao"
      className="relative min-h-screen flex items-center justify-center bg-white pt-24 md:pt-0 pb-0 "
    >
      {/* Imagem de fundo inspiradora */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          priority
          src="/hero-6.jpg"
          alt="Família feliz conquistando o sonho"
          className="w-full h-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Banner de urgência no topo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 text-center font-semibold text-sm md:text-base"
      >
        <div className="flex items-center justify-center gap-2">
          <FaFire className="animate-pulse" />
          <span>
            🔥 OFERTA ESPECIAL: Consultoria gratuita + análise personalizada!
            Vagas limitadas
          </span>
          <FaExclamationTriangle className="animate-bounce" />
        </div>
      </motion.div>

      {/* Conteúdo */}
      <Container className="relative z-20 w-full" padding={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26 items-center px-4 sm:px-6 py-10 md:py-8 md:pt-32 lg:pb-16">
          {/* Coluna esquerda: texto, destaques, benefícios */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-start h-full gap-6 md:gap-8 text-center lg:text-left order-1"
          >
            <div className="space-y-5">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block rounded-full bg-white/60 p-0.5 mb-2 shadow-lg ring-2 ring-primary-5/40 backdrop-blur-md"
              >
                <span
                  style={{ color: "var(--primary-4)" }}
                  className="inline-flex items-center text-left gap-2 font-semibold rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base text-white bg-gradient-to-r from-primary-3 via-primary-5 to-primary-6"
                >
                  <FaRocket
                    className="text-white drop-shadow-glow animate-bounce-slow text-lg md:text-xl"
                    style={{ color: "var(--primary-4)" }}
                  />
                  O próximo passo para o seu sonho começa aqui
                </span>
              </motion.div>
              <h1
                className="text-center lg:text-left text-4xl sm:text-5xl md:text-5xl  font-extrabold leading-tight drop-shadow-xl mt-3"
                style={{ color: "white" }}
              >
                Conquiste seu imóvel, carro ou invista no seu futuro
              </h1>
              <p
                className="text-lg sm:text-xl md:text-xl max-w-xl mt-4 drop-shadow mx-auto lg:mx-0 leading-relaxed"
                style={{ color: "white" }}
              >
                O consórcio mais confiável para você realizar seus sonhos com{" "}
                <span style={{ fontWeight: 700 }}> planejamento,</span>{" "}
                <span style={{ fontWeight: 700 }}>segurança e </span>{" "}
                <span style={{ fontWeight: 700 }}> sem juros abusivos</span>
              </p>
            </div>

            {/* Destaques rápidos em cards responsivos - Grid para mesma largura */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
              {destaqueCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 rounded-xl shadow-lg px-2 md:px-5 py-4 md:py-5 flex flex-col items-center justify-center h-[110px] md:h-auto min-h-[110px]"
                >
                  {card.icon}
                  <span className="text-lg md:text-xl font-bold text-gray-900 mt-2 text-center">
                    {card.title}
                  </span>
                  <span className="text-gray-500 text-[11px] md:text-xs mt-1 text-center leading-tight">
                    {card.subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Prova social adicional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5  mx-auto lg:mx-0 w-full"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 flex-shrink-0">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    M
                  </div>
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    J
                  </div>
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    A
                  </div>
                </div>
                <div className="text-gray-800 md:flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base">
                    +
                    <span className="text-green-600 font-bold">
                      {simulationCount}
                    </span>{" "}
                    pessoas simularam hoje
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Seja o próximo a conquistar!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Botão CTA Mobile - Abre modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:hidden mt-6"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white px-4 py-3 rounded-lg font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaRocket className="text-lg" />
                SIMULAR AGORA - É GRÁTIS!
              </button>
            </motion.div>
          </motion.div>

          {/* Coluna direita: Calculator - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-center lg:justify-end items-center w-full order-2"
          >
            <HeroCalculator />
          </motion.div>
        </div>
      </Container>

      {/* Modal Mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content - Centralizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
          

            {/* Calculadora */}
            <HeroCalculator />
          </motion.div>
        </div>
      )}
    </section>
  );
}
