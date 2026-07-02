import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Compare",
    description:
      "How CYRA Wellness compares to hormone startups and traditional primary care for menopause and HRT in California.",
    path: "/compare",
  });
}

export default function ComparePage() {
  return (
    <PagePlaceholder
      label="Compare"
      title="How CYRA compares"
      description="A side-by-side comparison with hormone startups and traditional care is coming soon."
    />
  );
}
