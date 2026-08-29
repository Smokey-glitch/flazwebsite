import servicesData from "@/content/services.json";

const { services } = servicesData;

export default function ServicesGridSection() {
  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "var(--flaz-teal)" }}
          >
            Full scope
          </p>
          <h2
            className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight"
            style={{ fontSize: "clamp(22px, 3.2vw, 46px)" }}
          >
            Everything under one roof
          </h2>
        </div>
        <p
          className="text-[15px] font-light text-gray-500 leading-relaxed"
          style={{ maxWidth: "38ch" }}
        >
          Every trade, fully coordinated. One team, one contract, zero gaps between disciplines.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ borderTop: "1px solid rgba(44,44,44,0.1)" }}
      >
        {services.map((s, i) => (
          <div
            key={s.title}
            className="flex gap-5 py-7"
            style={{
              borderBottom: "1px solid rgba(44,44,44,0.08)",
              borderRight: i % 2 === 0 ? "1px solid rgba(44,44,44,0.08)" : undefined,
              paddingRight: i % 2 === 0 ? "clamp(16px, 3vw, 48px)" : 0,
              paddingLeft: i % 2 !== 0 ? "clamp(16px, 3vw, 48px)" : 0,
            }}
          >
            <span
              className="text-[12px] font-medium tabular-nums shrink-0 pt-0.5"
              style={{ color: "var(--flaz-teal)", minWidth: "22px" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3
                className="font-medium text-[var(--flaz-dark)] leading-snug mb-2"
                style={{ fontSize: "clamp(15px, 1.5vw, 19px)" }}
              >
                {s.title}
              </h3>
              <p className="text-[14px] font-light text-gray-500 leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <div className="flex justify-center mt-10">
        <a
          href="/services"
          className="flaz-btn-teal inline-flex items-center gap-3 text-[14px] font-medium px-7 py-3 rounded-sm text-white"
        >
          View all services
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
