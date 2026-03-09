"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import { FAQ_ITEMS } from "../lib/seo";
import Container from "./Container";
import { FaArrowRight } from "react-icons/fa";

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
            {FAQ_ITEMS.map((faq, index) => (
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
