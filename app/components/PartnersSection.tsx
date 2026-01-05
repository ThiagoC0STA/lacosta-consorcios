"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaShieldAlt,
  FaHandshake,
  FaAward,
  FaBuilding,
  FaCheckDouble,
  FaCertificate,
  FaStar,
} from "react-icons/fa";
import { WHATSAPP_PHONE_NUMBER, handleWhatsAppClick } from "../lib/constants";
import Container from "./Container";

export default function PartnersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: FaShieldAlt,
      text: "Consórcios 100% seguros e regulamentados",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      icon: FaHandshake,
      text: "Parcerias com as melhores administradoras do mercado",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: FaAward,
      text: "Tradição e credibilidade comprovadas",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Strong background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 opacity-100" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzMGg2djZIMzZ6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Trabalhamos com as{" "}
            <span className="text-primary-700">melhores administradoras</span>{" "}
            do Brasil
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Na{" "}
            <strong className="text-primary-700 font-bold">
              Lacosta Consórcios
            </strong>
            , oferecemos apenas consórcios de empresas{" "}
            <strong className="text-primary-700 font-bold">
              reconhecidas e confiáveis
            </strong>
            , garantindo segurança total para seus investimentos.
          </p>
        </motion.div>

        {/* Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10  mx-auto mb-16"
        >
          {/* Servopa Card */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
              "Olá! Vim pelo site e tenho interesse em consórcios da Servopa."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                "Olá! Vim pelo site e tenho interesse em consórcios da Servopa."
              )}`;
              handleWhatsAppClick(url, e);
            }}
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-primary-100 hover:border-primary-400 transition-all duration-300 relative overflow-hidden cursor-pointer block"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 shadow-lg">
                <Image
                  src="/consorcio-servopa0.png"
                  alt="Servopa Consórcios"
                  width={200}
                  height={80}
                  quality={100}
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  Consultor autorizado
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                Servopa Consórcios
              </h3>
              <p className="text-gray-700 text-base leading-relaxed font-medium">
                Uma das maiores e mais respeitadas administradoras de consórcios
                do país, com décadas de experiência e milhares de contemplados.
              </p>
              <div className="mt-4 flex items-center gap-1 text-yellow-500">
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
              </div>
            </div>
          </motion.a>

          {/* Rodobens Card */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
              "Olá! Vim pelo site e tenho interesse em consórcios da Rodobens."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                "Olá! Vim pelo site e tenho interesse em consórcios da Rodobens."
              )}`;
              handleWhatsAppClick(url, e);
            }}
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rodobens-card bg-white rounded-3xl shadow-2xl p-10 border-4 transition-all duration-300 relative overflow-hidden cursor-pointer block"
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(20, 121, 124, 0.1), transparent)",
              }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className="mb-6 p-6 rounded-2xl border-2 shadow-lg"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(20, 121, 124, 0.1), rgba(20, 121, 124, 0.05))",
                  borderColor: "rgba(20, 121, 124, 0.3)",
                }}
              >
                <Image
                  src="/rodobens.jpg"
                  alt="Rodobens"
                  width={220}
                  height={90}
                  quality={100}
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="px-3 py-1 text-xs font-bold rounded-full"
                  style={{
                    backgroundColor: "rgba(20, 121, 124, 0.15)",
                    color: "#14797C",
                  }}
                >
                  Representante autorizado
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                Rodobens
              </h3>
              <p className="text-gray-700 text-base leading-relaxed font-medium">
                Referência nacional em consórcios, com tradição, solidez e
                compromisso com a realização dos sonhos dos brasileiros.
              </p>
              <div className="mt-4 flex items-center gap-1 text-yellow-500">
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
                <FaStar className="text-sm" />
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-gray-300 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <IconComponent className={`text-white text-2xl`} />
                </div>
                <p className="text-gray-800 font-bold text-base md:text-lg leading-relaxed">
                  {benefit.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <FaBuilding className="text-white text-4xl" />
              </div>
              <div className="text-white text-4xl md:text-5xl font-extrabold mb-2">
                +25 anos
              </div>
              <div className="text-gray-300 text-base font-semibold">
                de experiência
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <FaCertificate className="text-white text-4xl" />
              </div>
              <div className="text-white text-4xl md:text-5xl font-extrabold mb-2">
                100%
              </div>
              <div className="text-gray-300 text-base font-semibold">
                regulamentado
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <FaCheckDouble className="text-white text-4xl" />
              </div>
              <div className="text-white text-4xl md:text-5xl font-extrabold mb-2">
                +5.000
              </div>
              <div className="text-gray-300 text-base font-semibold">
                sonhos realizados
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-900 text-xl md:text-2xl font-bold mb-3">
            ✨ Consórcios seguros, administradoras confiáveis, sonhos realizados
          </p>
          <p className="text-gray-700 text-base md:text-lg font-medium">
            Conte com a experiência e credibilidade das melhores do mercado
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
