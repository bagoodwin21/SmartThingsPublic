import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import { legalLinks, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-14 md:grid-cols-3 lg:px-8">
        {/* Col 1: brand */}
        <div>
          <p className="font-heading text-2xl font-bold">CYRA Wellness</p>
          <p className="mt-3 text-small text-white/80">{siteConfig.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-small font-medium text-white">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            California Telehealth
          </span>
        </div>

        {/* Col 2: quick links */}
        <nav aria-label="Footer">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-white/60">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-small text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 3: contact + disclaimer */}
        <div>
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-white/60">
            Contact
          </p>
          <a
            href="mailto:hello@drmondona.com"
            className="mt-4 inline-flex items-center gap-2 text-small text-white/80 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            hello@drmondona.com
          </a>
          <p className="mt-4 text-small font-medium text-white/90">
            {siteConfig.licensedStates}
          </p>
          <p className="mt-3 text-small leading-relaxed text-white/70">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 py-5 text-small text-white/70 md:flex-row lg:px-8">
          <p>© 2025 CYRA Wellness</p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
