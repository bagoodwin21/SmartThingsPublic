import { useEffect, useState } from 'react'
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Quote,
  ChevronDown,
  Check,
  Sunrise,
  Flower2,
  HeartPulse,
  Baby,
  Scale,
  Heart,
  PhoneCall,
  ClipboardList,
  HandHeart,
  BadgeCheck,
  Video,
  Unlock,
  Clock,
  Mail,
  MapPin,
} from 'lucide-react'

import { Container, Reveal, Button, Eyebrow, Photo } from './components/ui'
import {
  NAV_LINKS,
  PRIMARY_CTA,
  SECONDARY_CTA,
  SERVICES,
  STEPS,
  TRUST_POINTS,
  FAQS,
  PRICING,
  FOOTER,
} from './content'

/* Map string icon names from content.js to lucide-react components. */
const ICONS = {
  Sunrise,
  Flower2,
  HeartPulse,
  Baby,
  Scale,
  Heart,
  PhoneCall,
  ClipboardList,
  HandHeart,
  BadgeCheck,
  Video,
  Unlock,
  Clock,
}

/*
 * PRODUCTION IMAGERY NOTE:
 * All photos below are warm stock placeholders sourced from Unsplash and will
 * gracefully fall back to a brand gradient if the network image fails. Replace
 * every Photo `src` with real, compliance-reviewed CYRA photography before
 * launch — no real patient images or names. See each Photo's `prodNote`.
 */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80',
  empathy:
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80',
  about:
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80',
}

function Logo({ className = '' }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="CYRA Wellness home">
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-terracotta text-ivory shadow-soft">
        <span className="font-serif text-lg font-semibold leading-none">C</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-cocoa">CYRA</span>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-terracotta">
          Wellness
        </span>
      </span>
    </a>
  )
}

/* 1. Header / nav -------------------------------------------------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 shadow-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-cocoa-muted transition-colors hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#book" className="px-5 py-2.5 text-sm">
            {PRIMARY_CTA}
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-cocoa lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-terracotta-soft/40 bg-cream/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-cocoa transition-colors hover:bg-sand"
              >
                {link.label}
              </a>
            ))}
            <Button href="#book" className="mt-2 w-full" onClick={() => setMenuOpen(false)}>
              {PRIMARY_CTA}
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}

/* 2. Hero --------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      {/* Soft decorative blobs */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blush/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-sage-soft/50 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Women’s health, finally heard</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-cocoa sm:text-5xl lg:text-[3.4rem]">
              Care for the symptoms you were told to{' '}
              <span className="text-terracotta">just deal with.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-cocoa-muted">
              CYRA is evidence-based telemedicine for perimenopause, menopause, PMDD, postpartum,
              midlife weight changes, and sexual health — led by a board-certified physician who
              actually has time to listen.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#book">
                {PRIMARY_CTA}
                <ArrowRight size={18} />
              </Button>
              <Button href="#services" variant="secondary">
                <Sparkles size={18} />
                {SECONDARY_CTA}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 text-sm font-medium text-cocoa-muted">
              Free 15-minute discovery call · No insurance hassle · See a real doctor from home
            </p>
          </Reveal>
        </div>

        {/* Hero image */}
        <Reveal delay={160} className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <Photo
              src={IMG.hero}
              alt="A warm, reassuring portrait representing CYRA's approach to women's health"
              prodNote="Production: warm lifestyle portrait of Dr. Mondona, or an inviting real-feeling photo of a woman in her 30s–50s."
              className="aspect-[4/5] rounded-4xl shadow-soft"
            />
            {/* Floating credibility chip */}
            <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-ivory/95 px-4 py-3 shadow-card backdrop-blur sm:-left-8 animate-soft-float">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sage/15 text-sage">
                <BadgeCheck size={20} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-cocoa">Board-certified</p>
                <p className="text-xs text-cocoa-muted">Internal medicine physician</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* 3. Empathy / problem -------------------------------------------------- */
function Empathy() {
  return (
    <section className="relative py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <Photo
              src={IMG.empathy}
              alt="A calm, grounding moment representing being truly listened to"
              prodNote="Production: candid, warm lifestyle image — a woman at home, calm and at ease. Avoid clinical/stock-medical stiffness."
              className="aspect-[5/4] rounded-4xl shadow-soft"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>You’re not imagining it</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
                You’ve been told to{' '}
                <span className="italic text-terracotta">just deal with it.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg leading-relaxed text-cocoa-muted">
                The exhaustion. The 3 a.m. wake-ups. The mood swings, the weight that won’t budge,
                the libido that disappeared. You’ve probably been told it’s “just stress,” “just
                aging,” or that your labs look “normal” — while your daily life says otherwise.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-lg leading-relaxed text-cocoa-muted">
                You deserve a clinician who takes it seriously, looks deeper, and treats the whole
                picture. That’s the entire reason CYRA exists.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <ul className="mt-7 space-y-3">
                {[
                  'Your symptoms are real — and most are treatable.',
                  'You get unrushed time with a physician who listens.',
                  'Care is grounded in evidence, tailored to you.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cocoa">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/15 text-sage">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 4. Services grid ------------------------------------------------------ */
function Services() {
  return (
    <section id="services" className="bg-sand/60 py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">What we treat</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
              Specialized care for the seasons that change everything
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-lg text-cocoa-muted">
              Whatever you’re navigating, you don’t have to white-knuckle through it alone.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon]
            return (
              <Reveal key={service.title} delay={(i % 3) * 90}>
                <article className="group h-full rounded-3xl border border-terracotta-soft/40 bg-ivory p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush/70 text-terracotta-dark transition-colors group-hover:bg-terracotta group-hover:text-ivory">
                    {Icon && <Icon size={24} />}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-cocoa">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-cocoa-muted">{service.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/* 5. How it works ------------------------------------------------------- */
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">How it works</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
              Three simple steps to feeling like yourself again
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-14">
          {/* Connector line (desktop) */}
          <div
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-terracotta-soft to-transparent lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = ICONS[step.icon]
              return (
                <Reveal key={step.number} delay={i * 120}>
                  <div className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-terracotta-soft bg-ivory text-terracotta shadow-card">
                      {Icon && <Icon size={28} />}
                      <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-terracotta text-xs font-bold text-ivory">
                        {step.number}
                      </span>
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-cocoa">{step.title}</h3>
                    <p className="mt-3 max-w-xs leading-relaxed text-cocoa-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Button href="#book">
              {PRIMARY_CTA}
              <ArrowRight size={18} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* 6. Meet Dr. Mondona --------------------------------------------------- */
function About() {
  return (
    <section id="about" className="bg-sand/60 py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <Photo
                src={IMG.about}
                alt="Portrait representing Dr. Mondona Goodwin"
                prodNote="Production: real professional portrait of Dr. Mondona Goodwin — warm, approachable, mom-to-mom feel."
                className="aspect-[4/5] rounded-4xl shadow-soft"
              />
              <div className="absolute -bottom-5 right-4 rounded-2xl bg-ivory/95 px-5 py-3 shadow-card backdrop-blur">
                <p className="font-serif text-base font-semibold text-cocoa">Dr. Mondona Goodwin</p>
                <p className="text-xs font-medium text-terracotta">
                  Board-Certified Internal Medicine · Mama of 2
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Meet your physician</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
                Hi mamas — I’m Dr. Mondona
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-cocoa-muted">
                <p>
                  I’m a local board-certified internal medicine physician and a mama of 2 littles. I
                  specialize in evidence-based care for perimenopause, menopause, PMDD/PMS,
                  postpartum depression, and weight management — for women and men.
                </p>
                <p>
                  I started my practice because so many women are told to “just deal with it” when
                  they’re struggling with symptoms that affect their daily life, energy, sleep, mood,
                  and long-term health.
                </p>
                <p>
                  I help women navigate perimenopause, menopause, weight changes, PMDD/PMS,
                  postpartum depression, sexual health, and vaginal pain and dryness.
                </p>
                <p className="font-medium text-cocoa">
                  More than anything, I’m passionate about creating a space where women feel truly
                  heard, supported, and cared for — the way every one of us deserves to be.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7 rounded-3xl border border-terracotta-soft/50 bg-ivory/70 p-6">
                <Quote className="text-terracotta" size={24} />
                <p className="mt-3 font-serif text-xl italic leading-relaxed text-cocoa">
                  “You don’t have to push through alone. Let’s figure this out together.”
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 7. Pricing teaser ----------------------------------------------------- */
function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">{PRICING.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
              One care plan. No surprise bills.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-4xl border border-terracotta-soft/50 bg-ivory shadow-soft">
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              {/* Price side */}
              <div className="bg-gradient-to-br from-blush/70 to-sand p-8 sm:p-10">
                <p className="font-serif text-lg font-semibold text-cocoa">{PRICING.planName}</p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-terracotta">
                    {PRICING.priceLabel}
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="font-serif text-6xl font-semibold leading-none text-cocoa">
                    {PRICING.priceAmount}
                  </span>
                  <span className="mb-1.5 text-lg font-medium text-cocoa-muted">
                    {PRICING.priceUnit}
                  </span>
                </div>
                <p className="mt-5 leading-relaxed text-cocoa-muted">{PRICING.financingNote}</p>
                {/* EDITABLE: pricing restructuring as of July 1 — confirm figures. */}
                <p className="mt-4 text-xs italic text-cocoa-muted">{PRICING.disclaimer}</p>
              </div>

              {/* Inclusions side */}
              <div className="p-8 sm:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-terracotta">
                  Your care plan includes
                </p>
                <ul className="mt-5 space-y-3.5">
                  {PRICING.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-cocoa">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/15 text-sage">
                        <Check size={15} strokeWidth={3} />
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="#book" className="mt-8 w-full">
                  {PRIMARY_CTA}
                  <ArrowRight size={18} />
                </Button>
                <p className="mt-3 text-center text-xs text-cocoa-muted">
                  Start with a free call — no checkout, no commitment.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* 8. Trust / credibility bar -------------------------------------------- */
function Trust() {
  return (
    <section className="bg-cocoa py-16 text-ivory sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Healthcare that puts you first
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 text-lg text-ivory/75">
              Cash-pay isn’t a catch — it’s what makes real, unhurried care possible.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[point.icon]
            return (
              <Reveal key={point.title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-ivory/10 bg-ivory/[0.06] p-6 transition-colors hover:bg-ivory/10">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/20 text-terracotta-soft">
                    {Icon && <Icon size={24} />}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ivory">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/70">{point.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/* 9. FAQ accordion ------------------------------------------------------ */
function FaqItem({ faq, isOpen, onToggle, id }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-terracotta-soft/50 bg-ivory">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-cocoa sm:text-lg">{faq.question}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-terracotta transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 leading-relaxed text-cocoa-muted">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Questions, answered</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-4xl">
                The things you’re probably wondering
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-lg text-cocoa-muted">
                Still have a question? The free discovery call is the perfect place to ask it.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Button href="#book" variant="secondary" className="mt-6">
                {PRIMARY_CTA}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={faq.question}
                  id={`faq-${i}`}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* 10. Final CTA banner + footer ----------------------------------------- */
function FinalCta() {
  return (
    <section id="book" className="pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-terracotta to-terracotta-dark px-6 py-14 text-center text-ivory shadow-soft sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ivory/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-cocoa/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
                You’ve waited long enough to feel like yourself.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-ivory/85">
                Book your free 15-minute discovery call. No pressure, no insurance hoops — just an
                honest conversation about what’s going on and how we can help.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {/* Placeholder booking CTA — wire to OptiMantra discovery-call scheduler in production. */}
                <Button
                  href="#book"
                  variant="secondary"
                  className="border-ivory/40 bg-ivory text-cocoa hover:bg-ivory/90"
                >
                  {PRIMARY_CTA}
                  <ArrowRight size={18} />
                </Button>
                <a
                  href="#services"
                  className="text-sm font-semibold text-ivory/90 underline-offset-4 hover:underline"
                >
                  {SECONDARY_CTA}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-terracotta-soft/40 bg-cream py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cocoa-muted">
              Evidence-based telemedicine for perimenopause, menopause, PMDD, postpartum, weight
              management, and sexual health.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-terracotta">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-cocoa-muted transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-terracotta">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cocoa-muted">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-terracotta" />
                {/* Placeholder contact — replace with real practice email. */}
                <a href={`mailto:${FOOTER.email}`} className="hover:text-terracotta">
                  {FOOTER.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-terracotta" />
                {FOOTER.location}
              </li>
            </ul>
            <Button href="#book" className="mt-5 px-5 py-2.5 text-sm">
              {PRIMARY_CTA}
            </Button>
          </div>
        </div>

        <div className="mt-10 border-t border-terracotta-soft/40 pt-6">
          {/* PLACEHOLDER: replace with final telehealth/licensing/compliance language. */}
          <p className="text-xs leading-relaxed text-cocoa-muted">{FOOTER.disclaimer}</p>
          <p className="mt-4 text-xs text-cocoa-muted">
            © {new Date().getFullYear()} CYRA Wellness. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Hero />
        <Empathy />
        <Services />
        <HowItWorks />
        <About />
        <Pricing />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
