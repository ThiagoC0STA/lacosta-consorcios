"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { FaCheckCircle, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { WHATSAPP_LINK } from "../lib/constants";
import Container from "./Container";

const faqs = [
  {
    question: "Como funciona o processo de contemplação?",
    answer:
      "O processo de contemplação é realizado através de sorteios periódicos. Você pode escolher entre contemplação por sorteio ou por lance. Quanto maior o lance, maiores as chances de contemplação. Nossos grupos têm taxa de contemplação média de 8.2 meses!",
  },
  {
    question: "Quais são as taxas envolvidas?",
    answer:
      "Nossas taxas são transparentes e incluem apenas a taxa de administração, que é uma das mais competitivas do mercado. Não cobramos juros, apenas o valor das parcelas acordado no contrato. Economia média de R$ 45.000 comparado ao financiamento!",
  },
  {
    question: "Posso antecipar minhas parcelas?",
    answer:
      "Sim! Você pode antecipar suas parcelas a qualquer momento, reduzindo o prazo total do consórcio e aumentando suas chances de contemplação. Muitos clientes são contemplados em menos de 6 meses com essa estratégia.",
  },
  {
    question: "Como é feita a escolha do bem?",
    answer:
      "Após a contemplação, você tem um prazo para escolher o bem que deseja adquirir. Nossa equipe te auxilia em todo o processo, desde a escolha até a entrega. Oferecemos consultoria gratuita para ajudar na melhor decisão.",
  },
  {
    question: "Quem pode participar de um consórcio?",
    answer:
      "Qualquer pessoa física ou jurídica pode participar, desde que atenda aos requisitos mínimos de idade e documentação exigidos pela administradora. Processo muito mais simples que financiamento bancário!",
  },
  {
    question: "Posso usar meu FGTS para ofertar lance ou quitar o consórcio?",
    answer:
      "Sim, em consórcios de imóveis é possível utilizar o FGTS para ofertar lances ou quitar o saldo devedor, conforme as regras da Caixa Econômica Federal. Isso pode acelerar sua contemplação!",
  },
  {
    question: "O que é lance e como funciona?",
    answer:
      "Lance é um valor extra que o consorciado pode oferecer para tentar antecipar a contemplação. Quem oferece o maior lance tem mais chances de ser contemplado. Nossa equipe te orienta sobre a melhor estratégia.",
  },
  {
    question: "Após ser contemplado, em quanto tempo recebo o crédito?",
    answer:
      "Após a contemplação e entrega da documentação, o crédito é liberado em poucos dias, conforme análise e aprovação da administradora. Processo muito mais rápido que financiamento tradicional!",
  },
  {
    question: "Posso transferir minha cota de consórcio para outra pessoa?",
    answer:
      "Sim, é possível transferir a cota para terceiros, desde que aprovado pela administradora e mediante análise de crédito do novo titular. Flexibilidade total para suas necessidades.",
  },
  {
    question: "Quais bens posso adquirir com o consórcio?",
    answer:
      "Você pode adquirir imóveis, veículos, serviços ou outros bens permitidos pelo grupo de consórcio escolhido. Oferecemos consórcios para todos os tipos de sonhos!",
  },
  {
    question: "Qual a diferença entre consórcio e financiamento?",
    answer:
      "No consórcio você não paga juros, apenas o valor do bem dividido em parcelas. No financiamento você paga juros compostos que podem dobrar o valor final. Consórcio é muito mais econômico!",
  },
  {
    question: "Quanto tempo leva para ser contemplado?",
    answer:
      "O tempo varia conforme o grupo e estratégia utilizada. Com nossos grupos selecionados e orientação especializada, a média é de 8.2 meses. Alguns clientes são contemplados em apenas 3-6 meses!",
  },
  {
    question: "Posso cancelar o consórcio se mudar de ideia?",
    answer:
      "Sim, você pode cancelar a qualquer momento. O valor das parcelas pagas é devolvido conforme as regras da administradora. Transparência total em todo o processo.",
  },
  {
    question: "O consórcio é seguro?",
    answer:
      "Sim! Consórcios são regulamentados pelo Banco Central do Brasil e administrados por empresas autorizadas. É uma das formas mais seguras de realizar seus sonhos.",
  },
];

export default function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white">
      <Container>
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
          <p className="text-xl text-gray-600 mb-8">
            Tire suas dúvidas sobre consórcios
          </p>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">8.2</span>
              </div>
              <p className="text-sm text-blue-800">Meses média contemplação</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <FaMoneyBillWave className="text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  R$ 45K
                </span>
              </div>
              <p className="text-sm text-green-800">Economia média</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">
                  5.000+
                </span>
              </div>
              <p className="text-sm text-purple-800">Clientes satisfeitos</p>
            </div>
          </div>
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
                  <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:border-[var(--primary-1)]/30 transition-all">
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span className="text-lg font-semibold">
                        {faq.question}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-[var(--primary-1)]`}
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

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-5)] p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">💡 Ainda tem dúvidas?</h3>
            <p className="text-lg mb-6 opacity-90">
              Nossa equipe especializada está pronta para te ajudar! Simule
              agora e tire todas as suas dúvidas com quem entende do assunto.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[var(--primary-1)] px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              SIMULAR E TIRAR DÚVIDAS! 🚀
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
