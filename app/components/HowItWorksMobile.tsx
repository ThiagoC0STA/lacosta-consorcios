import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const steps = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Escolha seu plano",
    description:
      "Selecione o tipo de consórcio e o valor que melhor se adequa ao seu perfil.",
    img: "/plan.jpg",
  },
  {
    icon: DocumentTextIcon,
    title: "Faça sua proposta",
    description:
      "Preencha o formulário com seus dados e escolha o prazo de pagamento.",
    img: "/papelada.jpg",
  },
  {
    icon: ClockIcon,
    title: "Aguarde a contemplação",
    description:
      "Acompanhe seu processo através do seu email ou com nossos corretores",
    img: "/time-is-money.jpg",
  },
  {
    icon: SparklesIcon,
    title: "Realize seu sonho",
    description:
      "Após contemplado, receba seu bem e comece a usufruir imediatamente.",
    img: "/couple.jpg",
  },
];

export default function HowItWorksMobile() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Atualiza o progresso da linha conforme o scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;
    setProgress(maxScroll > 0 ? current / maxScroll : 0);
  };

  return (
    <section
      className="py-4 bg-white relative overflow-hidden min-h-[650px]"
      id="como-funciona-mobile"
    >
      <div className="container mx-auto px-2">
        {/* Linha de progresso por trás dos cards+ícones */}
        <div className="relative mb-4" style={{ height: 110 }}>
          {/* Linha de fundo */}
          <div className="absolute left-0 right-0 top-[60%] -translate-y-[60%] h-1 bg-gray-200 rounded-full z-0 mx-4" />
          {/* Linha animada */}
          <motion.div
            className="absolute left-0 top-[60%] -translate-y-[60%] h-1 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] rounded-full z-10 mx-4"
            style={{ width: `calc(${progress * 100}% - 80px)` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          {/* Cards em scroll horizontal, com ícones acima de cada card */}
          <div
            className="overflow-x-auto pb-8 pt-10 relative z-20"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <div className="flex gap-6 min-w-max px-4 snap-x snap-mandatory">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="w-[320px] flex-shrink-0 snap-center flex flex-col items-center"
                >
                  {/* Ícone acima do card */}
                  <div className="w-14 h-14 mb-2 rounded-full bg-white border-2 border-[var(--primary-1)] flex items-center justify-center shadow-md mx-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] flex items-center justify-center text-white">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  {/* Card */}
                  <div className="w-full flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg min-h-[440px]">
                    <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 mb-6 group">
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-bold text-[var(--primary-1)]">
                          Passo {idx + 1}
                        </span>
                      </div>
                    </div>
                    <div className="w-full">
                      <h3 className="text-2xl font-bold text-[var(--primary-1)] relative mb-4">
                        {step.title}
                        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[var(--primary-1)] to-[var(--primary-4)] rounded-full"></span>
                      </h3>
                      <p className="text-md text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
