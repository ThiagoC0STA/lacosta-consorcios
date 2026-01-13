"use client";

import HeroCalculator from "./HeroCalculator";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaClock,
  FaCheckCircle,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import Container from "./Container";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden scroll-mt-24 md:scroll-mt-0">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/house-2.jpg"
          alt="Contato"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Overlay para suavizar a imagem */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Simule e fale com um especialista
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto mb-8">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano.
            Simule seu consórcio e tire todas as suas dúvidas com quem entende
            do assunto!
          </p>

          {/* Estatísticas de atendimento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaClock className="text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">2min</span>
              </div>
              <p className="text-sm text-gray-700">Tempo médio resposta</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-2xl font-bold text-green-600">24/7</span>
              </div>
              <p className="text-sm text-gray-700">Atendimento disponível</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaStar className="text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">4.9</span>
              </div>
              <p className="text-sm text-gray-700">Avaliação média</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaUsers className="text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">5K+</span>
              </div>
              <p className="text-sm text-gray-700">Clientes atendidos</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center">
          <HeroCalculator />
        </div>

        {/* Garantias adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🔒 Sua segurança é nossa prioridade
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCheckCircle className="text-green-600 text-2xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  100% Seguro
                </h4>
                <p className="text-sm text-gray-600">
                  Consórcios regulamentados pelo Banco Central
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaClock className="text-blue-600 text-2xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Sem Compromisso
                </h4>
                <p className="text-sm text-gray-600">
                  Simulação gratuita e sem obrigação de contratação
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-purple-600 text-2xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Atendimento VIP
                </h4>
                <p className="text-sm text-gray-600">
                  Consultor dedicado para acompanhar todo o processo
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
