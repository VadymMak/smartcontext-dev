// ============================================================
// src/app/layout.tsx — Root layout
// ⚠️ Only place with <html> and <body> tags
// ⚠️ metadataBase CRITICAL — without it OG URLs are relative
// ⚠️ display: 'swap' on fonts — prevents 380ms font-blocking
// ============================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap", // CRITICAL — prevents 380ms font-blocking penalty
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL), // CRITICAL — without this OG URLs are relative
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
