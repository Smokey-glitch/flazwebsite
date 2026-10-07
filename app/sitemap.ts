import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { articles } from "@/lib/insights";
import { projects } from "@/lib/projects";
import { servicePages } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/services", "/projects", "/industries", "/about", "/insights", "/contact", "/privacy-policy", "/cookie-policy", "/terms-of-service", "/refund-policy"];
  return [
    ...staticPaths.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...servicePages.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/insights/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
