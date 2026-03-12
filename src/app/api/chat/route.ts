// ============================================================
// src/app/api/chat/route.ts
// [optional] AI Chat endpoint with RAG
// Model: gpt-4o-mini (~$0.001/req, fast, sufficient)
// Rate limit: 10 messages / IP / minute
// Context window: last 6 messages (3 exchanges)
// RAG: top 3 chunks by cosine similarity
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { searchEmbeddings } from "@/lib/rag";

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

  const { messages } = (await req.json()) as { messages: Message[] };

  if (!messages?.length) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 },
    );
  }

  // Get last user message for RAG search
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // RAG: find relevant content chunks
  const context = await searchEmbeddings(lastUserMessage, 3);

  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio";

  const systemPrompt = `You are a helpful assistant for ${SITE_NAME}.
Answer concisely — 2–4 sentences maximum.
Never invent prices or timelines that are not in the context.
If you don't know the answer, say: "For details, please use our contact form."
Respond in the same language the user writes in.

Relevant information about ${SITE_NAME}:
${context}`;

  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // cheap (~$0.001/req), fast, sufficient for FAQ
    max_tokens: 300,
    messages: [
      { role: "system", content: systemPrompt },
      // Keep last 6 messages (3 exchanges) for context
      ...messages.slice(-6),
    ],
  });

  const reply = completion.choices[0]?.message?.content ?? "";

  return NextResponse.json({ reply });
}
