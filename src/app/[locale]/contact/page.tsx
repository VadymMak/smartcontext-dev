// ============================================================
// src/app/[locale]/contact/page.tsx
// ============================================================
import type { Metadata } from "next";
import { ContactForm } from "@/components/ui";
import styles from "./contact.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://smartctx.dev";

export const metadata: Metadata = {
  title: "Contact — SmartContext",
  description:
    "Book a free 30-min discovery call. I respond within 24 hours. Next.js development, AI integration, SEO optimization.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <h1 className={styles.title}>Let&apos;s Work Together</h1>
        <p className={styles.subtitle}>
          Tell me about your project. Free 30-min discovery call — I respond
          within 24 hours.
        </p>
      </section>

      <div className={styles.layout}>
        {/* Form */}
        <div className={styles.formWrap}>
          <ContactForm />
        </div>

        {/* Direct contact info */}
        <aside className={styles.info}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Direct contact</h2>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a href="mailto:hello@smartctx.dev" className={styles.infoLink}>
                hello@smartctx.dev
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>WhatsApp</span>
              <a
                href="https://wa.me/380938272293"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                +380 93 827 2293
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Upwork</span>
              <a
                href="https://www.upwork.com/freelancers/~011e4555f7ff90ae84"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                upwork.com/freelancers/vadymmak
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>GitHub</span>
              <a
                href="https://github.com/VadymMak"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                github.com/VadymMak
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>LinkedIn</span>
              <a
                href="https://linkedin.com/in/vadymmak"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                linkedin.com/in/vadymmak
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Response time</span>
              <span className={styles.infoValue}>Within 24 hours</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Based in</span>
              <span className={styles.infoValue}>
                Europe · Remote worldwide
              </span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>What to expect</h2>
            <ul className={styles.expectList}>
              <li>30-min discovery call — free</li>
              <li>Detailed proposal within 48 hours</li>
              <li>Fixed price, no surprises</li>
              <li>Weekly progress updates</li>
              <li>30 days support after launch</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
