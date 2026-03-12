"use client";

// ============================================================
// src/components/layout/Header/Header.tsx
// ⚠️ Import layout siblings DIRECTLY — not from barrel @/components/layout
//    That would cause a circular import (Header is inside layout/)
// ✅ Import ui components from barrel @/components/ui
// ============================================================

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ui";
// import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label="Go to homepage">
            <span className={styles.logoBracket}>{"{ "}</span>
            <span className={styles.logoSC}>SC</span>
            <span className={styles.logoBracket}>{" }"}</span>
            <span className={styles.logoText}>SmartContext</span>
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={`${styles.navLink} ${pathname === href ? styles.navLinkActive : ""}`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            {/* <LanguageSwitcher /> */}
            <ThemeToggle />
            <Link href="/contact" className={styles.ctaBtn}>
              {t("contact")}
            </Link>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
