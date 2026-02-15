import type { Metadata } from "next";
import Tag from "@/components/ui/Tag";
import CTABanner from "@/components/layout/CTABanner";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { FAQSchema } from "@/components/shared/JsonLd";
import FAQ from "@/components/services/FAQ";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, AI integration, SEO optimization, and ongoing support. Modern websites built on Next.js with AI features and perfect SEO scores.",
};

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Custom websites and web apps built on modern stack. Fast, SEO-ready, mobile-first.",
    features: [
      "Custom design & development",
      "Responsive (mobile-first)",
      "SEO optimization included",
      "Performance optimization",
      "Analytics setup",
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS Modules", "Vercel"],
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description:
      "Add intelligence to your product. Chatbots, content generation, smart search, automation.",
    features: [
      "Custom AI chatbots trained on your content",
      "Semantic search (not just keyword matching)",
      "Content automation (meta descriptions, alt texts)",
      "LLM integration (OpenAI, Anthropic)",
      "RAG architecture for knowledge bases",
    ],
    stack: ["OpenAI API", "LangChain", "Embeddings", "pgvector"],
  },
  {
    icon: "📈",
    title: "SEO & Content Strategy",
    description:
      "Blog systems that bring organic traffic. Technical SEO, content planning, long-term growth.",
    features: [
      "Technical SEO audit & optimization",
      "Structured data (JSON-LD) on all pages",
      "Blog system with MDX",
      "Content strategy & planning",
      "Core Web Vitals optimization",
    ],
    stack: ["Lighthouse 100", "JSON-LD", "Sitemap", "next/image"],
  },
  {
    icon: "🔧",
    title: "Support & Maintenance",
    description:
      "Ongoing technical support, updates, performance monitoring, and security.",
    features: [
      "Hosting monitoring & security updates",
      "Performance checks & optimization",
      "Content updates & minor edits",
      "Analytics reports",
      "Priority bug fixes",
    ],
    stack: ["Vercel", "GA4", "Uptime monitoring"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    description: "We discuss your goals, requirements, and timeline.",
  },
  {
    step: "02",
    title: "Proposal",
    description: "You receive a detailed plan, timeline, and fixed price quote.",
  },
  {
    step: "03",
    title: "Development",
    description: "I build, you review at each milestone. Full transparency.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Deployment, testing, and go live. Everything optimized.",
  },
  {
    step: "05",
    title: "Support",
    description: "Ongoing maintenance, updates, and growth support.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Services</h1>
          <p className={styles.subtitle}>
            Building digital products that work for your business.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className={styles.services}>
        <div className={styles.container}>
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.05}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                </div>
                <p className={styles.serviceDescription}>{service.description}</p>

                <div className={styles.serviceDetails}>
                  <div className={styles.features}>
                    <h3 className={styles.detailTitle}>What you get:</h3>
                    <ul className={styles.featureList}>
                      {service.features.map((f) => (
                        <li key={f} className={styles.featureItem}>
                          <span className={styles.check}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.stackSection}>
                    <h3 className={styles.detailTitle}>Stack:</h3>
                    <div className={styles.tags}>
                      {service.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Process */}
      <div className="section-alt">
        <AnimatedSection>
          <section className={styles.process}>
            <div className={styles.container}>
              <SectionHeading
                title="How I Work"
                subtitle="A clear, transparent process from start to finish."
                align="center"
              />
              <div className={styles.timeline}>
                {PROCESS.map((step) => (
                  <div key={step.step} className={styles.timelineStep}>
                    <span className={styles.stepNumber}>{step.step}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>

      {/* FAQ */}
      <AnimatedSection>
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <SectionHeading
              title="Frequently Asked Questions"
              align="center"
            />
            <FAQ />
          </div>
        </section>
      </AnimatedSection>

      <CTABanner
        title="Ready to start?"
        subtitle="Tell me about your project and I'll get back to you within 24 hours."
        buttonText="Start a Project →"
      />
    </main>
  );
}