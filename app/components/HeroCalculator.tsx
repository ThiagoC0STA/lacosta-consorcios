"use client";

import { useState } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { WHATSAPP_PHONE_NUMBER } from "../lib/constants";
import Image from "next/image";

const conquistas = [
  { label: "Um imóvel", value: "imoveis" },
  { label: "Um veículo", value: "veiculos" },
  { label: "Quero fazer um investimento", value: "investimento" },
  { label: "Serviços", value: "servicos" },
];

export default function HeroCalculator() {
  const [conquista, setConquista] = useState("imoveis");
  const [tipo, setTipo] = useState<"parcela" | "credito">("credito");
  const [valor, setValor] = useState(100000);

  const ranges = {
    parcela: { min: 200, max: 10000, step: 50, prefix: "R$ ", sufix: ",00" },
    credito: {
      min: 20000,
      max: 5000000,
      step: 20000,
      prefix: "R$ ",
      sufix: ",00",
    },
  };
  const r = ranges[tipo];

  // Mensagem WhatsApp
  const whatsappMsg = `Olá! Vim pelo seu site e gostaria de simular um consórcio de ${
    conquistas.find((c) => c.value === conquista)?.label
  }. Quero simular por ${
    tipo === "parcela" ? "parcela" : "crédito"
  } no valor de ${r.prefix}${valor.toLocaleString()}${r.sufix}.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  const handleSimulationClick = () => {
    // @ts-expect-error - gtag_report_conversion is defined globally
    if (typeof window.gtag_report_conversion === "function") {
      // @ts-expect-error - gtag_report_conversion is defined globally
      window.gtag_report_conversion(whatsappLink);
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-xl p-5 sm:p-8 px-4 sm:px-10 flex flex-col gap-5 sm:gap-7 max-w-lg w-full bg-white/90 backdrop-blur-md relative overflow-hidden">
        {/* Banner de urgência no topo */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 text-center font-bold text-sm">
          <div className="flex items-center justify-center gap-2">
            <span>
              <span className="animate-bounce">🎁</span> BÔNUS ESPECIAL:
              Consultoria gratuita + análise personalizada
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p
            className="text-[28px] sm:text-3xl font-extrabold md:text-left text-center"
            style={{ color: "var(--primary-2)" }}
          >
            Simule seu consórcio
          </p>
        </div>

        {/* Seleção de conquista - agora um selectbox estilizado */}
        <div className="mb-2 -mt-3">
          <label className="block text-xs sm:text-sm text-gray-700 font-semibold mb-2">
            O que você deseja conquistar?
          </label>
          <div className="relative">
            <select
              value={conquista}
              onChange={(e) => setConquista(e.target.value)}
              className="appearance-none w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 rounded-xl border border-[color:var(--primary-1)] bg-white text-[color:var(--primary-1)] font-bold text-sm sm:text-base shadow focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-1)] transition-all"
            >
              {conquistas.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--primary-1)] pointer-events-none" />
          </div>
        </div>

        {/* Escolha entre parcela ou crédito */}
        <div className="flex gap-2 justify-center mb-2">
          <button
            onClick={() => {
              setTipo("parcela");
              setValor(ranges.parcela.min);
            }}
            className={`flex-1 px-2 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all border shadow-sm ${
              tipo === "parcela"
                ? "bg-gradient-to-r from-[color:var(--primary-1)] to-[color:var(--primary-5)] text-white scale-105"
                : "bg-white text-[color:var(--primary-1)] border-[color:var(--primary-1)]"
            }`}
          >
            Parcela
          </button>
          <button
            onClick={() => {
              setTipo("credito");
              setValor(ranges.credito.min);
            }}
            className={`flex-1 px-2 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all border shadow-sm ${
              tipo === "credito"
                ? "bg-gradient-to-r from-[color:var(--primary-1)] to-[color:var(--primary-5)] text-white scale-105"
                : "bg-white text-[color:var(--primary-1)] border-[color:var(--primary-1)]"
            }`}
          >
            Crédito
          </button>
        </div>

        {/* Slider único */}
        <div className="mt-2">
          <label
            htmlFor="valor"
            className="block text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 font-semibold"
          >
            Escolha o valor da{" "}
            {tipo === "parcela" ? "parcela" : "carta de crédito"}:
          </label>
          <div className="flex flex-col items-center gap-2 relative">
            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 px-1 mb-2">
                <span>
                  {r.prefix}
                  {r.min.toLocaleString()}
                  {r.sufix}
                </span>
                <span>
                  {r.prefix}
                  {r.max.toLocaleString()}
                  {r.sufix}
                </span>
              </div>
              <input
                id="valor"
                type="range"
                min={r.min}
                max={r.max}
                step={r.step}
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-[var(--primary-2)] to-[var(--primary-5)] accent-[color:var(--primary-5)]"
                style={{ accentColor: "var(--primary-5)" }}
              />
            </div>
            <span
              className="text-3xl sm:text-4xl font-extrabold mt-3 sm:mt-4"
              style={{ color: "var(--primary-1)" }}
            >
              {r.prefix}
              {valor.toLocaleString()}
              {r.sufix}
            </span>
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSimulationClick}
          className="rounded-full px-6 sm:px-8 py-4 font-bold text-base sm:text-lg shadow-lg transition-all w-full bg-gradient-to-r from-[color:var(--primary-1)] to-[color:var(--primary-5)] hover:scale-105 hover:shadow-2xl text-white text-center block relative overflow-hidden group border-none"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FaStar className="animate-pulse" />
            SIMULAR AGORA - É GRÁTIS!
            <FaStar className="animate-pulse" />
          </span>
        </a>

        {/* Logos Parceiros */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 flex justify-center">
              <Image
                src="/consorcio-servopa0.png"
                alt="Servopa Consórcios"
                width={100}
                height={40}
                quality={100}
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex-1 flex justify-center">
              <Image
                src="/rodobens.jpg"
                alt="Rodobens"
                width={110}
                height={45}
                quality={100}
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 100% seguro • 📱 Atendimento via WhatsApp
          </p>
        </div>
      </div>
    </>
  );
}
