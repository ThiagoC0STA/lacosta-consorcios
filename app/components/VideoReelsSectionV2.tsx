"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import { FaYoutube, FaLightbulb, FaUsers, FaChartLine, FaChevronUp, FaChevronDown } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import Container from "./Container";

import "swiper/css";

/* Defer YouTube iframes until section is in view to avoid i.ytimg.com preconnects on initial load.
 * Pablo Marcál video first. */
const videoShorts = [
  { id: "1UMiK9nZxfI", embedUrl: "https://www.youtube-nocookie.com/embed/1UMiK9nZxfI", title: "Pablo Marcál fala sobre consórcio como investimento inteligente" },
  { id: "6nOewFgXIy4", embedUrl: "https://www.youtube-nocookie.com/embed/6nOewFgXIy4", title: "Dicas práticas sobre consórcio de imóvel e veículo" },
  { id: "KO0Hpkn4r94", embedUrl: "https://www.youtube-nocookie.com/embed/KO0Hpkn4r94", title: "Depoimento de cliente contemplado em consórcio Servopa" },
  { id: "gfOn6u1I4xs", embedUrl: "https://www.youtube-nocookie.com/embed/gfOn6u1I4xs", title: "Como funciona a contemplação no consórcio" },
  { id: "vyZxbxuUZ5g", embedUrl: "https://www.youtube-nocookie.com/embed/vyZxbxuUZ5g", title: "Vantagens do consórcio vs financiamento tradicional" },
  { id: "C0qW0ldci2E", embedUrl: "https://www.youtube-nocookie.com/embed/C0qW0ldci2E", title: "Novidades do mercado de consórcios no Brasil" },
];

const benefits = [
  {
    icon: <FaLightbulb className="text-2xl" />,
    title: "Dicas Importantes",
    description: "Conteúdos educativos e práticos selecionados sobre consórcios.",
  },
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Depoimentos Reais",
    description: "Histórias de pessoas que realizaram seus sonhos com consórcios.",
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    title: "Informações Atualizadas",
    description: "Conteúdos sobre as últimas novidades e tendências do mercado.",
  },
];

export default function VideoReelsSectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [reelsRef, reelsInView] = useInView({
    triggerOnce: true,
    rootMargin: "150px",
    threshold: 0,
  });
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const handleSlideChange = (swiper: SwiperType) => setActiveIndex(swiper.activeIndex);

  useEffect(() => {
    iframeRefs.current.forEach((iframe, index) => {
      if (iframe && index === activeIndex) {
        const video = videoShorts[index];
        iframe.src = `${video.embedUrl}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`;
      } else if (iframe && index !== activeIndex) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
      }
    });
  }, [activeIndex]);

  const handleNavClick = (direction: "prev" | "next") => {
    if (direction === "prev") swiperRef.current?.slidePrev();
    else swiperRef.current?.slideNext();
  };

  const videoSchemas = videoShorts.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: `Conteúdo sobre consórcio: ${v.title}. Dicas e informações sobre consórcios Servopa e Rodobens.`,
    thumbnailUrl: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    uploadDate: "2025-01-01",
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: v.embedUrl,
    publisher: {
      "@type": "Organization",
      name: "Lacosta Consórcios",
      url: "https://www.lacostaconsorcios.com.br",
    },
  }));

  return (
    <section
      id="conteudos"
      className="relative py-12 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden scroll-mt-20 md:scroll-mt-0"
    >
      {videoSchemas.map((schema, i) => (
        <script
          key={`video-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <Container className="relative z-10" padding={false}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left - same design as original */}
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
                className="inline-block mb-6"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-bold shadow-lg">
                  <FaYoutube className="text-base" />
                  Conteúdos selecionados
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-2">
                Conteúdos sobre{" "}
                <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                  consórcio e investimento
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                Confira <strong className="text-red-700 font-bold">vídeos selecionados</strong> com dicas,{" "}
                <strong className="text-red-700 font-bold">depoimentos</strong> e informações sobre consórcios!
              </p>
              <div className="space-y-6 mt-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-red-600 flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Reels (deferred until in view to avoid YouTube preconnects) */}
            <motion.div
              ref={reelsRef}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[460px] mx-auto lg:mx-0 lg:ml-auto"
            >
              {!reelsInView ? (
                <div
                  className="h-[480px] md:h-[560px] lg:h-[620px] rounded-2xl bg-neutral-200 animate-pulse"
                  aria-hidden="true"
                />
              ) : (
                <>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
                <button
                  onClick={() => handleNavClick("prev")}
                  disabled={activeIndex === 0}
                  className={`bg-white/90 hover:bg-white rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${
                    activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Vídeo anterior"
                >
                  <FaChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
                </button>
                <button
                  onClick={() => handleNavClick("next")}
                  disabled={activeIndex === videoShorts.length - 1}
                  className={`bg-white/90 hover:bg-white rounded-full p-2 md:p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${
                    activeIndex === videoShorts.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Próximo vídeo"
                >
                  <FaChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
                </button>
              </div>

              <Swiper
                modules={[Mousewheel, Keyboard]}
                direction="vertical"
                spaceBetween={20}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
                mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
                keyboard={{ enabled: true }}
                className="h-[480px] md:h-[560px] lg:h-[620px] rounded-2xl overflow-hidden shadow-xl"
              >
                {videoShorts.map((video, index) => (
                  <SwiperSlide key={`${video.id}-${index}`}>
                    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
                      <iframe
                        ref={(el) => { if (el) iframeRefs.current[index] = el; }}
                        src={`${video.embedUrl}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex justify-center gap-2 mt-4">
                {videoShorts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === i ? "w-6 bg-red-600" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Vídeo ${i + 1}`}
                  />
                ))}
              </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
