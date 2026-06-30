# CYRA Wellness — Homepage Mockup

A production-quality **React homepage mockup** for [CYRA Wellness](https://drmondona.com),
a cash-pay telemedicine practice specializing in women's midlife health
(perimenopause, menopause/HRT, PMDD/PMS, postpartum depression, weight
management, and sexual health).

This is a **visual/UX redesign exploration** — links and forms are intentionally
non-functional placeholders. The goal is to show how a warm, boutique
women's-health brand could look and feel, not to integrate the real booking/EMR
stack.

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** (core utility classes, custom warm palette in `tailwind.config.js`)
- **lucide-react** for icons
- Google Fonts: **Fraunces** (soft serif headlines) + **Nunito Sans** (body)

## Getting started

```bash
cd cyra-wellness-homepage
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.jsx              # all page sections (clean component breakdown)
  content.js           # editable copy + data (single source of truth for wording)
  index.css            # Tailwind layers + reveal animation utilities
  components/ui.jsx     # shared primitives: Container, Reveal, Button, Eyebrow, Photo
  hooks/useReveal.js    # IntersectionObserver hook for scroll-in animations
```

## Sections (in order)

1. Header / nav (sticky, persistent "Book Your Free Discovery Call" CTA)
2. Hero
3. Empathy / problem — "You've been told to just deal with it"
4. Services grid (6 specialties)
5. How it works (3-step stepper)
6. Meet Dr. Mondona (about/bio)
7. Pricing teaser (care plan — _editable_)
8. Trust / credibility bar
9. FAQ accordion
10. Final CTA banner + footer

## Notes for production

Search the codebase for these markers before going live:

- **`EDITABLE`** — copy/pricing expected to change (pricing restructures July 1
  to a ~12-month care plan around **$175/month** across 13 Cherry payments; the
  numbers in `content.js` are placeholders).
- **`PRODUCTION` / `prodNote`** — every image is a warm stock placeholder with a
  brand-gradient fallback. Swap each `Photo` `src` for real, compliance-reviewed
  CYRA photography (no real patient images or names).
- **`PLACEHOLDER`** — contact details and the telehealth/licensing/compliance
  disclaimer in the footer need final, reviewed language.
- **Booking CTAs** are visual-only / scroll to the final CTA section. Wire them
  to the OptiMantra discovery-call scheduler (and the symptom quiz / Cherry
  financing flow) in production.

### Brand guardrails baked in

- Always **"care plan"** — never "membership," "subscription," or "package."
- No fabricated testimonials, reviews, or specific outcome/results claims.
- Claims kept general and evidence-based-sounding, not results-promising.
- Warm, validating, mom-to-mom voice — not corporate wellness-speak.
```
