"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPiggyBank,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaWallet,
} from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import Container from "./Container";

const BENEFITS = [
  {
    icon: FaPiggyBank,
    title: "Patrimônio que cresce",
    text: "Cada parcela fica guardada em seu nome. Zero perda, só acumulação.",
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

const cardEase = [0.25, 0.46, 0.45, 0.94] as const;

export default function InvestmentMindsetSectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <section
      id="investimento"
      className="relative scroll-mt-24 overflow-hidden md:scroll-mt-0"
    >
      {/* ,,, Dark stage: comparison + hero stat ,,, */}
      <div className="relative bg-[#030b18] pb-20 pt-16 sm:pb-28 sm:pt-20 md:pb-32 md:pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(4, 135, 217, 0.09), transparent 50%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative z-10" maxWidth="7xl" padding={false}>
          <div ref={ref} className="px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: cardEase }}
              className="mx-auto mb-12 max-w-4xl text-center sm:mb-16"
            >
              <div className="mb-5 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Por que consórcio faz sentido
              </div>
              <h2 className="text-balance text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-[2.75rem]">
                Financiamento cobra juros que{" "}
                <span className="text-slate-500">você nem vê na parcela.</span>
                <br className="hidden sm:block" />
                <span className="text-[#7eb8ff]">No consórcio, o dinheiro vira crédito na sua mão.</span>
              </h2>
            </motion.div>

            <div className="relative mx-auto max-w-6xl">
              <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-8">
                {/* Myth */}
                <motion.div
                  initial={{ opacity: 0, x: -28 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.08, ease: cardEase }}
                  className="relative flex flex-col justify-between rounded-3xl border border-white/[0.08] border-l-slate-600 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 sm:p-10"
                >
                  <div>
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      <FaTimes className="text-xs text-slate-500" aria-hidden />
                      O que parece
                    </span>
                    <h3 className="mb-4 text-2xl font-bold leading-tight text-white/90 sm:text-3xl">
                      <span className="text-slate-500 line-through decoration-slate-500 decoration-2">
                        Só mais um gasto
                      </span>
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-slate-400">
                      No banco, boa parte do que você paga vira{" "}
                      <strong className="font-semibold text-slate-300">juro</strong> , some do bolso
                      e não vira nada seu. A parcela parece fixa; quem fica com o dinheiro é outro.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-slate-500">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-500">
                      <FaTimes className="text-sm" aria-hidden />
                    </span>
                    No fim: você não “ganha” reais , só paga.
                  </div>
                </motion.div>

                {/* Reality */}
                <motion.div
                  initial={{ opacity: 0, x: 28 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.16, ease: cardEase }}
                  className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#0487D9]/25 border-l-[#0487D9] bg-gradient-to-b from-[#0487D9]/[0.12] to-white/[0.04] p-8 sm:p-10"
                >
                  <div>
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0487D9]/35 bg-[#0487D9]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9dc8f5]">
                      <FaCheck className="text-xs text-[#7eb8ff]" aria-hidden />
                      No consórcio
                    </span>
                    <h3 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                      Você acumula e recebe crédito em reais
                    </h3>
                    <p className="mb-6 max-w-md text-base leading-relaxed text-slate-300">
                      Cada parcela entra no grupo. Contemplado, o{" "}
                      <strong className="font-semibold text-white">valor integral</strong> cai para
                      você comprar o bem , não para pagar juro de banco.
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5">
                      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#7eb8ff]">
                        <FaWallet className="text-sm" aria-hidden />
                        Na prática, você ganha
                      </div>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex gap-2">
                          <FaCheck className="mt-0.5 shrink-0 text-[#0487D9]" aria-hidden />
                          <span>
                            <strong className="text-white">100% do crédito</strong> para usar no que
                            escolheu , imóvel, carro, saúde, estética etc.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <FaCheck className="mt-0.5 shrink-0 text-[#0487D9]" aria-hidden />
                          <span>
                            <strong className="text-white">R$ 0 de juros</strong> embutido na
                            operação como no financiamento.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <FaCheck className="mt-0.5 shrink-0 text-[#0487D9]" aria-hidden />
                          <span>
                            Economia típica na casa dos{" "}
                            <strong className="text-white">dezenas de milhares</strong> frente ao
                            banco , dinheiro que fica com você.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-slate-400">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0487D9]/20 text-[#7eb8ff]">
                      <FaWallet className="text-sm" aria-hidden />
                    </span>
                    Resultado: dinheiro que vira patrimônio , não taxa.
                  </div>
                </motion.div>
              </div>

              {/* Giant stat */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.28, ease: cardEase }}
                className="relative mx-auto mt-14 max-w-4xl sm:mt-16"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#050f1c]/95 px-6 py-10 text-center sm:px-10 sm:py-12">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
                    Economia média estimada
                  </p>
                  <p className="text-5xl font-black tabular-nums tracking-tight text-white sm:text-6xl md:text-7xl">
                    <span className="text-slate-500">R$</span>{" "}
                    <span className="text-white">45.000</span>
                  </p>
                  <p className="mt-3 text-sm text-slate-500 sm:text-base">
                    vs. financiamento tradicional , cenário típico de cliente
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* ,,, Light band: benefits + CTA ,,, */}
      <div className="relative z-[1] -mt-6 rounded-t-[2rem] bg-slate-50 pb-16 pt-14 shadow-[0_-12px_40px_rgba(0,0,0,0.2)] sm:rounded-t-[2.5rem] sm:pb-20 sm:pt-16 md:-mt-8 md:rounded-t-[3rem]">
        <Container className="relative z-10" maxWidth="7xl" padding={false}>
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
              }}
              className="mb-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 md:mb-16"
            >
              {BENEFITS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: cardEase },
                    },
                  }}
                  className="group"
                >
                  <div className="h-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0487D9]/25 hover:shadow-xl hover:shadow-[#035AA6]/[0.07] sm:p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#035AA6]/12 to-[#0487D9]/12 transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="text-xl text-[#035AA6]" />
                    </div>
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#035AA6]">{item.stat}</span>
                      <span className="text-xs font-medium text-neutral-500">{item.statLabel}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-neutral-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45, ease: cardEase }}
              className="text-center"
            >
              <p className="mb-6 text-sm text-neutral-500">
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
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#035AA6] to-[#0487D9] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#035AA6]/25 transition-all hover:brightness-110 sm:px-10 sm:py-5 sm:text-lg"
              >
                Quero investir no meu futuro
                <FaArrowRight className="text-lg" />
              </motion.a>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}
