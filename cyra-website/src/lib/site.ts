export const siteConfig = {
  name: "CYRA Wellness",
  url: "https://drmondona.com",
  tagline: "Physician-led hormone care, built around you",
  description:
    "CYRA Wellness is a California cash-pay telemedicine practice specializing in perimenopause, menopause, hormone replacement therapy (including testosterone), and midlife weight management. Led by Dr. Mondona Goodwin, DO.",
  physician: "Dr. Mondona Goodwin, DO",
  licensedStates: "Licensed in California",
  disclaimer:
    "CYRA Wellness provides cash-pay telemedicine services. We do not accept insurance.",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "What We Treat", href: "/what-we-treat" },
  { label: "Why CYRA", href: "/why-cyra" },
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", href: "/compare" },
  { label: "FAQ", href: "/faq" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
