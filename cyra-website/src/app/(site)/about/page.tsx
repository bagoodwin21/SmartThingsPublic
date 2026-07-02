import type { Metadata } from "next";
import Link from "next/link";
import { Layers, MessageCircleHeart, UserCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeUp } from "@/components/ui/fade-up";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "About Dr. Mondona Goodwin",
    description:
      "Meet Dr. Mondona Goodwin, DO — the board-certified physician behind CYRA Wellness, a California cash-pay telemedicine practice for perimenopause, menopause, HRT, and midlife weight management.",
    path: "/about",
  });
}

const bio = [
  "Dr. Mondona Goodwin trained as a Doctor of Osteopathic Medicine — a path she chose deliberately, because osteopathic medicine starts from the premise that the body is one interconnected system, not a collection of separate complaints. Through her board certification and years of practice, one pattern kept repeating: women in their 40s and 50s arriving with real, life-altering symptoms and leaving with a shrug, a prescription that missed the point, or the words 'that's just part of getting older.'",
  "Hormone health became her focus because it sits exactly where that dismissal is most common — and where good medicine can change the most. Perimenopause and menopause touch sleep, mood, weight, relationships, work, and identity all at once, yet the average medical visit gives them fifteen rushed minutes and a single lab value. She kept seeing how much was possible when someone actually took the time: the right questions, the right labs, the right follow-through.",
  "Her osteopathic training shapes how she practices every day. She doesn't treat a hot flash; she treats a woman — her thyroid and adrenal function alongside her estrogen, her stress and sleep alongside her labs, her goals alongside her symptoms. Listening isn't a courtesy in her visits; it's the diagnostic instrument everything else depends on.",
  "What she wants every patient to feel when a visit ends is simple: heard, taken seriously, and clear on the plan. Not rushed, not dismissed, not handed a printout — but genuinely understood, with a physician who will still be there at the next visit, and the one after that.",
];

const principles = [
  {
    Icon: MessageCircleHeart,
    title: "Symptoms over lab ranges",
    body: "Your labs can be 'normal' and you can still feel terrible. We start with how you feel, not a reference range.",
  },
  {
    Icon: Layers,
    title: "Complete picture",
    body: "Hormones interact. Thyroid, adrenal, sex hormones, metabolism — we look at the system, not just the chief complaint.",
  },
  {
    Icon: UserCheck,
    title: "Continuity matters",
    body: "You'll always see Dr. Mondona. Not whoever's available. She'll know your history, your trajectory, and what worked and what didn't.",
  },
];

const trustItems = [
  "Doctor of Osteopathic Medicine (DO)",
  "Board-Certified Physician",
  "California Medical License",
  "Member: [Professional Organizations]",
  "Cherry Certified Provider",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl py-4 text-center md:py-8">
          <SectionLabel>About</SectionLabel>
          <h1 className="heading-hero">Behind CYRA Wellness</h1>
          <p className="text-subheadline mt-6">
            A physician who&rsquo;s seen what dismissal looks like — and built
            something different.
          </p>
        </FadeUp>
      </Section>

      {/* Dr. Mondona */}
      <Section tone="surface">
        <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <FadeUp>
            {/* Professional headshot placeholder — replace with photography:
                warm and approachable, not stiff clinical. */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card bg-gradient-to-br from-warm via-[#F2DFCB] to-accent-light/50 shadow-card">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface/60 font-heading text-2xl font-bold text-primary">
                  MG
                </span>
                <p className="text-small font-medium text-foreground-secondary/80">
                  Professional headshot placeholder — warm and approachable
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Dr. Mondona Goodwin, DO
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Board-Certified Physician</Badge>
              <Badge variant="accent">Doctor of Osteopathic Medicine</Badge>
              <Badge variant="warm">Licensed in California</Badge>
            </div>
            <div className="mt-7 space-y-5">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-body-copy">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
        <FadeUp delay={0.1} className="mx-auto mt-16 max-w-3xl text-center">
          <Divider className="my-0 mb-10" />
          <blockquote className="font-heading text-2xl font-semibold leading-snug text-primary md:text-3xl">
            &ldquo;I got into this because I kept seeing women in their 40s and
            50s being told their symptoms were &lsquo;normal.&rsquo; They
            weren&rsquo;t. And there was something we could do about it.&rdquo;
          </blockquote>
          <p className="mt-5 text-small font-semibold uppercase tracking-[0.18em] text-foreground-muted">
            Dr. Mondona Goodwin, DO
          </p>
        </FadeUp>
      </Section>

      {/* Why CYRA */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl">
          <SectionLabel>Why CYRA Exists</SectionLabel>
          <h2 className="heading-section">
            Built to escape the constraints, not to scale past you
          </h2>
          <div className="mt-7 space-y-5">
            <p className="text-body-copy">
              CYRA Wellness was built as a cash-pay practice on purpose. Inside
              the insurance model, the care Dr. Mondona wanted to deliver is
              structurally impossible: 15-minute slots, labs limited to what a
              payer will approve, prior authorizations deciding your protocol,
              and hormone therapy treated as an afterthought. Stepping outside
              that system is what makes 60-minute visits, comprehensive labs,
              and genuinely individualized protocols possible.
            </p>
            <p className="text-body-copy">
              It&rsquo;s also a personal practice, not a VC-backed platform.
              CYRA is run by a husband-and-wife team: Dr. Mondona handles every
              aspect of your medical care, and Brandon handles operations — so
              the practice answers to its patients, not to investors chasing
              subscriber growth. When you join CYRA, you&rsquo;re not a user
              on a platform. You&rsquo;re a patient of a physician who knows
              your name.
            </p>
          </div>
        </FadeUp>
      </Section>

      {/* Philosophy */}
      <Section tone="surface">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <SectionLabel>Our Philosophy</SectionLabel>
          <h2 className="heading-section">Three principles, every visit</h2>
        </FadeUp>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {principles.map(({ Icon, title, body }, i) => (
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

      {/* Credentials / trust bar */}
      <Section className="py-10 md:py-12">
        <FadeUp>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {trustItems.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Section>

      {/* Final CTA */}
      <Section tone="primary">
        <FadeUp className="mx-auto max-w-2xl py-4 text-center md:py-8">
          <h2 className="font-heading text-section-mobile text-white md:text-section">
            Meet her yourself.
          </h2>
          <p className="mt-5 font-body text-subhead-mobile font-medium text-white/80 md:text-subhead">
            The free discovery call is 15 minutes — the easiest way to know if
            CYRA is right for you.
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
