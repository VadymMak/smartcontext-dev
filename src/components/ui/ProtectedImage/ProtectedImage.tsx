// ============================================================
// src/components/ui/ProtectedImage/ProtectedImage.tsx
// [optional] — delete this folder if ENABLE_PROTECTED_IMAGE=n
// Prevents right-click save and drag — for photography/illustration portfolios
// ============================================================

"use client";

import Image from "next/image";
import styles from "./ProtectedImage.module.css";

interface ProtectedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  watermark?: string; // optional watermark text e.g. "© YourName"
}

export function ProtectedImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  watermark,
}: ProtectedImageProps) {
  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      // Disable right-click context menu
      onContextMenu={(e) => e.preventDefault()}
      // Disable drag
      onDragStart={(e) => e.preventDefault()}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        draggable={false}
        className={styles.image}
      />

      {/* Transparent overlay — blocks click-through drag */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Optional watermark */}
      {watermark && (
        <span className={styles.watermark} aria-hidden="true">
          {watermark}
        </span>
      )}
    </div>
  );
}
