import { COMPANY_FOUNDING_DATE_ISO, COMPANY_CNPJ_RAW, formatCnpj, LEGAL_COMPANY_NAME } from "../lib/legal";
import { SITE_URL, SITE_NAME } from "../lib/seo";
import { CATEGORIES } from "../lib/categories";
import { CATEGORY_KEYS_IN_ORDER } from "../lib/categoryNavLinks";

const areaServedBrazil = {
  "@type": "Country",
  name: "Brazil",
};

const companyAddress = {
  "@type": "PostalAddress",
  streetAddress: "Rua da Capitania, 127",
  addressLocality: "Curitiba",
  addressRegion: "PR",
  postalCode: "81520-590",
  addressCountry: "BR",
};

const companyGeo = {
  "@type": "GeoCoordinates",
  latitude: -25.4537,
  longitude: -49.2455,
};

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_COMPANY_NAME,
    taxID: formatCnpj(COMPANY_CNPJ_RAW),
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-5.png`,
      width: 163,
      height: 48,
    },
    description:
      "Parceiros oficiais Servopa e Rodobens. Assessoria especializada em consórcio de imóvel, veículo e investimento em todo o Brasil. 100% sem juros. +25 anos de mercado. Sede em Curitiba, PR.",
    address: companyAddress,
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
    foundingDate: COMPANY_FOUNDING_DATE_ISO,
  };

  const reviewSchemas = [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Maria Silva" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Comprei meu primeiro apartamento através do consórcio. O processo foi muito tranquilo e a equipe me ajudou em cada etapa. Economizei R$ 45.000 comparado ao financiamento!",
      datePublished: "2025-08-15",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "João Santos" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Realizei o sonho de ter meu carro zero. As taxas são justas e o atendimento é excelente. Fui contemplado em apenas 6 meses!",
      datePublished: "2025-10-22",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ana Oliveira" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Investi em meu negócio com tranquilidade. O consórcio me deu a segurança que eu precisava para crescer. Economia de R$ 60.000!",
      datePublished: "2025-12-05",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Fernanda Souza" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Fui muito bem atendida e consegui comprar meu consultório sem burocracia. Processo muito mais simples que no banco!",
      datePublished: "2026-01-18",
    },
  ];

  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#financialservice`,
    name: SITE_NAME,
    description:
      "Assessoria em consórcio Servopa e Rodobens para imóvel, veículo, investimento, estética, embarcações e mais. 100% sem juros. Atendimento personalizado em todo o Brasil.",
    image: `${SITE_URL}/logo-5.png`,
    url: SITE_URL,
    telephone: "+55-41-3076-1050",
    email: "luciano@lacostacorretora.com.br",
    priceRange: "$$",
    areaServed: areaServedBrazil,
    address: companyAddress,
    geo: companyGeo,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Consórcios disponíveis",
      itemListElement: CATEGORY_KEYS_IN_ORDER.map((key) => {
        const c = CATEGORIES[key];
        return {
          "@type": "OfferCatalog",
          name: c.name,
          description: c.metaDescription,
          url: `${SITE_URL}/${c.slug}`,
        };
      }),
    },
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "5000",
      reviewCount: "312",
    },
    review: reviewSchemas,
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Consórcio Servopa e Rodobens em todo o Brasil. Parceiros oficiais Lacosta. Imóvel, veículo, investimento e mais. 100% sem juros. Simule grátis.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "pt-BR",
  };

  const schemas = [
    organizationSchema,
    financialServiceSchema,
    webSiteSchema,
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
