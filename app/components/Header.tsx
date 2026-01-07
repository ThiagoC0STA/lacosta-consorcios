"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const whatsappLink =
    "https://wa.me/554130761050?text=" +
    encodeURIComponent(
      "Olá! Vim pelo site e gostaria de simular um consórcio."
    );

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple clicks
    if (clicked) {
      return;
    }
    setClicked(true);
    
    // Track conversion in Google Ads
    // @ts-expect-error - gtag_report_conversion is defined globally
    if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
      // @ts-expect-error - gtag_report_conversion is defined globally
      window.gtag_report_conversion(whatsappLink);
    }
    
    // Open WhatsApp directly (only once)
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    
    // Reset after 1 second
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-lg backdrop-blur-lg">
      {/* First Row - Logo and Menu */}
      <div className="md:mx-18 flex items-center justify-between px-4 md:px-3 py-3 md:py-4">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-3 group select-none transition-transform hover:scale-105">
            <img src="/logo-5.png" alt="Lacosta Consórcios" className="h-12 md:h-16" />
          </Link>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-10 bg-gray-300" />
          
          {/* Partner Logos Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link 
              href="/" 
              className="flex items-center group select-none transition-opacity hover:opacity-80"
              title="Consórcio Servopa"
            >
              <Image
                src="/consorcio-servopa0.png"
                alt="Consórcio Servopa"
                width={120}
                height={50}
                className="h-8 md:h-10 w-auto object-contain"
                quality={100}
              />
            </Link>
            
            <div className="w-px h-8 bg-gray-300" />
            
            <Link 
              href="/" 
              className="flex items-center group select-none transition-opacity hover:opacity-80"
              title="Rodobens Consórcios"
            >
              <Image
                src="/rodobens.jpg"
                alt="Rodobens Consórcios"
                width={140}
                height={50}
                className="h-8 md:h-10 w-auto object-contain"
                quality={100}
              />
            </Link>
          </div>
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

      {/* Second Row - Partner Logos Mobile */}
      <div className="md:hidden flex items-center justify-center gap-4 px-4 py-2 pb-3 border-t border-gray-200">
        <Image
          src="/consorcio-servopa0.png"
          alt="Consórcio Servopa"
          width={100}
          height={40}
          className="h-10 w-auto object-contain opacity-90"
          quality={100}
        />
        <div className="w-px h-6 bg-gray-300" />
        <Image
          src="/rodobens.jpg"
          alt="Rodobens Consórcios"
          width={110}
          height={45}
          className="h-10 w-auto object-contain opacity-90"
          quality={100}
        />
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
          
          {/* Partner Logos Mobile */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 w-full justify-center">
            <Image
              src="/consorcio-servopa0.png"
              alt="Consórcio Servopa"
              width={100}
              height={40}
              className="h-8 w-auto object-contain"
              quality={100}
            />
            <div className="w-px h-6 bg-gray-300" />
            <Image
              src="/rodobens.jpg"
              alt="Rodobens Consórcios"
              width={110}
              height={45}
              className="h-8 w-auto object-contain"
              quality={100}
            />
          </div>
          
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
