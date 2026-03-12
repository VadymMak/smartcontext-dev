// ============================================================
// src/components/ui/ChatWidget/ChatWidget.tsx
// [optional] — delete this folder if ENABLE_AI_CHAT=n
// Calls: src/app/api/chat/route.ts
// Requires: OPENAI_API_KEY in .env.local
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatWidget.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Early return AFTER all hooks
  if (!process.env.NEXT_PUBLIC_ENABLE_AI_CHAT) return null;

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const updated = [...messages, userMessage];

    setMessages(updated);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated,
          honeypot: "",
        }),
      });

      if (res.status === 429) {
        setError("Too many messages. Please wait a minute.");
        return;
      }

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Chat assistant">
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.headerTitle}>SmartContext AI</span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14 4L4 14M4 4l10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.messages} aria-live="polite">
            {messages.length === 0 && (
              <p className={styles.emptyState}>
                Hi! Ask me anything about services, pricing, or tech stack.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${msg.role === "user" ? styles.userMessage : styles.assistantMessage}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div
                className={`${styles.message} ${styles.assistantMessage} ${styles.typingIndicator}`}
              >
                <span />
                <span />
                <span />
              </div>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              type="text"
              name="website"
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
              }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className={styles.input}
              aria-label="Chat message input"
              disabled={loading}
              maxLength={500}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={styles.sendBtn}
              aria-label="Send message"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15.5 9L2.5 2.5l3.25 6.5-3.25 6.5L15.5 9z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={styles.bubble}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17 5L5 17M5 5l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7h14M4 11h10M4 15h7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
