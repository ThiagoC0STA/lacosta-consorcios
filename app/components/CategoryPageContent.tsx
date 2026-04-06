"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  FaCheckCircle,
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaHome,
  FaCar,
  FaChartBar,
  FaSpa,
  FaShip,
  FaBriefcase,
  FaSeedling,
  FaGraduationCap,
  FaStethoscope,
  FaTools,
  FaEllipsisH,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import HeroCalculatorV2 from "./HeroCalculatorV2";
import Footer from "./Footer";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import type { CategoryData, CategoryTheme, SectionType } from "../lib/categoryTypes";
import { CATEGORIES } from "../lib/categories";
import { CATEGORY_KEYS_IN_ORDER } from "../lib/categoryNavLinks";
import { useMemo, useState } from "react";

const ICON_BY_SLUG: Record<string, IconType> = {
  "consorcio-imovel": FaHome,
  "consorcio-veiculo": FaCar,
  "consorcio-investimento": FaChartBar,
  "consorcio-estetica": FaSpa,
  "consorcio-embarcacoes": FaShip,
  "consorcio-servicos": FaBriefcase,
  "consorcio-agronegocio": FaSeedling,
  "consorcio-educacao": FaGraduationCap,
  "consorcio-saude": FaStethoscope,
  "consorcio-reforma": FaTools,
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function useSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  STATS SECTION                                                      */
/* ------------------------------------------------------------------ */

function StatsSection({ category, t, onSimulate }: { category: CategoryData; t: CategoryTheme; onSimulate: () => void }) {
  const { ref, inView } = useSection();
  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: t.darkBg }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, rgba(${t.accentRgb},0.5) 0%, transparent 70%)` }} />
      </div>
      <Container className="relative z-10" padding={false}>
        <div ref={ref} className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {category.statsHighlight.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, ease }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2" style={{ color: t.accentLight }}>
                  {stat.value}
                </div>
                <div className="text-base sm:text-lg font-bold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-white/45 max-w-xs mx-auto">{stat.description}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, ease }}
            className="mt-10 sm:mt-14 text-center"
          >
            <button
              onClick={onSimulate}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {category.ctaStats}
              <span className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-1" style={{ background: t.accent }}>
                <FaArrowRight className="text-xs text-white" />
              </span>
            </button>
            <p className="mt-3 text-[11px] text-white/30">Simulação grátis em 30 segundos</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURES SECTION                                                   */
/* ------------------------------------------------------------------ */

function FeaturesSection({ category, t }: { category: CategoryData; t: CategoryTheme }) {
  const { ref, inView } = useSection();
  const cards = category.featureCards;
  const cols = cards.length <= 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl" style={{ background: `rgba(${t.accentRgb},0.04)` }} />
      </div>
      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4" style={{ background: `rgba(${t.accentRgb},0.08)` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: t.accent }}>Opções</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">{category.featureTitle}</h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto">{category.featureSubtitle}</p>
          </motion.div>

          <div className={`grid grid-cols-1 ${cols} gap-5 max-w-5xl mx-auto`}>
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.06, ease }}
                className="group relative rounded-2xl border border-neutral-200/90 bg-white p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-1.5" style={{ background: t.gradient }} />
                <h3 className="text-lg font-bold text-neutral-900 mb-2 pl-3">{card.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed pl-3">{card.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROBLEM / SOLUTION SECTION                                         */
/* ------------------------------------------------------------------ */

function ProblemSolutionSection({ category, t }: { category: CategoryData; t: CategoryTheme }) {
  const { ref, inView } = useSection();
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl" style={{ background: `rgba(${t.accentRgb},0.04)` }} />
      </div>
      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease }}
              className="relative rounded-2xl border border-neutral-200/90 bg-white p-7 sm:p-9"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                <FaTimes className="text-xs" aria-hidden />
                O problema
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-4">{category.problemTitle}</h2>
              <p className="text-base text-neutral-600 leading-relaxed">{category.problemText}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5 text-sm text-neutral-500">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <FaTimes className="text-sm" aria-hidden />
                </span>
                Dinheiro que vai embora em juros e nunca volta.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08, ease }}
              className="relative rounded-2xl border p-7 sm:p-9"
              style={{ borderColor: `rgba(${t.accentRgb},0.2)`, background: `rgba(${t.accentRgb},0.03)`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: `rgba(${t.accentRgb},0.3)`, background: `rgba(${t.accentRgb},0.1)`, color: t.accent }}>
                <FaCheck className="text-xs" aria-hidden />
                A solução
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-4">{category.solutionTitle}</h2>
              <p className="text-base text-neutral-600 leading-relaxed">{category.solutionText}</p>
              <div className="mt-6 flex items-center gap-3 border-t pt-5 text-sm text-neutral-600" style={{ borderColor: `rgba(${t.accentRgb},0.1)` }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `rgba(${t.accentRgb},0.1)`, color: t.accent }}>
                  <FaCheck className="text-sm" aria-hidden />
                </span>
                Economia que fica no seu bolso, não no banco.
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPARISON SECTION                                                 */
/* ------------------------------------------------------------------ */

function ComparisonTable({ category, inView, t }: { category: CategoryData; inView: boolean; t: CategoryTheme }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1, ease }} className="max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-0 border-b border-white/10 text-center">
          <div className="p-4 text-xs font-bold uppercase tracking-wider text-white/40" />
          <div className="p-4 text-xs font-bold uppercase tracking-wider text-red-400/80 border-x border-white/5">Financiamento</div>
          <div className="p-4 text-xs font-bold uppercase tracking-wider" style={{ color: t.accentLight }}>Consórcio</div>
        </div>
        {category.comparison.map((row, i) => (
          <motion.div key={row.label} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 + i * 0.04 }} className={`grid grid-cols-3 gap-0 ${i < category.comparison.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
            <div className="p-4 text-sm font-medium text-white/70">{row.label}</div>
            <div className={`p-4 text-sm text-center border-x border-white/5 ${row.winner === "consortium" ? "text-white/40" : "text-white/70 font-semibold"}`}>{row.financing}</div>
            <div className={`p-4 text-sm text-center font-semibold ${row.winner === "consortium" ? "text-emerald-400" : "text-white/70"}`}>
              {row.consortium}
              {row.winner === "consortium" && <FaCheck className="inline ml-1.5 text-[10px] text-emerald-400/70" />}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-white/30 text-center leading-relaxed">{category.comparisonNote}</p>
    </motion.div>
  );
}

function ComparisonCards({ category, inView, t }: { category: CategoryData; inView: boolean; t: CategoryTheme }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1, ease }} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20"><FaTimes className="text-red-400" /></div>
            <div><h3 className="text-lg font-bold text-white/90">Financiamento</h3><p className="text-xs text-white/40">Custo com juros</p></div>
          </div>
          <ul className="space-y-3">
            {category.comparison.map((row) => (
              <li key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-white/50">{row.label}</span>
                <span className={`font-medium ${row.winner === "consortium" ? "text-red-400/70" : "text-white/70"}`}>{row.financing}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border p-6 sm:p-7 backdrop-blur-sm" style={{ borderColor: `rgba(${t.accentRgb},0.25)`, background: `rgba(${t.accentRgb},0.06)` }}>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: `rgba(${t.accentRgb},0.15)` }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `rgba(${t.accentRgb},0.25)` }}><FaCheck style={{ color: t.accentLight }} /></div>
            <div><h3 className="text-lg font-bold text-white">Consórcio</h3><p className="text-xs" style={{ color: `rgba(${t.accentRgb},0.7)` }}>Economia real</p></div>
          </div>
          <ul className="space-y-3">
            {category.comparison.map((row) => (
              <li key={row.label} className="flex items-center justify-between text-sm">
                <span className="text-white/60">{row.label}</span>
                <span className={`font-medium ${row.winner === "consortium" ? "text-emerald-400" : "text-white/70"}`}>
                  {row.consortium}{row.winner === "consortium" && <FaCheck className="inline ml-1 text-[9px] text-emerald-400/70" />}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-5 text-[11px] text-white/30 text-center leading-relaxed">{category.comparisonNote}</p>
    </motion.div>
  );
}

function ComparisonSection({ category, t, onSimulate }: { category: CategoryData; t: CategoryTheme; onSimulate: () => void }) {
  const { ref, inView } = useSection();
  const accentGrad = `linear-gradient(135deg, ${t.accent} 0%, ${t.accentLight} 50%, ${t.accent} 100%)`;
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: t.darkBg }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full opacity-25" style={{ background: `radial-gradient(circle, rgba(${t.accentRgb},0.4) 0%, transparent 70%)` }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: `radial-gradient(circle, rgba(${t.accentRgb},0.5) 0%, transparent 70%)` }} />
      </div>
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }} className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: t.accent }} /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: t.accent }} /></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: t.accent }}>Compare e economize</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-3">
              Financiamento <span className="text-white/40">vs</span>{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGrad }}>Consórcio</span>
            </h2>
            <p className="text-base text-white/50 max-w-lg mx-auto">Veja a diferença real nos números e descubra quanto você economiza</p>
          </motion.div>
          {t.comparisonStyle === "cards" ? <ComparisonCards category={category} inView={inView} t={t} /> : <ComparisonTable category={category} inView={inView} t={t} />}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4, ease }} className="mt-10 text-center">
            <button onClick={onSimulate} className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]" style={{ background: t.gradient }}>
              Simular minha economia <FaArrowRight className="text-sm" />
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STEPS SECTION                                                      */
/* ------------------------------------------------------------------ */

function StepsSection({ category, t }: { category: CategoryData; t: CategoryTheme }) {
  const { ref, inView } = useSection();
  const accentGrad = `linear-gradient(135deg, ${t.accent} 0%, ${t.accentLight} 50%, ${t.accent} 100%)`;

  return (
    <section id="como-funciona" className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4" style={{ background: `rgba(${t.accentRgb},0.08)` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: t.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: t.accent }}>Passo a passo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Como funciona o <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGrad }}>{category.name.toLowerCase()}</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto">Do primeiro contato até a conquista do seu objetivo</p>
          </motion.div>
          {t.stepsStyle === "timeline" ? (
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, rgba(${t.accentRgb},0.3), rgba(${t.accentRgb},0.05))` }} />
              <div className="space-y-8">
                {category.steps.map((step, i) => (
                  <motion.div key={step.title} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.12 + i * 0.1, ease }} className="relative flex gap-5 sm:gap-7">
                    <div className="relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl text-white text-lg sm:text-xl font-bold shadow-lg" style={{ background: t.gradient }}>{i + 1}</div>
                    <div className="pt-1 sm:pt-3 flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.steps.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08, ease }} className="relative group">
                  {i < category.steps.length - 1 && <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0" style={{ background: `linear-gradient(to right, rgba(${t.accentRgb},0.2), transparent)` }} />}
                  <div className="relative rounded-2xl border border-neutral-200/90 bg-white p-6 transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold mb-4" style={{ background: t.gradient }}>{i + 1}</div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BENEFITS SECTION                                                   */
/* ------------------------------------------------------------------ */

function BenefitsSection({ category, t }: { category: CategoryData; t: CategoryTheme }) {
  const { ref, inView } = useSection();
  const accentGrad = `linear-gradient(135deg, ${t.accent} 0%, ${t.accentLight} 50%, ${t.accent} 100%)`;

  return (
    <section className="relative py-16 sm:py-24 bg-neutral-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl" style={{ background: `rgba(${t.accentRgb},0.04)` }} />
      </div>
      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }} className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Por que a Lacosta para <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGrad }}>{category.shortName.toLowerCase()}</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto">Vantagens exclusivas que fazem a diferença real no seu bolso</p>
          </motion.div>

          {t.benefitsLayout === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.benefits.map((b, i) => (
                <motion.div key={b.title} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.05 + i * 0.06, ease }} className="group relative rounded-2xl border border-neutral-200/90 bg-white p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[3rem] opacity-[0.06]" style={{ background: t.gradient }} />
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-4" style={{ background: `rgba(${t.accentRgb},0.08)`, color: t.accent }}>{b.highlight}</span>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {t.benefitsLayout === "bento" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {category.benefits.map((b, i) => {
                const big = i < 2;
                return (
                  <motion.div key={b.title} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 + i * 0.06, ease }} className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${big ? "p-8" : "p-6"}`} style={{ borderColor: big ? `rgba(${t.accentRgb},0.2)` : "rgba(229,231,235,0.9)", background: big ? `linear-gradient(135deg, rgba(${t.accentRgb},0.04) 0%, white 100%)` : "white", boxShadow: big ? `0 4px 20px rgba(${t.accentRgb},0.08)` : "0 1px 3px rgba(0,0,0,0.04)" }}>
                    {big && <div className="absolute top-0 left-0 w-1 h-full" style={{ background: t.gradient }} />}
                    <div className="flex items-start gap-4">
                      <div className={`flex shrink-0 items-center justify-center rounded-xl font-bold text-white ${big ? "h-14 w-14 text-xl" : "h-10 w-10 text-sm"}`} style={{ background: t.gradient }}>{String(i + 1).padStart(2, "0")}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className={`font-bold text-neutral-900 ${big ? "text-xl" : "text-lg"}`}>{b.title}</h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700"><FaCheck className="text-[8px]" />{b.highlight}</span>
                        </div>
                        <p className={`text-neutral-600 leading-relaxed ${big ? "text-base" : "text-sm"}`}>{b.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {t.benefitsLayout === "list" && (
            <div className="space-y-4">
              {category.benefits.map((b, i) => (
                <motion.div key={b.title} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 + i * 0.06, ease }} className="group rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: `rgba(${t.accentRgb},0.1)` }}>
                      <span className="text-base font-bold" style={{ color: t.accent }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-neutral-900">{b.title}</h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-bold text-emerald-700 shrink-0"><FaCheck className="text-[9px]" />{b.highlight}</span>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, ease }} className="mt-10 text-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={(e) => { trackButtonClick("simular_agora", `category_${category.slug}`); handleWhatsAppClick(WHATSAPP_LINK, e, "benefits_section"); }} className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]" style={{ background: t.gradient }}>
              {category.ctaHeadline} <FaArrowRight className="text-sm" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ SECTION                                                        */
/* ------------------------------------------------------------------ */

function FAQSection({ category, t }: { category: CategoryData; t: CategoryTheme }) {
  const { ref, inView } = useSection();
  const accentGrad = `linear-gradient(135deg, ${t.accent} 0%, ${t.accentLight} 50%, ${t.accent} 100%)`;

  return (
    <section className="relative py-14 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ background: `rgba(${t.accentRgb},0.06)` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ background: `rgba(${t.accentRgb},0.04)` }} />
      </div>
      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4" style={{ background: `rgba(${t.accentRgb},0.08)` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: t.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: t.accent }}>Tire suas dúvidas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Dúvidas sobre <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGrad }}>{category.name.toLowerCase()}</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">Tudo o que você precisa saber antes de começar</p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-3">
            {category.faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}>
                <Disclosure as="div" className="rounded-xl border border-neutral-200 bg-white transition-all duration-200" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <DisclosureButton className="group flex w-full items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl">
                    <span className="text-sm sm:text-base font-semibold text-neutral-900">{faq.question}</span>
                    <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[open]:rotate-180" style={{ color: t.accent }} />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 sm:px-5 pb-4 pt-0"><p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p></DisclosurePanel>
                </Disclosure>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="mt-10 sm:mt-12 text-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={(e) => { trackButtonClick("duvidas_faq", "faq"); handleWhatsAppClick(WHATSAPP_LINK, e, "faq"); }} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white text-sm transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]" style={{ background: t.accent }}>
              Ainda tem dúvidas? Fale conosco <FaArrowRight className="text-sm" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CROSS-SELL SECTION                                                 */
/* ------------------------------------------------------------------ */

function CrossSellSection({ category }: { category: CategoryData }) {
  const { ref, inView } = useSection();
  const items = useMemo(
    () =>
      CATEGORY_KEYS_IN_ORDER.map((key) => CATEGORIES[key])
        .filter((c) => c.slug !== category.slug)
        .map((c) => ({ slug: c.slug, label: c.shortName, desc: c.heroSubtitle, icon: ICON_BY_SLUG[c.slug] ?? FaEllipsisH, accent: c.theme.accent, accentRgb: c.theme.accentRgb })),
    [category.slug],
  );

  return (
    <section className="relative py-16 sm:py-20 bg-slate-50 overflow-hidden">
      <Container padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Explore outras oportunidades</h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto">O consórcio sem juros para cada objetivo de vida.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {items.map((c, i) => (
              <motion.div key={c.slug} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }}>
                <Link href={`/${c.slug}`} className="group flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: `rgba(${c.accentRgb},0.1)` }}>
                    <c.icon className="text-xl" style={{ color: c.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-neutral-900 transition-colors mb-1">Consórcio de {c.label}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{c.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION RENDERER                                                   */
/* ------------------------------------------------------------------ */

function SectionRenderer({ type, category, t, onSimulate }: { type: SectionType; category: CategoryData; t: CategoryTheme; onSimulate: () => void }) {
  switch (type) {
    case "stats":
      return <StatsSection category={category} t={t} onSimulate={onSimulate} />;
    case "features":
      return <FeaturesSection category={category} t={t} />;
    case "problem-solution":
      return <ProblemSolutionSection category={category} t={t} />;
    case "comparison":
      return <ComparisonSection category={category} t={t} onSimulate={onSimulate} />;
    case "steps":
      return <StepsSection category={category} t={t} />;
    case "benefits":
      return <BenefitsSection category={category} t={t} />;
    case "faq":
      return <FAQSection category={category} t={t} />;
    case "cross-sell":
      return <CrossSellSection category={category} />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function CategoryPageContent({ category }: { category: CategoryData }) {
  const t = category.theme;
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accentGradientText = `linear-gradient(135deg, ${t.accent} 0%, ${t.accentLight} 50%, ${t.accent} 100%)`;

  return (
    <main className="relative">
      {/* ===================== HERO (always first) ===================== */}
      <section className="relative flex items-center overflow-hidden bg-neutral-900 pt-36 md:pt-24 scroll-mt-36 md:scroll-mt-24 md:pb-16">
        <div className="absolute inset-0 z-0">
          <Image fill priority fetchPriority="high" src={category.heroImage} alt={`${category.name} sem juros | Lacosta Consórcios`} className="object-cover opacity-40" sizes="100vw" quality={75} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(0,14,36,0.88) 0%, rgba(${t.accentRgb},0.15) 50%, rgba(0,14,36,0.85) 100%)` }} />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${t.accent} 0%, transparent 70%)` }} />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${t.accentLight} 0%, transparent 70%)` }} />
          </div>
        </div>
        <Container className="relative z-10 w-full flex items-center" padding={false}>
          <div className="flex w-full flex-col gap-8 px-4 pt-5 pb-12 sm:px-6 md:pt-10 md:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <motion.div ref={heroRef} initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="flex min-w-0 flex-1 flex-col gap-4 text-center lg:max-w-xl lg:flex-none lg:text-left xl:max-w-2xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 justify-center lg:justify-start">
                <Link href="/" className="hover:text-white/70 transition-colors">Início</Link>
                <span className="text-white/20">/</span>
                <span className="text-white/60">{category.name}</span>
              </nav>
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-[3.05rem] md:leading-[1.12] leading-tight">
                  <span className="font-extrabold text-white">{category.heroTitle} </span>
                  <span className="font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: accentGradientText }}>{category.heroAccent}</span>
                </h1>
                <p className="text-sm md:text-base text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">{category.heroSubtitle}</p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                {[{ text: "100% Sem juros", hl: true }, { text: `Economize ${category.avgSaving}`, hl: false }, { text: "Simule grátis", hl: false }].map((pill, i) => (
                  <span key={i} className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${pill.hl ? "text-white" : "bg-white/10 text-white/90"}`} style={pill.hl ? { background: `rgba(${t.accentRgb},0.25)`, boxShadow: `inset 0 0 0 1px rgba(${t.accentRgb},0.5)` } : undefined}>
                    <FaCheckCircle className="text-[10px]" style={{ color: t.accent }} />{pill.text}
                  </span>
                ))}
              </div>
              <div className="lg:hidden">
                <button onClick={() => setIsModalOpen(true)} className="w-full rounded-xl bg-white px-6 py-3.5 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-neutral-50" style={{ color: t.accent }}>
                  Simular {category.shortName.toLowerCase()}
                </button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="hidden shrink-0 justify-center lg:flex lg:justify-end">
              <HeroCalculatorV2 initialCategory={category.calculatorCategory} />
            </motion.div>
          </div>
        </Container>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden flex items-end sm:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ type: "tween", duration: 0.35, ease }} className="relative flex max-h-[95vh] w-full max-w-md flex-col rounded-t-2xl bg-white" onClick={(e) => e.stopPropagation()}>
              <div className="shrink-0 flex items-center justify-between border-b border-neutral-100 px-4 py-3">
                <span className="text-base font-semibold text-neutral-900">Simular {category.shortName.toLowerCase()}</span>
                <button onClick={() => setIsModalOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700" aria-label="Fechar">×</button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto flex justify-center p-4 pb-6">
                <HeroCalculatorV2 initialCategory={category.calculatorCategory} />
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* ===================== DYNAMIC SECTIONS ===================== */}
      {category.sectionOrder.map((sectionType) => (
        <SectionRenderer key={sectionType} type={sectionType} category={category} t={t} onSimulate={() => setIsModalOpen(true)} />
      ))}

      <Footer />
    </main>
  );
}
