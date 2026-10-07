import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";
import { PageHero } from "@/components/ServicePageView";
import { CheckIcon, QuoteButton, SectionHeading, WhatsAppButton } from "@/components/blocks";
import { industries } from "@/lib/site-content";
import { getService } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Industries We Serve — Residential, Commercial, Hospitality & Property Management",
  description:
    "FLAZ supports residential owners, commercial occupiers, hospitality properties, property managers and developers with technical services, maintenance and fit-out in Dubai.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        image="/images/business-bay-office.jpg"
        alt="Commercial office fit-out in Business Bay"
        eyebrow="Industries"
        title="Industries we serve"
        lead="From a single apartment to a managed portfolio, FLAZ provides the same approach: clear scope, professional oversight and one accountable team."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        actions={
          <>
            <QuoteButton intent="quote" label="Get a quote" />
            <WhatsAppButton message="Hello Flaz, I would like to discuss my property." variant="ghost-light" />
          </>
        }
      />

      <section className="py-10 md:py-20">
        <SectionHeading eyebrow="Who we work with" title="Different properties, one accountable team" />
        <div className="flex flex-col gap-4">
          {industries.map((ind, i) => (
            <article
              key={ind.key}
              id={ind.key}
              className={`flex flex-col ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"} bg-white rounded-sm overflow-hidden scroll-mt-24`}
            >
              <div className="relative lg:w-[42%] aspect-[16/7] lg:aspect-auto lg:min-h-[320px]">
                <Image src={ind.image} alt={ind.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              </div>
              <div className="flex-1 p-5 md:p-10 flex flex-col">
                <h2 className="font-medium text-[var(--flaz-dark)] mb-3 md:mb-4" style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}>
                  {ind.title}
                </h2>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {ind.items.map((it) => (
                    <li key={it} className="text-[12px] px-3 py-1.5 rounded-sm text-gray-600" style={{ border: "1px solid rgba(44,44,44,0.18)" }}>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="font-light text-gray-600 leading-relaxed mb-4 md:mb-6" style={{ maxWidth: "54ch" }}>
                  {ind.body}
                </p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-3">Relevant services</p>
                <ul className="flex flex-wrap gap-x-5 md:flex-col md:gap-2 mt-auto">
                  {ind.services.map((slug) => {
                    const svc = getService(slug);
                    return svc ? (
                      <li key={slug} className="flex gap-2.5 items-start">
                        <CheckIcon />
                        <Link href={`/services/${slug}`} className="flaz-arrow-link text-[14px] font-medium inline-flex items-center min-h-[44px] lg:min-h-0">
                          {svc.navLabel}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactFooter flush />
    </main>
  );
}
