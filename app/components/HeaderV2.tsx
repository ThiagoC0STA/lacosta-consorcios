"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import Container from "./Container";
import { useActiveSection, type SectionTheme } from "../lib/useActiveSection";

const NAV_LINKS = [
  { href: "#simulacao", label: "Simulação" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#conteudos", label: "Blog" },
];

const LIGHT_SECTIONS: SectionTheme[] = ["conteudos", "parceiros", "vantagens", "investimento", "como-funciona", "faq"];
const AMBER_SECTIONS: SectionTheme[] = ["oferta"];

function getHeaderTheme(activeSection: SectionTheme, scrolled: boolean) {
  if (!scrolled && activeSection === "hero") {
    return {
      bg: "transparent",
      navColor: "text-white hover:text-white/80",
      logoFilter: "brightness-0 invert",
      ctaClass: "bg-white text-[var(--primary-1)] hover:bg-white/90",
      menuButton: "text-white hover:bg-white/10",
      borderRow: "border-white/20 bg-transparent",
      divider: "bg-white/30",
    };
  }

  if (LIGHT_SECTIONS.includes(activeSection)) {
    return {
      bg: "bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)]",
      navColor: "text-[var(--primary-1)] hover:text-[var(--primary-4)]",
      logoFilter: "",
      ctaClass: "bg-[var(--primary-1)] text-white hover:bg-[var(--primary-2)]",
      menuButton: "text-[var(--primary-1)] hover:bg-neutral-100",
      borderRow: "border-neutral-200 bg-white",
      divider: "bg-neutral-200",
    };
  }

  if (AMBER_SECTIONS.includes(activeSection)) {
    return {
      bg: "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.15)]",
      navColor: "text-white hover:text-amber-200",
      logoFilter: "brightness-0 invert",
      ctaClass: "bg-amber-500 text-white hover:bg-amber-400",
      menuButton: "text-white hover:bg-white/10",
      borderRow: "border-white/20 bg-transparent",
      divider: "bg-white/30",
    };
  }

  // Dark blue sections: hero (scrolled), parceiros, vantagens, contato
  return {
    bg: "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.15)]",
    navColor: "text-white hover:text-white/80",
    logoFilter: "brightness-0 invert",
    ctaClass: "bg-white text-[var(--primary-1)] hover:bg-white/90",
    menuButton: "text-white hover:bg-white/10",
    borderRow: "border-white/20 bg-transparent",
    divider: "bg-white/30",
  };
}

function getHeaderBgStyle(activeSection: SectionTheme, scrolled: boolean) {
  if (!scrolled && activeSection === "hero") return {};
  if (LIGHT_SECTIONS.includes(activeSection)) return {};
  if (AMBER_SECTIONS.includes(activeSection)) {
    return {
      background:
        "linear-gradient(135deg, rgba(26, 10, 10, 0.98) 0%, rgba(45, 15, 15, 0.98) 50%, rgba(74, 21, 21, 0.98) 100%)",
      backdropFilter: "blur(8px)",
    };
  }
  return {
    background:
      "linear-gradient(135deg, rgba(2, 29, 64, 0.98) 0%, rgba(2, 40, 89, 0.98) 100%)",
    backdropFilter: "blur(8px)",
  };
}

export default function HeaderV2() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  const whatsappLink =
    "https://wa.me/554130761050?text=" +
    encodeURIComponent("Olá! Vim pelo site e gostaria de simular um consórcio.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (clicked) return;
    setClicked(true);
    const win = window as Window & { gtag_report_conversion?: (url: string) => void };
    if (typeof win.gtag_report_conversion === "function") {
      win.gtag_report_conversion(whatsappLink);
    }
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setTimeout(() => setClicked(false), 1000);
  };

  const theme = getHeaderTheme(activeSection, scrolled);
  const bgStyle = getHeaderBgStyle(activeSection, scrolled);

  const showSolidBg =
    scrolled || activeSection !== "hero" || LIGHT_SECTIONS.includes(activeSection);

  const hasGradientBg = Object.keys(bgStyle).length > 0;
  const defaultGradient = {
    background:
      "linear-gradient(135deg, rgba(2, 29, 64, 0.98) 0%, rgba(2, 40, 89, 0.98) 100%)",
    backdropFilter: "blur(8px)",
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-500 ease-out ${
        theme.bg === "transparent" ? "bg-transparent shadow-none" : theme.bg
      }`}
    >
      {/* Gradient overlay - always in DOM for smooth opacity transition */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          ...(hasGradientBg ? bgStyle : defaultGradient),
          opacity: hasGradientBg ? 1 : 0,
        }}
      />
      <div
        className={`relative z-10 w-full transition-all duration-500 ease-out ${
          theme.bg === "transparent" ? "backdrop-blur-sm" : ""
        }`}
      >
        {/* First Row - Logo and Menu */}
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-2.5">
          <Container
            className="flex flex-1 items-center justify-between gap-6"
            maxWidth="8xl"
            padding={false}
          >
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
              <Link
                href="/"
                className="flex shrink-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Image
                  src="/logo-5.png"
                  alt="Lacosta Consórcios"
                  width={163}
                  height={48}
                  sizes="(max-width: 768px) 160px, 200px"
                  quality={95}
                  className={`h-10 md:h-12 w-auto transition-[filter] duration-500 ease-out object-contain ${theme.logoFilter || ""}`}
                />
              </Link>
              <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
                <div
                  className={`h-10 w-px transition-colors duration-500 ease-out ${showSolidBg && LIGHT_SECTIONS.includes(activeSection) ? "bg-neutral-300" : "bg-white/40"}`}
                />
                <Link
                  href="/"
                  className="transition-opacity hover:opacity-80"
                  title="Consórcio Servopa"
                >
                  <Image
                    src="/consorcio-servopa0.png"
                    alt="Consórcio Servopa"
                    width={120}
                    height={50}
                    sizes="96px"
                    className={`h-8 md:h-9 w-auto object-contain transition-[filter,opacity] duration-500 ease-out ${showSolidBg && LIGHT_SECTIONS.includes(activeSection) ? "" : "brightness-0 invert opacity-90"}`}
                    quality={80}
                  />
                </Link>
                <div
                  className={`h-8 w-px transition-colors duration-500 ease-out ${showSolidBg && LIGHT_SECTIONS.includes(activeSection) ? "bg-neutral-300" : "bg-white/40"}`}
                />
                <Link
                  href="/"
                  className="transition-opacity hover:opacity-80"
                  title="Rodobens Consórcios"
                >
                  <Image
                    src="/rodobensv2.png"
                    alt="Rodobens Consórcios"
                    width={140}
                    height={50}
                    sizes="112px"
                    className={`h-8 md:h-9 w-auto object-contain transition-[filter,opacity] duration-500 ease-out ${showSolidBg && LIGHT_SECTIONS.includes(activeSection) ? "" : "brightness-0 invert opacity-90"}`}
                    quality={80}
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
              <nav className="flex items-center gap-6 lg:gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-semibold transition-colors duration-500 ease-out ${theme.navColor}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-6 py-2.5 text-base font-bold transition-colors duration-500 ease-out ${theme.ctaClass}`}
              >
                <FaWhatsapp className="text-2xl" />
                Simule grátis
              </a>
            </div>

            <button
              className={`flex h-11 w-11 shrink-0 items-center justify-center transition-colors duration-500 ease-out md:hidden ${theme.menuButton}`}
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              <FiMenu size={28} />
            </button>
          </Container>
        </div>

        {/* Second Row - Partner Logos Mobile */}
        <div
          className={`md:hidden border-t transition-colors duration-500 ease-out ${theme.borderRow}`}
        >
          <div className="flex items-center justify-between gap-4 px-12 py-2.5">
            <Image
              src="/consorcio-servopa0.png"
              alt="Consórcio Servopa"
              width={100}
              height={40}
              sizes="96px"
              className={`h-8 w-auto object-contain transition-[filter,opacity] duration-500 ease-out ${showSolidBg && LIGHT_SECTIONS.includes(activeSection) ? "opacity-90" : "brightness-0 invert opacity-90"}`}
              quality={80}
            />
            <div
              className={`h-8 w-px transition-colors duration-500 ease-out ${theme.divider}`}
            />
            <Image
              src="/rodobensv2.png"
              alt="Rodobens Consórcios"
              width={110}
              height={45}
              sizes="96px"
              className={`h-8 w-auto object-contain transition-[filter,opacity] duration-500 ease-out ${showSolidBg && LIGHT_SECTIONS.includes(activeSection) ? "opacity-90" : "brightness-0 invert opacity-90"}`}
              quality={80}
            />
          </div>
        </div>
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="flex h-full w-72 flex-col bg-white p-6">
          <div className="flex items-center justify-between">
            <Image src="/logo-5.png" alt="Lacosta" width={120} height={36} sizes="160px" quality={95} className="h-10 w-auto object-contain" />
            <button
              className="flex h-10 w-10 items-center justify-center text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="mt-6 flex items-center gap-4 border-b border-neutral-200 pb-6">
            <Image
              src="/consorcio-servopa0.png"
              alt="Consórcio Servopa"
              width={100}
              height={40}
              sizes="96px"
              className="h-8 w-auto object-contain"
              quality={80}
            />
            <div className="h-8 w-px bg-neutral-200" />
            <Image
              src="/rodobensv2.png"
              alt="Rodobens Consórcios"
              width={110}
              height={45}
              sizes="96px"
              className="h-8 w-auto object-contain"
              quality={80}
            />
          </div>
          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3.5 text-[15px] font-semibold text-[var(--primary-1)] transition-colors hover:bg-neutral-50 hover:text-[var(--primary-4)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contato"
              className="px-4 py-3.5 text-[15px] font-semibold text-[var(--primary-1)] transition-colors hover:bg-neutral-50 hover:text-[var(--primary-4)]"
              onClick={() => setOpen(false)}
            >
              Contato
            </Link>
          </nav>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              onWhatsAppClick(e);
              setOpen(false);
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-1)] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--primary-2)]"
          >
            <FaWhatsapp className="text-xl" />
            Simule grátis
          </a>
        </div>
      </Drawer>
    </header>
  );
}
