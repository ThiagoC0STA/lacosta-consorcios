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
import { GA4_MEASUREMENT_ID, GTM_CONTAINER_ID } from "./lib/analytics";
import { SITE_URL } from "./lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const defaultTitle =
  "Consórcio Servopa e Rodobens | Simule Grátis Sem Juros - Lacosta";
const defaultDescription =
  "Simule seu consórcio Servopa e Rodobens 100% sem juros. Imóvel, veículo, investimento e mais em todo o Brasil. +25 anos de mercado, +5.000 clientes satisfeitos. Assessoria especializada Lacosta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | Lacosta Consórcios",
  },
  description: defaultDescription,
  keywords:
    "consórcio Servopa, consórcio Rodobens, simular consórcio, consórcio sem juros, consórcio imóvel, consórcio veículo, consórcio investimento, consórcio Brasil, consórcio contemplação, carta de crédito consórcio, consórcio imobiliário Curitiba, consórcio automotivo, lance consórcio, parcela consórcio",
  authors: [{ name: "Lacosta Consórcios", url: SITE_URL }],
  creator: "Lacosta Consórcios",
  publisher: "Lacosta Consórcios",
  applicationName: "Lacosta Consórcios",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
      "x-default": SITE_URL,
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
    title: "Consórcio Servopa e Rodobens | Sem Juros - Lacosta Consórcios",
    description:
      "Consórcio 100% sem juros com parceiros oficiais Servopa e Rodobens. Imóvel, veículo, investimento e mais. Simule grátis e economize milhares de reais.",
    siteName: "Lacosta Consórcios",
    images: [
      {
        url: `${SITE_URL}/lacosta-card-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lacosta Consórcios — Simule seu consórcio Servopa e Rodobens sem juros em todo o Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consórcio Servopa e Rodobens | Sem Juros - Lacosta Consórcios",
    description:
      "Consórcio 100% sem juros. Imóvel, veículo, investimento e mais. +25 anos, +5.000 clientes. Simule grátis!",
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
    "geo.placename": "Curitiba",
    "geo.position": "-25.4537;-49.2455",
    "ICBM": "-25.4537, -49.2455",
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
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
        </Script>
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
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
