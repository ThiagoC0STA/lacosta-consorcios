"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-white/80 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow">
            L
          </span>
          Lacosta
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link
            href="#simulacao"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Simulação
          </Link>
          <Link
            href="#como-funciona"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Como funciona
          </Link>
          <Link
            href="#vantagens"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Vantagens
          </Link>
          <Link
            href="#contato"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contato
          </Link>
        </nav>
        <Link
          href="#simulacao"
          className="hidden md:inline-block ml-6 bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all"
        >
          Simule Agora
        </Link>
        <button
          className="md:hidden ml-2 p-2 rounded-full hover:bg-blue-50 transition"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 shadow-lg flex flex-col items-center gap-4 py-6 animate-fade-in z-50">
          <Link
            href="#simulacao"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Simulação
          </Link>
          <Link
            href="#como-funciona"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Como funciona
          </Link>
          <Link
            href="#vantagens"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Vantagens
          </Link>
          <Link
            href="#contato"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Contato
          </Link>
          <Link
            href="#simulacao"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all mt-2"
            onClick={() => setOpen(false)}
          >
            Simule Agora
          </Link>
        </div>
      )}
    </header>
  );
}
