import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";

export const dynamic = "force-static";

const SITE_URL = "https://abusalemrealestate.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/properties`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
