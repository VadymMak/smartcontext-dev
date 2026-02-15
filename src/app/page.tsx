export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-4)",
        padding: "var(--space-3)",
      }}
    >
      <h1>
        {"{"} SC {"}"} SmartContext
      </h1>
      <p>Web & AI Development</p>
      <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}>
        Design system working ✓
      </p>
      <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          Next.js
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          TypeScript
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          AI
        </span>
      </div>
    </main>
  );
}