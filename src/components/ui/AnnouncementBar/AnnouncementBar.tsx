// ============================================================
// src/components/ui/AnnouncementBar/AnnouncementBar.tsx
// [optional] — delete this folder if ENABLE_ANNOUNCEMENT_BAR=n
// ============================================================

"use client";

import { useState } from "react";
import styles from "./AnnouncementBar.module.css";

interface AnnouncementBarProps {
  message: string;
  linkText?: string;
  linkHref?: string;
}

export function AnnouncementBar({
  message,
  linkText,
  linkHref,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!process.env.NEXT_PUBLIC_ENABLE_ANNOUNCEMENT_BAR || dismissed)
    return null;

  return (
    <div className={styles.bar} role="banner">
      <p className={styles.text}>
        {message}
        {linkText && linkHref && (
          <a href={linkHref} className={styles.link}>
            {linkText} →
          </a>
        )}
      </p>
      <button
        className={styles.close}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
      >
        {/* inline SVG — no icon library */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
