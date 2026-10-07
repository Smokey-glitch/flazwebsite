"use client";

import Image from "next/image";
import { imageAlt } from "@/lib/image-alt";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

/** Static photo grid (no horizontal scrolling) with a keyboard-accessible lightbox. */
export default function ProjectGallery({ images: rawImages, title }: ProjectGalleryProps) {
  // The project data repeats some photos; show each distinct photo once.
  const images = useMemo(() => Array.from(new Set(rawImages)), [rawImages]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)),
    [images.length]
  );
  const close = useCallback(() => {
    setActiveIndex(null);
    openerRef.current?.focus({ preventScroll: true });
  }, []);

  const isOpen = activeIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        // Keep focus inside the lightbox controls.
        const items = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox] button"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, prev, next]);

  if (images.length === 0) return null;
  const ctrl =
    "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white";
  const ctrlStyle = { background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)" } as const;

  return (
    <>
      <section
        className="pb-10 md:pb-16"
        aria-labelledby="gallery-heading"
        style={{ borderTop: "1px solid rgba(44,44,44,0.1)", paddingTop: "clamp(24px, 3.5vw, 48px)" }}
      >
        <h2 id="gallery-heading" className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-600 mb-4 md:mb-7">
          Project gallery
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                className="group relative block w-full overflow-hidden"
                style={{ aspectRatio: "4/3", borderRadius: "3px", border: "1px solid rgba(44,44,44,0.1)" }}
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setActiveIndex(i);
                }}
                aria-label={`View photo ${i + 1} of ${images.length}`}
              >
                <Image
                  src={src}
                  alt={imageAlt(src, `${title} — photo ${i + 1}`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <span
                  className="absolute bottom-2 right-2 text-[11px] font-medium tabular-nums"
                  style={{ color: "#fff", background: "rgba(10,10,10,0.6)", padding: "3px 5px", borderRadius: "2px", lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {isOpen && activeIndex !== null && (
        <div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{ background: "rgba(14,14,14,0.93)" }}
          onClick={close}
        >
          <div
            className="relative"
            style={{ width: "min(94vw, 1280px)", aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={imageAlt(images[activeIndex], `${title} — photo ${activeIndex + 1}`)}
              fill
              className="object-contain"
              sizes="94vw"
            />
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 text-[12px] uppercase tracking-[0.18em] font-medium"
            style={{ color: "rgba(255,255,255,0.9)", bottom: "max(24px, env(safe-area-inset-bottom))" }}
            aria-live="polite"
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>

          {activeIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className={`${ctrl} absolute left-3 md:left-6 top-1/2 -translate-y-1/2`}
              style={ctrlStyle}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {activeIndex < images.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className={`${ctrl} absolute right-3 md:right-6 top-1/2 -translate-y-1/2`}
              style={ctrlStyle}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          )}

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className={`${ctrl} absolute top-3 right-3 md:top-6 md:right-6`}
            style={ctrlStyle}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
