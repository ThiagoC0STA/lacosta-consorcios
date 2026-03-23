import { FAQ_ITEMS, SITE_URL, SITE_NAME } from "../lib/seo";

/**
 * JSON-LD structured data for SEO
 * Renders Organization, FinancialService, WebSite, and FAQPage schemas
 */
const areaServedBrazil = {
  "@type": "Country",
  name: "Brazil",
};

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-5.png`,
    description:
      "Lacosta Consórcios — parceiros oficiais Servopa e Rodobens. Consórcio de imóveis, veículos e investimento em todo o Brasil. 100% sem juros. Simulação grátis. Sede em Curitiba (PR).",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua da Capitania, 127",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    areaServed: areaServedBrazil,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-41-3076-1050",
      contactType: "customer service",
      email: "luciano@lacostacorretora.com.br",
      areaServed: areaServedBrazil,
      availableLanguage: "Portuguese",
    },
    sameAs: [
      "https://www.instagram.com/lacosta_corretora",
    ],
  };

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#financialservice`,
    name: SITE_NAME,
    description:
      "Corretora parceira Servopa e Rodobens. Consórcio em todo o Brasil — imóvel, veículo e investimento, sem juros. Atendimento com consultoria dedicada.",
    image: `${SITE_URL}/logo-5.png`,
    url: SITE_URL,
    telephone: "+55-41-3076-1050",
    email: "luciano@lacostacorretora.com.br",
    areaServed: areaServedBrazil,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua da Capitania, 127, Guabirotuba",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Consórcio Servopa e Rodobens em todo o Brasil. Parceiros oficiais Lacosta — imóvel, veículo, investimento. 100% sem juros. Simule grátis.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "pt-BR",
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

  const schemas = [
    organizationSchema,
    financialServiceSchema,
    webSiteSchema,
    faqSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
