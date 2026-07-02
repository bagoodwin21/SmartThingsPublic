export interface ConditionInfo {
  title: string;
  description: string;
}

/** Conditions treated, keyed by their /what-we-treat/[condition] slug. */
export const conditions: Record<string, ConditionInfo> = {
  perimenopause: {
    title: "Perimenopause",
    description:
      "Years before your last period, your hormones start shifting. We catch it early.",
  },
  menopause: {
    title: "Menopause",
    description:
      "Comprehensive HRT management tailored to your labs and your life.",
  },
  "testosterone-therapy": {
    title: "Testosterone Therapy",
    description:
      "Low libido, fatigue, brain fog? Testosterone could be the missing piece.",
  },
  "estrogen-progesterone": {
    title: "Estrogen & Progesterone",
    description:
      "Bioidentical and conventional HRT options, explained and personalized.",
  },
  "thyroid-adrenal": {
    title: "Thyroid & Adrenal",
    description:
      "Hormones don't work in isolation. We look at the full picture.",
  },
  "weight-management": {
    title: "Midlife Weight Management",
    description:
      "Metabolic changes are real. We address the root cause, not just calories.",
  },
};
