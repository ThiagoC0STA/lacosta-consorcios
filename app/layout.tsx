import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next"
import FloatingWhatsappButton from "./components/FloatingWhatsappButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lacosta Consórcios - Realize seus sonhos com segurança e confiança",
  description: "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado. Simule agora e transforme seus planos em realidade!",
  keywords: "consórcio, imóveis, veículos, investimento, financiamento, sonhos, segurança, confiança, simulação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo-4.png" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <FloatingWhatsappButton />
      </body>
      <Analytics />
    </html>
  );
}
