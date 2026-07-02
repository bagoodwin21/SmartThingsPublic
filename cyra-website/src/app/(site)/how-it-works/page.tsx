import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  ClipboardList,
  FileSignature,
  FlaskConical,
  HeartHandshake,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import { FAQItem } from "@/components/ui/faq-item";
import { CalendlyPlaceholder } from "@/components/ui/calendly-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "How It Works",
    description:
      "How CYRA Wellness works, step by step: free discovery call, health history, your Start Visit with Dr. Mondona, lab review, care plan agreement, and ongoing physician-led care.",
    path: "/how-it-works",
  });
}

interface Step {
  Icon: LucideIcon;
  title: string;
  meta?: string;
  body: string;
  embed?: boolean;
}

const steps: Step[] = [
  {
    Icon: CalendarCheck,
    title: "Book Your Free Discovery Call",
    meta: "15 min · Free",
    body: "A 15-minute video call with our care coordinator to make sure CYRA is the right fit for you. We'll cover your main symptoms, your goals, and answer any questions about the process. No charge, no commitment.",
    embed: true,
  },
  {
    Icon: ClipboardList,
    title: "Complete Your Health History",
    body: "Before your Start Visit, you'll fill out a detailed intake form covering your symptom history, past labs, medications, and goals. This lets Dr. Mondona come prepared.",
  },
  {
    Icon: Video,
    title: "Your Start Visit",
    meta: "$399 · 60 min",
    body: "A 60-minute video visit with Dr. Mondona. This is your comprehensive evaluation — she'll review your history, discuss your symptoms in depth, order labs appropriate for your situation, and outline what a care plan might look like for you.",
  },
  {
    Icon: FlaskConical,
    title: "Lab Review & Protocol Design",
    body: "Once your labs are back, Dr. Mondona reviews them in the context of your symptoms — not just against a 'normal range' but against what optimal looks like for a woman your age and stage. She designs your initial protocol.",
  },
  {
    Icon: FileSignature,
    title: "Your Care Plan Agreement",
    body: "Your 12-month care plan outlines your treatment protocol, follow-up schedule, and total investment. You choose your payment method: Cherry financing (monthly payments with approved credit) or card on file.",
  },
  {
    Icon: HeartHandshake,
    title: "Ongoing Care",
    body: "Quarterly follow-up visits minimum, with lab rechecks as clinically appropriate. Protocol adjustments as your body responds. Messaging access through your patient portal for questions between visits.",
  },
];

const faqs = [
  {
    question: "What if I've already had labs done recently?",
    answer:
      "Bring them — recent labs are genuinely useful. If they're comprehensive and current (generally within the last few months), Dr. Mondona may not need to reorder everything; she'll review what you have and order only what's missing for a complete hormonal and metabolic picture.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "No. CYRA is a direct, cash-pay practice — you can book your discovery call today without a referral, insurance authorization, or any paperwork from another provider.",
  },
  {
    question: "What states do you serve?",
    answer:
      "CYRA currently serves patients located in California. All visits are conducted by secure video telehealth, so anywhere in the state works — from your home, office, or parked car between school pickups.",
  },
  {
    question: "Can I use HSA/FSA funds?",
    answer:
      "In most cases, yes. CYRA's medical services are generally eligible expenses for HSA and FSA accounts, and we can provide documentation for your administrator. We also provide superbills on request for potential out-of-network insurance reimbursement.",
  },
  {
    question: "What if the care plan isn't working for me?",
    answer:
      "Your protocol isn't set in stone — adjusting it as your body responds is the whole point of ongoing physician care. If something isn't working, message through the portal or raise it at your follow-up, and Dr. Mondona will reassess and revise the approach. If a concern ever goes beyond the protocol itself, talk to us directly — we'd rather solve it with you than have you quietly unhappy.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>How It Works</SectionLabel>
          <h1 className="heading-hero">
            Simple. Clear. Built around your schedule.
          </h1>
          <p className="text-subheadline mt-6">
            Here&rsquo;s exactly what happens from your first click to an
            active care plan.
          </p>
        </FadeUp>
      </Section>

      {/* Steps — vertical timeline */}
      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <ol className="relative ml-5 space-y-12 border-l border-border pl-10 md:ml-6 md:space-y-14 md:pl-14">
            {steps.map((step, i) => (
              <FadeUp key={step.title}>
                <li className="relative">
                  <span className="absolute -left-[3.9rem] top-0 flex h-11 w-11 items-center justify-center rounded-full bg-primary font-heading text-base font-bold text-white md:-left-[5rem] md:h-12 md:w-12 md:text-lg">
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
                      {step.title}
                    </h2>
                    {step.meta && (
                      <span className="text-small font-semibold text-accent">
                        {step.meta}
                      </span>
                    )}
                  </div>
                  <p className="text-body-copy mt-3">{step.body}</p>
                  {step.embed && (
                    <CalendlyPlaceholder className="mt-6 min-h-72" />
                  )}
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <FadeUp className="text-center">
            <SectionLabel>Good to Know</SectionLabel>
            <h2 className="heading-section">Questions about the process</h2>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-10">
            {faqs.map((faq) => (
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
            Ready to take the first step?
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            Start with the free 15-minute discovery call — no charge, no
            commitment.
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
