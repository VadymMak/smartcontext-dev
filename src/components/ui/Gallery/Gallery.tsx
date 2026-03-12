// ============================================================
// src/components/ui/Gallery/Gallery.tsx
// [optional] — delete this folder if ENABLE_GALLERY=n
// Lazy-loaded images + CSS-only lightbox (no JS library)
// ============================================================

"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function Gallery({ images, columns = 3 }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setActiveIndex(i), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const next = useCallback(
    () =>
      setActiveIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)),
    [images.length],
  );

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <>
      {/* Grid */}
      <div
        className={styles.grid}
        style={{ "--columns": columns } as React.CSSProperties}
        role="list"
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            className={styles.thumb}
            onClick={() => open(i)}
            aria-label={`Open image: ${img.alt}`}
            role="listitem"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              className={styles.thumbImage}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={styles.closeBtn}
              onClick={close}
              aria-label="Close lightbox"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Prev */}
            {activeIndex > 0 && (
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={prev}
                aria-label="Previous image"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

            {/* Active image */}
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={images[activeIndex].width}
              height={images[activeIndex].height}
              className={styles.lightboxImage}
              priority
            />

            {/* Next */}
            {activeIndex < images.length - 1 && (
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={next}
                aria-label="Next image"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

            {/* Counter */}
            <p className={styles.counter} aria-live="polite">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
