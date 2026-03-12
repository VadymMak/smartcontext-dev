"use client";

// ============================================================
// src/components/ui/CookieBanner/CookieBanner.tsx
// GDPR cookie consent banner
// ⚠️ GA4 loads ONLY after user accepts — EU legal requirement
// Consent stored in localStorage as 'cookie_consent': 'accepted' | 'declined'
// ============================================================

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "./CookieBanner.module.css";

export type ConsentStatus = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus;
    if (!stored) {
      // Small delay so banner doesn't flash on first paint
      setTimeout(() => setVisible(true), 800);
    } else {
      setConsent(stored);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    // Dispatch event so GoogleAnalytics component can react
    window.dispatchEvent(new Event("cookie_consent_accepted"));
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  }

  if (!visible || consent !== null) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className={styles.inner}>
        <p className={styles.message}>{t("message")}</p>

        <div className={styles.actions}>
          <button className={styles.declineBtn} onClick={handleDecline}>
            {t("decline")}
          </button>
          <button className={styles.acceptBtn} onClick={handleAccept}>
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
