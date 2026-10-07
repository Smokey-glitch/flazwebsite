import Image from "next/image";
import Link from "next/link";

export default function ServicesHero() {
  return (
    <section>
      {/* Full-bleed hero image — escapes layout padding */}
      <div
        style={{
          marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ height: "clamp(420px, 55vw, 720px)" }}
        >
          <Image
            src="/images/dubai-villa-exterior.jpg"
            alt="Flaz Technical Services — professional works"
            fill
            loading="eager"
            fetchPriority="high"
            quality={60}
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay — dark at bottom, lighter at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/55 to-[#1a1a1a]/30" />

          {/* Content */}
          <div
            className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-14"
            style={{
              paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
              paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            }}
          >
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 mb-5 md:mb-7"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="text-white/50 text-[13px] font-light hover:text-white transition-colors"
              >
                Home
              </Link>
              <ChevronRight />
              <span className="text-white/80 text-[13px] font-light">Services</span>
            </nav>

            {/* Headline */}
            <h1 className="text-[34px] md:text-[52px] lg:text-[76px] font-medium text-white leading-[1.0] tracking-[-0.02em] max-w-[860px] mb-6 md:mb-8">
              Full-cycle services for every{" "}
              <span style={{ color: "var(--flaz-teal)" }}>property type</span>
            </h1>

            {/* Description + CTA */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-8">
              <p className="text-[14px] md:text-[16px] lg:text-[19px] font-light text-white/60 leading-[1.75] max-w-[480px]">
                From design and engineering to permits and handover — we manage every phase across villas, apartments, offices, and retail spaces.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-white text-[15px] font-light px-7 py-3.5 transition-colors self-start shrink-0 tracking-wide"
              >
                Get a quote
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="text-white/30"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
