import Button from "@/components/ui/Button";
import styles from "./CTABanner.module.css";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTABanner({
  title = "Have a project in mind?",
  subtitle = "Let's build something great together.",
  buttonText = "Start a Conversation →",
  buttonHref = "/contact",
}: CTABannerProps) {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <Button href={buttonHref} variant="primary" size="lg">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}