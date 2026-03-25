// ============================================================
// src/app/api/contact/route.ts
// Rate limit: 3 submissions / IP / minute
// Honeypot: silent reject if filled
// Channels: Resend (email) + Telegram — parallel via Promise.allSettled
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// In-memory rate limit map — resets on server restart
// For production consider Redis or Upstash
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60_000; // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.ts > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, ts: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

// --- Email via Resend -------------------------------------
async function sendEmail(name: string, email: string, message: string) {
  if (!process.env.RESEND_API_KEY) return;

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@smartctx.dev",
    to: process.env.RESEND_TO_EMAIL ?? "makevytssvadym+smartcontext@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}

// --- Telegram notification --------------------------------
async function sendTelegram(name: string, email: string, message: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return;

  const text = [
    `📩 <b>New contact</b>`,
    `👤 <b>Name:</b> ${name}`,
    `📧 <b>Email:</b> ${email}`,
    `💬 <b>Message:</b>`,
    message.slice(0, 300),
  ].join("\n");

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    },
  );
}

// --- Route handler ----------------------------------------
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { name, email, message, honeypot } = body;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  await Promise.allSettled([
    sendEmail(name, email, message),
    sendTelegram(name, email, message),
  ]);

  return NextResponse.json({ ok: true });
}
