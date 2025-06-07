"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/lacosta_corretora?igsh=ODBoanoycmxob2wy",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/5541991751000",
  },
];

const navLinks = [
  { label: "Simule agora", href: "#contato" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "Como funciona", href: "#simulação" },
];

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden py-20">
      {/* Gradiente decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--primary-1)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--primary-4)]/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 items-start"
        >
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-extrabold mb-4 tracking-tight text-white">Lacosta Consórcios</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Transformando sonhos em realidade através de consórcios seguros e confiáveis.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-[var(--primary-1)]/20 transition-all shadow-md">
                    <social.icon className="h-6 w-6" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--primary-1)] font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Rua da Capitania, 127</li>
              <li>Guabirotuba - Curitiba</li>
              <li>luciano@lacostacorretora.com.br</li>
              <li>(41) 99175-1000</li>
            </ul>
          </div>
        </motion.div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} <span className="font-bold text-white">Lacosta Consórcios</span>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
