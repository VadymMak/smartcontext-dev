import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-5)",
        padding: "var(--space-5)",
      }}
    >
      {/* Theme Toggle */}
      <div style={{ position: "fixed", top: "var(--space-3)", right: "var(--space-3)" }}>
        <ThemeToggle />
      </div>

      {/* Logo + Title */}
      <h1>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}>
          {"{ "}
        </span>
        SC
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}>
          {" }"}
        </span>
        {" "}SmartContext
      </h1>
      <p>Web & AI Development</p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="primary">View Projects</Button>
        <Button variant="secondary">Get in Touch</Button>
        <Button variant="ghost">Learn More →</Button>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center" }}>
        <Tag>Next.js</Tag>
        <Tag>TypeScript</Tag>
        <Tag variant="accent">AI</Tag>
        <Tag>React</Tag>
        <Tag>Node.js</Tag>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--space-3)", width: "100%", maxWidth: "800px" }}>
        <Card>
          <h3 style={{ marginBottom: "var(--space-2)" }}>🌐 Web Development</h3>
          <p style={{ fontSize: "var(--text-sm)" }}>
            Modern sites & apps on Next.js stack
          </p>
        </Card>
        <Card>
          <h3 style={{ marginBottom: "var(--space-2)" }}>🤖 AI Integration</h3>
          <p style={{ fontSize: "var(--text-sm)" }}>
            Smart chatbots, AI tools & LLM features
          </p>
        </Card>
        <Card>
          <h3 style={{ marginBottom: "var(--space-2)" }}>📈 SEO & Growth</h3>
          <p style={{ fontSize: "var(--text-sm)" }}>
            Content strategy, SEO & blog system
          </p>
        </Card>
      </div>

      {/* Status */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-success)" }}>
        ✓ Design system ready — Phase 1 complete
      </p>
    </main>
  );
}