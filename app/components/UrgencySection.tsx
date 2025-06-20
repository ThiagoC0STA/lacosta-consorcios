"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaFire,
  FaExclamationTriangle,
  FaGift,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { WHATSAPP_LINK } from "../lib/constants";

export default function UrgencySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          {/* Banner principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <FaFire className="text-2xl animate-pulse" />
              <span className="font-bold text-lg">CONSULTORIA GRATUITA</span>
              <FaExclamationTriangle className="text-2xl animate-bounce" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ⏰ CONSULTORIA GRATUITA!
            </h2>

            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Análise personalizada gratuita + orientação especializada para sua simulação. 
              Comece seu planejamento hoje mesmo!
            </p>
          </motion.div>

          {/* Contador regressivo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl max-w-md mx-auto">
              <p className="text-lg font-semibold mb-4">⏰ Oferta por tempo limitado:</p>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-white/30 rounded-lg p-3">
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm">Horas</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/30 rounded-lg p-3">
                    <div className="text-2xl font-bold">45</div>
                    <div className="text-sm">Minutos</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/30 rounded-lg p-3">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm">Segundos</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/30 rounded-lg p-3">
                    <div className="text-2xl font-bold">Hoje</div>
                    <div className="text-sm text-nowrap">Último dia</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefícios da oferta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          >
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <FaGift className="text-3xl text-yellow-300" />
                <h3 className="text-xl font-bold">Consultoria Gratuita</h3>
              </div>
              <p className="text-white/90">
                Análise personalizada + orientação especializada + acompanhamento completo
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <FaUsers className="text-3xl text-yellow-300" />
                <h3 className="text-xl font-bold">Especialistas Dedicados</h3>
              </div>
              <p className="text-white/90">
                Equipe experiente para te orientar em cada etapa do processo
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <FaCheckCircle className="text-3xl text-yellow-300" />
                <h3 className="text-xl font-bold">Garantia Total</h3>
              </div>
              <p className="text-white/90">
                100% seguro e regulamentado pelo Banco Central do Brasil
              </p>
            </div>
          </motion.div>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                🚀 QUERO MINHA CONSULTORIA GRATUITA!
              </h3>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-red-700 px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg hover:bg-yellow-300"
              >
                SIMULAR AGORA - É GRÁTIS! 🎯
              </a>
            </div>

            <p className="text-sm opacity-75">
              ⚠️ Atenção: Consultoria gratuita por tempo limitado
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
