import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, Bleed, SectionHeading, WhatsAppIcon } from "@/components/blocks";
import { imageAlt } from "@/lib/image-alt";
import { problems } from "@/lib/site-content";
import { projects } from "@/lib/projects";
import { waLink } from "@/lib/company";
import approach from "@/content/approach.json";

/* ───────────── 2. Services at a glance ───────────── */
const services = [
  {
    title: "MEP & Technical Services",
    desc: "HVAC, electrical and plumbing installed, repaired and coordinated by one team.",
    href: "/services/mep-technical-services",
    image: "/images/business-bay-office.jpg",
    alt: "Office interior with coordinated ceiling, lighting and air-conditioning works",
  },
  {
    title: "Property Maintenance & AMC",
    desc: "Preventive and corrective maintenance, and annual maintenance contracts, for villas, apartments and offices.",
    href: "/services/property-maintenance",
    image: "/images/dubai-villa-pool.jpg",
    alt: "Villa terrace with pool and pergola",
  },
  {
    title: "Renovation & Fit-Out",
    desc: "Villa, apartment and commercial renovation managed from survey to handover.",
    href: "/services/renovation-fit-out",
    image: "/images/palm-jumeirah-villa.jpg",
    alt: "Renovated waterfront villa with pool deck",
  },
];

// AC, plumbing and electrical only — the existing problem data, kept compact.
const quickProblems = problems.slice(0, 3);

export function ServicesGlance() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="services-heading">
      <SectionHeading eyebrow="What we do" title="Technical services, maintenance and renovation" id="services-heading" className="!mb-8" maxWidth="26ch" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative block overflow-hidden rounded-sm min-h-[270px] md:min-h-[360px] flaz-img-zoom"
          >
            <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            {/* Light overall tint keeps the photo visible; the strong gradient sits only behind the text block */}
            <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.12)" }} />
            <div className="relative z-10 flex h-full min-h-[270px] md:min-h-[360px] flex-col justify-end">
              <div
                className="px-5 md:px-6 pb-4 md:pb-5 pt-16"
                style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.9) 62%, rgba(10,10,10,0) 100%)" }}
              >
              <h3 className="font-medium text-white text-[20px] md:text-[22px] leading-snug">{s.title}</h3>
              <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.88)", maxWidth: "36ch" }}>
                {s.desc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium min-h-[44px]" style={{ color: "var(--flaz-teal)" }}>
                Explore <ArrowIcon size={12} />
              </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick problem routes — the #problems destination used by the mobile menu */}
      <div id="problems" className="mt-6 md:mt-8 bg-white rounded-sm p-5 md:p-6">
        <h3 className="font-medium text-[var(--flaz-dark)] text-[17px] md:text-[19px]">Need help with a problem?</h3>
        <ul className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-x-8">
          {quickProblems.map((p) => (
            <li key={p.q} className="flex items-center justify-between gap-3 border-t border-black/10 first:border-t-0 lg:first:border-t">
              <Link href={p.href} className="flaz-arrow-link flex-1 inline-flex items-center min-h-[48px] text-[14px] font-medium whitespace-nowrap">
                {p.q}
              </Link>
              <a
                href={waLink(p.wa)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp us: ${p.q}`}
                className="w-11 h-11 inline-flex items-center justify-center text-gray-700 hover:text-[#17803f] transition-colors"
              >
                <WhatsAppIcon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── 3. Selected projects ───────────── */
const FEATURED = ["villa-lakes", "damac-office", "palm-villa"];

export function SelectedProjects() {
  const featured = FEATURED.map((id) => projects.find((p) => p.id === id)).filter((p): p is (typeof projects)[number] => !!p);
  return (
    <Bleed bg="#E3E0DA" className="py-12 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <SectionHeading eyebrow="Selected projects" title="Recent work in Dubai" className="!mb-0" />
        <Link href="/projects" className="flaz-arrow-link inline-flex items-center gap-2 min-h-[44px] text-[14px] font-medium shrink-0">
          View all projects <ArrowIcon />
        </Link>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
        {featured.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`} className="group flex sm:flex-col bg-white rounded-sm overflow-hidden h-full flaz-card flaz-img-zoom">
              <div className="relative w-[128px] shrink-0 sm:w-full aspect-square sm:aspect-[4/3] overflow-hidden">
                <Image src={p.image} alt={imageAlt(p.image, `${p.title}, ${p.area}`)} fill sizes="(min-width: 640px) 33vw, 128px" className="object-cover" />
              </div>
              <div className="p-4 md:p-5 flex flex-col justify-center sm:justify-start">
                <p className="text-[12px] uppercase tracking-[0.12em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
                  {p.area} · {p.year}
                </p>
                <h3 className="mt-1.5 font-medium text-[var(--flaz-dark)] text-[16px] md:text-[18px] leading-snug">{p.title}</h3>
                <p className="mt-1.5 text-[13px] font-light text-gray-600 leading-relaxed">{p.scope}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Bleed>
  );
}

/* ───────────── 4. Why FLAZ + process ───────────── */
const reasons = [
  { title: "Technical expertise", body: "Multi-disciplinary capabilities across HVAC, electrical, plumbing, maintenance and renovation." },
  { title: "Transparent quotations", body: "A defined project scope, set out in the quotation before work starts." },
  { title: "Dedicated supervision", body: "From the initial survey through to completion and handover." },
];

export function WhyAndProcess() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="why-heading">
      <SectionHeading eyebrow="Why FLAZ" title="Clear scope. Professional oversight." id="why-heading" className="!mb-8" />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
        {reasons.map((r, i) => (
          <li key={r.title} className="py-5 border-t border-black/10">
            <span className="text-[11px] tracking-[0.2em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1.5 font-medium text-[var(--flaz-dark)] text-[17px]">{r.title}</h3>
            <p className="mt-1.5 text-[14px] font-light text-gray-600 leading-relaxed">{r.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.15em] text-gray-600 mb-3">How a project runs</p>
        <ol className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {approach.steps.map((s, i) => (
            <li key={s.title} className="flex items-center gap-3 bg-white rounded-sm px-4 min-h-[56px]">
              <span className="text-[12px] font-medium tabular-nums shrink-0" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] md:text-[14px] font-medium text-[var(--flaz-dark)] leading-snug">{s.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
