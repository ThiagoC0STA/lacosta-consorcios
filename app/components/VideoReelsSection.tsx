"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import { FaYoutube, FaLightbulb, FaUsers, FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import Container from "./Container";

import "swiper/css";
import "swiper/css/pagination";

const videoShorts = [
  {
    id: "C0qW0ldci2E",
    url: "https://www.youtube.com/shorts/C0qW0ldci2E",
    embedUrl: "https://www.youtube.com/embed/C0qW0ldci2E",
  },
  {
    id: "6nOewFgXIy4",
    url: "https://www.youtube.com/shorts/6nOewFgXIy4",
    embedUrl: "https://www.youtube.com/embed/6nOewFgXIy4",
  },
  {
    id: "KO0Hpkn4r94",
    url: "http://youtube.com/shorts/KO0Hpkn4r94",
    embedUrl: "https://www.youtube.com/embed/KO0Hpkn4r94",
  },
  {
    id: "gfOn6u1I4xs",
    url: "https://www.youtube.com/shorts/gfOn6u1I4xs",
    embedUrl: "https://www.youtube.com/embed/gfOn6u1I4xs",
  },
  {
    id: "vyZxbxuUZ5g",
    url: "https://www.youtube.com/shorts/vyZxbxuUZ5g",
    embedUrl: "https://www.youtube.com/embed/vyZxbxuUZ5g",
  },
  {
    id: "1UMiK9nZxfI",
    url: "https://www.youtube.com/shorts/1UMiK9nZxfI",
    embedUrl: "https://www.youtube.com/embed/1UMiK9nZxfI",
  },
];

const benefits = [
  {
    icon: <FaLightbulb className="text-4xl" />,
    title: "Dicas Importantes",
    description: "Conteúdos educativos e práticos selecionados sobre consórcios.",
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: "Depoimentos Reais",
    description: "Histórias de pessoas que realizaram seus sonhos com consórcios.",
  },
  {
    icon: <FaChartLine className="text-4xl" />,
    title: "Informações Atualizadas",
    description: "Conteúdos sobre as últimas novidades e tendências do mercado.",
  },
];

export default function VideoReelsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    setActiveIndex(newIndex);
  };

  // Atualizar iframes quando activeIndex mudar
  useEffect(() => {
    iframeRefs.current.forEach((iframe, index) => {
      if (iframe && index === activeIndex) {
        // Recarregar o iframe com autoplay para o vídeo ativo
        const video = videoShorts[index];
        iframe.src = `${video.embedUrl}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;
      } else if (iframe && index !== activeIndex) {
        // Pausar vídeos não ativos
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      }
    });
  }, [activeIndex]);

  const handleNavClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      swiperRef.current?.slidePrev();
    } else {
      swiperRef.current?.slideNext();
    }
  };

  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden scroll-mt-20 md:scroll-mt-0">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <Container className="relative z-10" padding={false}>
        <div className="pl-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-bold shadow-xl">
                <FaYoutube className="text-base" />
                Conteúdos selecionados
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Descubra{" "}
              <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                dicas e conteúdos
              </span>{" "}
              sobre consórcios
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              Confira <strong className="text-red-700 font-bold">vídeos selecionados</strong> com dicas,{" "}
              <strong className="text-red-700 font-bold">depoimentos</strong> e informações sobre consórcios!
            </p>

            {/* Benefits List */}
            <div className="space-y-6 mt-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-red-600 flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Side - Vertical Video Reels */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Navigation Arrows */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
              <button
                onClick={() => handleNavClick('prev')}
                disabled={activeIndex === 0}
                className={`bg-white/90 hover:bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
                  activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Previous video"
              >
                <FaChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
              </button>
              <button
                onClick={() => handleNavClick('next')}
                disabled={activeIndex === videoShorts.length - 1}
                className={`bg-white/90 hover:bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
                  activeIndex === videoShorts.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Next video"
              >
                <FaChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
              </button>
            </div>

            <Swiper
              modules={[Pagination, Mousewheel, Keyboard]}
              direction="vertical"
              spaceBetween={20}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-red-600 !opacity-50",
                bulletActiveClass: "swiper-pagination-bullet-active !opacity-100",
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              keyboard={{
                enabled: true,
              }}
              className="h-[550px] md:h-[650px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl"
            >
              {videoShorts.map((video, index) => {
                // Inicia todos com autoplay=0, o useEffect vai atualizar para autoplay=1 quando ativo
                return (
                  <SwiperSlide key={`${video.id}-${index}`}>
                    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
                      <iframe
                        ref={(el) => {
                          if (el) iframeRefs.current[index] = el;
                        }}
                        src={`${video.embedUrl}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
                        title={`YouTube Short ${index + 1}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {/* Overlay gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Custom pagination dots */}
            <div className="flex justify-center gap-2 mt-4">
              {videoShorts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-red-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
        </div>
      </Container>
    </section>
  );
}

