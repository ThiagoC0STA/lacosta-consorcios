"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import { useRef } from "react";
import {
  FaArrowRight,
  FaFire,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import Container from "./Container";
import OpportunityCard from "./OpportunityCard";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { trackButtonClick } from "../lib/analytics";

import "swiper/css";
import "swiper/css/pagination";

const OPPORTUNITIES = [
  {
    src: "/oportunidade/1.jpg",
    alt: "Consórcio de Automóvel - Crédito R$ 70 mil - Parcela flex R$ 546",
  },
  {
    src: "/oportunidade/2.jpg",
    alt: "Consórcio de Automóvel - Crédito R$ 150 mil - Parcela flex R$ 737",
  },
  {
    src: "/oportunidade/3.jpg",
    alt: "Consórcio de Automóvel - Crédito R$ 180 mil - Parcela flex R$ 900",
  },
  {
    src: "/oportunidade/4.jpg",
    alt: "Consórcio de Imóvel - Crédito R$ 1 milhão - Parcela flex R$ 2.683",
  },
  {
    src: "/oportunidade/5.jpg",
    alt: "Consórcio de Imóvel - Crédito R$ 250 mil - Parcela flex R$ 676",
  },
  {
    src: "/oportunidade/6.jpg",
    alt: "Consórcio de Reforma - Crédito R$ 80 mil - Parcela flex R$ 217",
  },
];

const cardEase = [0.25, 0.46, 0.45, 0.94] as const;

function NavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 hidden md:flex w-11 h-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/80 hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
        dir === "prev" ? "left-1 lg:-left-5" : "right-1 lg:-right-5"
      }`}
      aria-label={dir === "prev" ? "Previous opportunity" : "Next opportunity"}
      type="button"
    >
      {dir === "prev" ? (
        <FaChevronLeft className="w-3.5 h-3.5 text-gray-700" />
      ) : (
        <FaChevronRight className="w-3.5 h-3.5 text-gray-700" />
      )}
    </button>
  );
}

export default function OpportunitiesCarouselV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="oportunidades"
      className="relative py-16 sm:py-24 md:py-28 overflow-hidden scroll-mt-24 md:scroll-mt-0"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-100/40 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/30 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <Container padding={false}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: cardEase }}
            className="text-center mb-10 sm:mb-14 px-4 sm:px-6 lg:px-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50/80 px-4 py-2 mb-6 backdrop-blur-sm"
            >
              <FaFire className="text-red-500 text-sm" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">
                Oportunidades do mês
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-4 max-w-4xl mx-auto">
              Ofertas{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #035AA6 0%, #0487D9 50%, #5BB8FF 100%)",
                }}
              >
                imperdíveis
              </span>{" "}
              para você
            </h2>

            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Parcelas que cabem no seu bolso. Deslize para conhecer todas as
              oportunidades disponíveis.
            </p>
          </motion.div>
        </Container>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: cardEase }}
          className="relative max-w-[1536px] mx-auto"
        >
          <div className="px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="relative">
              <NavButton
                dir="prev"
                onClick={() => swiperRef.current?.slidePrev()}
              />
              <NavButton
                dir="next"
                onClick={() => swiperRef.current?.slideNext()}
              />

              <Swiper
                modules={[Pagination, Autoplay, A11y]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  el: ".opportunities-pagination",
                }}
                loopAdditionalSlides={2}
                breakpoints={{
                  0: {
                    slidesPerView: 1.3,
                    spaceBetween: 14,
                    centeredSlides: true,
                  },
                  480: {
                    slidesPerView: 1.8,
                    spaceBetween: 16,
                    centeredSlides: true,
                  },
                  640: {
                    slidesPerView: 2.8,
                    spaceBetween: 18,
                    centeredSlides: false,
                  },
                  768: {
                    slidesPerView: 3.3,
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    centeredSlides: false,
                  },
                  1280: {
                    slidesPerView: 4.5,
                    spaceBetween: 28,
                    centeredSlides: false,
                  },
                }}
                className="opportunities-swiper !py-4"
              >
                {OPPORTUNITIES.map((opp, idx) => (
                  <SwiperSlide key={opp.src} className="!h-auto">
                    <OpportunityCard
                      src={opp.src}
                      alt={opp.alt}
                      index={idx}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="opportunities-pagination flex gap-2" />
          </div>
        </motion.div>

        {/* CTA */}
        <Container padding={false}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: cardEase }}
            className="mt-10 sm:mt-14 text-center px-4 sm:px-6 lg:px-8"
          >
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                trackButtonClick(
                  "oportunidades_cta",
                  "opportunities_section"
                );
                handleWhatsAppClick(
                  WHATSAPP_LINK,
                  e,
                  "opportunities_section"
                );
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#035AA6] to-[#0487D9] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#035AA6]/25 transition-all hover:brightness-110 sm:px-10 sm:py-5 sm:text-lg"
            >
              Quero aproveitar uma oferta
              <FaArrowRight className="text-lg" />
            </motion.a>
          </motion.div>
        </Container>
      </div>

      <style jsx global>{`
        .opportunities-swiper .swiper-slide {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @media (max-width: 639px) {
          .opportunities-swiper .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.93);
          }
        }
        .opportunities-pagination {
          position: static !important;
          display: flex !important;
          justify-content: center !important;
          width: 100% !important;
        }
        .opportunities-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db !important;
          opacity: 1;
          margin: 0 4px !important;
          transition: all 0.3s;
          border-radius: 999px;
        }
        .opportunities-pagination .swiper-pagination-bullet-active {
          background: var(--primary-1) !important;
          width: 24px;
          box-shadow: 0 0 8px rgba(2, 51, 115, 0.35);
        }
      `}</style>
    </section>
  );
}
