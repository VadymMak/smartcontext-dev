"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  honeypot: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  honeypot: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot trap
    if (form.honeypot) return;

    setStatus("sending");

    try {
      // TODO: Replace with actual API route
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
        <button
          className={styles.resetButton}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
          placeholder="Your name"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
          placeholder="your@email.com"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="projectType" className={styles.label}>
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select...</option>
            <option value="website">Website</option>
            <option value="webapp">Web Application</option>
            <option value="ai">AI Integration</option>
            <option value="seo">SEO / Blog</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="budget" className={styles.label}>
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select...</option>
            <option value="1k-3k">$1,000 – $3,000</option>
            <option value="3k-5k">$3,000 – $5,000</option>
            <option value="5k-10k">$5,000 – $10,000</option>
            <option value="10k+">$10,000+</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          className={styles.textarea}
          placeholder="Tell me about your project..."
          rows={5}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message →"}
      </Button>

      {status === "error" && (
        <p className={styles.error}>
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}