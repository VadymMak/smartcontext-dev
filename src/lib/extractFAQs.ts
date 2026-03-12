// ============================================================
// src/lib/extractFAQs.ts
// Extracts FAQ items from markdown content
// Headings ending with ? → question
// Following paragraph → answer
// ⚠️ FAQ heading strategy: convert ## headings to questions ending with ?
//    Auto-generates FAQPage schema — higher AI citation rate (+37%)
// ============================================================

import type { FAQ } from "@/data/serviceFaqs";

export function extractFAQs(markdown: string): FAQ[] {
  const faqs: FAQ[] = [];
  const lines = markdown.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match ## or ### headings ending with ?
    const headingMatch = line.match(/^#{2,3}\s+(.+\?)$/);
    if (!headingMatch) continue;

    const question = headingMatch[1].trim();

    // Collect following paragraph as answer (skip empty lines)
    const answerLines: string[] = [];
    let j = i + 1;

    while (j < lines.length) {
      const nextLine = lines[j].trim();

      // Stop at next heading
      if (nextLine.startsWith("#")) break;

      // Stop after collecting one paragraph
      if (nextLine === "" && answerLines.length > 0) break;

      if (nextLine !== "") {
        // Strip markdown formatting for plain text answer
        answerLines.push(
          nextLine
            .replace(/\*\*(.*?)\*\*/g, "$1") // bold
            .replace(/\*(.*?)\*/g, "$1") // italic
            .replace(/`(.*?)`/g, "$1") // code
            .replace(/\[(.*?)\]\(.*?\)/g, "$1"), // links
        );
      }

      j++;
    }

    if (answerLines.length > 0) {
      faqs.push({ question, answer: answerLines.join(" ") });
    }
  }

  return faqs;
}
