import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const lastModified = new Date("2026-08-16");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jonasknppel.me/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://jonasknppel.me/impressum/",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://jonasknppel.me/datenschutz/",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
