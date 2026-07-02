import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Background treatment for the full-bleed section. */
  tone?: "default" | "surface" | "primary";
  /** Constrain and center children to the 1200px content column. */
  contained?: boolean;
}

/**
 * Full-width section with the site's consistent vertical rhythm
 * (py-12 mobile / py-20 desktop) and a centered 1200px content column.
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone = "default", contained = true, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "py-12 md:py-20",
        tone === "surface" && "bg-surface",
        tone === "primary" && "bg-primary text-white",
        className
      )}
      {...props}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-content px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  )
);
Section.displayName = "Section";

export { Section };
