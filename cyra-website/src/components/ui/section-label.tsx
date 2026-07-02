import * as React from "react";
import { cn } from "@/lib/utils";

/** Small uppercase teal label displayed above section headlines. */
const SectionLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mb-3 text-small font-semibold uppercase tracking-[0.18em] text-primary",
      className
    )}
    {...props}
  />
));
SectionLabel.displayName = "SectionLabel";

export { SectionLabel };
