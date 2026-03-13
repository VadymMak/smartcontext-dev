"use client";
// ============================================================
// src/components/ui/TypedText/TypedText.tsx
// CSS typing animation — steps count injected via JS
// because steps(var(--n)) is NOT supported in browsers
// ============================================================
import { useEffect, useRef } from "react";
import styles from "./TypedText.module.css";

interface TypedTextProps {
  text: string;
  duration?: number;
  delay?: number;
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
    const el = ref.current;
    if (!el) return;

    const charCount = text.length;
    const blinkStart = delay;
    const blinkEnd = delay + duration;
    const hideAt = blinkEnd + 0.8; // cursor hides 0.8s after typing ends

    const start = () => {
      el.style.width = "auto";
      el.style.overflow = "visible";
      const w = el.scrollWidth;
      el.style.setProperty("--typed-chars", `${w}px`);
      el.style.width = "0px";
      el.style.overflow = "hidden";

      // 1. typing — reveals text character by character
      // 2. blink  — cursor blinks during typing
      // 3. cursorHide — cursor permanently disappears after typing
      el.style.animation = [
        `typing ${duration}s steps(${charCount}) ${delay}s forwards`,
        `blink 0.75s step-end ${blinkStart}s ${Math.ceil(duration / 0.75)}`,
        `cursorHide 0.1s ${hideAt}s forwards`,
      ].join(", ");
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }
  }, [text, duration, delay]);

  return (
    <span
      ref={ref}
      className={`${styles.typed} ${className}`}
      aria-label={text}
      style={{ width: "0px", overflow: "hidden" }}
    >
      {text}
    </span>
  );
}
