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
  keywords: "consórcio, imóveis, veículos, investimento, financiamento, sonhos, segurança, confiança, simulação, consórcio imobiliário, consórcio automotivo, financiamento imobiliário",
  authors: [{ name: "Lacosta Consórcios" }],
  creator: "Lacosta Consórcios",
  publisher: "Lacosta Consórcios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lacostaconsorcios.com.br",
    title: "Lacosta Consórcios - Realize seus sonhos com segurança e confiança",
    description: "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado.",
    siteName: "Lacosta Consórcios",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lacosta Consórcios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacosta Consórcios - Realize seus sonhos com segurança e confiança",
    description: "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado.",
    images: ["/og-image.png"],
    creator: "@lacostaconsorcios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/logo-5-favicon.png" />
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
