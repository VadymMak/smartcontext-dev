// ============================================================
// src/app/[locale]/layout.tsx
// ⚠️ NO <html> or <body> tags here — only in root src/app/layout.tsx
// ⚠️ Providers must wrap everything ABOVE Header
// ============================================================

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Providers from "@/components/Providers";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/ui";
import styles from "./locale.module.css";

// ✅ Lazy load floating widgets — removes ~30-35 kB from initial JS bundle
// ssr: false — these components use browser APIs (localStorage, DOM)
const DynamicChatWidget = dynamic(
  () =>
    import("@/components/ui/ChatWidget/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false, loading: () => null },
);

const DynamicWhatsAppButton = dynamic(
  () =>
    import("@/components/ui/WhatsAppButton/WhatsAppButton").then(
      (m) => m.WhatsAppButton,
    ),
  { ssr: false, loading: () => null },
);

const DynamicCookieBanner = dynamic(
  () =>
    import("@/components/ui/CookieBanner/CookieBanner").then(
      (m) => m.CookieBanner,
    ),
  { ssr: false, loading: () => null },
);

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ✅ generateMetadata removed from layout intentionally
// canonical in layout overrides ALL pages with homepage URL
// each page.tsx handles its own canonical via generateMetadata

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
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
          <DynamicChatWidget />
          <DynamicWhatsAppButton />
        </div>
        <DynamicCookieBanner />
        <GoogleAnalytics />
      </Providers>
    </NextIntlClientProvider>
  );
}
