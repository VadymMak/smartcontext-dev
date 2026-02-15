"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background when scrolled
      setIsScrolled(currentScrollY > 10);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/en" || pathname === "/ru";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
          isVisible ? styles.hidden : styles.visible
        }`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoBrackets}>{"{"}</span>
            <span className={styles.logoText}>SC</span>
            <span className={styles.logoBrackets}>{"}"}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive(link.href) ? styles.active : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className={styles.controls}>
            <ThemeToggle />

            {/* Hamburger button (mobile) */}
            <button
              className={styles.hamburger}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}