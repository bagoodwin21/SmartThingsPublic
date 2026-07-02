import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import {
  FAQCategories,
  type FAQCategory,
} from "@/components/ui/faq-categories";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "FAQ",
    description:
      "Answers to common questions about CYRA Wellness: getting started, the Start Visit, care plans and pricing, treatment questions like HRT and testosterone, and telehealth logistics.",
    path: "/faq",
  });
}

const categories: FAQCategory[] = [
  {
    name: "Getting Started",
    faqs: [
      {
        question: "Do I need a referral to see Dr. Mondona?",
        answer:
          "No. CYRA is a direct, cash-pay practice — no referral, no insurance authorization, no paperwork from another provider. You can book your free discovery call today and be on the schedule this week.",
      },
      {
        question: "What states do you serve?",
        answer:
          "CYRA currently serves patients located in California. Because every visit happens over secure video, anywhere in the state works — home, office, or your car between errands.",
      },
      {
        question: "What happens at the free discovery call?",
        answer:
          "It's a relaxed 15-minute video call with our care coordinator. You'll share what's been going on and what you're hoping to change, we'll explain exactly how the practice works, and together we'll figure out whether CYRA is the right fit. No charge, no pressure, and no obligation to continue.",
      },
      {
        question: "How long does it take to get started?",
        answer:
          "Faster than you'd expect. Discovery calls are usually available within days, your Start Visit follows shortly after, and labs typically come back within a week or two. Most women go from first click to an active care plan in a few weeks — not the months a specialist referral can take.",
      },
      {
        question: "Can my husband or partner book for me?",
        answer:
          "Absolutely — partners are often the ones who take the first step, and we love that. They can book the discovery call on your behalf; from there, you'll complete the intake and attend the visits, since the care itself is all about you.",
      },
    ],
  },
  {
    name: "The Start Visit",
    faqs: [
      {
        question: "What does the $399 Start Visit include?",
        answer:
          "A 60-minute comprehensive evaluation with Dr. Mondona: your full history and symptoms reviewed in depth, lab orders tailored to your presentation, initial protocol recommendations, and a written care plan proposal. It's the foundation everything else is built on.",
      },
      {
        question: "How long is the Start Visit?",
        answer:
          "A full 60 minutes, all of it with Dr. Mondona herself. That's roughly four times the length of a typical primary care appointment — because your history genuinely takes that long to hear properly.",
      },
      {
        question: "Will Dr. Mondona order labs at my Start Visit?",
        answer:
          "Yes. She'll order a panel appropriate to your situation — typically covering sex hormones, thyroid, and metabolic markers — drawn at a lab location convenient to you. Lab fees are billed separately at what are usually low cash-pay rates.",
      },
      {
        question: "What if I've had recent labs done elsewhere?",
        answer:
          "Bring them! If your labs are recent and comprehensive, Dr. Mondona won't reorder what she doesn't need — she'll review what you have and only fill in the gaps. If you're unsure whether yours qualify, bring it up in your free discovery call.",
      },
    ],
  },
  {
    name: "Care Plans & Pricing",
    faqs: [
      {
        question:
          "What is a care plan and how is it different from a subscription?",
        answer:
          "A care plan is a structured 12-month course of treatment with defined goals, a follow-up schedule, and a known total investment. A subscription is an open-ended monthly charge — and platforms built on subscriptions are rewarded for keeping you subscribed, not for getting you well. Your care plan is designed to move you toward feeling like yourself again, with a clear picture of the whole journey up front.",
      },
      {
        question: "What does the care plan include?",
        answer:
          "Ongoing physician management by Dr. Mondona, quarterly follow-up visits at minimum, lab review and protocol adjustments as your body responds, prescription management, and messaging access through your patient portal between visits.",
      },
      {
        question: "What's NOT included in the care plan?",
        answer:
          "Three things, so there are no surprises: pharmacy costs for your prescribed medications, lab fees (billed through your lab provider, usually at low cash-pay rates), and any specialist care outside CYRA's scope. Everything else about your hormone care lives inside the plan.",
      },
      {
        question: "Can I use my HSA or FSA?",
        answer:
          "In most cases, yes — CYRA's medical services are generally eligible expenses for HSA and FSA accounts, and we can provide documentation for your plan administrator. It's one of the most common ways patients fund their care.",
      },
      {
        question: "How does Cherry financing work?",
        answer:
          "Cherry lets you split your care plan into monthly payments with approved credit. You can check your rate in about a minute without affecting your credit score, and if approved, payments are set up before your plan begins. If you'd like to talk through the numbers first, bring it up in your free discovery call.",
      },
      {
        question: "What if I want to stop my care plan early?",
        answer:
          "Talk to us — really. Care plans run 12 months because hormone optimization genuinely takes time to dial in, but we understand that life changes. If something isn't working, the first step is usually adjusting your protocol; if your circumstances change altogether, we'll walk through your options together rather than hide behind fine print.",
      },
    ],
  },
  {
    name: "Treatment & Clinical",
    faqs: [
      {
        question: "Does CYRA prescribe bioidentical hormones?",
        answer:
          "Yes. Dr. Mondona works with FDA-approved body-identical hormones — like estradiol and micronized progesterone — as well as compounded formulations when there's a clinical reason a standard product doesn't fit. The choice is driven by evidence and your needs, not marketing labels.",
      },
      {
        question: "Do you prescribe testosterone for women?",
        answer:
          "Yes — and unlike most platforms, we treat it as a core part of hormone care rather than an add-on. When your labs and symptoms support it, testosterone is included in your protocol with careful dosing and regular monitoring.",
      },
      {
        question:
          "Will you work with me if I'm already on HRT from another provider?",
        answer:
          "Of course. Bring your current regimen and any records you have — your experience on it is valuable diagnostic information. Dr. Mondona will review everything and refine from where you are rather than starting you over from scratch.",
      },
      {
        question: "What if my symptoms don't improve?",
        answer:
          "Then we adjust — that's exactly what the follow-up visits and lab rechecks are for. Hormone care is iterative, and the first protocol is a starting point, not a verdict. If symptoms persist despite good hormone levels, Dr. Mondona widens the lens to thyroid, metabolic, and other drivers instead of shrugging.",
      },
      {
        question: "Do you prescribe GLP-1 medications for weight management?",
        answer:
          "Yes, when your labs, history, and goals support it. GLP-1s are prescribed as one tool inside a complete plan — alongside hormone optimization and muscle preservation — not as a standalone weight-loss subscription. If a GLP-1 isn't right for you, she'll say so and explain why.",
      },
      {
        question: "Can you treat my thyroid as well?",
        answer:
          "Yes. Dr. Mondona orders a full thyroid panel — not just TSH — and treats conditions like hypothyroidism and Hashimoto's within your care plan. If something truly needs a specialist, like a suspicious nodule, she'll tell you plainly and help you get there.",
      },
    ],
  },
  {
    name: "Logistics",
    faqs: [
      {
        question: "How do visits happen?",
        answer:
          "All visits are secure video calls — from your home, office, or anywhere private in California. Your intake forms, scheduling, and messaging all live in your patient portal, so everything is in one place.",
      },
      {
        question: "How do I contact Dr. Mondona between visits?",
        answer:
          "Through your patient portal messaging, which is included in your care plan. Questions about your protocol, a new symptom, a medication concern — send a message rather than waiting months for the next appointment.",
      },
      {
        question: "Where do I fill my prescriptions?",
        answer:
          "At the pharmacy of your choice — prescriptions are sent electronically wherever you prefer. For compounded formulations, we work with reputable compounding pharmacies and will point you to good options. Medication costs are paid directly to the pharmacy.",
      },
      {
        question: "Do you accept insurance?",
        answer:
          "No — by design. Staying outside the insurance system is what makes 60-minute visits, comprehensive labs, and truly individualized protocols possible. You'll always know exactly what you're paying, with no surprise statements months later.",
      },
      {
        question:
          "Can you provide a superbill for out-of-network reimbursement?",
        answer:
          "Yes, on request. A superbill is an itemized receipt you can submit to your insurer for possible out-of-network reimbursement — many PPO plans offer some. We can't guarantee what your insurer will cover, but we'll happily provide the documentation.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>FAQ</SectionLabel>
          <h1 className="heading-hero">Frequently asked questions</h1>
          <p className="text-subheadline mt-6">
            Everything you might want to know before your first call — and if
            it&rsquo;s not here, the free discovery call exists for exactly
            that.
          </p>
        </FadeUp>
      </Section>

      <Section tone="surface" className="pt-0 md:pt-0">
        <FadeUp className="mx-auto max-w-3xl pt-12 md:pt-20">
          <FAQCategories categories={categories} />
        </FadeUp>
      </Section>

      <Section tone="primary">
        <FadeUp className="mx-auto max-w-2xl py-4 text-center md:py-8">
          <h2 className="font-heading text-section-mobile text-white md:text-section">
            Still have questions?
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            Bring them to your free 15-minute discovery call — that&rsquo;s
            what it&rsquo;s for.
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
