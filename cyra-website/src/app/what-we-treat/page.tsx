import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "What We Treat",
    description:
      "Perimenopause, menopause, hormone replacement therapy (including testosterone), and midlife weight management — treated by a California-licensed DO physician.",
    path: "/what-we-treat",
  });
}

export default function WhatWeTreatPage() {
  return (
    <PagePlaceholder
      label="What We Treat"
      title="Perimenopause, menopause, HRT & more"
      description="Detailed condition and treatment information is coming soon."
    />
  );
}
