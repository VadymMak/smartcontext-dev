export interface EmbeddingEntry {
  id: string;
  text: string;
  source: string;
  section: string;
  embedding: number[];
}

export interface SearchResult {
  entry: EmbeddingEntry;
  score: number;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

// Cache embeddings in memory
let cachedEmbeddings: EmbeddingEntry[] | null = null;

export async function loadEmbeddings(): Promise<EmbeddingEntry[]> {
  if (cachedEmbeddings) return cachedEmbeddings;

  try {
    const data = await import("@/../data/embeddings.json");
    cachedEmbeddings = data.default as EmbeddingEntry[];
    return cachedEmbeddings;
  } catch {
    console.warn("Embeddings file not found. Chat will use fallback responses.");
    return [];
  }
}

export async function searchEmbeddings(
  queryEmbedding: number[],
  topK: number = 5
): Promise<SearchResult[]> {
  const embeddings = await loadEmbeddings();

  if (embeddings.length === 0) return [];

  const results: SearchResult[] = embeddings.map((entry) => ({
    entry,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, topK);
}