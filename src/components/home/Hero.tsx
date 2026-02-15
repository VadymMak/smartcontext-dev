"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

const TYPING_TEXT = "I build fast, modern web applications with AI";
const TYPING_SPEED = 45;

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "blinking" | "done">("typing");
  const indexRef = useRef(0);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;

    const interval = setInterval(() => {
      indexRef.current += 1;
      const next = TYPING_TEXT.slice(0, indexRef.current);
      setDisplayedText(next);

      if (indexRef.current >= TYPING_TEXT.length) {
        clearInterval(interval);
        setPhase("blinking");
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, [phase]);

  // Stop cursor after 2s
  useEffect(() => {
    if (phase !== "blinking") return;

    const timeout = setTimeout(() => setPhase("done"), 2000);
    return () => clearTimeout(timeout);
  }, [phase]);

  const showCursor = phase === "typing" || phase === "blinking";

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.greeting}>Hi, I&apos;m Vadym Mak</p>

        <h1 className={styles.headline}>
          {displayedText}
          {showCursor && <span className={styles.cursor}>▌</span>}
        </h1>

        <p className={styles.description}>
          Full-stack developer specializing in React, Next.js, and AI
          integration. Turning complex ideas into clean, performant digital
          products.
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" href="/projects">
            View Projects
          </Button>
          <Button variant="secondary" size="lg" href="/contact">
            Get in Touch
          </Button>
        </div>

        <div className={styles.social}>
          <a href="https://github.com/VadymMak" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            GitHub
          </a>
          <span className={styles.socialDot}>·</span>
          <a href="https://linkedin.com/in/vadymmak" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
          <span className={styles.socialDot}>·</span>
          <a href="mailto:hello@smartcontext.dev" className={styles.socialLink}>
            Email
          </a>
        </div>
      </div>

      <div className={`${styles.bgGrid} ${phase !== "typing" ? styles.bgVisible : ""}`} />
    </section>
  );
}