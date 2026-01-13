"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaChartLine,
  FaUserTie,
  FaTrophy,
  FaHandshake,
  FaShieldAlt,
  FaRegLightbulb,
  FaClock,
  FaMoneyBillWave,
  FaCheckDouble,
} from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import Container from "./Container";

const benefits = [
  {
    icon: FaChartLine,
    title: "Taxas reduzidas",
    description: "Sem juros abusivos e com condições especiais para você.",
    color: "from-[var(--primary-1)] to-[var(--primary-4)]",
    highlight: "Até 70% menos que financiamento",
  },
  {
    icon: FaUserTie,
    title: "Acompanhamento personalizado",
    description: "Um consultor dedicado para cuidar do seu processo.",
    color: "from-[var(--primary-1)] to-[var(--primary-4)]",
    highlight: "Consultor exclusivo 24/7",
  },
  {
    icon: FaTrophy,
    title: "Maior chance de contemplação",
    description: "Sistema inteligente que aumenta suas chances.",
    color: "from-[var(--primary-1)] to-[var(--primary-4)]",
    highlight: "+40% de chances",
  },
  {
    icon: FaMoneyBillWave,
    title: "Economia garantida",
    description: "Economize milhares de reais comparado ao financiamento tradicional.",
    color: "from-[var(--primary-1)] to-[var(--primary-4)]",
    highlight: "Economia média de R$ 50.000",
  },
  {
    icon: FaClock,
    title: "Processo simplificado",
    description: "Documentação reduzida e aprovação em até 48 horas.",
    color: "from-[var(--primary-1)] to-[var(--primary-4)]",
    highlight: "Aprovação em 48h",
  },
  {
    icon: FaCheckDouble,
    title: "Segurança total",
    description: "Consórcios regulamentados pelo Banco Central do Brasil.",
    color: "from-[var(--primary-1)] to-[var(--primary-4)]",
    highlight: "100% regulamentado",
  },
];

export default function Benefits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-white to-[var(--primary-8)] relative z-0 overflow-hidden scroll-mt-24 md:scroll-mt-0"
      id="vantagens"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary-1)]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--primary-4)]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary-1)]/5 rounded-full blur-3xl" />

        {/* Animated gradient circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-[var(--primary-4)]/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[var(--primary-1)]/10 rounded-full blur-2xl"
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 left-10 text-[var(--primary-1)]/10 hidden md:block"
        >
          <FaHandshake size={120} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-20 right-10 text-[var(--primary-4)]/10 hidden md:block"
        >
          <FaTrophy size={100} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/2 left-24 text-[var(--primary-1)]/10 hidden md:block"
        >
          <FaShieldAlt size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/3 right-24 text-[var(--primary-4)]/10 hidden md:block"
        >
          <FaRegLightbulb size={90} />
        </motion.div>
      </div>

      <Container className="relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary-1)]/10 text-[var(--primary-1)] text-sm font-semibold mb-4"
          >
            Vantagens Exclusivas
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-[var(--primary-1)] mb-6"
          >
            Por que escolher nossos consórcios?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Oferecemos as melhores condições para realizar seus sonhos com
            segurança e confiança
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                style={{
                  background: `linear-gradient(to right, var(--${benefit.color}))`,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--primary-6)]/20 hover:border-[var(--primary-4)]/30">
                <div className="flex flex-col items-start">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${benefit.color} mb-6 relative md:p-3 p-2`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <benefit.icon className="md:h-6 md:w-6 h-5 w-5 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[var(--primary-1)] mb-3 group-hover:text-[var(--primary-4)] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {benefit.description}
                  </p>
                  <div className="bg-gradient-to-r from-green-100 to-blue-100 px-3 py-2 rounded-lg border border-green-200">
                    <p className="text-sm font-bold text-green-800">
                      {benefit.highlight}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-5)] p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              🎯 Quer saber quanto você pode economizar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Simule agora e descubra sua economia personalizada em menos de 30 segundos
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick("simular_agora", "benefits_section");
                handleWhatsAppClick(WHATSAPP_LINK, e, "benefits_section");
              }}
              className="inline-block bg-white text-[var(--primary-1)] px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              SIMULAR AGORA - É GRÁTIS! 🚀
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
