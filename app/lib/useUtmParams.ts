"use client";

import { useEffect, useState } from "react";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

const STORAGE_KEY = "lacosta_utm";

function readStored(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

function store(params: UtmParams) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    /* blocked */
  }
}

export function useUtmParams(): UtmParams {
  const [params, setParams] = useState<UtmParams>({});

  useEffect(() => {
    const url = new URL(window.location.href);
    const fromUrl: UtmParams = {};
    let found = false;

    for (const key of UTM_KEYS) {
      const val = url.searchParams.get(key);
      if (val) {
        fromUrl[key] = val;
        found = true;
      }
    }

    if (found) {
      store(fromUrl);
      setParams(fromUrl);
    } else {
      setParams(readStored());
    }
  }, []);

  return params;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  imoveis: ["imovel", "imóvel", "imobiliario", "imobiliário", "casa", "apartamento", "apt"],
  veiculos: ["veiculo", "veículo", "carro", "auto", "moto", "automotivo"],
  investimento: ["investimento", "invest", "planejamento"],
  embarcacoes: ["embarcacao", "embarcação", "lancha", "barco", "nautico", "náutico"],
  servicos: ["servico", "serviço", "negocio", "negócio", "empresa"],
  agronegocio: ["agro", "agronegocio", "agronegócio", "rural", "fazenda"],
  educacao: ["educacao", "educação", "curso", "faculdade"],
  saude: ["saude", "saúde", "medico", "médico", "procedimento"],
  reforma: ["reforma", "ampliacao", "ampliação", "construcao", "construção"],
  estetica: ["estetica", "estética", "harmonizacao", "harmonização", "beleza"],
};

export function inferCategoryFromUtm(utm: UtmParams): string | null {
  const searchText = [
    utm.utm_campaign,
    utm.utm_content,
    utm.utm_term,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (!searchText) return null;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const match = keywords.some((kw) => {
      const normalized = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return searchText.includes(normalized);
    });
    if (match) return category;
  }

  return null;
}
