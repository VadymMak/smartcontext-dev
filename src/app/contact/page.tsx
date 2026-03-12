// ============================================================
// src/app/[locale]/contact/page.tsx
// ============================================================

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ui";
import { ScrollReveal } from "@/components/ui";
import styles from "./contact.module.css";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="container">
      <section className={styles.section}>
        <ScrollReveal>
          <div className={styles.header}>
            <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <ContactForm />
        </ScrollReveal>
      </section>
    </div>
  );
}
