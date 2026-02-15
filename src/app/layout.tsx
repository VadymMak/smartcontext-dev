import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidgetLoader from "@/components/chat/ChatWidgetLoader";
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
  metadataBase: new URL("https://smartcontext.dev"),
  title: {
    default: "SmartContext — Web & AI Development",
    template: "%s — SmartContext",
  },
  description:
    "Modern web development and AI integration services. Custom websites built with Next.js, React, and TypeScript. Perfect SEO scores, AI chatbots, and full-package solutions.",
  keywords: [
    "web development",
    "AI integration",
    "Next.js",
    "React",
    "TypeScript",
    "SEO",
    "chatbot",
    "freelance developer",
  ],
  authors: [{ name: "Vadym Mak", url: "https://smartcontext.dev" }],
  creator: "Vadym Mak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartcontext.dev",
    siteName: "SmartContext",
    title: "SmartContext — Web & AI Development",
    description:
      "Modern web development and AI integration services. Custom websites with perfect SEO scores.",
    images: [
      {
        url: "/og-default.webp",
        width: 1200,
        height: 630,
        alt: "SmartContext — Web & AI Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartContext — Web & AI Development",
    description:
      "Modern web development and AI integration services by Vadym Mak.",
    images: ["/og-default.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <Header />
        <div
          style={{
            paddingTop: "var(--header-height)",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
        <Footer />
        <ChatWidgetLoader />
      </body>
    </html>
  );
}