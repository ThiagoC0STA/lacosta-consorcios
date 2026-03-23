"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaCar, FaChartLine, FaBriefcase, FaChevronLeft, FaChevronRight, FaCheckCircle, FaSeedling, FaGraduationCap, FaStethoscope, FaTools, FaEllipsisH, FaShip, FaSpa } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { WHATSAPP_PHONE_NUMBER } from "../lib/constants";
import { trackCalculatorInteraction } from "../lib/analytics";

const OBJETIVOS = [
  { label: "Imóvel", value: "imoveis", image: "/items/imovel.png", icon: FaHome, tip: "O sonho da casa própria", confirmMsg: "O sonho da casa própria com parcelas que cabem no bolso" },
  { label: "Veículos", value: "veiculos", image: "/items/veiculos.png", icon: FaCar, tip: "Seu carro ou moto sem juros", confirmMsg: "Seu carro ou moto zero sem juros. Simule agora!" },
  { label: "Estética", value: "estetica", image: "/items/estetica.jpg", icon: FaSpa, tip: "Harmonização e autocuidado", confirmMsg: "Invista em você: estética e bem-estar com parcelas sem juros" },
  { label: "Investimento", value: "investimento", image: "/items/invest.png", icon: FaChartLine, tip: "Planejamento financeiro", confirmMsg: "Planejamento financeiro com segurança e sem juros" },
  { label: "Embarcações", value: "embarcacoes", image: "/items/embarcacao.png", icon: FaShip, tip: "Lancha, veleiro, barco e muito mais", confirmMsg: "Lancha, veleiro ou barco — realize seu sonho náutico" },
  { label: "Serviços", value: "servicos", image: "/items/servicos.png", icon: FaBriefcase, tip: "Expanda seu negócio", confirmMsg: "Expanda seu negócio sem juros e com parcelas flexíveis" },
  { label: "Agronegócio", value: "agronegocio", image: "/items/agro.png", icon: FaSeedling, tip: "Maquinário e imóvel rural", confirmMsg: "Maquinário e imóvel rural. O campo agradece!" },
  { label: "Educação", value: "educacao", image: "/items/educacao.png", icon: FaGraduationCap, tip: "Cursos e formaturas", confirmMsg: "Investir em educação é investir no futuro" },
  { label: "Saúde", value: "saude", image: "/items/saude.png", icon: FaStethoscope, tip: "Procedimentos médicos", confirmMsg: "Cuide da saúde com parcelas acessíveis e sem juros" },
  { label: "Reforma", value: "reforma", image: "/items/reforma.png", icon: FaTools, tip: "Reforma ou ampliação", confirmMsg: "Reforma ou ampliação sem apertar o orçamento" },
  { label: "Outro", value: "outro", image: "/items/outro.png", icon: FaEllipsisH, tip: "Conte-nos o que você precisa", confirmMsg: "Conte-nos o que você precisa e vamos encontrar a melhor solução" },
];

const RANGES = {
  parcela: { min: 200, max: 10000, step: 50, prefix: "R$ ", suffix: ",00" },
  credito: { min: 20000, max: 5000000, step: 20000, prefix: "R$ ", suffix: ",00" },
} as const;

const slideVariants = {
  enterNext: { opacity: 0, x: 48, filter: "blur(2px)" },
  enterPrev: { opacity: 0, x: -48, filter: "blur(2px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exitNext: { opacity: 0, x: -48, filter: "blur(2px)" },
  exitPrev: { opacity: 0, x: 48, filter: "blur(2px)" },
};

export default function HeroCalculatorV2() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [objetivo, setObjetivo] = useState("imoveis");
  const [tipo, setTipo] = useState<"parcela" | "credito">("credito");
  const [valor, setValor] = useState(100000);
  const [clicked, setClicked] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);

  const r = RANGES[tipo];
  const progress = step === 1 ? 0.5 : 1;

  const goNext = useCallback(() => {
    setDirection("next");
    setStep(2);
  }, []);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setStep(1);
  }, []);

  const handleSwipe = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && step === 2) goPrev();
    }
  }, [step, goPrev]);

  const whatsappMsg = `Olá. Vim pelo site e gostaria de simular um consórcio de ${
    OBJETIVOS.find((o) => o.value === objetivo)?.label
  }. Simulação por ${tipo === "parcela" ? "parcela" : "crédito"}: ${r.prefix}${valor.toLocaleString()}${r.suffix}.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (clicked) return;
    setClicked(true);
    try {
      trackCalculatorInteraction("submit", { conquista: objetivo, tipo, valor });
    } catch {}
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag_report_conversion?: (u: string) => void }).gtag_report_conversion === "function") {
      try {
        (window as unknown as { gtag_report_conversion: (u: string) => void }).gtag_report_conversion(whatsappLink);
      } catch {}
    }
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <div
      className="relative min-h-[420px] w-full max-w-[440px] overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]"
      onTouchStart={(e) => { touchStart.current = e.targetTouches[0].clientX; }}
      onTouchEnd={(e) => {
        touchEnd.current = e.changedTouches[0].clientX;
        handleSwipe();
      }}
    >
      {/* Animated progress bar - contained inside rounded corners */}
      <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-2xl bg-neutral-100">
        <motion.div
          className="h-full rounded-full bg-[var(--primary-1)]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <div className="flex h-full flex-col overflow-hidden rounded-2xl p-6 pt-8">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial={direction === "next" ? "enterNext" : "enterPrev"}
                animate="center"
                exit={direction === "next" ? "exitNext" : "exitPrev"}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="flex min-h-[400px] flex-col"
              >
                <motion.h3
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mb-1 text-xl font-bold tracking-tight text-neutral-900"
                >
                  O que você vai conquistar?
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mb-4 text-[13px] text-neutral-500"
                >
                  O primeiro passo para realizar seu sonho
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-5 flex flex-wrap gap-2"
                >
                  <span
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wide shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, var(--primary-1) 0%, var(--primary-4) 100%)",
                      color: "white",
                    }}
                  >
                    <FaCheckCircle className="text-[10px]" /> 100% Sem juros
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--primary-1)]/20 bg-[var(--primary-1)]/5 px-3 py-2 text-[11px] font-semibold text-neutral-700">
                    Descubra quanto você economiza
                  </span>
                </motion.div>
                <div className="flex-1 px-3">
                  <Swiper
                    spaceBetween={12}
                    slidesPerView={1.9}
                    slidesOffsetBefore={12}
                    slidesOffsetAfter={12}
                    loop
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
                    breakpoints={{
                      400: { slidesPerView: 2.1 },
                      480: { slidesPerView: 2.2 },
                      560: { slidesPerView: 2.3 },
                    }}
                    className="!overflow-hidden"
                  >
                    {OBJETIVOS.map((obj) => (
                      <SwiperSlide key={obj.value} className="!h-auto">
                        <button
                          type="button"
                          onClick={() => setObjetivo(obj.value)}
                          className={`group relative flex w-full flex-col overflow-hidden rounded-xl border-2 p-0 text-left transition-all duration-200 ${
                            objetivo === obj.value
                              ? "border-[var(--primary-1)] shadow-md shadow-[var(--primary-1)]/15"
                              : "border-neutral-200/60 hover:border-neutral-300 hover:shadow-sm"
                          }`}
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[10px] bg-neutral-50">
                            {obj.image ? (
                              <Image
                                src={obj.image}
                                alt={obj.label}
                                width={160}
                                height={120}
                                sizes="(max-width: 480px) 140px, 160px"
                                quality={80}
                                className={`h-full w-full object-cover transition-all duration-200 ${
                                  objetivo === obj.value ? "brightness-100" : "brightness-90 group-hover:brightness-95"
                                }`}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                                <obj.icon
                                  className={`text-2xl transition-colors sm:text-3xl ${
                                    objetivo === obj.value
                                      ? "text-[var(--primary-1)]"
                                      : "text-neutral-400 group-hover:text-neutral-600"
                                  }`}
                                />
                              </div>
                            )}
                          </div>
                          <div className="px-2 py-1 text-center">
                            <span className={`text-[12px] font-semibold leading-tight sm:text-[13px] ${objetivo === obj.value ? "text-neutral-900" : "text-neutral-600"}`}>
                              {obj.label}
                            </span>
                          </div>
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all hover:opacity-90"
                      style={{
                        background: "var(--primary-1)",
                        color: "white",
                        boxShadow: "0 2px 8px rgba(2, 51, 115, 0.3)",
                      }}
                      aria-label="Anterior"
                    >
                      <FaChevronLeft className="text-[10px]" />
                    </button>
                    <div className="flex flex-1 items-center justify-center gap-1.5 min-w-0">
                      {OBJETIVOS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => swiperRef.current?.slideToLoop(i)}
                          className={`h-2 rounded-full transition-all ${
                            activeSlideIndex === i
                              ? "w-6 bg-[var(--primary-1)]"
                              : "w-2 bg-neutral-300 hover:bg-neutral-400"
                          }`}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slideNext()}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all hover:opacity-90"
                      style={{
                        background: "var(--primary-1)",
                        color: "white",
                        boxShadow: "0 2px 8px rgba(2, 51, 115, 0.3)",
                      }}
                      aria-label="Próximo"
                    >
                      <FaChevronRight className="text-[10px]" />
                    </button>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {objetivo && (
                    <motion.div
                      key={objetivo}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[var(--primary-1)]/15 to-[var(--primary-4)]/10 px-4 py-2.5"
                    >
                      <FaCheckCircle className="shrink-0 text-[10px]" style={{ color: "var(--primary-1)" }} />
                      <span className="text-[12px] font-medium text-[var(--primary-1)]">
                        {OBJETIVOS.find((o) => o.value === objetivo)?.confirmMsg}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.button
                  type="button"
                  onClick={goNext}
                  className="mt-4 w-full rounded-xl px-4 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[var(--primary-1)]/25 transition-all hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, var(--primary-1) 0%, var(--primary-4) 100%)" }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                >
                  Continuar · É rápido e grátis
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial={direction === "next" ? "enterNext" : "enterPrev"}
                animate="center"
                exit={direction === "next" ? "exitNext" : "exitPrev"}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="flex min-h-[400px] flex-col"
              >
                <motion.h3
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 }}
                  className="mb-1 text-xl font-bold tracking-tight text-neutral-900"
                >
                  Quase lá! Defina os detalhes
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="mb-1 text-[13px] text-neutral-500"
                >
                  Consórcio para {OBJETIVOS.find((o) => o.value === objetivo)?.label}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.06 }}
                  className="mb-5 flex flex-wrap gap-2"
                >
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                    style={{ background: "var(--primary-1)", color: "white" }}
                  >
                    100% Sem juros
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-600">
                    <FaCheckCircle style={{ color: "var(--primary-1)" }} />
                    Descubra sua economia · Sem compromisso
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mb-6"
                >
                  <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">Tipo</span>
                  <div className="inline-flex rounded-xl border border-neutral-200 bg-neutral-50/50 p-1">
                    <button
                      type="button"
                      onClick={() => { setTipo("parcela"); setValor(RANGES.parcela.min); }}
                      className={`rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-all ${
                        tipo === "parcela" ? "bg-[var(--primary-1)] text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      Parcela
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTipo("credito"); setValor(RANGES.credito.min); }}
                      className={`rounded-lg px-5 py-2.5 text-[13px] font-semibold transition-all ${
                        tipo === "credito" ? "bg-[var(--primary-1)] text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      Crédito
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mb-6"
                >
                  <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Valor {tipo === "parcela" ? "da parcela" : "da carta"}
                  </span>
                  <div className="mb-4 rounded-xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-white px-5 py-4 shadow-inner">
                    <span className="tabular-nums text-2xl font-bold tracking-tight text-[var(--primary-1)]">
                      {r.prefix}{valor.toLocaleString()}{r.suffix}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={r.min}
                    max={r.max}
                    step={r.step}
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer accent-[var(--primary-1)]"
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-neutral-400">
                    <span>{r.prefix}{r.min.toLocaleString()}{r.suffix}</span>
                    <span>{r.prefix}{r.max.toLocaleString()}{r.suffix}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mt-auto flex flex-col gap-2 pt-4"
                >
                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      onClick={goPrev}
                      className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[13px] font-semibold text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaChevronLeft className="text-[10px]" /> Voltar
                    </motion.button>
                    <motion.a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleSubmit}
                      className="flex-1 rounded-xl py-3.5 text-center text-[14px] font-bold text-white shadow-lg shadow-[var(--primary-1)]/25 transition-all hover:shadow-xl"
                      style={{ background: "linear-gradient(135deg, var(--primary-1) 0%, var(--primary-4) 100%)" }}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {clicked ? "Enviando..." : "Falar com especialista"}
                    </motion.a>
                  </div>
                  <p className="text-center text-[11px] text-neutral-400">
                    Resposta em minutos · 100% grátis
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
