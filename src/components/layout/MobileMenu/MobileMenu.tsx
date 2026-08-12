"use client";

// ============================================================
// src/components/layout/MobileMenu/MobileMenu.tsx
// ⚠️ Import layout siblings DIRECTLY — not from barrel @/components/layout
// ✅ Import ui components from barrel @/components/ui
// iOS Safari Liquid Glass fix — see CSS comments
// ============================================================

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ui";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import styles from "./MobileMenu.module.css";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/for-agencies", key: "agencies" },
  { href: "/contact", key: "contact" },
] as const;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`${styles.menuPanel} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* ⚠️ Liquid Glass fix: real background on CHILD element */}
        <div className={styles.menuPanelBackground} />

        {/* Header row */}
        <div className={styles.panelHeader}>
          <span className={styles.logoText}>{"{SC}"} SmartContext</span>
          <div className={styles.panelActions}>
            <ThemeToggle />
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className={styles.nav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, key }, i) => (
            <Link
              key={key}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.linkActive : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onClick={onClose}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Footer row — onClick bubbles from inline buttons to close the overlay */}
        <div className={styles.panelFooter} onClick={onClose}>
          <LanguageSwitcher inline />
        </div>
      </div>
    </>
  );
}
