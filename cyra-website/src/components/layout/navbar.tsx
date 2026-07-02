"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay when navigating to a new page.
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile overlay is open.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-surface transition-shadow duration-300",
        scrolled ? "shadow-nav" : "shadow-none"
      )}
    >
      <div className="mx-auto flex h-18 max-w-content items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="font-heading text-2xl font-bold text-primary"
          aria-label="CYRA Wellness home"
        >
          CYRA Wellness
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-small font-medium transition-colors",
                  active
                    ? "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary"
                    : "text-foreground-secondary hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/book"
            className={buttonVariants({ variant: "accent", size: "sm" })}
          >
            Book Free Consult
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="text-primary lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden"
          >
            <div className="flex h-18 items-center justify-between px-6 py-4">
              <span className="font-heading text-2xl font-bold text-primary">
                CYRA Wellness
              </span>
              <button
                type="button"
                className="text-primary"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col items-center justify-center gap-8"
              aria-label="Mobile"
            >
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "font-heading text-2xl font-semibold",
                        active
                          ? "text-primary underline decoration-primary decoration-2 underline-offset-8"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
              >
                <Link
                  href="/book"
                  className={buttonVariants({ variant: "accent" })}
                >
                  Book Free Consult
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
