"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const steps = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Escolha seu plano",
    description:
      "Selecione o tipo de consórcio e o valor que melhor se adequa ao seu perfil.",
  },
  {
    icon: DocumentTextIcon,
    title: "Faça sua proposta",
    description:
      "Preencha o formulário com seus dados e escolha o prazo de pagamento.",
  },
  {
    icon: ClockIcon,
    title: "Aguarde a contemplação",
    description:
      "Acompanhe seu processo através do seu email ou com nossos corretores",
  },
  {
    icon: SparklesIcon,
    title: "Realize seu sonho",
    description:
      "Após contemplado, receba seu bem e comece a usufruir imediatamente.",
  },
];

const HowItWorksDesktop = dynamic(() => import("./HowItWorksDesktop"), {
  ssr: false,
});
const HowItWorksMobile = dynamic(() => import("./HowItWorksMobile"), {
  ssr: false,
});

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <HowItWorksMobile /> : <HowItWorksDesktop />;
}
