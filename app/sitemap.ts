import { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();
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
