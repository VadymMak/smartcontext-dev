// ============================================================
// src/components/layout/Footer/Footer.tsx
// ============================================================

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Studio
          </Link>
          <p className={styles.tagline}>
            Building fast, multilingual websites for studios and B2B.
          </p>
        </div>

        {/* Nav columns */}
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Pages</p>
            <Link href="/" className={styles.columnLink}>
              Home
            </Link>
            <Link href="/services" className={styles.columnLink}>
              Services
            </Link>
            <Link href="/blog" className={styles.columnLink}>
              Blog
            </Link>
            <Link href="/contact" className={styles.columnLink}>
              Contact
            </Link>
          </div>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Legal</p>
            <Link href="/privacy" className={styles.columnLink}>
              {t("privacy")}
            </Link>
            <Link href="/terms" className={styles.columnLink}>
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            © {year} Studio. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
