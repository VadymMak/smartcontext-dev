import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoBrackets}>{"{"}</span>
              SC
              <span className={styles.logoBrackets}>{"}"}</span>
              {" "}SmartContext
            </Link>
            <p className={styles.tagline}>Web & AI Development</p>
          </div>

          {/* Navigation */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Navigation</h4>
            <nav className={styles.links}>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Social</h4>
            <nav className={styles.links}>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.links}>
              <a href={`mailto:${SITE_CONFIG.email}`} className={styles.link}>
                {SITE_CONFIG.email}
              </a>
              <span className={styles.location}>{SITE_CONFIG.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} SmartContext. Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}