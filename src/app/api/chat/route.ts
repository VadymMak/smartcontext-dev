// ============================================================
// src/app/api/chat/route.ts
// [optional] AI Chat endpoint with RAG + 3-layer spam protection
// LAYER 1: Honeypot field
// LAYER 2: reCAPTCHA v3
// LAYER 3: Custom spam scoring
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { searchEmbeddings } from "@/lib/rag";
import {
  checkHoneypot,
  checkRecaptcha,
  checkSpamScore,
} from "@/lib/spamFilter";

// Rate limit: 10 messages / IP / minute
const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

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

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "AI chat is not configured" },
      { status: 503 },
    );
  }

  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a minute." },
      { status: 429 },
    );
  }

  const body = await req.json();
  const { messages, honeypot, recaptchaToken } = body as {
    messages: Message[];
    honeypot?: string;
    recaptchaToken?: string;
  };

  // LAYER 1: Honeypot — silent 200 (bot thinks it succeeded)
  if (checkHoneypot(honeypot)) {
    return NextResponse.json({ reply: "Thank you!" });
  }

  // LAYER 2: reCAPTCHA v3 (skipped if RECAPTCHA_SECRET_KEY not set)
  const recaptchaFailed = await checkRecaptcha(recaptchaToken);
  if (recaptchaFailed) {
    return NextResponse.json(
      { error: "Verification failed." },
      { status: 403 },
    );
  }

  // LAYER 3: Spam scoring on last user message
  const lastUserMsg = [...(messages ?? [])]
    .reverse()
    .find((m) => m.role === "user");
  if (lastUserMsg) {
    const spam = checkSpamScore({
      name: "",
      email: "",
      message: lastUserMsg.content,
    });
    if (spam.isSpam) {
      return NextResponse.json({ reply: "Thank you for your message!" }); // silent reject
    }
  }

  if (!messages?.length) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 },
    );
  }

  // RAG: find relevant content chunks
  const context = await searchEmbeddings(lastUserMsg?.content ?? "", 3);

  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";

  const systemPrompt = `You are the AI assistant for SmartContext — Vadym Mak's Next.js development studio.
Vadym is a full-stack developer since 2019 with 6+ production sites shipped, including AI integrations, multi-tenant SaaS platforms, and MCP endpoints.
Speak in his voice when relevant: "I built", "I deployed", "in my production system".

Answer concisely — under 100 words (3-5 sentences). Mobile users read short responses.
Never invent prices or timelines that are not in the context.
Respond in the same language the user writes in.

CITATION RULE (mandatory):
When your answer draws from a blog post, the context will contain a line like:
"URL: smartctx.dev/blog/some-slug" (the slug may appear with or without trailing slash, with or without https://)

You MUST end your response with a markdown link:
→ Format: "→ Full details: [Post Title](/blog/some-slug)"
→ Extract everything after "/blog/" up to the end or next whitespace/punctuation
→ Always use relative path starting with "/blog/" (never include domain, never include https://)
→ The arrow "→" prefix signals the link visually

Example:
Context contains: "URL: smartctx.dev/blog/custom-nextjs-vs-shopify-2026"
Your response ends with: "→ Full details: [Next.js vs Shopify framework](/blog/custom-nextjs-vs-shopify-2026)"

Only cite URLs that are literally present in the context below. Never fabricate links.

CTA RULE:
- Technical or implementation questions → cite blog post + add: "Or see [/services](/services) for full scope."
- Decision or evaluation questions → cite blog post + add: "For your specific situation, book a free 30-min audit at [/contact](/contact)."
- General questions without blog match → "For details, book a free call at [/contact](/contact)."
- If user asks about pricing for a service → cite the relevant blog post (cost article) + add: "I'll send a written quote within 48 hours — [book a call](/contact)."

Relevant information about ${SITE_NAME}:
${context}`;

  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 300,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-6),
    ],
  });

  const reply = completion.choices[0]?.message?.content ?? "";
  return NextResponse.json({ reply });
}
