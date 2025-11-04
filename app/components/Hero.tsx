"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaRocket,
  FaClock,
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
        className="text-2xl mb-1"
      />
    ),
    title: "+25 anos",
    subtitle: "de experiência",
  },
  {
    icon: (
      <FaStar style={{ color: "var(--primary-5)" }} className="text-xl mb-1" />
    ),
    title: "4.9/5",
    subtitle: "avaliação média",
  },
  {
    icon: (
      <FaCheckCircle
        style={{ color: "var(--primary-5)" }}
        className="text-xl mb-1"
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
      className="relative md:min-h-screen flex items-center justify-center bg-white pt-24 md:pt-0 pb-24 md:pb-0 mb-[320px] md:mb-0"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center px-4 py-8 md:pt-32">
        {/* Coluna esquerda: texto, destaques, benefícios */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col justify-start h-full gap-8 text-center lg:text-left md:pt-5"
        >
          <div>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block rounded-full bg-white/60 p-0.5 mb-3 shadow-lg ring-2 ring-primary-5/40 backdrop-blur-md"
            >
              <span
                style={{ color: "var(--primary-4)" }}
                className="inline-flex items-center text-left gap-2 font-semibold rounded-full px-2 md:px-4 py-1.5 md:py-2 text-sm text-white bg-gradient-to-r from-primary-3 via-primary-5 to-primary-6"
              >
                <FaRocket
                  className="text-white drop-shadow-glow animate-bounce-slow text-lg"
                  style={{ color: "var(--primary-4)" }}
                />
                O próximo passo para o seu sonho começa aqui
              </span>
            </motion.div>
            <h1
              className="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-xl max-w-3xl mt-4"
              style={{ color: "white" }}
            >
              Conquiste seu imóvel, carro ou invista no seu futuro
            </h1>
            <p
              className="text-base sm:text-lg md:text-lg max-w-xl mt-3 drop-shadow mx-auto lg:mx-0"
              style={{ color: "white" }}
            >
              O consórcio mais confiável para você realizar seus sonhos com{" "}
              <span style={{ fontWeight: 700 }}> planejamento,</span>{" "}
              <span style={{ fontWeight: 700 }}>segurança e </span>{" "}
              <span style={{ fontWeight: 700 }}> sem juros abusivos</span>
            </p>

            {/* Elemento de urgência */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 p-4 bg-red-600/90 backdrop-blur-sm rounded-xl border-2 border-red-400/50 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-3 text-white">
                <FaClock className="text-2xl animate-pulse" />
                <div>
                  <p className="font-bold text-lg">⏰ OFERTA LIMITADA!</p>
                  <p className="text-sm opacity-90">
                    Consultoria gratuita para primeiros 50 simulações
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Destaques rápidos em cards responsivos e sempre em linha */}
          <div className="flex gap-2 md:gap-4 w-full mt-0 justify-center md:justify-start overflow-x-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent pb-2">
            {destaqueCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl shadow-lg px-3 md:px-6 py-2 md:py-4 flex flex-col items-center justify-center w-[110px] md:w-auto md:min-w-[140px] h-[90px] md:h-auto"
              >
                {card.icon}
                <span className="text-base md:text-lg font-bold text-gray-900 mt-1">
                  {card.title}
                </span>
                <span className="text-gray-500 text-[10px] md:text-xs mt-0.5">
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
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  J
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
              </div>
              <div className="text-gray-800">
                <p className="font-semibold text-sm">
                  +
                  <span className="text-green-600 font-bold">
                    {simulationCount}
                  </span>{" "}
                  pessoas simularam hoje
                </p>
                <p className="text-xs text-gray-600">
                  Seja o próximo a conquistar!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex justify-center md:justify-end items-center w-full md:mt-0 absolute md:relative bottom-0 top-[900px] md:top-[0] z-50 md:px-0 px-4">
          <HeroCalculator />
        </div>
        </div>
      </Container>
    </section>
  );
}
