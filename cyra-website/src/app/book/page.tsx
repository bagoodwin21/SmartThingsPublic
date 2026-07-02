import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Book Your Free Discovery Call",
    description:
      "Book a free 15-minute discovery call with CYRA Wellness — physician-led menopause and hormone telehealth in California.",
    path: "/book",
  });
}

export default function BookPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl py-10 text-center md:py-16">
        <SectionLabel>Book</SectionLabel>
        <h1 className="heading-section">Book your free discovery call</h1>
        <p className="text-subheadline mt-6">
          Online scheduling is coming soon. In the meantime, email us and
          we&rsquo;ll set up your free 15-minute call — no pressure, no
          commitment.
        </p>
        <div className="mt-8">
          {/* Replace with the scheduling widget / booking link when ready */}
          <a
            href="mailto:hello@drmondona.com?subject=Free%20Discovery%20Call"
            className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
          >
            Email to Book
          </a>
        </div>
      </div>
    </Section>
  );
}
