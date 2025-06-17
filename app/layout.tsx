import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next";
import FloatingWhatsappButton from "./components/FloatingWhatsappButton";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KXKHCFR9');
          `}
        </Script>
        <Script id="whatsapp-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17204502524/iL3iCNbW69waEPy_34tA',
                  'event_callback': callback,
                  'value': 1.0,
                  'currency': 'BRL'
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXKHCFR9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        {children}
        <FloatingWhatsappButton />
      </body>
      <Analytics />
    </html>
  );
}
