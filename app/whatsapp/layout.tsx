import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp - Lacosta Consórcios",
  description: "Fale com nossa equipe pelo WhatsApp. Simulação de consórcio gratuita.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function WhatsappLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
