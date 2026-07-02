import * as React from "react";
import { cn } from "@/lib/utils";

/** Decorative separator: a short gold rule with a diamond at its center. */
function Divider({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("my-10 flex items-center justify-center gap-3", className)}
      {...props}
    >
      <span className="h-px w-16 bg-accent/50" aria-hidden />
      <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden />
      <span className="h-px w-16 bg-accent/50" aria-hidden />
    </div>
  );
}

export { Divider };
