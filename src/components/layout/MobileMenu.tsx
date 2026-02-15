"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/en";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className={styles.menu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* Close button */}
            <div className={styles.menuHeader}>
              <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
                ✕
              </button>
            </div>

            {/* Navigation links */}
            <nav className={styles.nav}>
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom controls */}
            <div className={styles.controls}>
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}