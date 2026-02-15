import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import CTABanner from "@/components/layout/CTABanner";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "var(--space-7) var(--space-3) var(--space-6)",
          gap: "var(--space-4)",
        }}
      >
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
        <p style={{ fontSize: "var(--text-lg)", maxWidth: "500px" }}>
          Full-stack developer specializing in React, Next.js, and AI integration.
        </p>
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="primary" href="/projects">View Projects</Button>
          <Button variant="secondary" href="/contact">Get in Touch</Button>
        </div>
      </section>

      {/* Services */}
      <AnimatedSection>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "var(--space-6) var(--space-3)" }}>
          <SectionHeading title="What I Do" subtitle="Building digital products that work for your business." align="center" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--space-3)" }}>
            <Card>
              <h3 style={{ marginBottom: "var(--space-2)" }}>🌐 Web Development</h3>
              <p style={{ fontSize: "var(--text-sm)" }}>Modern sites & apps on Next.js stack</p>
            </Card>
            <Card>
              <h3 style={{ marginBottom: "var(--space-2)" }}>🤖 AI Integration</h3>
              <p style={{ fontSize: "var(--text-sm)" }}>Smart chatbots, AI tools & LLM features</p>
            </Card>
            <Card>
              <h3 style={{ marginBottom: "var(--space-2)" }}>📈 SEO & Growth</h3>
              <p style={{ fontSize: "var(--text-sm)" }}>Content strategy, SEO & blog system</p>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack */}
      <AnimatedSection delay={0.1}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "var(--space-5) var(--space-3)" }}>
          <SectionHeading title="Tech Stack" align="center" />
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", justifyContent: "center" }}>
            <Tag>React</Tag>
            <Tag>Next.js</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Node.js</Tag>
            <Tag>Python</Tag>
            <Tag>PostgreSQL</Tag>
            <Tag variant="accent">OpenAI API</Tag>
            <Tag>Vercel</Tag>
            <Tag>Git</Tag>
            <Tag>Docker</Tag>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}