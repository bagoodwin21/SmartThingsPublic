import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Atom,
  CalendarCheck,
  Copy,
  CreditCard,
  Droplets,
  FileX,
  Flower2,
  MapPin,
  Pill,
  Scale,
  ShieldCheck,
  Stethoscope,
  Sunrise,
  UserX,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import {
  TestimonialCarousel,
  type Testimonial,
} from "@/components/ui/testimonial-carousel";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "California Menopause & Hormone Telehealth",
    description:
      "Physician-led perimenopause, menopause, HRT, and midlife weight management care via telemedicine in California. Cash-pay practice of Dr. Mondona Goodwin, DO.",
    path: "/",
  });
}

const trustBar = [
  { Icon: ShieldCheck, label: "Board-Certified DO" },
  { Icon: Droplets, label: "Testosterone Included" },
  { Icon: CreditCard, label: "Cherry Financing Available" },
  { Icon: MapPin, label: "California Telehealth" },
];

const painPoints = [
  {
    Icon: UserX,
    title: "Told “it’s just aging”",
    body: "Dismissive PCP visits where your symptoms are brushed aside instead of investigated.",
  },
  {
    Icon: FileX,
    title: "Insurance won’t cover it",
    body: "Denied HRT, limits on the labs that matter, and rushed 15-minute appointment slots.",
  },
  {
    Icon: Copy,
    title: "Generic protocols",
    body: "One-size-fits-all dosing that doesn’t account for your body, your labs, or your history.",
  },
];

const differencePillars = [
  {
    Icon: Stethoscope,
    title: "Your Physician, Not an Algorithm",
    body: "Dr. Mondona Goodwin is a board-certified DO who personally reviews your labs, designs your protocol, and is your point of contact — not a rotating roster of NPs.",
  },
  {
    Icon: Atom,
    title: "Testosterone Isn’t an Afterthought",
    body: "Most telehealth platforms treat testosterone as an add-on. We include it as a core part of care when clinically appropriate — because your symptoms deserve a complete picture.",
  },
  {
    Icon: CalendarCheck,
    title: "A Care Plan, Not a Subscription",
    body: "No month-to-month uncertainty. Your 12-month care plan is structured around your goals with flexible financing through Cherry and CareCredit — so you can commit to your health without committing to a lump sum.",
  },
];

const conditions = [
  {
    Icon: Sunrise,
    title: "Perimenopause",
    body: "Years before your last period, your hormones start shifting. We catch it early.",
    href: "/what-we-treat/perimenopause",
  },
  {
    Icon: Flower2,
    title: "Menopause",
    body: "Comprehensive HRT management tailored to your labs and your life.",
    href: "/what-we-treat/menopause",
  },
  {
    Icon: Droplets,
    title: "Testosterone Therapy",
    body: "Low libido, fatigue, brain fog? Testosterone could be the missing piece.",
    href: "/what-we-treat/testosterone-therapy",
  },
  {
    Icon: Pill,
    title: "Estrogen & Progesterone",
    body: "Bioidentical and conventional HRT options, explained and personalized.",
    href: "/what-we-treat/estrogen-progesterone",
  },
  {
    Icon: Activity,
    title: "Thyroid & Adrenal",
    body: "Hormones don’t work in isolation. We look at the full picture.",
    href: "/what-we-treat/thyroid-adrenal",
  },
  {
    Icon: Scale,
    title: "Midlife Weight Management",
    body: "Metabolic changes are real. We address the root cause, not just calories.",
    href: "/what-we-treat/weight-management",
  },
];

const steps = [
  {
    title: "Free Discovery Call",
    meta: "15 min",
    body: "Tell us what’s going on. We’ll tell you if we’re a fit.",
  },
  {
    title: "Start Visit",
    meta: "$399",
    body: "Your comprehensive intake with Dr. Mondona — labs ordered, history reviewed, questions answered.",
  },
  {
    title: "Your Care Plan",
    meta: "12 months",
    body: "A 12-month personalized protocol, financed monthly through Cherry or charged to your card on file.",
  },
  {
    title: "Ongoing Care",
    meta: "Continuous",
    body: "Follow-up visits, lab reviews, and protocol adjustments as your body responds and your needs evolve.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "After two years of being told my symptoms were 'normal,' Dr. Mondona had answers in our very first visit. I finally feel like myself again.",
    name: "Sarah M.",
    location: "Thousand Oaks, CA",
  },
  {
    quote:
      "I didn't expect to be able to afford hormone care, but the Cherry financing made it completely manageable. Best investment I've made in myself.",
    name: "Jennifer K.",
    location: "San Diego, CA",
  },
  {
    quote:
      "She actually listens. Not 15 minutes and out the door — a real conversation about what was happening to my body and what we were going to do about it.",
    name: "Michelle R.",
    location: "Los Angeles, CA",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="hero-gradient flex min-h-[calc(100vh-4.5rem)] items-center">
        <div className="mx-auto grid w-full max-w-content items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <FadeUp>
            <h1 className="heading-hero">
              Finally, hormone care that actually listens.
            </h1>
            <p className="text-subheadline mt-6">
              CYRA Wellness is a physician-led, cash-pay telemedicine practice
              specializing in perimenopause, menopause, HRT, and weight
              management. No insurance red tape. No rushed appointments. Just
              you and a board-certified DO who takes the time.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/book"
                className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
              >
                Book Your Free Consult
              </Link>
              <Link
                href="/how-it-works"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                See How It Works
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {trustBar.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-small font-medium text-foreground-secondary"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.15} className="hidden justify-self-center lg:block">
            {/* Lifestyle image placeholder — replace with photography:
                woman in her 40s–50s, active, confident (not clinical). */}
            <div className="relative aspect-[4/5] w-[26rem] max-w-full overflow-hidden rounded-card bg-gradient-to-br from-warm via-[#F2DFCB] to-accent-light/50 shadow-card-hover">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-surface/40" aria-hidden />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-primary/10" aria-hidden />
              <div className="absolute inset-0 flex items-end p-8">
                <p className="text-small font-medium text-foreground-secondary/80">
                  Lifestyle image placeholder — active, confident woman in her
                  40s–50s
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 2 — The problem we solve */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>You Deserve Better</SectionLabel>
          <h2 className="heading-section">
            Most women spend years being dismissed.
          </h2>
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {painPoints.map(({ Icon, title, body }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <Card className="h-full">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warm/50 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <CardTitle className="mt-4">{title}</CardTitle>
                <CardDescription>{body}</CardDescription>
              </Card>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <p className="mt-12 text-center font-heading text-xl font-semibold text-primary md:text-2xl">
            CYRA was built for the women who are done settling.
          </p>
        </FadeUp>
      </Section>

      {/* Section 3 — How CYRA is different */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>The CYRA Difference</SectionLabel>
          <h2 className="heading-section">
            Physician-led. Personalized. Built around you.
          </h2>
        </FadeUp>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {differencePillars.map(({ Icon, title, body }, i) => (
            <FadeUp key={title} delay={i * 0.12} className="text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-8 w-8" aria-hidden />
              </span>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground md:text-2xl">
                {title}
              </h3>
              <p className="text-body-copy mt-3">{body}</p>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* Section 4 — What we treat */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>What We Treat</SectionLabel>
          <h2 className="heading-section">
            Comprehensive care for midlife women&rsquo;s health.
          </h2>
        </FadeUp>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map(({ Icon, title, body, href }, i) => (
            <FadeUp key={title} delay={(i % 3) * 0.1}>
              <Link href={href} className="block h-full">
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
                  </div>
                  <CardDescription className="mt-3">{body}</CardDescription>
                </Card>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Section>

      {/* Section 5 — How it works */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="heading-section">
            From your couch to a care plan in days.
          </h2>
        </FadeUp>
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.12}>
              <li className="relative flex gap-5 lg:block">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white">
                  {i + 1}
                </span>
                <div className="lg:mt-5">
                  <div className="flex flex-wrap items-baseline gap-x-2.5">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <span className="text-small font-semibold text-accent">
                      {step.meta}
                    </span>
                  </div>
                  <p className="text-body-copy mt-2">{step.body}</p>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
        <FadeUp delay={0.3} className="mt-14 text-center">
          <Link
            href="/book"
            className={cn(buttonVariants({ variant: "accent" }))}
          >
            Book Your Free Consult
          </Link>
        </FadeUp>
      </Section>

      {/* Section 6 — Testimonials */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>Patient Stories</SectionLabel>
          <h2 className="heading-section">Real women. Real results.</h2>
        </FadeUp>
        <FadeUp delay={0.15} className="mt-12">
          <TestimonialCarousel items={testimonials} />
        </FadeUp>
      </Section>

      {/* Section 7 — Comparison teaser */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>How We Compare</SectionLabel>
          <h2 className="heading-section">
            Not all menopause telehealth is the same.
          </h2>
          <p className="text-subheadline mt-5">
            Platforms like Midi, Alloy, and Evernow have made hormone care more
            accessible — but there are meaningful differences in who delivers
            your care, what&rsquo;s included, and how your treatment is
            structured.
          </p>
          <div className="mt-8">
            <Link
              href="/compare"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              See Full Comparison
            </Link>
          </div>
        </FadeUp>
      </Section>

      {/* Section 8 — Financing banner */}
      <section className="bg-accent">
        <FadeUp className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-12 text-center md:py-14 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
          <p className="max-w-2xl font-body text-subhead-mobile font-medium text-white md:text-subhead">
            Care plan financing available through Cherry and CareCredit —
            $175/month with approved credit, or save with a single upfront
            payment.
          </p>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "bg-white text-accent hover:bg-white/90"
              )}
            >
              Check Your Rate
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "border-white text-white hover:bg-white hover:text-accent"
              )}
            >
              Learn More
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Section 9 — Final CTA */}
      <Section tone="primary">
        <FadeUp className="mx-auto max-w-2xl py-4 text-center md:py-8">
          <h2 className="font-heading text-section-mobile text-white md:text-section">
            Your next chapter starts with one conversation.
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            The free discovery call is 15 minutes. No pressure, no commitment —
            just answers.
          </p>
          <div className="mt-8">
            <Link
              href="/book"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
            >
              Book Free Consult
            </Link>
          </div>
          <p className="mt-8 text-small text-white/70">
            California | Cash-Pay Telehealth | Board-Certified Physician
          </p>
        </FadeUp>
      </Section>
    </>
  );
}
