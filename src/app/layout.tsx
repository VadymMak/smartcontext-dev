import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SmartContext — Web & AI Development",
    template: "%s — SmartContext",
  },
  description:
    "Full-stack web development with AI integration. Modern websites built on Next.js with built-in SEO and AI features.",
  metadataBase: new URL("https://smartcontext.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartcontext.dev",
    siteName: "SmartContext",
    title: "SmartContext — Web & AI Development",
    description:
      "Full-stack web development with AI integration. Modern websites built on Next.js with built-in SEO and AI features.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}