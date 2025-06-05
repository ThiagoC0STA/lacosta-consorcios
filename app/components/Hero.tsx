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

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Imagem de fundo inspiradora */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-6.jpg"
          alt="Família feliz conquistando o sonho"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      {/* Conteúdo */}
      <div className="relative z-20 w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pl-24 py-8">
        {/* Coluna esquerda: texto, destaques, benefícios */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 font-semibold rounded-full px-4 py-1 text-sm mb-3 shadow-sm">
              O próximo passo para o seu sonho começa aqui
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-xl">
              Conquiste seu <span className="text-blue-300">imóvel, carro</span>
              <br />
              ou invista no <span className="text-blue-200">seu futuro</span>
            </h1>
            <p className="text-base md:text-lg text-gray-100 max-w-xl mt-3 drop-shadow">
              O consórcio mais confiável para você realizar seus sonhos com{" "}
              <span className="font-bold text-blue-200">planejamento</span>,{" "}
              <span className="font-bold text-blue-200">segurança</span> e{" "}
              <span className="font-bold text-blue-200">
                sem juros abusivos
              </span>
              .
            </p>
          </div>
          {/* Destaques rápidos */}
          <div className="flex items-center gap-28 w-full mt-2">
            <div className="flex flex-col items-start sm:items-center">
              <FaUsers className="text-blue-500 text-xl mb-1" />
              <span className="text-lg font-bold text-gray-900">+10 anos</span>
              <span className="text-gray-500 text-xs">de experiência</span>
            </div>
            <div className="flex flex-col items-start sm:items-center">
              <FaStar className="text-yellow-400 text-xl mb-1" />
              <span className="text-lg font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-500 text-xs">avaliação média</span>
            </div>
            <div className="flex flex-col items-start sm:items-center">
              <FaCheckCircle className="text-green-500 text-xl mb-1" />
              <span className="text-lg font-bold text-gray-900">+8.000</span>
              <span className="text-gray-500 text-xs">clientes atendidos</span>
            </div>
          </div>
          {/* Benefícios/serviços */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full mt-2">
            <div className="flex items-center gap-2">
              <FaRegMoneyBillAlt className="text-blue-500 text-lg" />
              <span className="text-gray-700 text-sm">Sem juros abusivos</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegHandshake className="text-blue-500 text-lg" />
              <span className="text-gray-700 text-sm">
                Atendimento personalizado
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-500 text-lg" />
              <span className="text-gray-700 text-sm">Segurança garantida</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegSmile className="text-blue-500 text-lg" />
              <span className="text-gray-700 text-sm">Planos flexíveis</span>
            </div>
          </div>
        </motion.div>
        {/* Coluna direita: calculadora */}
        <div className="flex justify-center items-center w-full">
          <HeroCalculator />
        </div>
      </div>
    </section>
  );
}
