import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: "villa",
    title: "Luxury villa transformations",
    desc: "Complete villa renovation — from concept and layout to finishes and furnishing.",
    image: "/images/dubai-villa-pool.jpg",
  },
  {
    id: "commercial",
    title: "Commercial space reinvention",
    desc: "Full renovation and fit-out for offices, showrooms, and retail spaces.",
    image: "/images/dubai-warehouse-shell.jpg",
  },
  {
    id: "apartment",
    title: "Modern apartment fit-out",
    desc: "Smart layouts, premium materials, and turnkey execution.",
    image: "/images/dubai-apartment-living.jpg",
  },
  {
    id: "signature",
    title: "Signature services",
    desc: "Developed and executed with our design partners.",
    image: "/images/palm-jumeirah-villa.jpg",
  },
];

function ExploreLink({ dark, compact }: { dark: boolean; compact?: boolean }) {
  return (
    <Link
      href="#services"
      className={`inline-flex items-center gap-1.5 font-medium transition-opacity hover:opacity-60 mt-auto ${compact ? "pt-3 text-[11px]" : "pt-5 text-[13px] md:text-[15px]"}`}
      style={{ color: dark ? "rgba(255,255,255,0.8)" : "var(--flaz-teal)" }}
    >
      Explore service
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}

function LightCard({ service, compact }: { service: (typeof services)[0]; compact?: boolean }) {
  return (
    <div
      className={`rounded-sm flex flex-col overflow-hidden group bg-white ${compact ? "flex-1" : ""}`}
      style={{ minHeight: compact ? "180px" : "clamp(360px, 44vw, 560px)" }}
    >
      <div className={compact ? "px-5 pt-5 pb-3 flex flex-col" : "px-7 pt-7 pb-5 flex flex-col"}>
        <h3
          className="font-medium text-[var(--flaz-dark)] leading-snug mb-2"
          style={{ fontSize: compact ? "clamp(14px, 1.4vw, 18px)" : "clamp(18px, 2.2vw, 26px)" }}
        >
          {service.title}
        </h3>
        {!compact && (
          <p
            className="font-light text-gray-600 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: "42ch" }}
          >
            {service.desc}
          </p>
        )}
        <ExploreLink dark={false} compact={compact} />
      </div>

      <div className="relative flex-1 overflow-hidden" style={{ minHeight: compact ? "80px" : "200px" }}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

function SignatureCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className="rounded-sm overflow-hidden group" style={{ backgroundColor: "#1c1c1c" }}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text */}
        <div
          className="px-8 py-10 md:py-12 flex flex-col justify-between relative z-10"
          style={{ minHeight: "clamp(240px, 26vw, 340px)" }}
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] font-medium mb-6"
              style={{ color: "var(--flaz-teal-text)" }}
            >
              Premium
            </p>
            <h3
              className="font-medium text-white leading-snug mb-4"
              style={{ fontSize: "clamp(20px, 2.4vw, 32px)" }}
            >
              {service.title}
            </h3>
            <p
              className="font-light leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: "38ch" }}
            >
              {service.desc}
            </p>
          </div>
          <ExploreLink dark={true} />
        </div>

        {/* Image */}
        <div className="relative min-h-[200px] md:min-h-0 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
            style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            sizes="50vw"
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(to right, #1c1c1c 0%, transparent 55%)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-14">
      <p
        className="text-[10px] uppercase tracking-[0.2em] font-medium mb-5"
        style={{ color: "var(--flaz-teal-text)" }}
      >
        What we do
      </p>
      <h2
        className="font-medium text-[var(--flaz-dark)] leading-tight tracking-tight mb-10"
        style={
          { fontSize: "clamp(26px, 3.8vw, 52px)", textWrap: "balance" } as React.CSSProperties
        }
      >
        Full-cycle services for every property type
      </h2>

      <div className="flex flex-col gap-4">
        {/* Row 1: Asymmetric — large featured card + 2 stacked compact cards */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-4">
          <LightCard service={services[0]} />
          <div className="flex flex-col gap-4">
            <LightCard service={services[1]} compact />
            <LightCard service={services[2]} compact />
          </div>
        </div>

        {/* Row 2: Full-width horizontal signature card */}
        <SignatureCard service={services[3]} />
      </div>
    </section>
  );
}
