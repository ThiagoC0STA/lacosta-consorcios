"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import {
  COMPANY_CNPJ_RAW,
  formatCnpj,
  LEGAL_COMPANY_NAME,
} from "../lib/legal";
import { CATEGORY_HEADER_LINKS } from "../lib/categoryNavLinks";
import Container from "./Container";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/lacosta_corretora?igsh=ODBoanoycmxob2wy",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    href: WHATSAPP_LINK,
  },
];

const navLinks = [
  { label: "Simular consórcio", href: "/#simulacao" },
  { label: "Vantagens do consórcio", href: "/#vantagens" },
  { label: "Como funciona o consórcio", href: "/#como-funciona" },
  { label: "Perguntas frequentes", href: "/#faq" },
  { label: "Vídeos sobre consórcio", href: "/#conteudos" },
  { label: "Fale com um especialista", href: "/#contato" },
];

function SocialLink({ href, icon: Icon, name }: { href: string; icon: React.ElementType; name: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (name === "WhatsApp") {
      handleWhatsAppClick(href, e, "footer");
    }
  };

  return (
    <a
      href={href}
      className="group text-gray-400 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Siga a Lacosta Consórcios no ${name}`}
      onClick={handleClick}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-[var(--primary-1)]/20 transition-all shadow-md">
        <Icon className="h-6 w-6" />
      </span>
    </a>
  );
}

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden py-20 pb-28 md:pb-20" role="contentinfo">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--primary-1)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--primary-4)]/10 rounded-full blur-3xl" />
      </div>
      <Container className="py-16 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 md:gap-12 items-start"
        >
          <div className="md:col-span-2 lg:col-span-2">
            <p className="text-2xl font-extrabold mb-4 tracking-tight text-white">
              Lacosta Consórcios
            </p>
            <p className="text-gray-400 mb-6 max-w-md">
              Assessoria especializada em consórcio Servopa e Rodobens em todo o Brasil.
              Mais de 25 anos transformando sonhos em realidade com segurança e sem juros.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.name}
                  href={social.href}
                  icon={social.icon}
                  name={social.name}
                />
              ))}
            </div>
          </div>

          <nav aria-label="Consórcios disponíveis">
            <p className="text-lg font-semibold mb-4 text-white">Consórcios</p>
            <ul className="space-y-2">
              {CATEGORY_HEADER_LINKS.filter((l) => !("external" in l)).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--primary-5)] font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links do rodapé">
            <p className="text-lg font-semibold mb-4 text-white">
              Navegação
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--primary-5)] font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacidade"
                  className="text-gray-400 hover:text-[var(--primary-5)] font-medium transition-colors duration-200"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-gray-400 hover:text-[var(--primary-5)] font-medium transition-colors duration-200"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-lg font-semibold mb-4 text-white">Contato</p>
            <address className="not-italic space-y-2 text-gray-400">
              <p>Rua da Capitania, 127</p>
              <p>Guabirotuba, Curitiba, PR</p>
              <p>CEP: 81520-590</p>
              <p>
                <a
                  href="mailto:luciano@lacostacorretora.com.br"
                  className="hover:text-[var(--primary-5)] transition-colors"
                >
                  luciano@lacostacorretora.com.br
                </a>
              </p>
              <p>
                <a
                  href="tel:+554130761050"
                  className="hover:text-[var(--primary-5)] transition-colors"
                >
                  (41) 3076-1050
                </a>
              </p>
            </address>
          </div>
        </motion.div>

        <div className="border-t border-gray-800 mt-12 pt-8 space-y-4 text-gray-400 text-sm">
          {(LEGAL_COMPANY_NAME || COMPANY_CNPJ_RAW) && (
            <p className="text-center text-gray-500 leading-relaxed">
              {LEGAL_COMPANY_NAME ? (
                <span className="text-gray-300">{LEGAL_COMPANY_NAME}</span>
              ) : null}
              {LEGAL_COMPANY_NAME && COMPANY_CNPJ_RAW ? " · " : ""}
              {COMPANY_CNPJ_RAW ? (
                <span>
                  CNPJ:{" "}
                  {COMPANY_CNPJ_RAW.replace(/\D/g, "").length === 14
                    ? formatCnpj(COMPANY_CNPJ_RAW)
                    : COMPANY_CNPJ_RAW}
                </span>
              ) : null}
            </p>
          )}
          <p className="text-center">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-white">Lacosta Consórcios</span>.
            Todos os direitos reservados. Consórcios regulamentados pelo Banco Central do Brasil.
          </p>
        </div>
      </Container>
    </footer>
  );
}
