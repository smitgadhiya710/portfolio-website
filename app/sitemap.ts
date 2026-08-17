import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://smitgadhiya.com",
      lastModified: new Date("2026-08-17"),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
