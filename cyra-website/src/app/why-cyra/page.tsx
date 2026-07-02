import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Why CYRA",
    description:
      "Why women choose CYRA Wellness: physician-led menopause care, real appointment time, individualized HRT, and a cash-pay model built around you.",
    path: "/why-cyra",
  });
}

export default function WhyCyraPage() {
  return (
    <PagePlaceholder
      label="Why CYRA"
      title="Care built around you, not billing codes"
      description="Learn what makes CYRA Wellness different — full page content coming soon."
    />
  );
}
