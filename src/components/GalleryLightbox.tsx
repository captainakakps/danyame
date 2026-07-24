"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

const CLOSE_ANIMATION_MS = 200;

type GalleryLightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

/** Full-size image viewer with prev/next navigation and keyboard support. */
export default function GalleryLightbox({
  images,
  initialIndex,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    setIsVisible(false);

    window.setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  }, [isClosing, onClose]);

  const goToPrevious = useCallback(() => {
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => setIsVisible(true));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      } else if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [requestClose, goToPrevious, goToNext]);

  const current = images[index];
  if (!current) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/85 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close"
        onClick={requestClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-[10001] flex h-full max-h-[90vh] w-full max-w-[1200px] flex-col transition-all duration-200 ease-out motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-2 pb-4 text-white">
          <p
            className="text-sm tracking-[0.2em] text-white/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-white/10 transition-colors hover:bg-white/20"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[20px] bg-black/40">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
