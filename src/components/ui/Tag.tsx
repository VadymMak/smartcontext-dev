import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export default function Tag({
  children,
  variant = "default",
  className = "",
}: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${className}`.trim()}>
      {children}
    </span>
  );
}