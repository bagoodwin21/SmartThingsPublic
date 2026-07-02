"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

interface TestimonialCarouselProps {
  items: Testimonial[];
  /** Milliseconds between auto-advances. */
  interval?: number;
}

/**
 * Auto-advancing testimonial carousel: 3 cards visible on desktop,
 * 1 on mobile. Pauses on hover; dots allow manual navigation.
 */
export function TestimonialCarousel({
  items,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [visible, setVisible] = React.useState(3);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setVisible(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pages = Math.max(1, items.length - visible + 1);

  React.useEffect(() => {
    setIndex((i) => Math.min(i, pages - 1));
  }, [pages]);

  React.useEffect(() => {
    if (paused || pages <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % pages);
    }, interval);
    return () => clearInterval(timer);
  }, [paused, pages, interval]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${index * (100 / visible)}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="w-full shrink-0 px-3 md:w-1/3"
            >
              <TestimonialCard
                quote={item.quote}
                name={item.name}
                location={item.location}
                className="h-full"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {pages > 1 && (
        <div className="mt-8 flex justify-center gap-2.5" role="tablist">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-7 bg-primary"
                  : "w-2.5 bg-primary/25 hover:bg-primary/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
