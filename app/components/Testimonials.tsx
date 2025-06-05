"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Proprietária de Apartamento",
    content:
      "Comprei meu primeiro apartamento através do consórcio. O processo foi muito tranquilo e a equipe me ajudou em cada etapa.",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Proprietário de Carro",
    content:
      "Realizei o sonho de ter meu carro zero. As taxas são justas e o atendimento é excelente.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    role: "Empresária",
    content:
      "Investi em meu negócio com tranquilidade. O consórcio me deu a segurança que eu precisava para crescer.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Histórias de sucesso
          </h2>
          <p className="text-xl text-gray-600">
            Veja o que nossos clientes têm a dizer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
