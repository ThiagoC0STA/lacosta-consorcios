"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StarIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import Container from "./Container";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Proprietária de Apartamento",
    content:
      "Comprei meu primeiro apartamento através do consórcio. O processo foi muito tranquilo e a equipe me ajudou em cada etapa. Economizei R$ 45.000 comparado ao financiamento!",
    rating: 5,
    savings: "R$ 45.000",
    time: "8 meses",
  },
  {
    name: "João Santos",
    role: "Proprietário de Carro",
    content:
      "Realizei o sonho de ter meu carro zero. As taxas são justas e o atendimento é excelente. Fui contemplado em apenas 6 meses!",
    rating: 5,
    savings: "R$ 28.000",
    time: "6 meses",
  },
  {
    name: "Ana Oliveira",
    role: "Empresária",
    content:
      "Investi em meu negócio com tranquilidade. O consórcio me deu a segurança que eu precisava para crescer. Economia de R$ 60.000!",
    rating: 5,
    savings: "R$ 60.000",
    time: "12 meses",
  },
  {
    name: "Carlos Pereira",
    role: "Investidor",
    content:
      "A flexibilidade do consórcio me surpreendeu. Recomendo para quem quer investir com segurança. Economia significativa!",
    rating: 5,
    savings: "R$ 35.000",
    time: "10 meses",
  },
  {
    name: "Fernanda Souza",
    role: "Médica",
    content:
      "Fui muito bem atendida e consegui comprar meu consultório sem burocracia. Processo muito mais simples que no banco!",
    rating: 5,
    savings: "R$ 75.000",
    time: "15 meses",
  },
  {
    name: "Ricardo Lima",
    role: "Empreendedor",
    content:
      "O consórcio foi essencial para expandir minha empresa. Atendimento nota 10! Economia de R$ 50.000 no processo.",
    rating: 5,
    savings: "R$ 50.000",
    time: "9 meses",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function SwiperNavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick?: () => void;
}) {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex cursor-pointer rounded-full w-12 h-12 items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${dir === "prev" ? "-left-14 lg:-left-16" : "-right-14 lg:-right-16"}`}
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
      }}
      aria-label={dir === "prev" ? "Anterior" : "Próximo"}
      type="button"
      onClick={onClick}
    >
      {dir === "prev" ? (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      )}
      <span className="sr-only">{dir === "prev" ? "Anterior" : "Próximo"}</span>
    </button>
  );
}

export default function TestimonialsV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const swiperRef = useRef<any>(null);

  return (
    <section
      id="depoimentos"
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden scroll-mt-24 md:scroll-mt-0"
    >
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #021D40 0%, #022859 35%, #021D40 100%)",
        }}
      />
      {/* Radial glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(4, 135, 217, 0.45) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(3, 90, 166, 0.5) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-12" style={{ background: "radial-gradient(circle, rgba(4, 135, 217, 0.35) 0%, transparent 65%)" }} />
      </div>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0487D9] mb-4">
              Depoimentos reais
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-2 max-w-3xl mx-auto">
              Histórias de{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #0487D9 0%, #5BB8FF 50%, #0487D9 100%)",
                }}
              >
                sucesso
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-6">
              Veja o que nossos clientes têm a dizer
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/50"
            >
              <span className="inline-flex items-center gap-1">
                <span className="font-semibold text-white/70">R$ 2.5M+</span>
                <span>em economia</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1">
                <span className="font-semibold text-white/70">5.000+</span>
                <span>clientes</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1">
                <span className="font-semibold text-white/70">8.2 meses</span>
                <span>média contemplação</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Testimonial carousel - 2-3 cards per view */}
          <div className="relative">
            <SwiperNavButton dir="prev" onClick={() => swiperRef.current?.slidePrev()} />
            <SwiperNavButton dir="next" onClick={() => swiperRef.current?.slideNext()} />

            <Swiper
              modules={[Autoplay, Navigation, Pagination, A11y]}
              spaceBetween={20}
              loop={true}
              onSwiper={(swiper: any) => (swiperRef.current = swiper)}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".testimonials-v2-pagination" }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={t.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative h-full rounded-xl overflow-hidden p-5 flex flex-col min-h-[320px]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      className="absolute left-3 top-3 text-4xl font-serif text-white/[0.06] select-none leading-none"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      &ldquo;
                    </span>

                    <div className="relative flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #0487D9 0%, #035AA6 100%)",
                            boxShadow: "0 0 0 2px rgba(4, 135, 217, 0.3)",
                          }}
                        >
                          {getInitials(t.name)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{t.name}</p>
                          <p className="text-white/50 text-xs">{t.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-0.5 mb-2">
                        {[...Array(t.rating)].map((_, i) => (
                          <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                        ))}
                      </div>

                      <blockquote className="text-sm text-white/90 leading-relaxed mb-4 flex-1">
                        &ldquo;{t.content}&rdquo;
                      </blockquote>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold"
                          style={{
                            background: "rgba(16, 185, 129, 0.2)",
                            color: "#34d399",
                            border: "1px solid rgba(52, 211, 153, 0.3)",
                          }}
                        >
                          {t.savings}
                        </span>
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold"
                          style={{
                            background: "rgba(59, 130, 246, 0.2)",
                            color: "#60a5fa",
                            border: "1px solid rgba(96, 165, 250, 0.3)",
                          }}
                        >
                          {t.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center mt-4">
              <div className="testimonials-v2-pagination swiper-pagination testimonials-v2 flex gap-2" />
            </div>
          </div>

        </div>
      </Container>

      <style jsx global>{`
        .testimonials-v2.swiper-pagination {
          position: static !important;
        }
        .testimonials-v2 .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.3) !important;
          opacity: 1;
          margin: 0 4px !important;
          transition: all 0.3s;
        }
        .testimonials-v2 .swiper-pagination-bullet-active {
          background: #0487D9 !important;
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(4, 135, 217, 0.6);
        }
      `}</style>
    </section>
  );
}
