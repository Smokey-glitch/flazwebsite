import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  Bleed,
  CheckIcon,
  QuoteButton,
  SectionHeading,
  TextLink,
  WhatsAppButton,
} from "@/components/blocks";
import {
  amcCategories,
  amcProperties,
  maintenanceTypes,
  mepCards,
  pillars,
  renovationTypes,
} from "@/lib/site-content";

/* ───────────── 6. What we do ───────────── */
export function WhatWeDo() {
  return (
    <section className="py-14 md:py-20" id="services">
      <SectionHeading
        eyebrow="What we do"
        title="Technical services, maintenance and renovation — under one team"
        body="FLAZ is broader than a renovation contractor. The same accountable team handles your technical systems, keeps them running and rebuilds the property when it needs it."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {pillars.map((p) => (
          <article key={p.key} className="flaz-card group rounded-sm overflow-hidden flex flex-col flaz-reveal">
            <div className="relative aspect-[16/10] overflow-hidden flaz-img-zoom">
              <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,14,0.55), transparent 55%)" }} />
              <span className="absolute left-5 bottom-4 text-[11px] tracking-[0.2em] font-medium text-white/80">{p.index}</span>
            </div>
            <div className="p-6 md:p-7 flex flex-col flex-1">
              <h3 className="font-medium text-[var(--flaz-dark)] leading-snug mb-4" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>
                {p.title}
              </h3>
              <ul className="flex flex-col gap-2 mb-6">
                {p.items.map((item) => (
                  <li key={item} className="text-[14px] font-light text-gray-600 leading-snug border-b border-black/5 pb-2">
                    {item}
                  </li>
                ))}
              </ul>
              <TextLink href={p.href} className="mt-auto">
                {p.cta}
              </TextLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────── 7. MEP ───────────── */
export function MepSection() {
  return (
    <Bleed bg="#1a1a1a" className="py-14 md:py-20">
      <SectionHeading
        light
        eyebrow="MEP & technical services"
        title="Complete MEP & Technical Services"
        body="One coordinated team for mechanical, electrical and plumbing works across residential and commercial properties in Dubai."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
        {mepCards.map((c, i) => (
          <Link
            key={c.title}
            href={c.href}
            className="group flex flex-col p-6 md:p-8 transition-colors"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <span className="text-[11px] tracking-[0.2em] font-medium mb-5" style={{ color: "var(--flaz-teal)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-white font-medium mb-5" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>
              {c.title}
            </h3>
            <ul className="flex flex-col gap-2.5 mb-8">
              {c.items.map((item) => (
                <li key={item} className="text-[14px] font-light leading-snug" style={{ color: "rgba(255,255,255,0.58)" }}>
                  {item}
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium transition-all group-hover:gap-3" style={{ color: "var(--flaz-teal)" }}>
              Learn more <ArrowIcon size={12} />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <QuoteButton intent="quote" label="Get a quote" />
        <Link
          href="/services/mep-technical-services"
          className="inline-flex items-center gap-2 min-h-[48px] px-6 text-[14px] font-medium text-white/70 hover:text-white transition-colors"
        >
          Explore Technical Services <ArrowIcon />
        </Link>
      </div>
    </Bleed>
  );
}

/* ───────────── 8. Property maintenance ───────────── */
export function MaintenanceSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Property maintenance"
            title="Keep Your Property Running"
            body="Preventive and corrective maintenance for villas, apartments, offices and commercial properties across Dubai."
            className="!mb-8"
          />
          <div className="flex flex-wrap gap-3">
            <QuoteButton intent="maintenance" label="Request maintenance support" />
            <WhatsAppButton message="Hello Flaz, I need maintenance support for my property." label="WhatsApp" variant="ghost-dark" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 border border-black/10">
          {maintenanceTypes.map((m, i) => (
            <div key={m.title} className="bg-[#ECEAE6] p-6 md:p-7">
              <span className="text-[11px] tracking-[0.2em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium text-[var(--flaz-dark)] mt-3 mb-2 text-[18px] leading-snug">{m.title}</h3>
              <p className="text-[14px] font-light text-gray-600 leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 9. AMC ───────────── */
export function AmcSection() {
  return (
    <Bleed bg="var(--flaz-teal)" className="py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-12 lg:gap-20 items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4" style={{ color: "rgba(26,26,26,0.88)" }}>
            Annual Maintenance Contracts
          </p>
          <h2
            className="font-medium tracking-tight leading-[1.05] text-[#1a1a1a] mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 56px)", textWrap: "balance" } as React.CSSProperties}
          >
            One Contract. Year-Round Property Support.
          </h2>
          <p className="font-light leading-relaxed mb-6 text-[#1a1a1a]/75" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", maxWidth: "50ch" }}>
            FLAZ provides ongoing preventive and corrective maintenance, scoped around your property — not a one-size package.
          </p>
          <ul className="flex flex-wrap gap-2 mb-9">
            {amcProperties.map((p) => (
              <li key={p} className="text-[12px] px-3 py-1.5 rounded-sm text-[#1a1a1a]" style={{ border: "1px solid rgba(26,26,26,0.3)" }}>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <QuoteButton intent="amc" label="Request an AMC proposal" variant="ghost-dark" className="!bg-[#1a1a1a] !text-white !border-[#1a1a1a] hover:!bg-black" />
            <Link href="/services/annual-maintenance-contracts" className="inline-flex items-center gap-2 min-h-[48px] px-4 text-[14px] font-medium text-[#1a1a1a] hover:opacity-70">
              How AMCs work <ArrowIcon />
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-px" style={{ background: "rgba(26,26,26,0.18)", border: "1px solid rgba(26,26,26,0.18)" }}>
          {amcCategories.map((c) => (
            <li key={c} className="px-5 py-5 text-[15px] font-medium text-[#1a1a1a]" style={{ background: "var(--flaz-teal)" }}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Bleed>
  );
}

/* ───────────── 10. Renovation intro (process follows via ApproachSection) ───────────── */
export function RenovationIntro() {
  return (
    <section className="pt-14 md:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-10 lg:gap-20 items-end">
        <SectionHeading
          eyebrow="Renovation & fit-out"
          title="Renovation & Fit-Out, Managed From Start to Finish"
          body="From initial survey and scope development to execution, coordination and final handover, FLAZ manages the entire project through one accountable team."
          className="!mb-0"
        />
        <ul className="grid grid-cols-2 gap-x-6">
          {renovationTypes.map((r) => (
            <li key={r} className="flex gap-2.5 py-3 text-[14px] font-light text-[var(--flaz-dark)] border-b border-black/10">
              <CheckIcon />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <QuoteButton intent="quote" label="Get a quote" />
        <Link href="/services/renovation-fit-out" className="inline-flex items-center gap-2 min-h-[48px] px-4 text-[14px] font-medium flaz-arrow-link">
          Explore Renovation <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
