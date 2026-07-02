import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface PageSeo {
  title: string;
  description?: string;
  path?: string;
}

/**
 * Builds per-page metadata. The root layout supplies the
 * "CYRA Wellness | %s" title template, so pages pass only their name.
 */
export function buildMetadata({ title, description, path = "/" }: PageSeo): Metadata {
  const desc = description ?? siteConfig.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: `${siteConfig.name} | ${title}`,
      description: desc,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${title}`,
      description: desc,
    },
  };
}
