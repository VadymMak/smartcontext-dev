// ============================================================
// src/components/home/ServicesPreview/ServicesPreview.tsx
// ============================================================

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ui";
import styles from "./ServicesPreview.module.css";

const SERVICES = [
  {
    slug: "web-design",
    icon: "🎨",
    titleKey: "web_design_title",
    descKey: "web_design_desc",
  },
  {
    slug: "seo",
    icon: "📈",
    titleKey: "seo_title",
    descKey: "seo_desc",
  },
  {
    slug: "ai-chat",
    icon: "🤖",
    titleKey: "ai_chat_title",
    descKey: "ai_chat_desc",
  },
] as const;

export function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.header}>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {SERVICES.map(({ slug, icon }, i) => (
          <ScrollReveal key={slug} delay={i * 100}>
            <Link href={`/services/${slug}`} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                {icon}
              </span>
              <h3 className={styles.cardTitle}>{slug.replace("-", " ")}</h3>
              <p className={styles.cardDesc}>{t("cta")} →</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
