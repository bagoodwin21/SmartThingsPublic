import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Privacy Policy",
    description: "CYRA Wellness privacy policy.",
    path: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <PagePlaceholder
      label="Legal"
      title="Privacy Policy"
      description="Our privacy policy is being finalized and will be published here."
    />
  );
}
