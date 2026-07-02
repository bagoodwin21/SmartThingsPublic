import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";

interface PagePlaceholderProps {
  label: string;
  title: string;
  description: string;
}

/** Temporary page stub used while full page content is being built out. */
export function PagePlaceholder({ label, title, description }: PagePlaceholderProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl py-10 text-center md:py-16">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="heading-section">{title}</h1>
        <p className="text-subheadline mt-6">{description}</p>
        <div className="mt-8">
          <Button variant="accent">Book Free Consult</Button>
        </div>
      </div>
    </Section>
  );
}
