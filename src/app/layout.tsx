// ============================================================
// src/app/layout.tsx — Root layout
// ⚠️ metadataBase is CRITICAL — without it OG URLs are relative
//    and social sharing breaks
// ⚠️ display: 'swap' on fonts — prevents 380ms font-blocking penalty
// ============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

// display: 'swap' is CRITICAL — prevents font-blocking
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";

export const metadata: Metadata = {
  // ⚠️ CRITICAL: without metadataBase, OG image URLs are relative
  metadataBase: new URL(BASE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Fast, multilingual websites for studios and B2B.",

  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    // ⚠️ OG image must be JPG 1200×630px — Facebook rejects WebP
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
