// ============================================================
// src/app/[locale]/layout.tsx — Locale layout
// ⚠️ Providers must wrap everything ABOVE Header
// ⚠️ suppressHydrationWarning on <html> prevents next-themes flash
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Providers from "@/components/Providers";
import { Header, Footer } from "@/components/layout";
import { CookieBanner, GoogleAnalytics } from "@/components/ui";
import styles from "./locale.module.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        // ⚠️ ua locale → uk hreflang (ISO 639-1 — Google requirement)
        routing.locales.map((l) => [
          (l as string) === "ua" ? "uk" : l,
          `${BASE_URL}/${l}`,
        ]),
      ),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load messages for this locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* ⚠️ Providers must be ABOVE Header */}
          <Providers>
            <div className={styles.pageWrapper}>
              <Header />
              <main className={styles.main}>{children}</main>
              <Footer />
            </div>
            <CookieBanner />
            <GoogleAnalytics />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
