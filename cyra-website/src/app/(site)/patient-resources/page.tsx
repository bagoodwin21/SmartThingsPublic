import type { Metadata } from "next";
import Link from "next/link";
import { Check, Download, ExternalLink, KeyRound } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FAQItem } from "@/components/ui/faq-item";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Patient Resources",
    description:
      "Resources for CYRA Wellness patients: new patient checklist, a plain-English guide to your hormone labs, HRT myths vs. facts, and trusted external references.",
    path: "/patient-resources",
  });
}

const checklist = [
  "A list of your current medications and supplements, with doses",
  "Any lab results from the past 12 months (PDFs or photos are fine)",
  "A rough timeline of your symptoms — when they started, what's changed",
  "Your menstrual history: cycle changes, last period if applicable",
  "Relevant family history (breast cancer, heart disease, osteoporosis, thyroid)",
  "Your pharmacy name and location",
  "The questions you've been wanting to ask — write them down",
];

const labs = [
  {
    name: "FSH & LH",
    body: "Signals from your brain to your ovaries. When your ovaries respond less, these rise — helpful context for where you are in the transition, though never the whole story on their own.",
  },
  {
    name: "Estradiol",
    body: "Your body's main estrogen. It drives hundreds of processes — sleep, mood, bones, skin, brain — and its decline (or wild swings) is behind many perimenopause and menopause symptoms.",
  },
  {
    name: "Progesterone",
    body: "The calming counterpart to estrogen, made after ovulation. It often falls first in perimenopause, which is why sleep and anxiety changes frequently show up before anything else.",
  },
  {
    name: "Testosterone — Total & Free",
    body: "Total is everything in your bloodstream; free is what your body can actually use. Both matter for energy, libido, mood, and muscle — and 'free' is the number most evaluations skip.",
  },
  {
    name: "SHBG",
    body: "A protein that binds hormones and takes them out of circulation. High SHBG can make a 'normal' testosterone level functionally low — one reason context matters more than a single number.",
  },
  {
    name: "TSH",
    body: "The standard thyroid screening signal from your brain. Useful, but on its own it misses a lot — which is why we never stop here.",
  },
  {
    name: "Free T3 & Free T4",
    body: "Your actual active thyroid hormones. T4 is the storage form; T3 is what powers your cells. Checking both shows whether your body is making and converting thyroid hormone properly.",
  },
  {
    name: "Thyroid Antibodies",
    body: "Markers of autoimmune thyroid disease (like Hashimoto's), which can smolder for years behind normal-looking TSH. Finding them early changes how we monitor you.",
  },
  {
    name: "AM Cortisol",
    body: "Your main stress hormone, measured in the morning when it should peak. It helps us understand your stress physiology and energy pattern — the 'wired but tired' picture.",
  },
  {
    name: "Fasting Insulin & A1c",
    body: "The earliest windows into insulin resistance — the metabolic shift behind much midlife weight gain. Glucose alone can look fine for years while insulin quietly climbs.",
  },
];

const myths = [
  {
    myth: "“HRT causes breast cancer”",
    truth:
      "This fear traces to the 2002 WHI study — and two decades of re-analysis have substantially rewritten the story. The estrogen-only arm showed no increase in breast cancer risk (and in some analyses, lower risk). The small increase seen in the combined arm involved an older synthetic progestin, in an older population, and amounted to less added risk than factors like drinking two glasses of wine a day. Modern body-identical regimens, started near menopause, have a much more favorable profile. Your personal risk picture still matters — which is exactly why it's a physician conversation, not a headline.",
  },
  {
    myth: "“I'm too young for HRT”",
    truth:
      "If you're having symptoms, you're not too young to treat them. Perimenopause commonly begins in the 40s — sometimes the late 30s — and treating it early is both appropriate and effective. In fact, the evidence favors starting hormone therapy closer to the beginning of the transition, not waiting until years of symptoms have passed. Age is one data point; your symptoms and labs are the ones that matter.",
  },
  {
    myth: "“Natural menopause is healthier without hormones”",
    truth:
      "Menopause is natural — and so are the bone loss, cardiovascular changes, and sleep deprivation that can come with it. 'Natural' doesn't mean 'optimal' or 'harmless.' Choosing to go without hormones is a completely valid personal decision, but it isn't automatically the healthier one: for many women, well-managed HRT protects bones and dramatically improves quality of life. The healthiest choice is an informed one.",
  },
  {
    myth: "“Testosterone is only for men”",
    truth:
      "Before menopause, your body makes more testosterone than estrogen. It's a core women's hormone — driving libido, energy, motivation, muscle, and mental sharpness — and it declines steadily from your 30s onward. At properly monitored female doses, testosterone therapy restores your levels to a healthy female range; it doesn't masculinize. It's arguably the most underutilized tool in women's hormone care.",
  },
  {
    myth: "“Once you start HRT you're on it forever”",
    truth:
      "There's no lock-in. HRT is reassessed regularly, and you can taper or stop at any point with your physician's guidance — some women use it through the roughest years of the transition, others continue long-term for bone and quality-of-life benefits. 'How long?' has one honest answer: as long as the benefits outweigh the risks for you, revisited together, year by year.",
  },
];

const links = [
  {
    name: "The Menopause Society",
    description:
      "The leading professional organization for menopause care (formerly NAMS) — evidence-based patient resources and a certified-practitioner directory.",
    href: "https://menopause.org",
    external: true,
  },
  {
    name: "ISSWSH",
    description:
      "The International Society for the Study of Women's Sexual Health — research and patient education on sexual health across midlife.",
    href: "https://www.isswsh.org",
    external: true,
  },
  {
    name: "Patient Portal",
    description:
      "Scheduling, intake forms, lab results, and messaging with Dr. Mondona — all in one place. [Portal link placeholder]",
    href: "#",
    external: false,
  },
];

export default function PatientResourcesPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>Patient Resources</SectionLabel>
          <h1 className="heading-hero">Resources for your journey</h1>
          <p className="text-subheadline mt-6">
            Whether you&rsquo;re preparing for your first visit or deep into
            your care plan — checklists, plain-English lab guides, and
            trustworthy references, all in one place.
          </p>
        </FadeUp>
      </Section>

      {/* 1 — New patient checklist */}
      <Section tone="surface">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
          <FadeUp>
            <SectionLabel>Get Ready</SectionLabel>
            <h2 className="heading-section">New patient checklist</h2>
            <p className="text-body-copy mt-5">
              What to have ready before your Start Visit. A few minutes of
              gathering means your full 60 minutes with Dr. Mondona goes
              toward your care, not paperwork.
            </p>
            {/* Replace href with the hosted PDF when ready */}
            <a
              href="#"
              aria-disabled="true"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "mt-7 pointer-events-none opacity-60"
              )}
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Checklist (PDF coming soon)
            </a>
          </FadeUp>
          <FadeUp delay={0.12}>
            <ul className="space-y-3.5 rounded-card border border-border bg-background p-6 md:p-8">
              {checklist.map((item) => (
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
          </FadeUp>
        </div>
      </Section>

      {/* 2 — Understanding your labs */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>Know Your Numbers</SectionLabel>
          <h2 className="heading-section">Understanding your labs</h2>
          <p className="text-subheadline mt-5">
            The panel Dr. Mondona orders is broader than a standard check-up —
            here&rsquo;s what each test tells us, in plain English.
          </p>
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {labs.map((lab, i) => (
            <FadeUp key={lab.name} delay={(i % 2) * 0.08}>
              <Card lift={false} className="h-full">
                <CardTitle className="text-lg md:text-xl">{lab.name}</CardTitle>
                <CardDescription>{lab.body}</CardDescription>
              </Card>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* 3 — HRT myth buster */}
      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <FadeUp className="text-center">
            <SectionLabel>Myth vs. Fact</SectionLabel>
            <h2 className="heading-section">HRT myth buster</h2>
            <p className="text-subheadline mt-5">
              Five things &ldquo;everyone knows&rdquo; about hormone therapy —
              tap each one to see what the evidence actually says.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-10">
            {myths.map((item) => (
              <FAQItem
                key={item.myth}
                question={item.myth}
                answer={
                  <p>
                    <span className="font-semibold text-primary">
                      The truth:{" "}
                    </span>
                    {item.truth}
                  </p>
                }
              />
            ))}
          </FadeUp>
        </div>
      </Section>

      {/* 4 — Links */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>Trusted Links</SectionLabel>
          <h2 className="heading-section">Go deeper</h2>
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {links.map((link, i) => (
            <FadeUp key={link.name} delay={i * 0.1}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="h-full">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-lg md:text-xl">
                        {link.name}
                      </CardTitle>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-foreground-muted"
                        aria-hidden
                      />
                    </div>
                    <CardDescription>{link.description}</CardDescription>
                  </Card>
                </a>
              ) : (
                <Card className="h-full border-2 border-dashed border-primary/30">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg md:text-xl">
                      {link.name}
                    </CardTitle>
                    <KeyRound
                      className="h-4 w-4 shrink-0 text-foreground-muted"
                      aria-hidden
                    />
                  </div>
                  <CardDescription>{link.description}</CardDescription>
                </Card>
              )}
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="primary">
        <FadeUp className="mx-auto max-w-2xl py-4 text-center md:py-8">
          <h2 className="font-heading text-section-mobile text-white md:text-section">
            Not a patient yet?
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            Start with the free 15-minute discovery call and see if CYRA is
            the right fit.
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
