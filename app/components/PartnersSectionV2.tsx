"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBuilding, FaCertificate, FaCheckDouble } from "react-icons/fa";
import { WHATSAPP_PHONE_NUMBER, handleWhatsAppClick } from "../lib/constants";
import Container from "./Container";

const STATS = [
  { icon: FaBuilding, value: "+25 anos", label: "Mercado", accent: "#0487D9" },
  { icon: FaCertificate, value: "100%", label: "Regulamentado", accent: "#035AA6" },
  { icon: FaCheckDouble, value: "+5.000", label: "Clientes", accent: "#0487D9" },
];

const PARTNERS = [
  {
    name: "Servopa",
    logo: "/consorcio-servopa0.png",
    badge: "Consultor autorizado",
    msg: "Olá! Vim pelo site e tenho interesse em consórcios da Servopa.",
    accent: "bg-red-500",
  },
  {
    name: "Rodobens",
    logo: "/rodobensv2.png",
    badge: "Representante autorizado",
    msg: "Olá! Vim pelo site e tenho interesse em consórcios da Rodobens.",
    accent: "bg-[#14797C]",
  },
] as const;

export default function PartnersSectionV2() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="parceiros" className="relative py-10 sm:py-14 md:py-16 overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white scroll-mt-24 md:scroll-mt-0">
      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-5 min-h-0 lg:min-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)]">
          {/* Left - dark block */}
          <div className="lg:col-span-3 relative flex flex-col justify-center px-5 sm:px-8 lg:px-12 xl:px-14 py-10 sm:py-14 lg:py-20">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #021D40 0%, #022859 50%, #021D40 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(4, 135, 217, 0.35) 0%, transparent 60%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />

            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 max-w-md"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0487D9] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0487D9]">
                  Parceiros
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-[1.15] mb-4 sm:mb-5">
                Parceiros oficiais Servopa e Rodobens
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                A Lacosta Consórcios trabalha exclusivamente com as administradoras Servopa e Rodobens, líderes do mercado de consórcios no Brasil há mais de 25 anos.
              </p>
              <div className="flex flex-wrap lg:flex-nowrap gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 lg:gap-y-0">
                {STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-2.5 sm:gap-3"
                  >
                    <div
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${s.accent}25`,
                        boxShadow: `0 2px 10px ${s.accent}25`,
                      }}
                    >
                      <s.icon className="text-base sm:text-lg" style={{ color: s.accent }} />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-white whitespace-nowrap">
                        {s.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-500">{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - light block */}
          <div className="lg:col-span-2 relative flex items-center justify-center px-4 sm:px-8 lg:px-8 xl:px-10 py-5 sm:py-14 lg:py-20 bg-neutral-50/90">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 80% 20%, rgba(3, 90, 166, 0.06) 0%, transparent 40%)`,
              }}
            />
            <div className="relative z-10 w-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="space-y-3 sm:space-y-4 w-full"
              >
                {PARTNERS.map((p, i) => (
                  <motion.a
                    key={p.name}
                    href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(p.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) =>
                      handleWhatsAppClick(
                        `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(p.msg)}`,
                        e
                      )
                    }
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="group relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 lg:p-5 rounded-xl sm:rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#035AA6]/25 hover:shadow-lg hover:shadow-[#035AA6]/6 active:scale-[0.99] sm:hover:-translate-y-1 cursor-pointer overflow-hidden w-full"
                  >
                    <div className={`sm:hidden absolute top-0 left-0 right-0 h-1.5 rounded-t-xl ${p.accent}`} />
                    <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0 pt-2 sm:pt-0">
                      <div
                        className={`hidden sm:block w-2 h-12 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-y-[1.12] origin-center ${p.accent}`}
                      />
                      <div className="shrink-0 w-20 sm:w-28 h-10 sm:h-12 flex items-center justify-center bg-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 shadow-sm border border-neutral-100">
                        <Image
                          src={p.logo}
                          alt={`Logo ${p.name} | ${p.badge} Lacosta Consórcios`}
                          width={112}
                          height={48}
                          sizes="(max-width: 640px) 80px, 112px"
                          quality={80}
                          className="max-h-6 sm:max-h-8 w-auto object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                          {p.badge}
                        </span>
                        <p className="text-sm sm:text-base font-bold text-neutral-900">{p.name}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
