"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import Container from "./Container";
import { FaArrowRight } from "react-icons/fa";

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

export default function FAQV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id="faq"
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white scroll-mt-24 md:scroll-mt-0"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0487D9]/5 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#035AA6]/5 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-1)]/10 px-3 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0487D9] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary-1)]">
                Tire suas dúvidas
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Perguntas{" "}
              <span className="bg-gradient-to-r from-[#0487D9] to-[#035AA6] bg-clip-text text-transparent">
                frequentes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
              Respostas para as dúvidas mais comuns sobre consórcios
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.4) }}
              >
                <Disclosure>
                  {({ open }) => (
                    <div
                      className="rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:border-[var(--primary-1)]/25"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                    >
                      <Disclosure.Button className="flex w-full items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-1)]/30 focus-visible:ring-offset-2 rounded-xl">
                        <span className="text-sm sm:text-base font-semibold text-neutral-900">
                          {faq.question}
                        </span>
                        <ChevronDownIcon
                          className={`h-5 w-5 shrink-0 text-[var(--primary-1)] transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 sm:px-5 pb-4 pt-0">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick("duvidas_faq", "faq");
                handleWhatsAppClick(WHATSAPP_LINK, e, "faq");
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary-1)] px-5 py-3 font-bold text-white text-sm transition-all hover:bg-[var(--primary-4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Ainda tem dúvidas? Fale conosco
              <FaArrowRight className="text-sm" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
