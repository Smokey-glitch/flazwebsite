import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";
import { PageHero } from "@/components/ServicePageView";
import { ArrowIcon, QuoteButton, SectionHeading, WhatsAppButton } from "@/components/blocks";
import { servicePages } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Technical Services, Maintenance & Renovation in Dubai",
  description:
    "MEP, HVAC, electrical, plumbing, property maintenance, AMC, renovation and fit-out in Dubai — one accountable team for your property.",
  alternates: { canonical: "/services" },
};

const groups = [
  { key: "mep", title: "MEP & Technical Services", body: "Mechanical, electrical and plumbing works, delivered and maintained by one coordinated team." },
  { key: "maintenance", title: "Property Maintenance", body: "Preventive and corrective maintenance, with Annual Maintenance Contracts for year-round support." },
  { key: "renovation", title: "Renovation & Finishing", body: "Renovation and fit-out managed from survey to handover, with in-house finishing trades." },
] as const;

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        image="/images/dubai-villa-exterior.jpg"
        alt="Villa in Dubai serviced and renovated by Flaz"
        eyebrow="Services"
        title="Technical services, maintenance and renovation"
        lead="One accountable team across HVAC, electrical, plumbing, maintenance, renovation and fit-out — for residential and commercial properties in Dubai."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        actions={
          <>
            <QuoteButton intent="quote" label="Get a quote" />
            <WhatsAppButton message="Hello Flaz, I would like to discuss my property." variant="ghost-light" />
          </>
        }
      />

      {groups.map((g) => (
        <section key={g.key} className="py-10 md:py-16 border-b border-black/10 last:border-0">
          <SectionHeading title={g.title} body={g.body} className="!mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
            {servicePages
              .filter((s) => s.category === g.key)
              .map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="flaz-card group rounded-sm overflow-hidden flex md:flex-col">
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
              ))}
          </div>
        </section>
      ))}
      <ContactFooter flush />
    </main>
  );
}
