import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/shared/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import styles from "./ServicesPreview.module.css";

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Development",
    description:
      "Modern websites and web apps built on Next.js stack. Fast, SEO-ready, mobile-first.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    description:
      "Smart chatbots, AI-powered search, content automation, and custom LLM solutions.",
  },
  {
    icon: "📈",
    title: "SEO & Growth",
    description:
      "Content strategy, technical SEO, and blog systems that bring organic traffic.",
  },
];

export default function ServicesPreview() {
  return (
    <AnimatedSection className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title="What I Do"
          subtitle="Building digital products that work for your business."
          align="center"
        />

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <Card key={service.title}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </Card>
          ))}
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/services" className={styles.link}>
            All Services →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}