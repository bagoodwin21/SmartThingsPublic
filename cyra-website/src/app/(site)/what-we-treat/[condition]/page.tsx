import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import { FAQItem } from "@/components/ui/faq-item";
import { buttonVariants } from "@/components/ui/button";
import { conditions } from "@/lib/conditions";
import { conditionIcons } from "@/lib/condition-icons";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface PageProps {
  params: { condition: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(conditions).map((condition) => ({ condition }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const info = conditions[params.condition];
  if (!info) return {};
  return buildMetadata({
    title: info.title,
    description: `${info.tagline} Physician-led ${info.title.toLowerCase()} care via telemedicine in California from CYRA Wellness.`,
    path: `/what-we-treat/${params.condition}`,
  });
}

export default function ConditionPage({ params }: PageProps) {
  const info = conditions[params.condition];
  if (!info) notFound();

  const Icon = conditionIcons[params.condition];

  return (
    <>
      {/* Hero */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>What We Treat</SectionLabel>
          <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-8 w-8" aria-hidden />
          </span>
          <h1 className="heading-hero">{info.title}</h1>
          <p className="text-subheadline mt-6">{info.tagline}</p>
          <div className="mt-8">
            <Link
              href="/book"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
            >
              Book Free Consult
            </Link>
          </div>
        </FadeUp>
      </Section>

      {/* What's happening in your body */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel>The Biology</SectionLabel>
          <h2 className="heading-section">
            What&rsquo;s happening in your body
          </h2>
          <div className="mt-7 space-y-5">
            {info.whatsHappening.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-body-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* Symptoms checklist */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel>Sound Familiar?</SectionLabel>
          <h2 className="heading-section">Symptoms we commonly see</h2>
        </FadeUp>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {info.symptoms.map((symptom, i) => (
            <FadeUp key={symptom} delay={(i % 2) * 0.06}>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-body-copy">{symptom}</span>
              </li>
            </FadeUp>
          ))}
        </ul>
      </Section>

      {/* How CYRA approaches this */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="heading-section">How CYRA approaches this</h2>
          <div className="mt-7 space-y-5">
            {info.approach.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-body-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* What treatment might look like */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel>Treatment</SectionLabel>
          <h2 className="heading-section">What treatment might look like</h2>
          <div className="mt-7 space-y-5">
            {info.treatment.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-body-copy">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-small text-foreground-muted">
            This page is general education, not medical advice. Your treatment
            plan is designed individually after your intake visit and labs.
          </p>
        </FadeUp>
      </Section>

      {/* Why physician-led matters */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl">
          <div className="rounded-card border-l-4 border-l-primary bg-background p-8 shadow-card md:p-10">
            <Quote className="h-8 w-8 text-accent" aria-hidden />
            <h2 className="mt-4 font-heading text-xl font-semibold text-foreground md:text-2xl">
              Why physician-led care matters for{" "}
              {info.title.toLowerCase()}
            </h2>
            <p className="text-body-copy mt-4">{info.whyPhysicianLed}</p>
          </div>
        </FadeUp>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <FadeUp className="text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="heading-section">
              {info.title} questions, answered
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-10">
            {info.faqs.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </FadeUp>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="primary">
        <FadeUp className="mx-auto max-w-2xl py-4 text-center md:py-8">
          <h2 className="font-heading text-section-mobile text-white md:text-section">
            Ready to get answers?
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            The free discovery call is 15 minutes. Tell us what&rsquo;s going
            on — we&rsquo;ll tell you if we can help.
          </p>
          <div className="mt-8">
            <Link
              href="/book"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
            >
              Book Free Consult
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
