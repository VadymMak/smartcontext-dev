// ============================================================
// src/components/home/Hero/Hero.tsx
// ⚠️ Conversion-first pattern — NO classic hero with big image
// NNG: 57% viewing time above fold
// Prismic: multiple CTAs = -266% conversion
// Structure: Name + role → Trust bar → Pricing cards → ONE CTA
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
  { key: "trust_score", icon: "⚡" },
  { key: "trust_projects", icon: "🚀" },
  { key: "trust_seo", icon: "📈" },
  { key: "trust_support", icon: "🛡️" },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  const tp = useTranslations("pricing");

  return (
    <section className={styles.section} aria-label="Hero">
      {/* ### Quick Answer block — +37% AI citation (Princeton GEO 2024) */}
      <div className={styles.quickAnswer}>
        <p>
          <strong>Quick Answer:</strong> Professional web design from €799.
          Delivery: 2–4 weeks. Lighthouse score: 95+. Multilingual ready.
        </p>
      </div>

      {/* Intro — name + role + typed heading */}
      <div className={styles.intro}>
        <p className={styles.role}>{t("role")}</p>
        <h1 className={styles.heading}>
          Fast websites that{" "}
          <TypedText text="convert visitors." duration={2} delay={0.3} />
        </h1>
      </div>

      {/* Trust bar — 4 concrete metrics */}
      <div className={styles.trustBar}>
        {TRUST_ITEMS.map(({ key, icon }) => (
          <div key={key} className={styles.trustItem}>
            <span className={styles.trustIcon} aria-hidden="true">
              {icon}
            </span>
            <span className={styles.trustLabel}>{t(key)}</span>
          </div>
        ))}
      </div>

      {/* Pricing cards — staggered fadeUp via CSS --i prop */}
      <div className={styles.cards}>
        {PRICING_CARDS.map(({ key, i }) => (
          <div
            key={key}
            className={`${styles.card} ${key === "business" ? styles.cardFeatured : ""}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            {key === "business" && (
              <span className={styles.badge}>Most Popular</span>
            )}
            <p className={styles.cardTitle}>{tp(`${key}_title`)}</p>
            <p className={styles.cardPrice}>{tp(`${key}_price`)}</p>
            <p className={styles.cardDesc}>{tp(`${key}_desc`)}</p>
            <Link
              href="/contact"
              className={`${styles.cardCta} ${key === "business" ? styles.cardCtaFeatured : ""}`}
            >
              {tp("cta")}
            </Link>
          </div>
        ))}
      </div>

      {/* ONE primary CTA + ONE secondary CTA — no more */}
      <div className={styles.actions}>
        <Link href="/contact" className={styles.primaryCta}>
          {t("cta_primary")}
        </Link>
        <Link href="/services" className={styles.secondaryCta}>
          {t("cta_secondary")}
        </Link>
      </div>
    </section>
  );
}
