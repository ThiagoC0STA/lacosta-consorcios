"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaRegHandshake,
  FaRegMoneyBillAlt,
  FaRegSmile,
} from "react-icons/fa";
import HeroCalculator from "./HeroCalculator";

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
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20 md:pt-0">
      {/* Imagem de fundo inspiradora */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-6.jpg"
          alt="Família feliz conquistando o sonho"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Conteúdo */}
      <div className="relative z-20 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center px-4 md:pl-24 py-8">
        {/* Coluna esquerda: texto, destaques, benefícios */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center h-full gap-12 text-center lg:text-left"
        >
          <div>
            <span
              className="inline-block font-semibold rounded-full px-6 py-2 text-sm mb-3 shadow-sm"
              style={{
                background: "var(--primary-1)",
                color: "white",
              }}
            >
              O próximo passo para o seu sonho começa aqui
            </span>
            <h1
              className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-xl max-w-3xl"
              style={{ color: "white" }}
            >
              Conquiste seu imóvel, carro ou invista no seu futuro
            </h1>
            <p
              className="text-base md:text-lg max-w-xl mt-3 drop-shadow mx-auto lg:mx-0"
              style={{ color: "white" }}
            >
              O consórcio mais confiável para você realizar seus sonhos com{" "}
              <span style={{ fontWeight: 700 }}> planejamento,</span>{" "}
              <span style={{ fontWeight: 700 }}>segurança e </span>{" "}
              <span style={{ fontWeight: 700 }}> sem juros abusivos</span>
            </p>
          </div>

          {/* Destaques rápidos em cards responsivos e sempre em linha */}
          <div className="flex gap-2 md:gap-4 w-full mt-2 justify-center md:justify-start overflow-visible scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent pb-2">
            {destaqueCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl shadow-lg px-4 md:px-6 py-2 md:py-4 flex flex-col items-center md:min-w-[140px] min-w-[120px]"
              >
                {card.icon}
                <span className="text-lg font-bold text-gray-900">
                  {card.title}
                </span>
                <span className="text-gray-500 text-xs">{card.subtitle}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center items-center w-full relative mt-8 md:mt-0">
          <HeroCalculator />
          {/* Elemento decorativo de cotação gratuita */}
          <div
            className="hidden md:flex absolute -top-2 left-17 rounded-lg px-5 py-2 text-sm font-semibold shadow-lg items-center gap-2"
            style={{ background: "var(--primary-1)", color: "white" }}
          >
            <FaRegMoneyBillAlt style={{ color: "white" }} className="text-lg" />{" "}
            Atendimento gratuito e personalizado
          </div>
        </div>
      </div>
    </section>
  );
}
