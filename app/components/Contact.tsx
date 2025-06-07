"use client";

import HeroCalculator from "./HeroCalculator";
import Image from "next/image";

export default function Contact() {
  return (
    <section className="py-20 relative overflow-hidden bg-gray-50">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/house-2.jpg"
          alt="Contato"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Overlay para suavizar a imagem */}
        {/* <div className="absolute inset-0 bg-white/30" /> */}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simule e fale com um especialista
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano. Simule seu consórcio e tire todas as suas dúvidas com quem entende do assunto!
          </p>
        </motion.div> */}
        <div className="flex flex-col items-center justify-center">
          <HeroCalculator />
        </div>
      </div>
    </section>
  );
}
