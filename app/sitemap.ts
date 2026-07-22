import type { MetadataRoute } from "next";
import { getSeoPages, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getSeoPages();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const certificatePages: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(page.lastModified),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...certificatePages];
}
