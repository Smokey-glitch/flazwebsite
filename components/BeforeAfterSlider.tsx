"use client";

import Image from "next/image";
import { imageAlt } from "@/lib/image-alt";
import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
}

export default function BeforeAfterSlider({ before, after, alt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  // Keyboard support for the handle: arrows nudge, Home/End jump to the ends.
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = position - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = position + step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setPosition(Math.max(0, Math.min(100, next)));
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onTouchEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 select-none overflow-hidden"
      style={{ cursor: isDragging ? "ew-resize" : "col-resize" }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Before image — full area underneath */}
      <Image
        src={before}
        alt={`Before: ${imageAlt(before, alt)}`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* After image — clipped to right of the divider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={after}
          alt={`After: ${imageAlt(after, alt)}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Divider line + drag handle */}
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Vertical line */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2"
          style={{
            width: "2px",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 10px rgba(0,0,0,0.35)",
          }}
        />

        {/* Handle circle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before image shown`}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--flaz-teal)]"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
            cursor: "ew-resize",
          }}
        >
          <svg
            width="18"
            height="18"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(44,44,44,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 3 12 9 6" />
            <polyline points="15 6 21 12 15 18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
