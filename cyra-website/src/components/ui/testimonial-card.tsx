import * as React from "react";
import { Quote } from "lucide-react";
import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps extends CardProps {
  quote: string;
  name: string;
  location: string;
  /** Optional avatar image URL; falls back to the person's initials. */
  avatarSrc?: string;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({
  quote,
  name,
  location,
  avatarSrc,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <Card className={cn("flex h-full flex-col", className)} {...props}>
      <Quote className="h-8 w-8 text-accent" aria-hidden />
      <blockquote className="mt-4 flex-1 text-body-copy italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={name}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full bg-warm font-heading text-sm font-semibold text-foreground"
          >
            {initialsOf(name)}
          </span>
        )}
        <div>
          <p className="text-small font-semibold text-foreground">{name}</p>
          <p className="text-small text-foreground-muted">{location}</p>
        </div>
      </figcaption>
    </Card>
  );
}

export { TestimonialCard };
