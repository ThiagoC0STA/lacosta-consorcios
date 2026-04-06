"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Container from "./Container";
import { CATEGORY_HEADER_LINKS } from "../lib/categoryNavLinks";

const NAV_LINKS = [
  { href: "#simulacao", label: "Simulação" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
];

const HEADER_BLUE_GRADIENT =
  "linear-gradient(135deg, rgba(2, 29, 64, 0.98) 0%, rgba(2, 40, 89, 0.98) 100%)";

const theme = {
  navColor: "text-white hover:text-white/80",
  logoFilter: "brightness-0 invert",
  ctaClass: "bg-white text-[var(--primary-1)] hover:bg-white/90",
  menuButton: "text-white hover:bg-white/10",
  borderRow: "border-white/20 bg-transparent",
  divider: "bg-white/30",
};

function MenuIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}

export default function HeaderV2() {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSimExpanded, setMobileSimExpanded] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const whatsappLink =
    "https://wa.me/554130761050?text=" +
    encodeURIComponent("Olá! Vim pelo site e gostaria de simular um consórcio.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeDrawer = useCallback(() => setOpen(false), []);

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

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full pt-[env(safe-area-inset-top)] transition-[box-shadow] duration-500 ease-out ${
        scrolled ? "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.15)]" : "bg-transparent shadow-none"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          background: HEADER_BLUE_GRADIENT,
          backdropFilter: "blur(8px)",
          opacity: scrolled ? 1 : 0,
        }}
      />
      <div
        className={`relative z-10 w-full transition-all duration-500 ease-out ${
          !scrolled ? "backdrop-blur-sm" : ""
        }`}
      >
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
                  alt="Lacosta Consórcios | parceiro oficial Servopa e Rodobens"
                  width={163}
                  height={48}
                  sizes="(max-width: 768px) 160px, 200px"
                  quality={95}
                  className={`h-10 md:h-12 w-auto transition-[filter] duration-500 ease-out object-contain ${theme.logoFilter}`}
                />
              </Link>
              <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
                <div className={`h-10 w-px transition-colors duration-500 ease-out ${theme.divider}`} />
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
                    className="h-8 md:h-9 w-auto object-contain brightness-0 invert opacity-90 transition-[filter,opacity] duration-500 ease-out"
                    quality={60}
                  />
                </Link>
                <div className={`h-8 w-px transition-colors duration-500 ease-out ${theme.divider}`} />
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
                    className="h-8 md:h-9 w-auto object-contain brightness-0 invert opacity-90 transition-[filter,opacity] duration-500 ease-out"
                    quality={60}
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
              <nav aria-label="Navegação principal" className="flex items-center gap-6 lg:gap-8">
                {NAV_LINKS.map((link) =>
                  link.label === "Simulação" ? (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1 text-base font-semibold transition-colors duration-500 ease-out ${theme.navColor}`}
                      >
                        {link.label}
                        <ChevronDown className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                      </Link>

                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                          dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        <div
                          className="w-56 max-h-[min(70vh,22rem)] overflow-y-auto rounded-xl overflow-x-hidden py-2"
                          style={{
                            background: "rgba(2, 29, 64, 0.97)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backdropFilter: "blur(16px)",
                          }}
                        >
                          {CATEGORY_HEADER_LINKS.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex flex-col px-4 py-2.5 transition-colors hover:bg-white/[0.08]"
                            >
                              <span className="text-sm font-semibold text-white">{item.label}</span>
                              <span className="text-[11px] text-white/50">{item.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-base font-semibold transition-colors duration-500 ease-out ${theme.navColor}`}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick}
                className={`flex shrink-0 items-center justify-center rounded-xl px-6 py-2.5 text-base font-bold transition-colors duration-500 ease-out ${theme.ctaClass}`}
              >
                Simule grátis
              </a>
            </div>

            <button
              className={`flex h-11 w-11 shrink-0 items-center justify-center transition-colors duration-500 ease-out md:hidden ${theme.menuButton}`}
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              <MenuIcon />
            </button>
          </Container>
        </div>

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
              className="h-8 w-auto object-contain brightness-0 invert opacity-90 transition-[filter,opacity] duration-500 ease-out"
              quality={60}
            />
            <div className={`h-8 w-px transition-colors duration-500 ease-out ${theme.divider}`} />
            <Image
              src="/rodobensv2.png"
              alt="Rodobens Consórcios"
              width={110}
              height={45}
              sizes="96px"
              className="h-8 w-auto object-contain brightness-0 invert opacity-90 transition-[filter,opacity] duration-500 ease-out"
              quality={60}
            />
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeDrawer}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <Image src="/logo-5.png" alt="Lacosta Consórcios" width={120} height={36} sizes="160px" quality={95} className="h-10 w-auto object-contain" />
              <button
                className="flex h-10 w-10 items-center justify-center text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 rounded-full"
                onClick={closeDrawer}
                aria-label="Fechar menu"
              >
                <CloseIcon />
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
                quality={60}
              />
              <div className="h-8 w-px bg-neutral-200" />
              <Image
                src="/rodobensv2.png"
                alt="Rodobens Consórcios"
                width={110}
                height={45}
                sizes="96px"
                className="h-8 w-auto object-contain"
                quality={60}
              />
            </div>
            <nav aria-label="Menu mobile" className="mt-6 flex flex-1 flex-col gap-1">
              {/* Simulação with expandable sub-items */}
              <button
                onClick={() => setMobileSimExpanded((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-[15px] font-semibold text-[var(--primary-1)] transition-colors hover:bg-neutral-50 rounded-lg"
              >
                <span>Simulação</span>
                <ChevronDown className={`transition-transform duration-200 ${mobileSimExpanded ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-[max-height] duration-300 ease-out ${mobileSimExpanded ? "max-h-[min(70vh,28rem)] overflow-y-auto" : "max-h-0"}`}>
                {CATEGORY_HEADER_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col pl-8 pr-4 py-2.5 transition-colors hover:bg-neutral-50 rounded-lg"
                    onClick={closeDrawer}
                  >
                    <span className="text-sm font-semibold text-[var(--primary-1)]">{item.label}</span>
                    <span className="text-[11px] text-neutral-400">{item.desc}</span>
                  </Link>
                ))}
              </div>

              {NAV_LINKS.filter((l) => l.label !== "Simulação").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3.5 text-[15px] font-semibold text-[var(--primary-1)] transition-colors hover:bg-neutral-50 hover:text-[var(--primary-4)] rounded-lg"
                  onClick={closeDrawer}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contato"
                className="px-4 py-3.5 text-[15px] font-semibold text-[var(--primary-1)] transition-colors hover:bg-neutral-50 hover:text-[var(--primary-4)] rounded-lg"
                onClick={closeDrawer}
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
                closeDrawer();
              }}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[var(--primary-1)] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--primary-2)]"
            >
              Simule grátis
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
