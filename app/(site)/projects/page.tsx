import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectsGrid from "@/components/ProjectsGrid";
import ContactFooter from "@/components/ContactFooter";

export const metadata: Metadata = {
  title: "Projects & Case Studies in Dubai",
  description:
    "Villa, apartment and commercial renovation, MEP and fit-out case studies across Dubai — The Lakes, Arabian Ranches, Business Bay, Dubai Hills, JVC and Palm Jumeirah.",
};

export default function ProjectsPage() {
  return (
    <main>
      {/* Page header — full-bleed dark */}
      <div
        className="flaz-proj-hero"
        style={{
          marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          backgroundColor: "var(--flaz-teal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark shape — left panel with diagonal right edge */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg className="flaz-proj-shape" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <path d="M 0 0 L 62 0 L 45 100 L 0 100 Z" fill="#111111" />
          </svg>
        </div>
        {/* Grid — clipped to the dark shape only */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            clipPath: "polygon(0 0, 62% 0, 45% 100%, 0 100%)",
          }}
        />
        <div
          style={{
            position: "relative", zIndex: 1,
            paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingTop: "clamp(28px, 6vw, 64px)",
            paddingBottom: "clamp(28px, 5vw, 56px)",
          }}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center mb-5 md:mb-8">
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              Real FLAZ projects
            </span>
          </div>

          {/* Heading + sub */}
          <div className="flex items-end justify-between gap-5 md:gap-8 flex-wrap mb-6 md:mb-16">
            <h1
              className="font-medium text-white leading-none tracking-tight"
              style={
                {
                  fontSize: "clamp(36px, 5vw, 64px)",
                  textWrap: "balance",
                } as React.CSSProperties
              }
            >
              Projects &amp;<br />
              <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
                Case Studies.
              </span>
            </h1>
            <p
              className="text-[14px] font-light leading-relaxed"
              style={{ maxWidth: "44ch", color: "rgba(255,255,255,0.88)", backgroundColor: "#111111", padding: "16px 20px", borderRadius: "2px" }}
            >
              From permit approvals to final handover — each project is managed by a single team so nothing falls through the cracks.
            </p>
          </div>

        </div>
      </div>

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mt-14 mb-10">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3"
            style={{ color: "var(--flaz-teal-text)" }}
          >
            Our work
          </p>
          <h2
            className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight"
            style={{ fontSize: "clamp(22px, 3.2vw, 46px)" }}
          >
            Completed projects
          </h2>
        </div>
        <p
          className="text-[15px] font-light text-gray-600 leading-relaxed"
          style={{ maxWidth: "40ch" }}
        >
          Every project delivered on time, on spec, and from a single point of contact.
        </p>

      </div>

      {/* Grid */}
      <ProjectsGrid projects={projects} />

      {/* CTA bar */}
      <div
        className="max-lg:hidden flex flex-col sm:flex-row items-center justify-between gap-6 py-12 mt-8 mb-4"
        style={{ borderTop: "1px solid rgba(44,44,44,0.1)", borderBottom: "1px solid rgba(44,44,44,0.1)" }}
      >
        <div>
          <p className="font-medium text-[var(--flaz-dark)] text-[18px] md:text-[22px] tracking-tight mb-1">
            Ready to start your own project?
          </p>
          <p className="text-[14px] font-light text-gray-600">
            Leave your details and we will contact you about your project.
          </p>
        </div>
        <a
          href="#contact"
          className="flaz-btn-teal inline-flex items-center gap-2.5 text-[14px] font-medium text-white rounded-sm px-7 py-3 shrink-0"
        >
          Get in touch
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>

      <ContactFooter />
    </main>
  );
}
