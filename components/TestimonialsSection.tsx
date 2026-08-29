"use client";

import { useState, useCallback } from "react";
import testimonialsData from "@/content/testimonials.json";

const { reviews, aggregateRating, aggregateSource } = testimonialsData;

function quoteFontSize(text: string): string {
  const len = text.length;
  if (len > 200) return "clamp(15px, 1.65vw, 20px)";
  if (len > 160) return "clamp(17px, 1.85vw, 23px)";
  return "clamp(19px, 2.2vw, 28px)";
}

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="var(--flaz-teal)" stroke="none" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((i) => (i === 0 ? reviews.length - 1 : i - 1)), []);
  const next = useCallback(() => setActive((i) => (i === reviews.length - 1 ? 0 : i + 1)), []);

  const review = reviews[active];

  return (
    <section className="py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-14">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "var(--flaz-teal)" }}
          >
            Client reviews
          </p>
          <h2
            className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight"
            style={{ fontSize: "clamp(24px, 3.4vw, 48px)" }}
          >
            What our clients say
          </h2>
        </div>

        {/* Google rating */}
        <div className="flex items-center gap-3 shrink-0">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-medium text-[var(--flaz-dark)] tabular-nums"
                style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
              >
                {aggregateRating}
              </span>
              <span className="text-[13px] font-light text-gray-400">/5</span>
            </div>
            <Stars size={13} />
            <p className="text-[11px] font-light text-gray-400 mt-0.5">{aggregateSource}</p>
          </div>
        </div>
      </div>

      {/* Quote block */}
      <div style={{ borderTop: "1px solid rgba(44,44,44,0.1)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 lg:gap-16 pt-12">

          {/* Left — quote text */}
          <div style={{ minHeight: "clamp(160px, 18vw, 260px)" }}>
            <div key={active} className="faq-answer-enter">
              {/* Decorative opening quote */}
              <div
                className="font-medium leading-none mb-6 select-none"
                style={{ fontSize: "clamp(64px, 8vw, 96px)", color: "var(--flaz-teal)", opacity: 0.18, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p
                className="font-light text-[var(--flaz-dark)] leading-[1.65]"
                style={{ fontSize: quoteFontSize(review.text), maxWidth: "58ch" }}
              >
                {review.text}
              </p>
            </div>
          </div>

          {/* Right — person + navigation */}
          <div className="flex flex-col justify-between gap-10 pt-2">
            {/* Person */}
            <div key={`${active}-info`} className="faq-answer-enter">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(77,200,200,0.12)" }}
              >
                <span
                  className="text-[15px] font-medium"
                  style={{ color: "var(--flaz-teal)" }}
                >
                  {review.name[0]}
                </span>
              </div>
              <p
                className="font-medium text-[var(--flaz-dark)] mb-1"
                style={{ fontSize: "clamp(16px, 1.5vw, 19px)" }}
              >
                {review.name}
              </p>
              <p className="text-[13px] font-light text-gray-400 mb-3 leading-snug">
                {review.role} · {review.origin}
              </p>
              <Stars size={13} />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--flaz-teal)]"
                style={{ border: "1px solid rgba(44,44,44,0.15)", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(44,44,44,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <span
                className="text-[12px] font-medium tabular-nums"
                style={{ color: "rgba(44,44,44,0.35)", letterSpacing: "0.1em" }}
              >
                {String(active + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
              </span>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--flaz-teal)]"
                style={{ border: "1px solid rgba(44,44,44,0.15)", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(44,44,44,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
