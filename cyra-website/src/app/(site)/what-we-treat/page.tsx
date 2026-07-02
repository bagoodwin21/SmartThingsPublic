import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import { buttonVariants } from "@/components/ui/button";
import { conditions } from "@/lib/conditions";
import { conditionIcons } from "@/lib/condition-icons";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "What We Treat",
    description:
      "Perimenopause, menopause, testosterone therapy, estrogen and progesterone, thyroid and adrenal health, and midlife weight management — physician-led telehealth for California women.",
    path: "/what-we-treat",
  });
}

export default function WhatWeTreatPage() {
  return (
    <>
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>What We Treat</SectionLabel>
          <h1 className="heading-hero">
            We specialize in what matters most to you.
          </h1>
          <p className="text-subheadline mt-6">
            CYRA Wellness focuses exclusively on midlife women&rsquo;s hormonal
            health — which means Dr. Mondona has seen your symptoms before,
            knows what to look for, and knows what works.
          </p>
        </FadeUp>
      </Section>

      <Section tone="surface" className="pt-0 md:pt-0">
        <div className="grid gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 md:pt-20">
          {Object.entries(conditions).map(([slug, info], i) => {
            const Icon = conditionIcons[slug];
            return (
              <FadeUp key={slug} delay={(i % 3) * 0.1}>
                <Link href={`/what-we-treat/${slug}`} className="block h-full">
                  <Card className="flex h-full flex-col">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <CardTitle className="mt-4">{info.title}</CardTitle>
                    <CardDescription className="flex-1">
                      {info.summary}
                    </CardDescription>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold uppercase tracking-wide text-primary">
                      Learn More
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Card>
                </Link>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp delay={0.2} className="mt-14 text-center">
          <Link
            href="/book"
            className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
          >
            Book Your Free Consult
          </Link>
        </FadeUp>
      </Section>
    </>
  );
}
