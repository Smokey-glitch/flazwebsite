import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";
import { PageHero } from "@/components/ServicePageView";
import { IconTile } from "@/components/ServiceCatalogue";
import { ArrowIcon, QuoteButton, SectionHeading, WhatsAppButton } from "@/components/blocks";
import { catalogue, catalogueHref, catalogueTotal } from "@/lib/service-catalogue";
import { getService } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Technical Services, Maintenance & Renovation in Dubai",
  description:
    "Carpentry, painting, masonry and civil, vinyl and glass film, electrical, plumbing and HVAC — plus MEP, property maintenance, AMC, renovation and fit-out in Dubai. One accountable team.",
  alternates: { canonical: "/services" },
};

// Existing managed offerings; the trade pages (electrical, plumbing, HVAC, finishing, vinyl) are reached from the category cards.
const programmeSlugs = ["mep-technical-services", "property-maintenance", "annual-maintenance-contracts", "renovation-fit-out"];
const programmes = programmeSlugs.map((slug) => getService(slug)).filter((s): s is NonNullable<typeof s> => !!s);

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        image="/images/dubai-villa-exterior.jpg"
        alt="Villa in Dubai serviced and renovated by Flaz"
        eyebrow="Services"
        title="Technical services, maintenance and renovation"
        lead="One accountable team across the trades — HVAC, electrical, plumbing, finishing, maintenance, renovation and fit-out — for residential and commercial properties in Dubai."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        actions={
          <>
            <QuoteButton intent="quote" label="Get a quote" />
            <WhatsAppButton message="Hello Flaz, I would like to discuss my property." variant="ghost-light" />
          </>
        }
      />

      {/* Seven category cards → each links to that category's complete list */}
      <section className="py-10 md:py-16 border-b border-black/10" aria-labelledby="categories-heading">
        <SectionHeading
          eyebrow="Services by trade"
          title={`${catalogueTotal} services across ${catalogue.length} trades`}
          id="categories-heading"
          maxWidth="26ch"
          className="!mb-6 md:!mb-10"
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {catalogue.map((c) => (
            <li key={c.key}>
              <Link
                href={catalogueHref(c)}
                aria-label={`${c.name}: view all ${c.items.length} services`}
                className="flaz-card group flex items-start gap-4 rounded-sm bg-white p-4 md:p-5 h-full"
              >
                <IconTile icon={c.icon} />
                <span className="flex flex-col min-w-0">
                  <span className="font-medium text-[var(--flaz-dark)] text-[17px] leading-snug">{c.name}</span>
                  <span className="mt-1 text-[13px] font-light text-gray-600 leading-snug">{c.blurb}</span>
                  <span className="flaz-arrow-link mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium">
                    View all {c.items.length} <ArrowIcon size={12} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Existing managed offerings */}
      <section className="py-10 md:py-16" aria-labelledby="programmes-heading">
        <SectionHeading
          eyebrow="Managed programmes"
          title="Coordination, maintenance and renovation"
          id="programmes-heading"
          maxWidth="26ch"
          className="!mb-6 md:!mb-10"
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          {programmes.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="flaz-card group rounded-sm overflow-hidden flex md:flex-col h-full">
                <div className="relative w-[112px] shrink-0 md:w-full aspect-square md:aspect-[16/10] overflow-hidden flaz-img-zoom">
                  <Image src={s.heroImage} alt={s.heroAlt} fill className="object-cover" sizes="(max-width: 768px) 112px, 25vw" />
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-1 justify-center">
                  <h3 className="font-medium text-[var(--flaz-dark)] text-[17px] md:text-[18px] leading-snug mb-1 md:mb-2">{s.navLabel}</h3>
                  <p className="text-[13px] font-light text-gray-600 leading-relaxed md:mb-4">{s.navBlurb}</p>
                  <span className="flaz-arrow-link mt-auto hidden md:inline-flex items-center gap-1.5 text-[13px] font-medium">
                    Explore <ArrowIcon size={12} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ContactFooter flush />
    </main>
  );
}
