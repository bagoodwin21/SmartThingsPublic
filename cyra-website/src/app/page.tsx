import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Divider } from "@/components/ui/divider";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { FAQItem } from "@/components/ui/faq-item";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "California Menopause & Hormone Telehealth",
    description:
      "Physician-led perimenopause, menopause, HRT, and midlife weight management care via telemedicine in California. Cash-pay practice of Dr. Mondona Goodwin, DO.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge>California Licensed</Badge>
            <Badge variant="accent">DO Physician</Badge>
            <Badge variant="warm">Cash-Pay Telemedicine</Badge>
          </div>
          <h1 className="heading-hero mt-6">
            Hormone care that finally listens to you
          </h1>
          <p className="text-subheadline mt-6">
            Perimenopause, menopause, HRT — including testosterone — and midlife
            weight management, led by Dr. Mondona Goodwin, DO. Real appointments,
            real answers, entirely online.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="accent">Book Free Consult</Button>
            <Button variant="secondary">How It Works</Button>
          </div>
        </div>
      </Section>

      {/* What we treat preview */}
      <Section tone="surface">
        <div className="text-center">
          <SectionLabel>What We Treat</SectionLabel>
          <h2 className="heading-section">Care built for midlife</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardTitle>Perimenopause &amp; Menopause</CardTitle>
            <CardDescription>
              Evidence-based evaluation and treatment for hot flashes, sleep
              disruption, mood changes, brain fog, and more.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Hormone Replacement Therapy</CardTitle>
            <CardDescription>
              Individualized HRT — including testosterone — prescribed and
              monitored by a physician who specializes in midlife hormones.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Midlife Weight Management</CardTitle>
            <CardDescription>
              A metabolic approach to midlife weight change that works with your
              hormones, not against them.
            </CardDescription>
          </Card>
        </div>
      </Section>

      {/* Testimonial */}
      <Section>
        <div className="text-center">
          <SectionLabel>Patient Stories</SectionLabel>
          <h2 className="heading-section">Women who got their lives back</h2>
        </div>
        <Divider />
        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            quote="For the first time, a doctor actually listened. Within two months on the right HRT plan, I felt like myself again."
            name="Sarah M."
            location="San Diego, CA"
          />
          <TestimonialCard
            quote="Dr. Goodwin explained what was happening to my body better than anyone in 10 years of appointments."
            name="Jennifer L."
            location="Sacramento, CA"
          />
          <TestimonialCard
            quote="The whole process was simple — labs, a video visit, and a plan that finally made sense."
            name="Maria T."
            location="Los Angeles, CA"
          />
        </div>
      </Section>

      {/* FAQ preview */}
      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="heading-section">Common questions</h2>
          </div>
          <div className="mt-10">
            <FAQItem
              question="Do you accept insurance?"
              answer="CYRA Wellness is a cash-pay practice, which lets us spend real time with you instead of billing codes. We can provide superbills you may submit to your insurer for possible reimbursement."
            />
            <FAQItem
              question="Where are you licensed to practice?"
              answer="Dr. Goodwin is licensed in California and Arizona, and all visits are conducted by secure video telemedicine."
            />
            <FAQItem
              question="Do you prescribe testosterone for women?"
              answer="Yes. When clinically appropriate, testosterone can be part of an individualized hormone plan, with careful lab monitoring throughout."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
