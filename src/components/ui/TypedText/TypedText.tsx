"use client";

// ============================================================
// src/components/ui/TypedText/TypedText.tsx
// CSS-only typing animation using steps()
// No JS animation library — pure CSS @keyframes
// ============================================================

import { useEffect, useRef } from "react";
import styles from "./TypedText.module.css";

interface TypedTextProps {
  text: string;
  duration?: number; // seconds, default 2
  delay?: number; // seconds, default 0
  className?: string;
}

export function TypedText({
  text,
  duration = 2,
  delay = 0,
  className = "",
}: TypedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const charCount = text.length;

    // Measure exact width of the full text for accurate typing end position
    el.style.setProperty("--typed-chars", `${el.scrollWidth}px`);
    el.style.setProperty("--typed-duration", `${duration}s`);
    el.style.setProperty("--typed-steps", String(charCount));
    el.style.setProperty("--typed-delay", `${delay}s`);
    // Hide cursor after animation completes
    el.style.setProperty("--cursor-hide", `${delay + duration + 0.5}s`);
  }, [text, duration, delay]);

  return (
    <span
      ref={ref}
      className={`${styles.typed} ${className}`}
      aria-label={text}
    >
      {text}
    </span>
  );
}
