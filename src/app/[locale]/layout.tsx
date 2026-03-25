// ============================================================
// src/app/[locale]/layout.tsx
// ⚠️ NO <html> or <body> tags here — only in root src/app/layout.tsx
// ⚠️ Providers must wrap everything ABOVE Header
// ============================================================

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Providers from "@/components/Providers";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/ui";
import { DynamicWidgets } from "@/components/ui/DynamicWidgets";
import styles from "./locale.module.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers>
        <div className={styles.pageWrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
        <DynamicWidgets />
        <GoogleAnalytics />
      </Providers>
    </NextIntlClientProvider>
  );
}
