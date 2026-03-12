"use client";

// ============================================================
// src/components/ui/ThemeToggle/ThemeToggle.tsx
// ⚠️ NEVER use useState + useEffect for mount detection
//    Causes ESLint error + hydration mismatch
// ✅ Use useSyncExternalStore — hydration-safe, no flash
// ✅ Inline SVG only — no icon library
// ============================================================

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // useSyncExternalStore: returns false on server, true on client
  // This prevents hydration mismatch without useEffect
  const mounted = useSyncExternalStore(
    () => () => {}, // subscribe (noop — theme change triggers re-render via next-themes)
    () => true, // getSnapshot (client) → true
    () => false, // getServerSnapshot → false
  );

  // Render placeholder while server-rendering to avoid layout shift
  if (!mounted) return <div className={styles.placeholder} />;

  const isDark = theme === "dark";

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        // Sun icon — shown in dark mode
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
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon — shown in light mode
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
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
