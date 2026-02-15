import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are SmartContext AI assistant, helping visitors learn about Vadym Mak's web development services and expertise.

RULES:
- Answer ONLY based on the provided context. If the context doesn't contain the answer, say "I don't have specific information about that, but feel free to ask via the contact form or email hello@smartcontext.dev"
- Be concise — 2-4 sentences for simple questions, more for detailed ones
- Be professional and helpful, not salesy
- If asked about pricing, reference the service packages but suggest contacting for a custom quote
- Respond in the same language the user writes in (English or Russian)
- Format responses with markdown when helpful (bold, lists)
- If asked something completely unrelated to SmartContext, politely redirect: "I'm here to help with questions about SmartContext services and web development. For other topics, I'd suggest..."

ABOUT SMARTCONTEXT:
Vadym Mak is a full-stack developer based in Erdemli, Turkey. He builds modern web applications with Next.js, React, TypeScript, and AI integration. His portfolio site is smartcontext.dev.`;

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 8000), // Limit input length
  });

  return response.data[0].embedding;
}

export async function getChatStream(
  context: string,
  question: string,
  conversationHistory: { role: "user" | "assistant"; content: string }[] = []
) {
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "system",
      content: `CONTEXT FROM SMARTCONTEXT.DEV:\n\n${context}`,
    },
    // Include last 4 messages of conversation history for context
    ...conversationHistory.slice(-4),
    { role: "user", content: question },
  ];

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    max_tokens: 500,
    temperature: 0.7,
    stream: true,
  });

  return stream;
}