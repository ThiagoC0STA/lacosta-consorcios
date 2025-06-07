"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const whatsappLink =
    "https://wa.me/554130761050?text=" +
    encodeURIComponent(
      "Olá! Vim pelo site e gostaria de simular um consórcio."
    );

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-lg backdrop-blur-lg">
      <div className="mx-18 flex items-center justify-between px-4 md:px-3 py-4">
        <Link href="/" className="flex items-center gap-3 group select-none">
          <img src="/logo-5.png" alt="Lacosta Consórcios" className="h-16" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link
            href="#simulacao"
            className="text-[var(--primary-1)] hover:text-[var(--primary-4)] transition-colors duration-300 font-semibold"
          >
            Simulação
          </Link>
          <Link
            href="#vantagens"
            className="text-[var(--primary-1)] hover:text-[var(--primary-4)] transition-colors duration-300 font-semibold"
          >
            Vantagens
          </Link>
          <Link
            href="#como-funciona"
            className="text-[var(--primary-1)] hover:text-[var(--primary-4)] transition-colors duration-300 font-semibold"
          >
            Como funciona
          </Link>
        </nav>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 ml-6 bg-white hover:bg-[var(--primary-8)] text-[var(--primary-1)] px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all duration-300 text-base tracking-tight border-2 border-[var(--primary-6)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-5)]/40"
        >
          <FaWhatsapp className="text-2xl text-[var(--primary-4)]" />
          Simule pelo WhatsApp
        </a>
        <button
          className="md:hidden ml-2 p-2 rounded-lg transition-colors duration-300 hover:bg-[var(--primary-8)]"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? (
            <FiX size={28} className="text-[var(--primary-1)]" />
          ) : (
            <FiMenu size={28} className="text-[var(--primary-1)]" />
          )}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl flex flex-col items-center gap-4 py-8 animate-fade-in z-50">
            <Link
              href="#simulacao"
              className="text-[var(--primary-1)] hover:text-[var(--primary-4)] text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Simulação
            </Link>
            <Link
              href="#como-funciona"
              className="text-[var(--primary-1)] hover:text-[var(--primary-4)] text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Como funciona
            </Link>
            <Link
              href="#vantagens"
              className="text-[var(--primary-1)] hover:text-[var(--primary-4)] text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Vantagens
            </Link>
            <Link
              href="#contato"
              className="text-[var(--primary-1)] hover:text-[var(--primary-4)] text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Contato
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] hover:from-[var(--primary-2)] hover:to-[var(--primary-5)] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all duration-300 text-base mt-2"
              onClick={() => setOpen(false)}
            >
              <FaWhatsapp className="text-2xl" />
              WhatsApp
            </a>
          </div>
        </>
      )}
    </header>
  );
}
