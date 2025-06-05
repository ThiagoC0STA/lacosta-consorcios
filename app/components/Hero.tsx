"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaStar, FaUsers, FaCheckCircle, FaRocket } from "react-icons/fa";
import HeroCalculator from "./HeroCalculator";
import Image from "next/image";

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

  return (
    <section className="relative md:min-h-screen flex items-center justify-center bg-white pt-24 md:pt-0 pb-24 md:pb-0 mb-[320px] md:mb-0">
      {/* Imagem de fundo inspiradora */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          priority
          src="/hero-6.jpg"
          alt="Família feliz conquistando o sonho"
          className="w-full h-full object-cover opacity-95"
        />
      </div>
      {/* Conteúdo */}
      <div className="relative z-20 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center px-4 md:pl-24 py-8 md:pt-20">
        {/* Coluna esquerda: texto, destaques, benefícios */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col justify-start h-full gap-8 md:gap-12 text-center lg:text-left md:pt-5"
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
              className="text-center md:text-left text-4xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-xl max-w-3xl mt-4"
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
          </div>
          {/* Destaques rápidos em cards responsivos e sempre em linha */}
          <div className="flex gap-2 md:gap-4 w-full mt-2 justify-center md:justify-start overflow-x-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent pb-2">
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
        </motion.div>

        <div className="flex justify-center items-center w-full md:relative mt-4 md:mt-0 absolute bottom-0 top-[680px] z-50 md:px-0 px-4">
          <HeroCalculator />
        </div>
      </div>
    </section>
  );
}
