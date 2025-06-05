"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const benefits = [
  {
    title: "Taxas reduzidas",
    description: "Sem juros abusivos e com condições especiais para você.",
  },
  {
    title: "Processo 100% digital",
    description: "Tudo online, rápido e transparente.",
  },
  {
    title: "Acompanhamento personalizado",
    description: "Um consultor dedicado para cuidar do seu processo.",
  },
  {
    title: "Maior chance de contemplação",
    description: "Sistema inteligente que aumenta suas chances.",
  },
  {
    title: "Segurança e confiabilidade",
    description: "Mais de 20 anos de experiência no mercado.",
  },
];

export default function Benefits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50 md:mt-0 relative z-0">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Por que escolher nossos consórcios?
          </h2>
          <p className="text-xl text-gray-600">
            Oferecemos as melhores condições para realizar seus sonhos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
