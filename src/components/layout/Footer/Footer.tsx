// ============================================================
// src/components/layout/Footer/Footer.tsx
// ============================================================

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoBracket}>{"{ "}</span>
            <span className={styles.logoSC}>SC</span>
            <span className={styles.logoBracket}>{" }"}</span>
            <span className={styles.logoName}>SmartContext</span>
          </Link>
          <p className={styles.tagline}>{t("tagline")}</p>
        </div>

        {/* Nav columns */}
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Pages</p>
            <Link href="/" className={styles.columnLink}>
              {tn("home")}
            </Link>
            <Link href="/projects" className={styles.columnLink}>
              {tn("projects")}
            </Link>
            <Link href="/services" className={styles.columnLink}>
              {tn("services")}
            </Link>
            <Link href="/blog" className={styles.columnLink}>
              {tn("blog")}
            </Link>
            <Link href="/about" className={styles.columnLink}>
              {tn("about")}
            </Link>
            <Link href="/for-agencies" className={styles.columnLink}>
              {tn("agencies")}
            </Link>
            <Link href="/contact" className={styles.columnLink}>
              {tn("contact")}
            </Link>
          </div>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Connect</p>
            <a
              href="https://wa.me/380938272293"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnLink}
            >
              WhatsApp
            </a>
            <a
              href="https://github.com/VadymMak"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnLink}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vadymmakevytss/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnLink}
            >
              LinkedIn
            </a>
          </div>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Legal</p>
            <Link href="/privacy" className={styles.columnLink}>
              {t("privacy")}
            </Link>
            <Link href="/terms" className={styles.columnLink}>
              {t("terms")}
            </Link>
            <Link href="/imprint" className={styles.columnLink}>
              {t("imprint")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            © {year} SmartContext.dev. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
