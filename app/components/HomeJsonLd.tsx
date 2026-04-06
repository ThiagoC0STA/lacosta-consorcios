import { FAQ_ITEMS, SITE_URL } from "../lib/seo";

export default function HomeJsonLd() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Consórcio Servopa e Rodobens | Simule Grátis Sem Juros - Lacosta",
    description:
      "Simule seu consórcio Servopa e Rodobens 100% sem juros. Imóvel, veículo, investimento e mais em todo o Brasil. +25 anos de mercado, +5.000 clientes satisfeitos.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#financialservice` },
    inLanguage: "pt-BR",
    dateModified: new Date().toISOString(),
    breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/lacosta-card-og.jpg`,
      width: 1200,
      height: 630,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const schemas = [webPageSchema, breadcrumbSchema, faqSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`home-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
