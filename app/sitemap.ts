import type { MetadataRoute } from "next";

import { projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://smit-gadhiya-portfolio.vansita-empiricinfot.chatgpt.site";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-08-18"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date("2026-08-18"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
