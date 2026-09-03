import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";
import { absoluteUrl, PUBLIC_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...PUBLIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changefreq,
      priority: route.priority,
    })),
    ...industries.map((item) => ({
      url: absoluteUrl(`/industries/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
