"use client";

// ============================================================
// src/components/ui/ContactForm/ContactForm.tsx
// ⚠️ Honeypot field — silent spam rejection (day 1, not retrofit)
// Rate limit handled server-side in /api/contact/route.ts
// NO <form> action — fetch POST to /api/contact
// ============================================================

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./ContactForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // ⚠️ hidden field — bots fill it, humans don't
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
      setForm({ name: "", email: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Name */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          {t("name_label")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.input}
          placeholder={t("name_placeholder")}
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          {t("email_label")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          placeholder={t("email_placeholder")}
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      {/* Message */}
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          {t("message_label")}
        </label>
        <textarea
          id="message"
          name="message"
          className={`${styles.input} ${styles.textarea}`}
          placeholder={t("message_placeholder")}
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      {/* ⚠️ Honeypot — visually hidden, bots fill it, humans skip it */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="honeypot">Leave this empty</label>
        <input
          id="honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={handleChange}
        />
      </div>

      {/* Submit */}
      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : null}
        {status === "loading" ? "Sending..." : t("submit")}
      </button>

      {/* Feedback messages */}
      {status === "success" && (
        <p className={styles.success} role="status">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className={styles.error} role="alert">
          {t("error")}
        </p>
      )}
    </div>
  );
}
