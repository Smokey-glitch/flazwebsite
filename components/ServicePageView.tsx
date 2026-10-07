import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  Bleed,
  CheckIcon,
  Eyebrow,
  JsonLd,
  PAD,
  QuoteButton,
  SectionHeading,
  TextLink,
  WhatsAppButton,
} from "@/components/blocks";
import ContactFooter from "@/components/ContactFooter";
import { imageAlt } from "@/lib/image-alt";
import { projects } from "@/lib/projects";
import { SITE_URL, INTENTS } from "@/lib/company";
import { getService, type Faq, type ServicePage } from "@/lib/services-data";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] font-light text-white/85">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2">
          {it.href ? (
            <Link href={it.href} className="inline-block py-3 -my-3 hover:text-white transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className="text-white">{it.label}</span>
          )}
          {i < items.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  );
}

/** Full-bleed photographic hero used on service, industries, about and insight pages. */
export function PageHero({
  image,
  alt,
  eyebrow,
  title,
  lead,
  breadcrumb,
  actions,
  leadDesktopOnly = false,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumb: { label: string; href?: string }[];
  actions?: React.ReactNode;
  /** Hide the lead below lg when the page repeats the same message directly underneath. */
  leadDesktopOnly?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        marginLeft: `calc(${PAD} * -1)`,
        marginRight: `calc(${PAD} * -1)`,
        minHeight: "clamp(300px, 52vw, 640px)",
      }}
    >
      <Image src={image} alt={alt} fill loading="eager" fetchPriority="high" quality={60} className="object-cover" sizes="100vw" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.82) 45%, rgba(10,10,10,0.7) 100%)" }}
      />
      <div
        className="relative z-10 flex flex-col justify-end h-full"
        style={{
          minHeight: "inherit",
          paddingLeft: PAD,
          paddingRight: PAD,
          paddingTop: 32,
          paddingBottom: "clamp(32px, 4.5vw, 64px)",
        }}
      >
        <div className="mb-4 md:mb-6">
          <Breadcrumb items={breadcrumb} />
        </div>
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.22em] font-medium mb-4" style={{ color: "var(--flaz-teal)" }}>
            {eyebrow}
          </p>
        )}
        <h1
          className="font-medium text-white leading-[1.02] tracking-[-0.02em] mb-5"
          style={{ fontSize: "clamp(32px, 5vw, 70px)", maxWidth: "18ch", textWrap: "balance" } as React.CSSProperties}
        >
          {title}
        </h1>
        {lead && (
          <p className={`font-light leading-relaxed mb-4 lg:mb-8 ${leadDesktopOnly ? "max-lg:hidden" : ""}`} style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(15px, 1.4vw, 19px)", maxWidth: "58ch" }}>
            {lead}
          </p>
        )}
        {actions && <div className="flex flex-wrap gap-3 max-lg:hidden">{actions}</div>}
      </div>
    </section>
  );
}

export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section className="py-10 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-8 lg:gap-20">
        <SectionHeading eyebrow="FAQ" title={heading} className="!mb-0" />
        <div className="border-t border-black/10">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-black/10">
              <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden min-h-[56px]">
                <span className="text-[16px] md:text-[17px] font-medium text-[var(--flaz-dark)] leading-snug">{f.q}</span>
                <span className="shrink-0 mt-1 transition-transform duration-300 group-open:rotate-45" style={{ color: "var(--flaz-teal-text)" }} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[15px] font-light text-gray-600 leading-relaxed" style={{ maxWidth: "62ch" }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCards({ ids, label }: { ids: string[]; label: string }) {
  const list = ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as typeof projects;
  if (list.length === 0) return null;
  return (
    <section className="py-10 md:py-20">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-6 md:mb-10">
        <SectionHeading eyebrow="Projects & case studies" title={label} className="!mb-0" />
        <TextLink href="/projects">All projects</TextLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {list.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="flaz-card group rounded-sm overflow-hidden flex md:flex-col">
            <div className="relative w-[112px] shrink-0 md:w-full aspect-square md:aspect-[4/3] overflow-hidden flaz-img-zoom">
              <Image src={p.image} alt={imageAlt(p.image, p.title)} fill className="object-cover" sizes="(max-width: 768px) 112px, 33vw" />
            </div>
            <div className="p-4 md:p-5 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1.5">
                {p.area} · {p.year}
              </p>
              <h3 className="font-medium text-[var(--flaz-dark)] text-[16px] md:text-[17px] leading-snug mb-1 md:mb-2">{p.title}</h3>
              <p className="hidden md:block text-[13px] font-light text-gray-600 leading-relaxed mb-4">{p.shortDesc}</p>
              <span className="flaz-arrow-link inline-flex items-center gap-1.5 text-[13px] font-medium min-h-[44px] md:min-h-0">
                View case study <ArrowIcon size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ServicePageView({ s }: { s: ServicePage }) {
  const relatedServices = s.related.map((slug) => getService(slug)).filter(Boolean) as ServicePage[];
  const url = `${SITE_URL}/services/${s.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      serviceType: s.navLabel,
      description: s.metaDescription,
      url,
      provider: { "@type": "LocalBusiness", name: "Flaz Technical Services", url: SITE_URL },
      areaServed: { "@type": "City", name: "Dubai" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: s.navLabel, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <main data-page-intent={s.cta.intent}>
      {/* 1. Hero */}
      <PageHero
        image={s.heroImage}
        alt={s.heroAlt}
        eyebrow={s.eyebrow}
        title={s.title}
        lead={s.lead}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.navLabel }]}
        actions={
          <>
            <QuoteButton intent={s.cta.intent} label={s.cta.label} />
            <WhatsAppButton message={INTENTS[s.cta.intent].waMessage} variant="ghost-light" />
          </>
        }
      />

      {/* 2. Overview */}
      <section className="py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-8 lg:gap-20">
          <SectionHeading eyebrow="Overview" title="One team across every discipline" className="!mb-0" />
          <div className="flex flex-col gap-5">
            {s.overview.map((p) => (
              <p key={p.slice(0, 24)} className="font-light text-gray-700 leading-[1.75]" style={{ fontSize: "clamp(16px, 1.5vw, 19px)", maxWidth: "64ch" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Capabilities */}
      <section className="pb-10 md:pb-20">
        <SectionHeading eyebrow="Capabilities" title={s.capabilityHeading} />
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {s.capabilities.map((c, i) => (
            <li key={c.title} className="bg-[#ECEAE6] p-4 md:p-7">
              <span className="hidden md:block text-[11px] tracking-[0.2em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium text-[var(--flaz-dark)] md:mt-3 mb-1.5 md:mb-2 text-[16px] md:text-[17px] leading-snug">{c.title}</h3>
              <p className="text-[14px] font-light text-gray-600 leading-relaxed">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Technical notes */}
      <Bleed bg="#1a1a1a" className="py-10 md:py-20">
        <SectionHeading light eyebrow="Technical notes" title="What matters in practice" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.1)" }}>
          {s.notes.map((n) => (
            <div key={n.title} className="p-5 md:p-8" style={{ background: "#1a1a1a" }}>
              <h3 className="text-white font-medium text-[18px] leading-snug mb-3">{n.title}</h3>
              <p className="font-light text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                {n.body}
              </p>
            </div>
          ))}
        </div>
      </Bleed>

      {/* 5. Applications */}
      <section className="py-10 md:py-20">
        <SectionHeading eyebrow="Applications" title="Residential and commercial properties" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Residential", items: s.residential },
            { title: "Commercial", items: s.commercial },
          ].map((col) => (
            <div key={col.title} className="bg-white rounded-sm p-5 md:p-8">
              <h3 className="font-medium text-[var(--flaz-dark)] text-[18px] md:text-[20px] mb-3 md:mb-5">{col.title}</h3>
              <ul className="flex flex-col gap-2 md:gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] md:text-[15px] font-light text-gray-700 leading-snug">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Maintenance / support */}
      <section className="pb-10 md:pb-20">
        <div className="rounded-sm p-5 md:p-12 grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-8 lg:gap-16" style={{ backgroundColor: "var(--flaz-teal)" }}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4 text-[#1a1a1a]/85">Support</p>
            <h2 className="font-medium text-[#1a1a1a] leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", textWrap: "balance" } as React.CSSProperties}>
              {s.support.heading}
            </h2>
            <p className="font-light text-[#1a1a1a]/80 leading-relaxed" style={{ maxWidth: "48ch" }}>
              {s.support.body}
            </p>
          </div>
          <ul className="flex flex-col gap-4 justify-center">
            {s.support.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] font-medium text-[#1a1a1a] leading-snug pb-4 border-b border-[#1a1a1a]/20 last:border-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" className="shrink-0 mt-1" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Process */}
      <section className="pb-10 md:pb-20">
        <SectionHeading eyebrow="Process" title={s.processHeading} />
        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8">
          {s.process.map((step, i) => (
            <li key={step.title} className="border-t border-black/15 pt-4 pb-5 md:pt-5 md:pb-8">
              <span className="text-[12px] font-medium tracking-[0.1em]" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium text-[var(--flaz-dark)] text-[18px] mt-2 mb-2 leading-snug">{step.title}</h3>
              <p className="text-[14px] font-light text-gray-600 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. Related projects */}
      <ProjectCards ids={s.relatedProjects} label={s.relatedProjectsLabel} />

      {/* 9. FAQ */}
      <FaqList faqs={s.faqs} />

      {/* Related services */}
      <section className="pb-10 md:pb-20">
        <Eyebrow>Related services</Eyebrow>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3">
          {relatedServices.map((r) => (
            <li key={r.slug}>
              <Link href={`/services/${r.slug}`} className="flaz-card block rounded-sm p-4 md:p-5 h-full">
                <span className="block font-medium text-[var(--flaz-dark)] mb-1">{r.navLabel}</span>
                <span className="block text-[13px] font-light text-gray-600 leading-snug md:mb-3">{r.navBlurb}</span>
                <span className="hidden md:inline-flex flaz-arrow-link items-center gap-1.5 text-[12px] font-medium">
                  Learn more <ArrowIcon size={11} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactFooter flush />
      {jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
    </main>
  );
}
