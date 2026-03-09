import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderV2 from "./components/HeaderV2";
import { Analytics } from "@vercel/analytics/next";
import FloatingWhatsappButtonV2 from "./components/FloatingWhatsappButtonV2";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollTracker from "./components/ScrollTracker";
import Script from "next/script";
import { Suspense } from "react";
import { GA4_MEASUREMENT_ID } from "./lib/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lacostaconsorcios.com.br"),
  title: "Lacosta Consórcios - Realize seus sonhos com segurança e confiança",
  description:
    "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado. Simule agora e transforme seus planos em realidade!",
  keywords:
    "consórcio, imóveis, veículos, investimento, financiamento, sonhos, segurança, confiança, simulação, consórcio imobiliário, consórcio automotivo, financiamento imobiliário",
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
    description:
      "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado.",
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
    description:
      "Consórcios seguros e confiáveis para realizar seus sonhos. Imóveis, veículos e muito mais com as melhores condições do mercado.",
    images: ["/og-image.png"],
    creator: "@lacostaconsorcios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/lacosta-logo.png" />
        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17657821079"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17657821079');
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="whatsapp-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              // Only track conversion, don't open anything here
              // The component will handle opening WhatsApp
              gtag('event', 'conversion', {
                  'send_to': 'AW-17657821079/faPyCKumsd0bEJfv8-NB'
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <HeaderV2 />
        {children}
        <FloatingWhatsappButtonV2 />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <ScrollTracker />
      </body>
      <Analytics />
    </html>
  );
}
