import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendlyPlaceholderProps {
  label?: string;
  className?: string;
}

/**
 * Placeholder for the Calendly inline embed. Replace with the real
 * widget (react-calendly InlineWidget or the Calendly embed script)
 * once the scheduling link is ready.
 */
export function CalendlyPlaceholder({
  label = "Calendly embed — free discovery call scheduling",
  className,
}: CalendlyPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center",
        className
      )}
    >
      <CalendarClock className="h-10 w-10 text-primary/60" aria-hidden />
      <p className="text-small font-medium text-foreground-secondary">
        {label}
      </p>
    </div>
  );
}
