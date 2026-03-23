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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const defaultTitle =
  "Lacosta Consórcios - Consórcio Servopa e Rodobens no Brasil | Parceiros oficiais";
const defaultDescription =
  "Parceiros oficiais Servopa e Rodobens. Consórcio de imóvel, veículo e investimento em todo o Brasil — 100% sem juros. +25 anos, +5.000 clientes. Simule grátis!";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Lacosta Consórcios",
  },
  description: defaultDescription,
  keywords:
    "consórcio Servopa, consórcio Rodobens, consórcio Brasil, parceiro Servopa, parceiro Rodobens, consórcio imóvel, consórcio veículo, simular consórcio, consórcio sem juros, corretora consórcio, consórcio investimento, financiamento imobiliário sem juros, consórcio imobiliário, consórcio automotivo",
  authors: [{ name: "Lacosta Consórcios", url: SITE_URL }],
  creator: "Lacosta Consórcios",
  publisher: "Lacosta Consórcios",
  applicationName: "Lacosta Consórcios",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
    },
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
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Lacosta Consórcios",
    images: [
      {
        url: `${SITE_URL}/lacosta-card-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lacosta Consórcios — consórcio Servopa e Rodobens em todo o Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
