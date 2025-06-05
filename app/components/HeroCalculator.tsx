"use client";

import { useState } from "react";

export default function HeroCalculator() {
  const [valor, setValor] = useState(1000);
  const [meses, setMeses] = useState(60);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", email: "" });

  const carta = valor * meses;
  const whatsappMsg = `Olá! Gostaria de simular um consórcio. Quero pagar R$${valor}/mês por ${meses} meses. Meu nome é ${form.nome}.`;
  const whatsappLink = `https://wa.me/SEUNUMERO?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 max-w-lg w-full border border-blue-100">
      <h3 className="text-2xl font-extrabold text-blue-700 mb-2 text-center">Simule seu consórcio</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1 font-semibold">Valor mensal</label>
          <input
            type="number"
            min={100}
            step={50}
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1 font-semibold">Meses</label>
          <input
            type="number"
            min={12}
            max={180}
            step={1}
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
          />
        </div>
      </div>
      <div className="text-gray-700 text-base mt-1 text-center">
        Carta de crédito estimada:<br />
        <span className="font-extrabold text-2xl text-blue-700">R${carta.toLocaleString()}</span>
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-2 bg-blue-600 text-white rounded-full px-8 py-3 font-bold text-lg shadow-lg hover:bg-blue-700 transition-all w-full"
      >
        Simular agora
      </button>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center mt-2 underline text-blue-700 font-semibold hover:text-blue-900 transition-all"
      >
        Simular pelo WhatsApp
      </a>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full relative animate-fade-in border border-blue-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h4 className="text-xl font-bold mb-6 text-blue-700 text-center">
              Preencha seus dados para receber a simulação
            </h4>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="rounded-xl border border-gray-200 px-4 py-3 text-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className="rounded-xl border border-gray-200 px-4 py-3 text-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-gray-200 px-4 py-3 text-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-full px-8 py-3 font-bold text-lg shadow-lg hover:bg-blue-700 transition-all mt-2 w-full"
              >
                Enviar simulação
              </button>
            </form>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center mt-6 underline text-blue-700 font-semibold hover:text-blue-900 transition-all block"
            >
              Simular pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
