"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StarIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { FaRegLightbulb, FaTrophy, FaHandshake, FaShieldAlt, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
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
  {
    name: "Patrícia Gomes",
    role: "Arquiteta",
    content:
      "Consegui financiar meu escritório com taxas muito melhores que no banco. Economia de R$ 40.000 e processo muito mais rápido!",
    rating: 5,
    savings: "R$ 40.000",
    time: "7 meses",
  },
  {
    name: "Eduardo Alves",
    role: "Professor",
    content:
      "A equipe foi muito transparente e me ajudou a entender todo o processo. Comprei minha casa com economia de R$ 55.000!",
    rating: 5,
    savings: "R$ 55.000",
    time: "11 meses",
  },
  {
    name: "Juliana Costa",
    role: "Designer",
    content: "O consórcio me permitiu conquistar meu carro novo sem apertos. Economia de R$ 25.000 e contemplação rápida!",
    rating: 5,
    savings: "R$ 25.000",
    time: "5 meses",
  },
];

function SwiperNavButton({ dir, onClick }: { dir: "prev" | "next"; onClick?: () => void }) {
  return (
    <button
      className={`hidden cursor-pointer md:flex absolute top-[29%] -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center border-2 border-[var(--primary-1)] text-[var(--primary-1)] hover:bg-[var(--primary-1)] hover:text-white transition-all duration-200 ${dir === "prev" ? "-left-16" : "-right-16"}`}
      aria-label={dir === "prev" ? "Anterior" : "Próximo"}
      type="button"
      onClick={onClick}
      style={{ outline: "none" }}
    >
      {dir === "prev" ? (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </button>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-8 pt-14 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Elementos visuais decorativos */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--primary-1)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--primary-4)]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--primary-1)]/5 rounded-full blur-2xl" />
        {/* Ícones decorativos */}
        <FaTrophy className="absolute top-10 left-10 text-[var(--primary-1)]/10" size={80} />
        <FaHandshake className="absolute bottom-10 right-10 text-[var(--primary-4)]/10" size={90} />
        <FaShieldAlt className="absolute top-1/2 left-24 text-[var(--primary-1)]/10" size={70} />
        <FaRegLightbulb className="absolute top-1/3 right-24 text-[var(--primary-4)]/10" size={80} />
        <StarIcon className="absolute bottom-1/4 left-1/4 text-[var(--primary-1)]/10" style={{width: 60, height: 60}} />
      </div>
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Histórias de sucesso
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Veja o que nossos clientes têm a dizer
          </p>
          
          {/* Estatísticas de prova social */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaMoneyBillWave className="text-green-600 text-xl" />
                <span className="text-2xl font-bold text-green-600">R$ 2.5M+</span>
              </div>
              <p className="text-sm text-gray-600">Economia total dos clientes</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaCheckCircle className="text-blue-600 text-xl" />
                <span className="text-2xl font-bold text-blue-600">5.000+</span>
              </div>
              <p className="text-sm text-gray-600">Clientes satisfeitos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaTrophy className="text-orange-600 text-xl" />
                <span className="text-2xl font-bold text-orange-600">8.2</span>
              </div>
              <p className="text-sm text-gray-600">Meses média contemplação</p>
            </div>
          </div>
        </motion.div>
        
        <div className="relative">
          {/* Setas customizadas */}
          <SwiperNavButton dir="prev" onClick={() => swiperRef.current?.slidePrev()} />
          <SwiperNavButton dir="next" onClick={() => swiperRef.current?.slideNext()} />
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={32}
            loop={true}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow flex flex-col h-full min-h-[420px] border border-gray-100 hover:border-[var(--primary-1)]/40 transition-all group relative"
                >
                  {/* Aspas estilizadas */}
                  <span className="absolute left-6 top-6 text-5xl text-[var(--primary-1)]/10 select-none pointer-events-none">&quot;</span>
                  
                  {/* Avatar com iniciais */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary-1)] to-[var(--primary-4)] flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg border-4 border-white -mt-6 mx-auto">
                    {getInitials(testimonial.name)}
                  </div>
                  
                  <div className="flex mb-6 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-6 w-6 text-yellow-400 drop-shadow" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic flex-1 text-lg text-center">
                    {testimonial.content}
                  </p>
                  
                  {/* Destaques de economia e tempo */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                      <p className="text-sm text-green-600 font-semibold">Economia</p>
                      <p className="text-lg font-bold text-green-800">{testimonial.savings}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                      <p className="text-sm text-blue-600 font-semibold">Contemplação</p>
                      <p className="text-lg font-bold text-blue-800">{testimonial.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <h4 className="font-semibold text-[var(--primary-1)] text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Paginação centralizada */}
          <div className="flex justify-center">
            <div className="swiper-pagination" />
          </div>
        </div>
        
        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              🎉 Junte-se aos +5.000 clientes satisfeitos!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Economia média de R$ 45.000 por cliente. Seja o próximo a conquistar seus sonhos!
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleWhatsAppClick(WHATSAPP_LINK, e)}
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              QUERO ECONOMIZAR TAMBÉM! 💰
            </a>
          </div>
        </motion.div>
      </Container>
      <style jsx global>{`
        .swiper-pagination {
          position: static !important;
        }
        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 4px;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary-1);
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
