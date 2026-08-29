"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import heroData from "@/content/hero.json";

const {
  eyebrow,
  heading,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  slides,
} = heroData;


export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="flex flex-col"
      style={{
        marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
      }}
    >
      {/* Hero carousel with text overlay */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(480px, 58vw, 780px)" }}
      >
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--flaz-dark)] via-gray-700 to-gray-500 -z-10" />

        {/* Dark gradient — strong at bottom for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(5,5,5,0.90) 0%, rgba(5,5,5,0.45) 38%, rgba(5,5,5,0.1) 65%, transparent 100%)",
          }}
        />

        {/* Text + controls overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between gap-8"
          style={{
            paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingBottom: "clamp(36px, 4.5vw, 60px)",
          }}
        >
          {/* Left — eyebrow + heading + description + CTAs */}
          <div className="flex flex-col gap-4" style={{ maxWidth: "clamp(280px, 50vw, 660px)" }}>
            <p
              className="text-[10px] uppercase tracking-[0.22em] font-medium"
              style={{ color: "var(--flaz-teal)" }}
            >
              {eyebrow}
            </p>

            <h1
              className="font-medium text-white leading-[1.0] tracking-[-0.02em]"
              style={
                {
                  fontSize: "clamp(32px, 4.8vw, 68px)",
                  textWrap: "balance",
                } as React.CSSProperties
              }
            >
              {heading}
            </h1>

            <p
              className="hidden md:block font-light leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(13px, 1.3vw, 17px)", maxWidth: "52ch" }}
            >
              {description}
            </p>

            <div className="flex items-center gap-4 flex-wrap mt-1">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center gap-2 text-white text-[13px] font-medium px-6 py-3 rounded-sm transition-colors"
                style={{ backgroundColor: "var(--flaz-teal)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal)")}
              >
                {primaryCtaLabel}
                <ArrowRight />
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-1.5 text-[13px] font-light transition-colors"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              >
                {secondaryCtaLabel}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — slide counter + prev/next */}
          <div className="hidden sm:flex flex-col items-end gap-3 shrink-0 pb-1">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <ChevronRight />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="h-[3px] rounded-full transition-all duration-300 focus-visible:outline-none"
                    style={{
                      width: i === current ? "24px" : "8px",
                      backgroundColor: i === current ? "white" : "rgba(255,255,255,0.32)",
                    }}
                  />
                ))}
              </div>
              <span
                className="text-[10px] font-medium tabular-nums"
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
              >
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
