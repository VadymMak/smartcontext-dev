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
            <span className={styles.logoBracket}>{"{ "}</span>
            <span className={styles.logoSC}>SC</span>
            <span className={styles.logoBracket}>{" }"}</span>
            <span className={styles.logoName}>SmartContext</span>
          </Link>
          <p className={styles.tagline}>
            Fast, AI-powered websites for studios and B2B. Next.js · TypeScript
            · Lighthouse 95+.
          </p>
        </div>

        {/* Nav columns */}
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Pages</p>
            <Link href="/" className={styles.columnLink}>
              Home
            </Link>
            <Link href="/projects" className={styles.columnLink}>
              Projects
            </Link>
            <Link href="/services" className={styles.columnLink}>
              Services
            </Link>
            <Link href="/blog" className={styles.columnLink}>
              Blog
            </Link>
            <Link href="/about" className={styles.columnLink}>
              About
            </Link>
            <Link href="/contact" className={styles.columnLink}>
              Contact
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
              href="https://www.upwork.com/freelancers/~011e4555f7ff90ae84"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnLink}
            >
              Upwork
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
              href="https://linkedin.com/in/vadymmak"
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
