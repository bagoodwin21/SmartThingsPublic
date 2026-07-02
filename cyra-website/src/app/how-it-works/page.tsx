import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "How It Works",
    description:
      "How CYRA Wellness telemedicine works: book a free consult, complete labs, meet Dr. Goodwin by video, and start an individualized hormone care plan.",
    path: "/how-it-works",
  });
}

export default function HowItWorksPage() {
  return (
    <PagePlaceholder
      label="How It Works"
      title="Simple, physician-led care from home"
      description="From your free consult to labs, video visits, and ongoing follow-up — full page content coming soon."
    />
  );
}
