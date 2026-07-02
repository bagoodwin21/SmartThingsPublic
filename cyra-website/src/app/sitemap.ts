import type { MetadataRoute } from "next";
import { conditions } from "@/lib/conditions";
import { legalLinks, navLinks, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/book",
    ...navLinks.map((l) => l.href),
    ...Object.keys(conditions).map((slug) => `/what-we-treat/${slug}`),
    ...legalLinks.map((l) => l.href),
  ];

  return routes.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
