"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLMotionProps<"div"> {
  /** Disable the hover lift animation (e.g. for static content). */
  lift?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, lift = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={lift ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-card border border-border bg-surface p-6 shadow-card transition-shadow duration-300 md:p-8",
        lift && "hover:shadow-card-hover",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-xl font-semibold text-foreground md:text-2xl", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("mt-2 text-body-copy", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export { Card, CardTitle, CardDescription };
