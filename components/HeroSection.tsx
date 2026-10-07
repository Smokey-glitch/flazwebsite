import Image from "next/image";
import Link from "next/link";
import heroData from "@/content/hero.json";
import { WhatsAppIcon } from "@/components/blocks";

const { eyebrow, heading, description, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref, slides } = heroData;

/** Compact static hero: one strong image, short headline, one sentence and both enquiry actions in the first screen. */
export default function HeroSection() {
  const image = slides[0];
  return (
    <section
      className="flaz-home-hero relative overflow-hidden flex items-end"
      style={{
        marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
      }}
    >
      <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" quality={60} sizes="100vw" className="object-cover" />
      <div className="flaz-hero-scrim absolute inset-0 pointer-events-none" />

      <div
        className="relative z-10 w-full flex flex-col gap-3 md:gap-4 py-8 md:py-14"
        style={{
          paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
          paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
        }}
      >
        <div className="flex flex-col gap-3 md:gap-4" style={{ maxWidth: "clamp(280px, 52vw, 680px)" }}>
          <p
            className="flaz-hero-eyebrow text-[11px] uppercase tracking-[0.2em] font-medium self-start px-2.5 py-1 rounded-sm"
            style={{ color: "var(--flaz-teal)", backgroundColor: "rgba(5,5,5,0.62)" }}
          >
            {eyebrow}
          </p>
          <h1
            className="font-medium text-white leading-[1.04] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 4.4vw, 60px)", textWrap: "balance" } as React.CSSProperties}
          >
            {heading}
          </h1>
          <p className="font-light leading-[1.6]" style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(15px, 1.3vw, 18px)", maxWidth: "52ch" }}>
            {description}
          </p>
          <div className="max-lg:hidden flex items-center gap-3 flex-wrap mt-1">
            <Link
              href={primaryCtaHref}
              data-intent="quote"
              className="flaz-btn-teal inline-flex items-center justify-center gap-2 text-[14px] font-medium px-6 min-h-[48px] rounded-sm"
            >
              {primaryCtaLabel}
              <ArrowRight />
            </Link>
            <a
              href={secondaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flaz-btn-ghost-light inline-flex items-center justify-center gap-2 text-[14px] font-medium px-6 min-h-[48px] rounded-sm"
            >
              <WhatsAppIcon size={15} />
              {secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
