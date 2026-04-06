import { WHATSAPP_LINK } from "./constants";

/**
 * Order and short labels for header simulation dropdown and related UI.
 */
export const CATEGORY_HEADER_LINKS = [
  { href: "/consorcio-imovel", label: "Imóvel", desc: "Casa, apto, terreno" },
  { href: "/consorcio-veiculo", label: "Veículo", desc: "Carro, moto, caminhão" },
  { href: "/consorcio-investimento", label: "Investimento", desc: "Patrimônio e negócio" },
  { href: "/consorcio-estetica", label: "Estética", desc: "Harmonização e beleza" },
  { href: "/consorcio-saude", label: "Saúde", desc: "Procedimentos e tratamentos" },
  { href: "/consorcio-educacao", label: "Educação", desc: "Cursos e formaturas" },
  { href: "/consorcio-reforma", label: "Reforma", desc: "Casa e ampliação" },
  { href: "/consorcio-servicos", label: "Serviços", desc: "Negócio e equipamentos" },
  { href: "/consorcio-agronegocio", label: "Agronegócio", desc: "Máquinas e campo" },
  { href: "/consorcio-embarcacoes", label: "Embarcações", desc: "Lancha, barco, jet" },
  { href: WHATSAPP_LINK, label: "Outro objetivo?", desc: "Fale com a gente", external: true },
] as const;

/** Alias for navigation code that used this name previously */
export const SIMULATION_ITEMS = CATEGORY_HEADER_LINKS;

export const CATEGORY_KEYS_IN_ORDER = [
  "imovel",
  "veiculo",
  "investimento",
  "estetica",
  "servicos",
  "saude",
  "educacao",
  "reforma",
  "agronegocio",
  "embarcacoes",
] as const;
