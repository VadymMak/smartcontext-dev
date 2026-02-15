"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme") as "dark" | "light" | null;
  if (saved) return saved;
  if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}