"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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
  const whatsappLink = `https://wa.me/554130761050?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  return (
    <>
      <div className="rounded-xl shadow-xl p-5 sm:p-8 px-4 sm:px-10 flex flex-col gap-5 sm:gap-7 max-w-lg w-full border bg-white/90 backdrop-blur-md">
        <h3
          className="text-[28px] sm:text-3xl font-extrabold md:text-left text-center"
          style={{ color: "var(--primary-2)" }}
        >
          Simule seu consórcio
        </h3>
        {/* Seleção de conquista - agora um selectbox estilizado */}
        <div className="mb-2">
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
          </button>x
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
          <label className="block text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 font-semibold">
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
          className="rounded-full px-6 sm:px-8 py-3 font-bold text-base sm:text-lg shadow-lg transition-all w-full bg-gradient-to-r from-[color:var(--primary-1)] to-[color:var(--primary-5)] hover:scale-105 hover:shadow-2xl text-white text-center block"
        >
          Simular agora
        </a>
      </div>
    </>
  );
}
