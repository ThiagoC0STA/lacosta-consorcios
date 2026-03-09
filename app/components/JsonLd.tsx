import { FAQ_ITEMS, SITE_URL, SITE_NAME } from "../lib/seo";

/**
 * JSON-LD structured data for SEO
 * Renders Organization, LocalBusiness, WebSite, and FAQPage schemas
 */
export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-5.png`,
    description:
      "Corretora de consórcios em Curitiba. Consórcio Servopa e Rodobens. Imóveis, veículos, investimento e mais. 100% sem juros. Simulação grátis.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua da Capitania, 127",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-41-3076-1050",
      contactType: "customer service",
      email: "luciano@lacostacorretora.com.br",
      areaServed: "BR",
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
    image: `${SITE_URL}/logo-5.png`,
    url: SITE_URL,
    telephone: "+55-41-3076-1050",
    email: "luciano@lacostacorretora.com.br",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua da Capitania, 127",
      addressLocality: "Guabirotuba",
      addressRegion: "Curitiba - PR",
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
      "Consórcios Servopa e Rodobens em Curitiba. Imóvel, veículo, investimento. Simule grátis. 100% sem juros.",
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
