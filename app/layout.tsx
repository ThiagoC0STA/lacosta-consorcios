import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderV2 from "./components/HeaderV2";
import JsonLd from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingWhatsappButtonV2 from "./components/FloatingWhatsappButtonV2";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ScrollTracker from "./components/ScrollTracker";
import Script from "next/script";
import { Suspense } from "react";
import { GA4_MEASUREMENT_ID } from "./lib/analytics";
import { SITE_URL } from "./lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lacosta Consórcios - Consórcio Curitiba | Servopa e Rodobens",
    template: "%s | Lacosta Consórcios",
  },
  description:
    "Consórcio em Curitiba com Servopa e Rodobens. Imóvel, veículo, investimento 100% sem juros. +25 anos de mercado, +5.000 clientes. Simule grátis!",
  keywords:
    "consórcio Curitiba, consórcio Servopa, consórcio Rodobens, consórcio imóvel, consórcio veículo, simular consórcio, consórcio sem juros, consórcio Guabirotuba, corretora consórcio Curitiba, consórcio investimento, financiamento imobiliário sem juros, consórcio imobiliário, consórcio automotivo",
  authors: [{ name: "Lacosta Consórcios", url: SITE_URL }],
  creator: "Lacosta Consórcios",
  publisher: "Lacosta Consórcios",
  applicationName: "Lacosta Consórcios",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    title: "Lacosta Consórcios - Consórcio Curitiba | Servopa e Rodobens",
    description:
      "Consórcio em Curitiba com Servopa e Rodobens. Imóvel, veículo, investimento 100% sem juros. Simule grátis!",
    siteName: "Lacosta Consórcios",
    images: [
      {
        url: `${SITE_URL}/lacosta-card-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lacosta Consórcios - Consórcio Curitiba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lacosta Consórcios - Consórcio Curitiba | Servopa e Rodobens",
    description:
      "Consórcio em Curitiba com Servopa e Rodobens. Imóvel, veículo, investimento 100% sem juros. Simule grátis!",
    images: [`${SITE_URL}/lacosta-card-og.jpg`],
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
  other: {
    "geo.region": "BR-PR",
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
        <link rel="icon" href="/logo-5.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-5.png" />
        <meta name="theme-color" content="#021D40" />
        <JsonLd />
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
      <SpeedInsights />
    </html>
  );
}
