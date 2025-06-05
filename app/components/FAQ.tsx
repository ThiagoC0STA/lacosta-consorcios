"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Como funciona o processo de contemplação?",
    answer:
      "O processo de contemplação é realizado através de sorteios periódicos. Você pode escolher entre contemplação por sorteio ou por lance. Quanto maior o lance, maiores as chances de contemplação.",
  },
  {
    question: "Quais são as taxas envolvidas?",
    answer:
      "Nossas taxas são transparentes e incluem apenas a taxa de administração, que é uma das mais competitivas do mercado. Não cobramos juros, apenas o valor das parcelas acordado no contrato.",
  },
  {
    question: "Posso antecipar minhas parcelas?",
    answer:
      "Sim! Você pode antecipar suas parcelas a qualquer momento, reduzindo o prazo total do consórcio e aumentando suas chances de contemplação.",
  },
  {
    question: "Como é feita a escolha do bem?",
    answer:
      "Após a contemplação, você tem um prazo para escolher o bem que deseja adquirir. Nossa equipe te auxilia em todo o processo, desde a escolha até a entrega.",
  },
];

export default function FAQ() {
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
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre consórcios
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <Disclosure>
                {({ open }) => (
                  <div className="bg-white rounded-lg shadow-md">
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span className="text-lg font-semibold">
                        {faq.question}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
