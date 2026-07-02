import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Terms of Service",
    description: "CYRA Wellness terms of service.",
    path: "/terms-of-service",
  });
}

export default function TermsOfServicePage() {
  return (
    <PagePlaceholder
      label="Legal"
      title="Terms of Service"
      description="Our terms of service are being finalized and will be published here."
    />
  );
}
