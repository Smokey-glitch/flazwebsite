import Link from "next/link";
import approachData from "@/content/approach.json";

const { eyebrow, headingLine1, headingLine2, intro, ctaLabel, ctaHref, steps } = approachData;

export default function ApproachSection() {
  return (
    <section className="py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24">

        {/* Left — sticky header + CTA */}
        <div className="lg:sticky lg:self-start" style={{ top: "88px" }}>
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "var(--flaz-teal)" }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.4vw, 48px)" }}
          >
            {headingLine1}<br />{headingLine2}
          </h2>
          <p
            className="font-light text-gray-500 leading-relaxed mb-10"
            style={{ fontSize: "clamp(15px, 1.5vw, 18px)", maxWidth: "36ch" }}
          >
            {intro}
          </p>
          <Link
            href={ctaHref}
            className="flaz-btn-teal inline-flex items-center gap-2 text-[14px] font-medium px-5 py-3 rounded-sm text-white"
          >
            {ctaLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Right — numbered steps */}
        <div>
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-7 py-8"
              style={{ borderTop: "1px solid rgba(44,44,44,0.1)" }}
            >
              <span
                className="text-[12px] font-medium tabular-nums shrink-0 pt-1"
                style={{ color: "var(--flaz-teal)", letterSpacing: "0.05em", minWidth: "22px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="font-medium text-[var(--flaz-dark)] mb-2 leading-snug"
                  style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-light text-gray-500 leading-relaxed"
                  style={{ fontSize: "clamp(15px, 1.4vw, 17px)", maxWidth: "52ch" }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(44,44,44,0.1)" }} />
        </div>

      </div>
    </section>
  );
}
