import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const lastModified = new Date("2026-06-14");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jonasknppel.me/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
