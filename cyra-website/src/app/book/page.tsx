import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { CalendlyPlaceholder } from "@/components/ui/calendly-placeholder";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Book Your Free Discovery Call",
    description:
      "Book a free 15-minute discovery call with CYRA Wellness — physician-led menopause and hormone telehealth in California. No charge, no commitment.",
    path: "/book",
  });
}

const reassurances = [
  "No commitment required",
  "Speak directly with our care coordinator",
  "Get your questions answered before investing anything",
];

export default function BookPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="heading-section">Book Your Free Discovery Call</h1>
        <p className="text-subheadline mt-5">
          15 minutes. No charge. Just a conversation about whether CYRA is
          right for you.
        </p>
        <ul className="mx-auto mt-8 flex max-w-2xl flex-col items-start gap-3 sm:mx-auto sm:items-center">
          {reassurances.map((point) => (
            <li key={point} className="flex items-start gap-3 text-left">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
              </span>
              <span className="text-body-copy">{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-12 max-w-4xl">
        <CalendlyPlaceholder className="min-h-[480px]" />
      </div>
      <p className="mt-8 text-center text-small text-foreground-muted">
        Prefer to reach out first? Email us at{" "}
        <a
          href="mailto:hello@drmondona.com"
          className="font-medium text-primary hover:text-primary-light"
        >
          hello@drmondona.com
        </a>
      </p>
    </Section>
  );
}
