import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        warm: "var(--color-warm)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        foreground: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        success: "var(--color-success)",
        border: "var(--color-border)",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography scale — mobile sizes; pair with md: variants for desktop
        "hero-mobile": ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }], // 40px
        hero: ["4rem", { lineHeight: "1.08", fontWeight: "700" }], // 64px
        "section-mobile": ["2rem", { lineHeight: "1.15", fontWeight: "600" }], // 32px
        section: ["3rem", { lineHeight: "1.12", fontWeight: "600" }], // 48px
        "subhead-mobile": ["1.125rem", { lineHeight: "1.5", fontWeight: "500" }], // 18px
        subhead: ["1.25rem", { lineHeight: "1.5", fontWeight: "500" }], // 20px
        "body-mobile": ["0.9375rem", { lineHeight: "1.65", fontWeight: "400" }], // 15px
        body: ["1rem", { lineHeight: "1.65", fontWeight: "400" }], // 16px
        small: ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }], // 14px
        cta: ["1rem", { lineHeight: "1.2", fontWeight: "600" }], // 16px
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        "18": "4.5rem",
      },
      boxShadow: {
        nav: "0 2px 12px rgba(26, 26, 46, 0.06)",
        card: "0 2px 8px rgba(26, 26, 46, 0.05)",
        "card-hover": "0 12px 32px rgba(26, 26, 46, 0.12)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
