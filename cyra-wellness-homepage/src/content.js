/*
 * CYRA Wellness — editable content blocks.
 *
 * This file centralizes the marketing copy so non-engineers can tweak wording
 * without touching layout code. Anything flagged EDITABLE below is expected to
 * change before launch (pricing especially — see PRICING).
 *
 * Brand terminology rule: always say "care plan." Never "membership,"
 * "subscription," or "package."
 */

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export const PRIMARY_CTA = 'Book Your Free Discovery Call'
export const SECONDARY_CTA = 'Take the Symptom Quiz'

export const SERVICES = [
  {
    icon: 'Sunrise',
    title: 'Perimenopause',
    description:
      'For the years of unpredictable cycles, sleep, and mood shifts — care that names what’s happening and helps you feel steady again.',
  },
  {
    icon: 'Flower2',
    title: 'Menopause & HRT',
    description:
      'Evidence-based hormone replacement therapy, thoughtfully tailored, to ease hot flashes, sleep, and the changes that come with this season.',
  },
  {
    icon: 'HeartPulse',
    title: 'PMDD & PMS',
    description:
      'When the days before your period take over your life, you deserve more than “it’s normal.” We treat it like the real condition it is.',
  },
  {
    icon: 'Baby',
    title: 'Postpartum Depression',
    description:
      'Gentle, judgment-free support for the fog, anxiety, and heaviness that can follow having a baby — because you matter too.',
  },
  {
    icon: 'Scale',
    title: 'Weight Management',
    description:
      'Midlife-aware, sustainable care for women and men — focused on how you feel and function, not just a number on the scale.',
  },
  {
    icon: 'Heart',
    title: 'Sexual Health & Dryness',
    description:
      'Vaginal pain, dryness, and low libido are common and treatable. We talk about them openly, with practical, effective options.',
  },
]

export const STEPS = [
  {
    number: '01',
    icon: 'PhoneCall',
    title: 'Free Discovery Call',
    description:
      'Start with a free 15-minute call. Share what you’re experiencing and ask anything — no pressure, no commitment.',
  },
  {
    number: '02',
    icon: 'ClipboardList',
    title: 'Start Your Visit',
    description:
      'When it feels right, begin a comprehensive visit. Dr. Mondona reviews your history, symptoms, and goals in real depth.',
  },
  {
    number: '03',
    icon: 'HandHeart',
    title: 'Personalized Care Plan',
    description:
      'Receive a care plan built around you — with ongoing support, adjustments, and a clinician who actually has time for you.',
  },
]

export const TRUST_POINTS = [
  {
    icon: 'BadgeCheck',
    title: 'Board-certified physician',
    description: 'Care led by a board-certified internal medicine doctor — not a chatbot or a quick script mill.',
  },
  {
    icon: 'Video',
    title: 'Telemedicine convenience',
    description: 'Visits from home, on your schedule. No waiting rooms, no rearranging your whole day.',
  },
  {
    icon: 'Unlock',
    title: 'No insurance gatekeeping',
    description:
      'Cash-pay means direct access and more time together — your care plan, not an insurer, drives the conversation.',
  },
  {
    icon: 'Clock',
    title: 'Time that respects you',
    description: 'Longer visits and real follow-up, so nothing about your health gets rushed or dismissed.',
  },
]

export const FAQS = [
  {
    question: 'Do you accept insurance?',
    answer:
      'CYRA is a cash-pay practice, which means we don’t bill insurance. That’s intentional: it lets us spend real time with you, offer direct access, and build a care plan around your needs instead of an insurer’s rules. Flexible financing is available through Cherry. [EDITABLE — confirm financing details before launch.]',
  },
  {
    question: 'What states do you see patients in?',
    answer:
      'Care is offered via telemedicine in the states where Dr. Mondona is licensed to practice. [EDITABLE — list current licensed states here before launch.]',
  },
  {
    question: 'What does the free discovery call involve?',
    answer:
      'It’s a relaxed, 15-minute conversation. You can share what you’ve been experiencing, ask questions about how care works, and get a feel for whether CYRA is the right fit. There’s no obligation to enroll.',
  },
  {
    question: 'Is testosterone therapy safe for women?',
    answer:
      'Testosterone can be part of an evidence-based hormone protocol for some women, and Dr. Mondona will discuss whether it’s appropriate for you based on your history, symptoms, and goals. Every plan is individualized and reviewed together. [EDITABLE — align wording with compliance review.]',
  },
  {
    question: 'Who is a good fit for CYRA?',
    answer:
      'Women navigating perimenopause, menopause, PMDD/PMS, postpartum depression, weight changes, or sexual-health concerns — and men seeking midlife weight management. If you’ve been told to “just deal with it,” you’re exactly who we built this for.',
  },
  {
    question: 'How soon can I be seen?',
    answer:
      'After your free discovery call, you can typically start your visit and begin building your care plan without long waits. [EDITABLE — confirm typical scheduling window before launch.]',
  },
]

/*
 * PRICING — EDITABLE CONTENT BLOCK.
 * Pricing is restructuring as of July 1 to a ~12-month care plan around
 * $175/month across 13 Cherry payments. Numbers below are placeholders meant
 * to TEASE value, not lock in figures. Confirm with the practice before launch.
 */
export const PRICING = {
  eyebrow: 'Simple, transparent care',
  planName: '12-Month Care Plan',
  priceLabel: 'as low as',
  priceAmount: '$175',
  priceUnit: '/ month',
  financingNote:
    'Flexible monthly financing available through Cherry, so you can start care now and pay over time.',
  inclusions: [
    'Comprehensive visits with Dr. Mondona',
    'A personalized, evidence-based care plan',
    'Ongoing adjustments and clinician support',
    'Direct messaging between visits',
  ],
  disclaimer:
    'Final pricing and plan details are being updated. We’ll walk through everything on your free discovery call — no surprises.',
}

export const FOOTER = {
  // Placeholder contact details — swap for the practice’s real info before launch.
  email: 'hello@drmondona.com',
  location: 'Telemedicine · United States',
  disclaimer:
    'CYRA Wellness provides telehealth services through licensed clinicians where available. Information on this site is for general educational purposes and is not a substitute for individualized medical advice, diagnosis, or treatment. Services and availability vary by state and are subject to clinical eligibility. [PLACEHOLDER — replace with final telehealth, licensing, and compliance language before launch.]',
}
