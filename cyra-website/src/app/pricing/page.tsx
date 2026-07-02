import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Pricing",
    description:
      "Transparent cash-pay pricing for menopause and hormone telehealth in California. No insurance, no surprise bills.",
    path: "/pricing",
  });
}

export default function PricingPage() {
  return (
    <PagePlaceholder
      label="Pricing"
      title="Transparent, cash-pay pricing"
      description="Membership and visit pricing details are coming soon."
    />
  );
}
