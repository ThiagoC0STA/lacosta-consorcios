import type { Metadata } from "next";
import type { CategoryData } from "./categoryTypes";
import { SITE_URL } from "./seo";

export function buildCategoryMetadata(cat: CategoryData): Metadata {
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${cat.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `${SITE_URL}/${cat.slug}`,
      title: cat.ogTitle,
      description: cat.ogDescription,
      siteName: "Lacosta Consórcios",
    },
    twitter: {
      card: "summary_large_image",
      title: cat.ogTitle,
      description: cat.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}
