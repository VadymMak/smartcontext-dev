// ============================================================
// src/components/home/Hero/Hero.tsx
// Editorial Dark — conversion-first
// Quick Answer block: concrete prices and delivery times in visible text.
// SIGIR 2026 (252,000 controlled trials, six models) found visible price and
// recency act as citation gatekeepers, while formatting-only changes did nothing.
// ============================================================

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Hero.module.css";

const PRICING_CARDS = [
  { key: "ai", i: 0 },
  { key: "site", i: 1 },
  { key: "growth", i: 2 },
] as const;

const TRUST_ITEMS = [
  { key: "trust_projects", value: "8" },
  { key: "trust_langs", value: "6" },
  { key: "trust_location", value: "100" },
  { key: "trust_eu", value: "EU" },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tp = useTranslations("pricing");

  return (
    <section className={styles.section} aria-label="Hero">
      {/* Quick Answer — SSR, AI crawlers index on first load */}
      <div className={styles.quickAnswer}>
        <p>
          <strong>Quick Answer:</strong> {t("quick_answer")}
        </p>
      </div>

      {/* Eyebrow — availability badge */}
      <div className={styles.eyebrow}>
        <span className={styles.availDot} aria-hidden="true" />
        <span className={styles.availText}>{t("available")}</span>
        <span className={styles.eyebrowDivider} aria-hidden="true">
          ·
        </span>
        <span className={styles.eyebrowRole}>{t("role")}</span>
      </div>

      {/* H1 — two explicit lines */}
      <div className={styles.intro}>
        <h1 className={styles.heading}>
          Sites that rank in Google
          <br />
          <span className={styles.headingAccent}>
            and get cited by ChatGPT.
          </span>
        </h1>
        <p className={styles.subheading}>{t("subheading")}</p>
      </div>

      {/* Pricing cards — staggered fadeUp via CSS --i */}
      <div className={styles.cards}>
        {PRICING_CARDS.map(({ key, i }) => (
          <div
            key={key}
            className={`${styles.card} ${styles[`card_${key}`]}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            {key === "ai" && (
              <span className={styles.badge}>{tp("popular")}</span>
            )}
            <div className={styles.cardFrom}>{tp("from")}</div>
            <p className={styles.cardPrice}>{tp(`${key}_price`)}</p>
            <p className={styles.cardTitle}>{tp(`${key}_title`)}</p>
            <p className={styles.cardDesc}>{tp(`${key}_desc`)}</p>
          </div>
        ))}
      </div>

      {/* Trust metrics */}
      <div className={styles.trustBar}>
        {TRUST_ITEMS.map(({ key, value }) => (
          <div key={key} className={styles.trustItem}>
            <span className={styles.trustValue}>{value}</span>
            <span className={styles.trustLabel}>{t(key)}</span>
          </div>
        ))}
      </div>

      {/* ONE primary CTA */}
      <div className={styles.actions}>
        <Link href="/contact" className={styles.primaryCta}>
          {t("cta_primary")}
        </Link>
        <Link href="/projects" className={styles.secondaryCta}>
          {t("cta_secondary")} →
        </Link>
      </div>
    </section>
  );
}
