"use client";

// ============================================================
// src/components/layout/LanguageSwitcher/LanguageSwitcher.tsx
// inline prop:
//   <LanguageSwitcher />        → dropdown (desktop header)
//   <LanguageSwitcher inline /> → flat row of buttons (mobile overlay)
// ⚠️ ua locale → uk hreflang (ISO 639-1 — Google requirement)
// Outside click: both mousedown + touchstart for iOS support
// ============================================================

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import styles from "./LanguageSwitcher.module.css";

const LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "sk", label: "Slovenčina", short: "SK" },
];

interface Props {
  inline?: boolean;
}

export function LanguageSwitcher({ inline = false }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchLocale(code: string) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  // Close on outside click — both mousedown + touchstart for iOS
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  // Inline mode — flat row of buttons (used in MobileMenu)
  if (inline) {
    return (
      <div className={styles.inlineRow}>
        {LOCALES.map((l) => (
          <button
            key={l.code}
            className={`${styles.inlineBtn} ${l.code === locale ? styles.inlineActive : ""}`}
            onClick={() => switchLocale(l.code)}
            aria-label={`Switch to ${l.label}`}
            aria-current={l.code === locale ? "true" : undefined}
          >
            {l.short}
          </button>
        ))}
      </div>
    );
  }

  // Default — dropdown (used in desktop Header)
  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        {/* Globe icon — inline SVG */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
                   15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          />
        </svg>
        <span>{current.short}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={open ? styles.chevronOpen : ""}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label="Language">
          {LOCALES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === locale}>
              <button
                className={`${styles.option} ${l.code === locale ? styles.optionActive : ""}`}
                onClick={() => switchLocale(l.code)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
