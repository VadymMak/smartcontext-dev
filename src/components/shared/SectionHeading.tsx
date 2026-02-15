import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}