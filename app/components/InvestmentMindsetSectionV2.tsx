"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPiggyBank,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import Container from "./Container";

const BENEFITS = [
  {
    icon: FaPiggyBank,
    title: "Patrimônio que cresce",
    text: "Cada parcela fica guardada em seu nome. Zero perda — só acumulação.",
    stat: "100%",
    statLabel: "do valor é seu",
  },
  {
    icon: FaChartLine,
    title: "Crédito total na mão",
    text: "Contemplado, você recebe o valor inteiro para imóvel, carro ou investir.",
    stat: "R$ 0",
    statLabel: "em juros",
  },
  {
    icon: FaShieldAlt,
    title: "Seguro e regulamentado",
    text: "Consórcios são fiscalizados pelo Banco Central. Tranquilidade total.",
    stat: "Bacen",
    statLabel: "regulamentado",
  },
];

export default function InvestmentMindsetSectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <section
      id="investimento"
      className="relative py-12 sm:py-20 md:py-28 overflow-hidden scroll-mt-24 md:scroll-mt-0"
    >
      {/* Soft gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fafbfc 0%, #f0f4f8 50%, #fafbfc 100%)",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0487D9]/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#035AA6]/[0.05] blur-3xl" />
      </div>

      <Container className="relative z-10" maxWidth="7xl" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Hero comparison block */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-neutral-900/5 mb-14 sm:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px] sm:min-h-[360px]">
              {/* Left - O mito (conta) */}
              <div className="relative flex flex-col justify-center px-8 sm:px-10 lg:px-12 py-10 sm:py-14 bg-white border-r border-neutral-100">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-4">
                  O que muitos pensam
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-400 mb-6 line-through decoration-neutral-300 decoration-2">
                  Uma conta a pagar
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm">
                  Dinheiro que sai todo mês, despesa sem retorno, pagamento que nunca acaba.
                </p>
              </div>

              {/* Right - A verdade (investimento) */}
              <div
                className="relative flex flex-col justify-center px-8 sm:px-10 lg:px-12 py-10 sm:py-14"
                style={{
                  background: "linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                    }}
                  />
                </div>
                <p className="relative text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-100 mb-4">
                  A realidade
                </p>
                <h3 className="relative text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="hidden sm:flex w-10 h-10 rounded-full bg-white/20 items-center justify-center shrink-0">
                    <FaCheck className="text-white text-sm" />
                  </span>
                  Um investimento no seu futuro
                </h3>
                <p className="relative text-white/95 text-sm sm:text-base leading-relaxed max-w-sm">
                  Cada parcela forma patrimônio. Você acumula, é contemplado e recebe 100% do crédito — sem juros.
                </p>
                <div className="relative mt-6 flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-4 rounded-2xl sm:rounded-full bg-white/20 px-5 py-4 sm:py-3 w-full sm:w-fit border border-white/30">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                    <span className="text-xs font-semibold text-white/90">
                      Economia média de R$
                    </span>
                    <span className="text-2xl sm:text-xl font-black text-white leading-none">
                      45.000
                    </span>
                  </div>
                  <span className="text-xs text-white/80 mt-1 sm:mt-0">
                    vs financiamento
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-16"
          >
            {BENEFITS.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                className="group"
              >
                <div className="h-full rounded-2xl bg-white p-6 sm:p-8 border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#0487D9]/20 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#035AA6]/10 to-[#0487D9]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <item.icon className="text-xl text-[#035AA6]" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-black text-[#035AA6]">
                      {item.stat}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      {item.statLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-neutral-500 mb-6">
              Regulamentado pelo Banco Central do Brasil
            </p>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick("investimento_section", "investment_mindset");
                handleWhatsAppClick(WHATSAPP_LINK, e, "investment_mindset");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-2xl px-8 sm:px-10 py-4 sm:py-5 font-bold text-white text-base sm:text-lg shadow-xl shadow-emerald-600/25 hover:shadow-2xl hover:shadow-emerald-600/30 transition-all bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
            >
              Quero investir no meu futuro
              <FaArrowRight className="text-lg" />
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
