"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  /** Seconds to wait before starting, for staggered groups. */
  delay?: number;
  className?: string;
}

/**
 * Fades content up as it scrolls into view (Framer Motion's whileInView
 * uses IntersectionObserver under the hood). Animates once.
 */
export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
