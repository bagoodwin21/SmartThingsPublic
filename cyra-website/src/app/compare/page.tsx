import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CalendarRange,
  Check,
  CreditCard,
  Droplets,
  Receipt,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Divider } from "@/components/ui/divider";
import { FAQItem } from "@/components/ui/faq-item";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ComparisonTable } from "./comparison-table";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Compare Menopause Telehealth Platforms",
    description:
      "How does CYRA Wellness compare to Midi, Alloy, Evernow, Winona, and Hers? A detailed comparison of menopause telehealth platforms including provider type, testosterone access, care structure, and financing options.",
    path: "/compare",
  });
}

const dimensions = [
  {
    Icon: Stethoscope,
    title: "Who delivers your care",
    body: "Is your prescribing provider a physician, nurse practitioner, or PA? This affects scope of practice, clinical judgment, and what they can prescribe.",
  },
  {
    Icon: Droplets,
    title: "Testosterone access",
    body: "Many platforms either don't offer testosterone for women, require a separate add-on fee, or treat it as secondary. For many women, it's the missing piece.",
  },
  {
    Icon: CalendarRange,
    title: "How treatment is structured",
    body: "Month-to-month subscriptions create financial flexibility but also incentivize platforms to retain subscribers rather than graduate them. Care plans create a different dynamic.",
  },
  {
    Icon: Receipt,
    title: "What's included vs. billed separately",
    body: "Some platforms advertise low monthly costs but charge separately for labs, medications, and follow-ups. Understand total cost of care, not just the subscription fee.",
  },
  {
    Icon: CreditCard,
    title: "Financing options",
    body: "If a care plan or subscription is a financial stretch, does the platform offer financing? Cherry and CareCredit integrations matter for accessibility.",
  },
  {
    Icon: UserCheck,
    title: "Continuity of care",
    body: "Do you see the same provider each time, or rotate through whoever is available? Continuity matters in hormone care where your provider needs to know your history and trajectory.",
  },
];

const deeperDives = [
  {
    name: "Midi Health",
    paragraphs: [
      "Midi has built one of the largest menopause telehealth networks in the country, and their NPs are focused specifically on this phase of life — that focus matters.",
      "Where CYRA differs: your care at Midi will primarily be delivered by nurse practitioners rather than a physician, and you may see different providers across visits. For women who want a specific physician who knows their history and can draw on the full scope of a DO's training, that difference is worth considering.",
    ],
  },
  {
    name: "Alloy Women's Health",
    paragraphs: [
      "Alloy offers physician-designed protocols at an accessible price point, making them a good entry point for women exploring HRT for the first time. Their approach is protocol-driven rather than fully individualized, which works well for straightforward presentations.",
      "Where CYRA differs: if your situation is more complex — multiple symptoms, thyroid involvement, weight management alongside hormone care — CYRA's fully personalized approach and physician continuity offer more flexibility.",
    ],
  },
  {
    name: "Evernow",
    paragraphs: [
      "Evernow has invested heavily in their app experience and data-driven approach. For women who prefer a tech-forward, app-centric workflow, it's a solid option.",
      "Where CYRA differs: Evernow's care is primarily delivered through NPs and is more algorithmically structured — which trades some personalization for scale and consistency.",
    ],
  },
  {
    name: "Winona",
    paragraphs: [
      "Winona focuses specifically on compounded bioidentical hormone therapy and has developed a clear, streamlined process for women who already know they want BHRT.",
      "Where CYRA differs: CYRA isn't compounded-only — Dr. Mondona works with both FDA-approved and compounded options based on what's clinically appropriate for you, rather than defaulting to one category.",
    ],
  },
  {
    name: "Hers",
    paragraphs: [
      "Hers is a broad women's health platform covering everything from skincare to mental health — hormone care is one of many offerings.",
      "For women specifically navigating perimenopause and menopause, a menopause-specialist practice offers more focused expertise and a provider whose entire clinical focus is this phase of life.",
    ],
  },
];

const questionsToAsk = [
  "Who will actually be delivering my care — physician, NP, or PA?",
  "Will I see the same provider at every visit?",
  "Is testosterone included or is it an add-on?",
  "What's the total monthly cost including labs and medications?",
  "Can I get a superbill for potential insurance reimbursement?",
  "What happens if I want to pause or cancel?",
  "Who do I contact between visits if I have a question?",
  "How are my labs reviewed — by my prescribing provider or a separate reviewer?",
];

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <div className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>Compare</SectionLabel>
          <h1 className="heading-hero">
            Not all menopause telehealth is the same. Here&rsquo;s what to look
            for.
          </h1>
          <p className="text-subheadline mt-6">
            The growth of online hormone care has been great for women. But
            there are meaningful differences in who delivers your care,
            what&rsquo;s included in your fees, and how your treatment is
            structured. Here&rsquo;s an honest look.
          </p>
          <div className="mt-8">
            <a
              href="#comparison"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Jump to comparison
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </Section>

      {/* Section 1 — What actually differs */}
      <Section tone="surface">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Choosing a Platform</SectionLabel>
          <h2 className="heading-section">
            What actually differs between platforms
          </h2>
          <p className="text-subheadline mt-5">
            Before you compare names, compare on the dimensions that shape your
            care. These six matter most.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dimensions.map(({ Icon, title, body }) => (
            <Card key={title}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <CardTitle className="mt-4">{title}</CardTitle>
              <CardDescription>{body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 2 — Comparison table */}
      <Section id="comparison" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Side by Side</SectionLabel>
          <h2 className="heading-section">The comparison</h2>
          <p className="text-subheadline mt-5">
            How CYRA Wellness compares with the major menopause telehealth
            platforms, criterion by criterion.
          </p>
        </div>
        <div className="mt-12">
          <ComparisonTable />
        </div>
      </Section>

      {/* Section 3 — Deeper dives */}
      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionLabel>Deeper Dives</SectionLabel>
            <h2 className="heading-section">
              A closer, honest look at each platform
            </h2>
            <p className="text-subheadline mt-5">
              These platforms have helped many women access care. Here&rsquo;s
              what each does well, who it fits, and where CYRA differs.
            </p>
          </div>
          <div className="mt-10">
            {deeperDives.map((dive) => (
              <FAQItem
                key={dive.name}
                question={dive.name}
                answer={
                  <div className="space-y-4">
                    {dive.paragraphs.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Section 4 — Questions to ask */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionLabel>Your Checklist</SectionLabel>
            <h2 className="heading-section">
              Before you choose any platform, ask these questions.
            </h2>
            <p className="text-subheadline mt-5">
              Take this list to every consult — including ours. A platform
              that&rsquo;s confident in its care will welcome all of them.
            </p>
          </div>
          <ul className="mx-auto mt-10 max-w-2xl space-y-4">
            {questionsToAsk.map((question) => (
              <li key={question} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-body-copy">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Section 5 — Final CTA */}
      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <Divider className="my-0 mb-10" />
          <h2 className="heading-section">
            Want to see if CYRA is the right fit?
          </h2>
          <p className="text-subheadline mt-5">
            The discovery call is 15 minutes, free, and there&rsquo;s no
            pressure to enroll. Just a conversation.
          </p>
          <div className="mt-8">
            <Button variant="accent" size="lg">
              Book Free Discovery Call
            </Button>
          </div>
          <Link
            href="/how-it-works"
            className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-primary hover:text-primary-light"
          >
            Or read more about how our care plans work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}
