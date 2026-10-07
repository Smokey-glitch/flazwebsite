import Link from "next/link";
import { ArrowIcon, Bleed, Eyebrow, SectionHeading, TextLink, WhatsAppIcon } from "@/components/blocks";
import {
  credentials,
  coverageNote,
  industries,
  problems,
  separateContractors,
  trustIndicators,
  whyFlaz,
} from "@/lib/site-content";
import { projects } from "@/lib/projects";
import { getService } from "@/lib/services-data";
import { waLink } from "@/lib/company";

/* ───────────── Trust strip (below hero) ───────────── */
export function TrustStrip() {
  return (
    <ul
      className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border-b border-black/10"
      style={{ marginTop: 0 }}
    >
      {trustIndicators.map((t) => (
        <li key={t.label} className="bg-[#ECEAE6] py-5 pr-4 first:pl-0 lg:pl-6 lg:first:pl-0">
          <p className="text-[13px] md:text-[14px] font-medium text-[var(--flaz-dark)] leading-snug">{t.label}</p>
          <p className="text-[12px] font-light text-gray-600 mt-0.5">{t.detail}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Why FLAZ — one team message ───────────── */
export function WhyFlaz() {
  return (
    <section className="py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Why FLAZ"
            title="One team. One point of accountability. Multiple technical disciplines."
            className="!mb-8"
          />
          <p className="text-[12px] uppercase tracking-[0.15em] text-gray-600 mb-3">Instead of coordinating</p>
          <ul className="flex flex-wrap gap-2 mb-5">
            {separateContractors.map((c) => (
              <li key={c} className="text-[12px] px-3 py-1.5 rounded-sm text-gray-600 line-through decoration-gray-300" style={{ border: "1px solid rgba(44,44,44,0.15)" }}>
                {c}
              </li>
            ))}
          </ul>
          <p className="text-[15px] font-light text-[var(--flaz-dark)] leading-relaxed" style={{ maxWidth: "40ch" }}>
            FLAZ coordinates the property work under <span className="font-medium">one team</span>.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
          {whyFlaz.map((w, i) => (
            <li key={w.title} className="py-6 border-t border-black/10">
              <span className="text-[11px] tracking-[0.2em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium text-[var(--flaz-dark)] mt-2 mb-1.5 text-[17px] uppercase tracking-[0.04em]">{w.title}</h3>
              <p className="text-[14px] font-light text-gray-600 leading-relaxed">{w.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Numbers / proof — derived from real data only ───────────── */
export function ProofSection() {
  const communities = new Set(projects.map((p) => p.area.split(",")[0].trim())).size;
  const stats = [
    { value: String(projects.length), label: "Featured projects" },
    { value: String(communities), label: "Dubai communities in our portfolio" },
    { value: "3", label: "Core service lines — technical, maintenance, renovation" },
    { value: "1", label: "Point of contact across every discipline" },
  ];
  return (
    <Bleed bg="#1a1a1a" className="py-12 md:py-16">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        {stats.map((s) => (
          <div key={s.label} className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            <dt className="font-medium text-white tracking-tight leading-none" style={{ fontSize: "clamp(40px, 5vw, 72px)" }}>
              {s.value}
            </dt>
            <dd className="text-[13px] font-light mt-3" style={{ color: "rgba(255,255,255,0.5)", maxWidth: "24ch" }}>
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </Bleed>
  );
}

/* ───────────── Industries ───────────── */
export function IndustriesSection({ compact }: { compact?: boolean }) {
  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Industries we serve"
        title="Technical and property support for every kind of property"
        body="From a single apartment to a managed portfolio, the approach is the same: clear scope, one accountable team."
      />
      <div className="border-t border-black/10">
        {industries.map((ind) => (
          <div key={ind.key} className="grid grid-cols-1 md:grid-cols-[3fr_5fr_4fr] gap-4 md:gap-10 py-7 border-b border-black/10">
            <h3 className="font-medium text-[var(--flaz-dark)]" style={{ fontSize: "clamp(20px, 2vw, 28px)" }}>
              {ind.title}
            </h3>
            <p className="text-[14px] font-light text-gray-600 leading-relaxed" style={{ maxWidth: "52ch" }}>
              {compact ? ind.body : ind.items.join(" · ")}
              {!compact && <span className="block mt-1.5 text-gray-600">{ind.body}</span>}
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end content-start">
              {ind.services.map((s) => {
                const svc = getService(s);
                return svc ? (
                  <li key={s}>
                    <Link href={`/services/${s}`} className="flaz-arrow-link text-[13px] font-medium">
                      {svc.navLabel}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Problem-based navigation ───────────── */
export function ProblemNav() {
  return (
    <Bleed bg="#E3E0DA" className="py-14 md:py-20" id="problems">
      <SectionHeading eyebrow="Get the right help" title="What's happening with your property?" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {problems.map((p) => (
          <div key={p.q} className="flaz-card rounded-sm p-5 flex flex-col min-h-[170px]">
            <h3 className="font-medium text-[var(--flaz-dark)] uppercase tracking-[0.03em] text-[15px] leading-snug mb-5">{p.q}</h3>
            <Link href={p.href} className="flaz-arrow-link inline-flex items-center gap-1.5 text-[13px] font-medium mt-auto">
              {p.cta} <ArrowIcon size={12} />
            </Link>
            <a
              href={waLink(p.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-light text-gray-600 hover:text-[#17803f] mt-3 transition-colors"
            >
              <WhatsAppIcon size={13} /> WhatsApp us
            </a>
          </div>
        ))}
      </div>
    </Bleed>
  );
}

/* ───────────── Credentials — only renders verified items ───────────── */
export function CredentialsSection() {
  if (credentials.length === 0) return null;
  return (
    <section className="py-14 md:py-20">
      <SectionHeading eyebrow="Credentials & trust" title="Verified credentials" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {credentials.map((c) => (
          <li key={c.name} className="bg-white rounded-sm p-6">
            <p className="font-medium text-[var(--flaz-dark)]">{c.name}</p>
            <p className="text-[13px] font-light text-gray-600 mt-1">{c.issuer}</p>
            {c.detail && <p className="text-[12px] text-gray-600 mt-2">{c.detail}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────────── Coverage (Dubai areas) ───────────── */
export function CoverageNote() {
  return (
    <section className="py-10 border-t border-black/10">
      <Eyebrow>Where we work</Eyebrow>
      <p className="text-[15px] font-light text-gray-600 leading-relaxed" style={{ maxWidth: "70ch" }}>
        {coverageNote}
      </p>
      <div className="mt-4">
        <TextLink href="/projects">See projects</TextLink>
      </div>
    </section>
  );
}
