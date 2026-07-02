import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `${siteConfig.name} | %s`,
    default: `${siteConfig.name} | California Menopause & Hormone Telehealth`,
  },
  description: siteConfig.description,
  keywords: [
    "menopause telehealth California",
    "perimenopause treatment",
    "hormone replacement therapy",
    "HRT California",
    "testosterone therapy women",
    "midlife weight management",
    "menopause doctor online",
  ],
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
