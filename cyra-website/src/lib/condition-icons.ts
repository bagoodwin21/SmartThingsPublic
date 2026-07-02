import {
  Activity,
  Droplets,
  Flower2,
  Pill,
  Scale,
  Sunrise,
  type LucideIcon,
} from "lucide-react";

/** Icon for each /what-we-treat/[condition] slug. */
export const conditionIcons: Record<string, LucideIcon> = {
  perimenopause: Sunrise,
  menopause: Flower2,
  "testosterone-therapy": Droplets,
  "estrogen-progesterone": Pill,
  "thyroid-adrenal": Activity,
  "weight-management": Scale,
};
