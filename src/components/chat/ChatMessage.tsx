import styles from "./ChatWidget.module.css";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

function renderMarkdown(text: string): string {
  let html = text;

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Line breaks
  html = html.replace(/\n/g, "<br>");

  return html;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`${styles.message} ${
        isUser ? styles.userMessage : styles.assistantMessage
      }`}
    >
      <div
        className={`${styles.bubble} ${
          isUser ? styles.userBubble : styles.assistantBubble
        }`}
        dangerouslySetInnerHTML={{
          __html: isUser ? message.content : renderMarkdown(message.content),
        }}
      />
    </div>
  );
}