"use client";

import styles from "./BlogContent.module.css";

interface BlogContentProps {
  content: string;
}

function processContent(content: string): string {
  let html = content.trim();

  // Headings: ## Title → <h2 id="title">Title</h2>
  html = html.replace(/^###\s+(.+)$/gm, (_match, text) => {
    const id = text
      .replace(/\*\*/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h3 id="${id}">${text.trim()}</h3>`;
  });

  html = html.replace(/^##\s+(.+)$/gm, (_match, text) => {
    const id = text
      .replace(/\*\*/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h2 id="${id}">${text.trim()}</h2>`;
  });

  // Bold: **text** → <strong>text</strong>
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* → <em>text</em>
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

  // Inline code: `text` → <code>text</code>
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Unordered lists
  html = html.replace(
    /((?:^- .+\n?)+)/gm,
    (block) => {
      const items = block
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => `<li>${line.slice(2)}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /((?:^\d+\.\s+.+\n?)+)/gm,
    (block) => {
      const items = block
        .split("\n")
        .filter((line) => /^\d+\.\s+/.test(line))
        .map((line) => `<li>${line.replace(/^\d+\.\s+/, "")}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }
  );

  // Paragraphs: wrap remaining lines
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h")) return trimmed;
      if (trimmed.startsWith("<ul")) return trimmed;
      if (trimmed.startsWith("<ol")) return trimmed;
      return `<p>${trimmed.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  return html;
}

export default function BlogContent({ content }: BlogContentProps) {
  const html = processContent(content);

  return (
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}