'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Escolha seu plano',
    description: 'Selecione o tipo de consórcio e o valor que melhor se adequa ao seu perfil.'
  },
  {
    icon: DocumentTextIcon,
    title: 'Faça sua proposta',
    description: 'Preencha o formulário com seus dados e escolha o prazo de pagamento.'
  },
  {
    icon: ClockIcon,
    title: 'Aguarde a contemplação',
    description: 'Acompanhe seu processo através do nosso sistema online.'
  },
  {
    icon: SparklesIcon,
    title: 'Realize seu sonho',
    description: 'Após contemplado, receba seu bem e comece a usufruir imediatamente.'
  }
];

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simples, rápido e seguro
          </h2>
          <p className="text-xl text-gray-600">
            Em apenas 4 passos você começa a realizar seu sonho
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-blue-50 p-6 rounded-xl text-center h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-600" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 