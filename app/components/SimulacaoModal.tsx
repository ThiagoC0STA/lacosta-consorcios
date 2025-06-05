"use client";

import Modal from "./Modal";
import { useState } from "react";

interface SimulacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  conquista?: string;
  simulacao?: string;
  valor?: string;
}

export default function SimulacaoModal({
  isOpen,
  onClose,
  conquista,
  simulacao,
  valor,
}: SimulacaoModalProps) {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "" });

  // Mensagem WhatsApp
  const whatsappMsg = `Olá! Vim pelo seu site e gostaria de simular um consórcio${
    conquista ? ` de ${conquista}` : ""
  }${simulacao ? ` por ${simulacao}` : ""}${
    valor ? ` no valor de ${valor}` : ""
  }. Meu nome é ${form.nome}.`;
  const whatsappLink = `https://wa.me/5541991751000?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-3xl font-extrabold text-[color:var(--primary-1)] mb-1 text-left">
        Receba sua simulação
      </div>
      {(conquista || simulacao || valor) && (
        <div className="mb-4 mt-4 text-left text-sm text-gray-700">
          {conquista && (
            <div>
              <b>Conquista:</b> {conquista}
            </div>
          )}
          {simulacao && (
            <div>
              <b>Simulação por:</b> {simulacao}
            </div>
          )}
          {valor && (
            <div>
              <b>Valor:</b> {valor}
            </div>
          )}
        </div>
      )}
      <form className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="nome"
            className="text-xs font-semibold text-gray-700 mb-1"
          >
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="rounded-xl border text-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-5)] border-[color:var(--primary-5)] shadow-sm placeholder-gray-300"
            autoComplete="name"
          />
        </div>
        
        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="telefone"
            className="text-xs font-semibold text-gray-700 mb-1"
          >
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            className="rounded-xl border px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-5)] border-[color:var(--primary-5)] shadow-sm placeholder-gray-300"
            autoComplete="tel"
          />
        </div>
        <div className="flex flex-col gap-1 text-left">
          <label
            htmlFor="email"
            className="text-xs font-semibold text-gray-700 mb-1"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-xl border px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-5)] border-[color:var(--primary-5)] shadow-sm placeholder-gray-300"
            autoComplete="email"
          />
        </div>
        <button
          type="submit"
          className="rounded-full px-8 py-3 font-bold text-lg shadow-lg transition-all mt-2 w-full bg-gradient-to-r from-[color:var(--primary-1)] to-[color:var(--primary-5)] hover:scale-105 hover:shadow-2xl text-white"
        >
          Enviar simulação
        </button>
      </form>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center mt-6 underline font-semibold transition-all block text-[color:var(--primary-1)] hover:text-[color:var(--primary-5)]"
      >
        Converse pelo WhatsApp
      </a>
    </Modal>
  );
}
