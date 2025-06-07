import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lacosta Consórcios - Realize seus sonhos com segurança",
  description:
    "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado.",
  keywords: "consórcio, imóveis, veículos, investimento, financiamento, sonhos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
      <Analytics />
    </html>
  );
}
