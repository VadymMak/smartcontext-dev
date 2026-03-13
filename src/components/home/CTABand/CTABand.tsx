// ============================================================
// src/components/home/CTABand/CTABand.tsx
// ============================================================

import Link from "next/link";
import styles from "./CTABand.module.css";

export function CTABand() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>Have a project in mind?</h2>
          <p className={styles.subtitle}>
            Free 30-min discovery call. I respond within 24 hours.
          </p>
        </div>
        <Link href="/contact" className={styles.cta}>
          Book a free call →
        </Link>
      </div>
    </section>
  );
}
