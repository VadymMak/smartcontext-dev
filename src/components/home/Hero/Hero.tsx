// ============================================================
// src/components/home/Hero/Hero.tsx
// Editorial Dark — conversion-first
// Princeton GEO KDD 2024: prices + numbers in first 150 words = +37% citation
// NNG: 57% viewing time above fold
// Prismic: ONE primary CTA per section
// ============================================================

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TypedText } from "@/components/ui";
import styles from "./Hero.module.css";

const PRICING_CARDS = [
  { key: "starter", i: 0 },
  { key: "business", i: 1 },
  { key: "growth", i: 2 },
] as const;

const TRUST_ITEMS = [
  { key: "trust_projects", value: "6+" },
  { key: "trust_score", value: "98" },
  { key: "trust_langs", value: "6" },
  { key: "trust_seo", value: "100" },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tp = useTranslations("pricing");

  return (
    <section className={styles.section} aria-label="Hero">
      {/* Quick Answer — SSR, AI crawlers index on first load */}
      {/* Princeton GEO: prices in first 150 words = +37% citation probability */}
      <div className={styles.quickAnswer}>
        <p>
          <strong>Quick Answer:</strong> Full-stack web development from $1,200.
          Delivery: 2–6 weeks. Lighthouse 95–100. AI integration available.
        </p>
      </div>

      {/* Eyebrow — availability badge */}
      <div className={styles.eyebrow}>
        <span className={styles.availDot} aria-hidden="true" />
        <span className={styles.availText}>Available for projects</span>
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
            {key === "business" && (
              <span className={styles.badge}>Popular</span>
            )}
            <div className={styles.cardFrom}>from</div>
            <p className={styles.cardPrice}>{tp(`${key}_price`)}</p>
            <p className={styles.cardTitle}>{tp(`${key}_title`)}</p>
            <p className={styles.cardDesc}>{tp(`${key}_desc`)}</p>
          </div>
        ))}
      </div>

      {/* Trust metrics — Omniconvert/NNG: near CTA = +42% conversion */}
      <div className={styles.trustBar}>
        {TRUST_ITEMS.map(({ key, value }) => (
          <div key={key} className={styles.trustItem}>
            <span className={styles.trustValue}>{value}</span>
            <span className={styles.trustLabel}>{t(key)}</span>
          </div>
        ))}
      </div>

      {/* ONE primary CTA — Prismic: multiple CTAs = -266% conversion */}
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
