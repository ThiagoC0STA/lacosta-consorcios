"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaArrowRight } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";
import { trackEvent } from "../lib/trackEvent";
import Container from "./Container";

const PRESETS = [
  { label: "R$ 100 mil", value: 100_000 },
  { label: "R$ 250 mil", value: 250_000 },
  { label: "R$ 500 mil", value: 500_000 },
  { label: "R$ 1 milhão", value: 1_000_000 },
] as const;

const FINANCING_ANNUAL_RATE = 0.12;
const FINANCING_MONTHS = 180;
const CONSORTIUM_ADMIN_FEE_TOTAL = 0.16;
const CONSORTIUM_MONTHS = 180;

function calcFinancing(principal: number) {
  const monthlyRate = FINANCING_ANNUAL_RATE / 12;
  const pmt =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, FINANCING_MONTHS)) /
    (Math.pow(1 + monthlyRate, FINANCING_MONTHS) - 1);
  const total = pmt * FINANCING_MONTHS;
  return { monthly: pmt, total, interest: total - principal };
}

function calcConsortium(principal: number) {
  const total = principal * (1 + CONSORTIUM_ADMIN_FEE_TOTAL);
  const monthly = total / CONSORTIUM_MONTHS;
  return { monthly, total, fee: total - principal };
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function ComparatorSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [creditValue, setCreditValue] = useState(250_000);
  const interacted = useRef(false);

  const handleValueChange = (v: number) => {
    setCreditValue(v);
    if (!interacted.current) {
      interacted.current = true;
      trackEvent("comparator_interact", { value: v });
    }
  };

  const financing = useMemo(() => calcFinancing(creditValue), [creditValue]);
  const consortium = useMemo(() => calcConsortium(creditValue), [creditValue]);
  const savings = financing.total - consortium.total;

  return (
    <section
      id="comparador"
      className="relative overflow-hidden py-16 sm:py-24 md:py-28 scroll-mt-24 md:scroll-mt-0"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #021D40 0%, #022859 35%, #021D40 100%)",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(4,135,217,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(3,90,166,0.5) 0%, transparent 70%)" }}
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-10 text-center sm:mb-14"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0487D9] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0487D9]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0487D9]">
                Compare e economize
              </span>
            </motion.div>
            <h2 className="mx-auto mb-4 max-w-4xl text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl">
              Consórcio vs.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #0487D9 0%, #5BB8FF 50%, #0487D9 100%)" }}
              >
                Financiamento
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-white/60 md:text-lg">
              Veja quanto você economiza ao escolher consórcio ao invés de financiamento com juros
            </p>
          </motion.div>

          {/* Value selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mb-8 max-w-2xl"
          >
            <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-wider text-white/40">
              Valor do crédito
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => handleValueChange(p.value)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    creditValue === p.value
                      ? "bg-white text-[var(--primary-1)] shadow-md"
                      : "border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-sm hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="mt-4 px-2">
              <input
                type="range"
                min={50_000}
                max={2_000_000}
                step={10_000}
                value={creditValue}
                onChange={(e) => handleValueChange(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-[#0487D9]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-white/30">
                <span>R$ 50 mil</span>
                <span className="font-bold text-white/70">{formatCurrency(creditValue)}</span>
                <span>R$ 2 milhões</span>
              </div>
            </div>
          </motion.div>

          {/* Comparison cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {/* Financing card */}
            <div className="rounded-2xl border border-red-500/20 bg-white/[0.04] p-6 backdrop-blur-xl sm:rounded-3xl sm:p-7">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                  Financiamento
                </span>
              </div>

              <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/40">
                Parcela mensal
              </div>
              <div className="mb-4 text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {formatCurrency(financing.monthly)}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total pago</span>
                  <span className="font-semibold text-white">{formatCurrency(financing.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Juros pagos</span>
                  <span className="font-bold text-red-400">{formatCurrency(financing.interest)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Taxa</span>
                  <span className="text-white/70">{(FINANCING_ANNUAL_RATE * 100).toFixed(0)}% a.a.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Prazo</span>
                  <span className="text-white/70">{FINANCING_MONTHS / 12} anos</span>
                </div>
              </div>
            </div>

            {/* Consortium card */}
            <div
              className="relative rounded-2xl border border-[#0487D9]/30 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-7"
              style={{
                background: "linear-gradient(160deg, rgba(4,135,217,0.12) 0%, rgba(2,40,89,0.15) 100%)",
                boxShadow: "0 0 30px -12px rgba(4,135,217,0.2)",
              }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Consórcio
                </span>
              </div>

              <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/40">
                Parcela mensal
              </div>
              <div className="mb-4 text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {formatCurrency(consortium.monthly)}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total pago</span>
                  <span className="font-semibold text-white">{formatCurrency(consortium.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Taxa adm. total</span>
                  <span className="font-bold text-emerald-400">{formatCurrency(consortium.fee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Juros</span>
                  <span className="font-bold text-emerald-400">R$ 0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Prazo</span>
                  <span className="text-white/70">{CONSORTIUM_MONTHS / 12} anos</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Savings highlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto mt-6 max-w-3xl"
          >
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] px-6 py-5 text-center backdrop-blur-sm sm:rounded-3xl sm:px-8 sm:py-6">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Sua economia com consórcio
              </p>
              <p className="text-3xl font-black tabular-nums text-white sm:text-4xl md:text-5xl">
                {formatCurrency(savings)}
              </p>
              <p className="mt-1 text-sm text-white/50">
                a menos que no financiamento tradicional
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 sm:mt-14"
          >
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick("comparador_cta", "comparator_section");
                trackEvent("whatsapp_click", { source: "comparator" });
                handleWhatsAppClick(WHATSAPP_LINK, e, "benefits_section");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative mx-auto flex max-w-3xl cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl p-6 sm:flex-row sm:gap-6 sm:rounded-3xl sm:p-8"
              style={{
                background: "linear-gradient(135deg, rgba(4,135,217,0.25) 0%, rgba(3,90,166,0.2) 50%, rgba(2,29,64,0.3) 100%)",
                border: "1px solid rgba(4,135,217,0.25)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(4,135,217,0.2) 0%, transparent 70%)" }}
              />
              <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="mb-1 text-xl font-bold text-white sm:text-2xl">
                    Quer economizar {formatCurrency(savings)}?
                  </h3>
                  <p className="text-sm text-white/70 sm:text-base">
                    Simule agora e fale com um especialista
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[var(--primary-1)] shadow-md transition-all group-hover:bg-[#0487D9] group-hover:text-white">
                  <span>Simular agora</span>
                  <FaArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          </motion.div>

          <p className="mt-4 text-center text-[11px] text-white/30">
            * Simulação ilustrativa com taxa de {(FINANCING_ANNUAL_RATE * 100).toFixed(0)}% a.a. para financiamento e {(CONSORTIUM_ADMIN_FEE_TOTAL * 100).toFixed(0)}% de taxa adm. total para consórcio, em {FINANCING_MONTHS / 12} anos. Valores reais podem variar.
          </p>
        </div>
      </Container>
    </section>
  );
}
