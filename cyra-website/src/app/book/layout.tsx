import Link from "next/link";

/**
 * Minimal distraction-free layout for the booking page:
 * logo-only header, no nav links, no footer.
 */
export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-surface shadow-nav">
        <div className="mx-auto flex h-18 max-w-content items-center px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="font-heading text-2xl font-bold text-primary"
            aria-label="CYRA Wellness home"
          >
            CYRA Wellness
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </>
  );
}
