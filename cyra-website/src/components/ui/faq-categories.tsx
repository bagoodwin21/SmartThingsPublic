"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/components/ui/faq-item";
import { cn } from "@/lib/utils";

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  faqs: FAQEntry[];
}

/**
 * Category-grouped FAQ accordion. One category open at a time;
 * questions inside expand individually.
 */
export function FAQCategories({ categories }: { categories: FAQCategory[] }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="space-y-4">
      {categories.map((category, i) => {
        const open = active === i;
        return (
          <div
            key={category.name}
            className="overflow-hidden rounded-card border border-border bg-surface shadow-card"
          >
            <button
              type="button"
              onClick={() => setActive(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-7"
            >
              <span
                className={cn(
                  "font-heading text-xl font-semibold md:text-2xl",
                  open ? "text-primary" : "text-foreground"
                )}
              >
                {category.name}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="shrink-0 text-primary"
                aria-hidden
              >
                <ChevronDown className="h-6 w-6" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-6 md:px-7">
                    {category.faqs.map((faq) => (
                      <FAQItem
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                        className="last:border-b-0"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
