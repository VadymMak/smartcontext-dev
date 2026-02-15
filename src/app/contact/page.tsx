import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your web development or AI integration project. Free consultation, response within 24 hours.",
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Let&apos;s Work Together</h1>
          <p className={styles.subtitle}>
            Tell me about your project and I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Form */}
            <div className={styles.formColumn}>
              <ContactForm />
            </div>

            {/* Direct contact */}
            <aside className={styles.infoColumn}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Direct Contact</h3>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📧</span>
                  <div>
                    <span className={styles.infoLabel}>Email</span>
                    <a
                      href="mailto:hello@smartcontext.dev"
                      className={styles.infoLink}
                    >
                      hello@smartcontext.dev
                    </a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>💼</span>
                  <div>
                    <span className={styles.infoLabel}>LinkedIn</span>
                    <a
                      href="https://linkedin.com/in/vadymmak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoLink}
                    >
                      /in/vadymmak
                    </a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>🐙</span>
                  <div>
                    <span className={styles.infoLabel}>GitHub</span>
                    <a
                      href="https://github.com/VadymMak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoLink}
                    >
                      /VadymMak
                    </a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>📍</span>
                  <div>
                    <span className={styles.infoLabel}>Location</span>
                    <span className={styles.infoText}>Erdemli, Turkey</span>
                  </div>
                </div>
              </div>

              <div className={styles.responseTime}>
                <span className={styles.responseDot} />
                <span>Typical response time: within 24 hours</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}