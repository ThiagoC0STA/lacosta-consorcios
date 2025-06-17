"use client";

import { useEffect } from "react";

const whatsappLink =
  "https://wa.me/554130761050?text=" +
  encodeURIComponent("Olá! Vim pelo site e gostaria de simular um consórcio.");

export default function WhatsappRedirect() {
    useEffect(() => {
      window.location.href = whatsappLink;
    }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-green-600 animate-pulse">
        Redirecionando para o WhatsApp...
      </h1>
      <p className="text-base md:text-lg text-center mb-2">
        Você será direcionado para uma conversa no WhatsApp com nossa equipe.
      </p>
      <p className="text-sm md:text-base text-gray-600 text-center">
        Se não for redirecionado automaticamente,{" "}
        <a
          href={whatsappLink}
          className="text-green-700 underline font-semibold hover:text-green-800 transition-colors"
        >
          clique aqui
        </a>
        .
      </p>
    </div>
  );
}
