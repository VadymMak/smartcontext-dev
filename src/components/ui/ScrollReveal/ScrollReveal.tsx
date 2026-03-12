'use client';

// ============================================================
// src/components/ui/ScrollReveal/ScrollReveal.tsx
// Scroll-triggered reveal using IntersectionObserver + CSS class toggle
// Replaces Framer Motion whileInView — zero JS animation overhead
// ============================================================

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;  // 0–1, default 0.1
  delay?: number;      // ms, default 0
}

export function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Disconnect after reveal — no need to keep observing
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, delay]);

  // Base class scroll-reveal is defined in globals.css:
  // opacity: 0; transform: translateY(24px); transition: ...
  // .revealed → opacity: 1; transform: none;
  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}