import type { Metadata } from "next";
import ServicesPageGrid from "@/components/ServicesPageGrid";
import FAQSection from "@/components/FAQSection";
import ContactFooter from "@/components/ContactFooter";

export const metadata: Metadata = {
  title: "Services — Flaz Technical Services",
  description:
    "Full-cycle technical services for villas, apartments, offices, and retail spaces in Dubai. Design, engineering, approvals, and construction.",
};

export default function ServicesPage() {
  return (
    <main>
      {/* Page header — full-bleed teal */}
      <div
        style={{
          marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          backgroundColor: "#111111",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal shape — left panel with concave right edge */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
            <path d="M 0 0 L 62 0 L 45 100 L 0 100 Z" fill="var(--flaz-teal)" />
          </svg>
        </div>
        <div
          style={{
            position: "relative", zIndex: 1,
            paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingTop: "64px",
            paddingBottom: "56px",
          }}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center mb-8">
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full"
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                color: "white",
                background: "rgba(255,255,255,0.15)",
              }}
            >
              Services
            </span>
          </div>

          {/* Heading + sub */}
          <div className="flex items-end justify-between gap-8 flex-wrap mb-16">
            <h1
              className="font-medium text-white leading-none tracking-tight"
              style={
                {
                  fontSize: "clamp(36px, 5vw, 64px)",
                  textWrap: "balance",
                } as React.CSSProperties
              }
            >
              Full-cycle services,<br />
              <span style={{ fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>
                every property type.
              </span>
            </h1>
            <p
              className="text-[15px] font-light leading-relaxed"
              style={{ maxWidth: "40ch", color: "rgba(255,255,255,0.7)" }}
            >
              From design and engineering to permits and handover — one team managing every trade across villas, apartments, offices, and retail spaces.
            </p>
          </div>

        </div>
      </div>

      <ServicesPageGrid />
      <FAQSection />
      <ContactFooter />
    </main>
  );
}
