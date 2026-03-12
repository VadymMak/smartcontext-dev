// ============================================================
// data/scripts/generate-embeddings.ts
// Generates embeddings for all chunks and saves to embeddings.json
//
// Run: npx tsx data/scripts/generate-embeddings.ts
// ⚠️ ONLY npx tsx works — not ts-node, not node
//
// Requires: OPENAI_API_KEY in .env.local
// Model: text-embedding-3-small (1536 dimensions, cheapest)
// Regenerate after: new chunks, pricing changes, content updates
// ============================================================

import * as fs from "fs";
import * as path from "path";

// Load .env.local manually (tsx doesn't auto-load it)
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local not found");
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
}

loadEnv();

import OpenAI from "openai";
import { chunks } from "../chunks";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface EmbeddingEntry {
  id: string;
  category: string;
  content: string;
  embedding: number[];
}

async function generateEmbeddings() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not set in .env.local");
    process.exit(1);
  }

  console.log(`\n🔍 Generating embeddings for ${chunks.length} chunks...\n`);

  const results: EmbeddingEntry[] = [];

  for (const chunk of chunks) {
    process.stdout.write(`  → ${chunk.id}... `);

    const response = await openai.embeddings.create({
      model: "text-embedding-3-small", // 1536 dimensions, cheapest model
      input: chunk.content,
    });

    results.push({
      id: chunk.id,
      category: chunk.category,
      content: chunk.content,
      embedding: response.data[0].embedding,
    });

    console.log("✓");
  }

  const outputPath = path.resolve(process.cwd(), "data", "embeddings.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  const sizeKb = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(
    `\n✅ Saved ${results.length} embeddings to data/embeddings.json (${sizeKb} KB)`,
  );

  if (sizeKb > 1000) {
    console.log("⚠️  File >1MB — add data/embeddings.json to .gitignore");
  }
}

generateEmbeddings().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
