import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-6) var(--space-3)",
        gap: "var(--space-3)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-4xl)",
          color: "var(--color-text-tertiary)",
          opacity: 0.5,
        }}
      >
        404
      </span>
      <h1>Page Not Found</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" variant="primary">
        Back to Home
      </Button>
    </main>
  );
}