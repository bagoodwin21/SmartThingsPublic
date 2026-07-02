# CYRA Wellness Website

Marketing site for CYRA Wellness (drmondona.com) — a California cash-pay
telemedicine practice specializing in perimenopause, menopause, HRT
(including testosterone), and midlife weight management, led by
Dr. Mondona Goodwin, DO.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (design tokens in `src/app/globals.css` + `tailwind.config.ts`)
- Framer Motion (page transitions, card lift, FAQ accordion, mobile menu)
- shadcn/ui-style components (`src/components/ui`)
- next/font: Playfair Display (headings) + Inter (body)

## Getting started

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Structure

```
src/
  app/                  # App Router pages, robots.ts, sitemap.ts, OG image
  components/
    ui/                 # Button, Badge, Card, Section, SectionLabel,
                        # Divider, TestimonialCard, FAQItem
    layout/             # Navbar, Footer, PageTransition, PagePlaceholder
  lib/                  # site config, SEO helper, fonts, cn() utility
```

## Design system

Color and typography tokens are defined as CSS variables in
`src/app/globals.css` and mapped to Tailwind utilities in
`tailwind.config.ts` (e.g. `bg-primary`, `text-foreground-secondary`,
`heading-hero`, `heading-section`, `max-w-content`).
