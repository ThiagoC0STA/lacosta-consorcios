import { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";
import { CATEGORY_PAGE_SLUGS } from "./lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_PAGE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": SITE_URL,
        },
      },
    },
    ...categoryEntries,
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/termos`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
