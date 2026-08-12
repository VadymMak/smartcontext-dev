// ============================================================
// src/app/layout.tsx — Root layout
// ⚠️ Only place with <html> and <body> tags
// ⚠️ metadataBase CRITICAL — without it OG URLs are relative
// ⚠️ display: 'swap' on fonts — prevents 380ms font-blocking
// ⚠️ lang attribute reads locale via getLocale() so /de gets
//    lang="de" correctly — hardcoding "en" would be wrong
// ============================================================
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "SmartContext";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "AI integration and multilingual Next.js development for European companies.",
  verification: {
    google: "qYyYGvjrOzBnlf7ls1ahbtCCAkfBPnthcgN0xwtUjtQ",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
