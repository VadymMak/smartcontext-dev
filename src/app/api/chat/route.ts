import { NextRequest, NextResponse } from "next/server";
import { getEmbedding, getChatStream } from "@/lib/ai";
import { searchEmbeddings } from "@/lib/embeddings";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // messages per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Fallback context when embeddings aren't available
const FALLBACK_CONTEXT = `
SmartContext is a web development service by Vadym Mak.

Services offered:
- Web Development: Custom websites and web apps built with Next.js, React, TypeScript. Prices start at $1,500 for landing pages, $3,000-$5,000 for business sites, $5,000-$8,000 for full-featured sites with AI.
- AI Integration: Custom chatbots, semantic search, content automation using OpenAI API and LangChain.
- SEO & Content Strategy: Technical SEO, structured data, blog systems, content planning. Proven Lighthouse SEO score of 100.
- Support & Maintenance: Ongoing support starting at $200/month.

Process: Discovery → Proposal → Development → Launch → Support

Tech stack: Next.js, React, TypeScript, Python, FastAPI, PostgreSQL, OpenAI API, Vercel.

Timeline: Landing pages 1-2 weeks, business sites 3-4 weeks, full sites with AI 4-6 weeks.

Contact: hello@smartcontext.dev, response within 24 hours.
Location: Erdemli, Turkey.
Languages: English, Russian, Ukrainian.
`;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, history = [] } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI assistant is not configured yet." },
        { status: 503 }
      );
    }

    // RAG pipeline
    let context = FALLBACK_CONTEXT;

    try {
      // Try to use embeddings for better context
      const queryEmbedding = await getEmbedding(message);
      const results = await searchEmbeddings(queryEmbedding, 5);

      if (results.length > 0) {
        context = results
          .map(
            (r) =>
              `[Source: ${r.entry.source} — ${r.entry.section}]\n${r.entry.text}`
          )
          .join("\n\n---\n\n");
      }
    } catch {
      // If embeddings fail, use fallback context
      console.log("Using fallback context (embeddings not available)");
    }

    // Get streaming response
    const stream = await getChatStream(context, message, history);

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}