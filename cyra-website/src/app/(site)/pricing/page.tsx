import type { Metadata } from "next";
import Link from "next/link";
import { Check, Wallet } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Pricing",
    description:
      "Transparent cash-pay pricing for physician-led menopause and hormone telehealth in California. Start Visit, 12-month care plans, and Cherry financing — no insurance billing, no surprise statements.",
    path: "/pricing",
  });
}

/*
 * NOTE: Care plan dollar amounts are intentionally placeholders.
 * Confirm current care plan tiers and pricing before replacing
 * the [PLACEHOLDER] strings below.
 */

interface PricingTier {
  name: string;
  price: string;
  priceDetail: string;
  featured?: boolean;
  includes: string[];
  note: string;
}

const tiers: PricingTier[] = [
  {
    name: "Start Visit",
    price: "$399",
    priceDetail: "one time",
    includes: [
      "60-minute comprehensive evaluation with Dr. Mondona",
      "Lab orders appropriate to your presentation",
      "Initial protocol recommendations",
      "Care plan proposal",
    ],
    note: "Required before enrolling in a care plan",
  },
  {
    name: "12-Month Care Plan",
    price: "[PLACEHOLDER]",
    priceDetail: "per month via Cherry or card on file",
    featured: true,
    includes: [
      "Ongoing physician management by Dr. Mondona",
      "Quarterly follow-up visits (minimum)",
      "Lab review and protocol adjustments",
      "Patient portal messaging access",
      "Prescription management",
    ],
    note: "Medication costs are separate through your pharmacy",
  },
];

const notIncluded = [
  "Pharmacy costs for prescribed medications",
  "Lab costs (billed through your lab provider; most are low cash-pay rates)",
  "Any specialist referrals outside CYRA's scope",
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>Pricing</SectionLabel>
          <h1 className="heading-hero">Transparent pricing. No surprise bills.</h1>
          <p className="text-subheadline mt-6">
            CYRA is cash-pay telehealth — no insurance billing, no prior
            authorizations, no surprise statements three months later. You know
            exactly what you&rsquo;re paying.
          </p>
        </FadeUp>
      </Section>

      {/* Pricing cards */}
      <Section tone="surface" className="pt-0 md:pt-0">
        <div className="mx-auto grid max-w-4xl gap-8 pt-12 md:grid-cols-2 md:pt-20">
          {tiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.12}>
              <Card
                className={cn(
                  "flex h-full flex-col",
                  tier.featured && "border-2 border-primary"
                )}
              >
                {tier.featured && (
                  <Badge className="mb-4 self-start">Structured as a care plan, not a subscription</Badge>
                )}
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  {tier.name}
                </h2>
                <p className="mt-4">
                  <span className="font-heading text-4xl font-bold text-primary">
                    {tier.price}
                  </span>{" "}
                  <span className="text-small text-foreground-muted">
                    {tier.priceDetail}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check
                          className="h-3.5 w-3.5"
                          strokeWidth={3}
                          aria-hidden
                        />
                      </span>
                      <span className="text-body-copy">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-border pt-5 text-small text-foreground-muted">
                  {tier.note}
                </p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* Financing */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>Financing</SectionLabel>
          <h2 className="heading-section">
            Your care plan, on your timeline
          </h2>
          <div className="mt-6 flex justify-center">
            <Badge variant="accent">
              <Wallet className="h-3.5 w-3.5" aria-hidden />
              Cherry Financing
            </Badge>
          </div>
          <p className="text-subheadline mt-6">
            We work with Cherry so your care plan is never limited by a lump
            sum. Check your rate without affecting your credit score.
          </p>
          {/* Cherry rate-check widget placeholder — replace with the
              embed snippet from the Cherry practice dashboard. */}
          <div className="mt-10 flex min-h-48 flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed border-accent/40 bg-accent/5 p-8">
            <Wallet className="h-9 w-9 text-accent/60" aria-hidden />
            <p className="text-small font-medium text-foreground-secondary">
              Cherry rate-check widget embed
            </p>
          </div>
        </FadeUp>
      </Section>

      {/* What's not included */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel>Full Transparency</SectionLabel>
          <h2 className="heading-section">What&rsquo;s not included</h2>
          <p className="text-body-copy mt-6">
            To keep pricing clear, here&rsquo;s what isn&rsquo;t included in
            your care plan:
          </p>
          <ul className="mt-6 space-y-3">
            {notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <span className="text-body-copy">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-card border border-border bg-background p-6 md:p-8">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              HSA / FSA
            </h3>
            <p className="text-body-copy mt-2">
              CYRA services are generally eligible for reimbursement through
              HSA and FSA accounts. We provide superbills upon request for
              potential out-of-network reimbursement.
            </p>
          </div>
        </FadeUp>
      </Section>

      {/* Final CTA */}
      <Section tone="primary">
        <FadeUp className="mx-auto max-w-2xl py-4 text-center md:py-8">
          <h2 className="font-heading text-section-mobile text-white md:text-section">
            Questions about cost? Just ask.
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            The free discovery call is the easiest way to understand exactly
            what your care would involve — including the numbers.
          </p>
          <div className="mt-8">
            <Link
              href="/book"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
            >
              Book Free Discovery Call
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
