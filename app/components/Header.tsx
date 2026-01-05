"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Drawer from "@mui/material/Drawer";

export default function Header() {
  const [open, setOpen] = useState(false);
  const whatsappLink =
    "https://wa.me/554130761050?text=" +
    encodeURIComponent(
      "Olá! Vim pelo site e gostaria de simular um consórcio."
    );

  const handleWhatsAppClick = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      e.preventDefault();
    }
    // @ts-expect-error - gtag_report_conversion is defined globally
    if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
      // @ts-expect-error - gtag_report_conversion is defined globally
      window.gtag_report_conversion(whatsappLink);
    } else {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-lg backdrop-blur-lg">
      <div className="md:mx-18 flex items-center justify-between px-4 md:px-3 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group select-none">
            <img src="/logo-5.png" alt="Lacosta Consórcios" className="h-16" />
          </Link>
          {/* <Link href="/" className="flex items-center gap-4 group select-none">
            <img
              src="/consorcio-servopa0.webp"
              alt="Consórcio Servopa"
              className="h-14"
            />
          </Link> */}
        </div>

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
          onClick={(e) => handleWhatsAppClick(e)}
          className="hidden md:inline-flex items-center gap-2 ml-6 bg-white hover:bg-[var(--primary-8)] text-[var(--primary-1)] px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all duration-300 text-base tracking-tight border-2 border-[var(--primary-6)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-5)]/40"
        >
          <FaWhatsapp className="text-2xl text-[var(--primary-4)]" />
          Simule pelo WhatsApp
        </a>
        <button
          className="md:hidden ml-2 p-2 rounded-lg transition-colors duration-300 hover:bg-[var(--primary-8)]"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          {open ? (
            <FiX size={28} className="text-[var(--primary-1)]" />
          ) : (
            <FiMenu size={28} className="text-[var(--primary-1)]" />
          )}
        </button>
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-72 flex flex-col items-center gap-4 py-8 px-4">
          <button
            className="self-end mb-4"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <FiX size={28} className="text-[var(--primary-1)]" />
          </button>
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
            onClick={(e) => {
              handleWhatsAppClick(e);
              setOpen(false);
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] hover:from-[var(--primary-2)] hover:to-[var(--primary-5)] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all duration-300 text-base mt-2"
          >
            <FaWhatsapp className="text-2xl" />
            WhatsApp
          </a>
        </div>
      </Drawer>
    </header>
  );
}
