import type { Metadata } from "next";
import Image from "next/image";
import ContactFooter from "@/components/ContactFooter";
import { PageHero } from "@/components/ServicePageView";
import { Eyebrow, QuoteButton, SectionHeading, TextLink, WhatsAppButton } from "@/components/blocks";
import { company } from "@/lib/company";
import { coverageNote, separateContractors, whyFlaz } from "@/lib/site-content";
import approach from "@/content/approach.json";

export const metadata: Metadata = {
  title: "About Flaz Technical Services — One Accountable Property Team in Dubai",
  description:
    "Flaz Technical Services is a Dubai-based team delivering MEP, maintenance, renovation and fit-out for villas, apartments and commercial properties through one point of accountability.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        image="/images/dubai-apartment-living.jpg"
        alt="Renovated Dubai apartment interior"
        eyebrow="About FLAZ"
        title="Premium property solutions with real technical depth"
        lead="FLAZ brings technical services, maintenance and renovation together under one accountable team, so property owners and managers deal with one contact instead of many contractors."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        leadDesktopOnly
        actions={
          <>
            <QuoteButton intent="quote" label="Get a quote" />
            <WhatsAppButton message="Hello Flaz, I would like to discuss my property." variant="ghost-light" />
          </>
        }
      />

      <section className="py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-8 lg:gap-20">
          <SectionHeading eyebrow="Who we are" title="One team. One point of accountability." className="!mb-0" />
          <div
            className="flex flex-col gap-5 font-light text-gray-700 leading-[1.75]"
            style={{ fontSize: "clamp(16px, 1.5vw, 19px)", maxWidth: "64ch" }}
          >
            <p>
              Most property work involves several trades — air-conditioning, electrical, plumbing, civil, carpentry and painting. Normally that means several contractors, several quotations and an owner left to coordinate them.
            </p>
            <p>
              FLAZ is built the other way round. We survey the property, define the scope across disciplines and manage the work through a named project manager. The same team can then maintain what it has built or repaired, under an Annual Maintenance Contract or on a call-out basis.
            </p>
            <p>
              We are based in Dubai, with our office at Al Barsha Business Center, and work with villa owners, apartment owners, landlords, property managers and commercial occupiers.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10 md:pb-20">
        <Eyebrow>What you no longer coordinate</Eyebrow>
        <ul className="flex flex-wrap gap-2 mb-4">
          {separateContractors.map((c) => (
            <li key={c} className="text-[13px] px-4 py-2 rounded-sm text-gray-600 line-through decoration-gray-300" style={{ border: "1px solid rgba(44,44,44,0.15)" }}>
              {c}
            </li>
          ))}
        </ul>
        <p className="text-[15px] font-light text-gray-600" style={{ maxWidth: "60ch" }}>
          FLAZ coordinates the property work under one team.
        </p>
      </section>

      <section className="pb-10 md:pb-20">
        <SectionHeading eyebrow="How we work" title="What you can expect from FLAZ" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
          {whyFlaz.map((w, i) => (
            <li key={w.title} className="bg-[#ECEAE6] p-5 md:p-7">
              <span className="text-[11px] tracking-[0.2em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium text-[var(--flaz-dark)] mt-3 mb-2 text-[17px]">{w.title}</h3>
              <p className="text-[14px] font-light text-gray-600 leading-relaxed">{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-10 md:pb-20">
        <SectionHeading eyebrow="Our process" title={`${approach.headingLine1} ${approach.headingLine2}`} body={approach.intro} />
        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8">
          {approach.steps.map((s, i) => (
            <li key={s.title} className="border-t border-black/15 pt-4 pb-5 md:pt-5 md:pb-8">
              <span className="text-[12px] font-medium tracking-[0.1em]" style={{ color: "var(--flaz-teal-text)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium text-[var(--flaz-dark)] text-[18px] mt-2 mb-2">{s.title}</h3>
              <p className="text-[14px] font-light text-gray-600 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-10 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-sm overflow-hidden">
          <Image src="/images/the-lakes-villa-living.jpg" alt="Villa interior in The Lakes" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <Eyebrow>Where we work</Eyebrow>
          <p className="font-light text-gray-700 leading-relaxed mb-4" style={{ fontSize: "clamp(16px, 1.5vw, 19px)", maxWidth: "50ch" }}>
            {coverageNote}
          </p>
          <p className="text-[14px] font-light text-gray-600 mb-6">{company.address}</p>
          <TextLink href="/projects">View projects</TextLink>
        </div>
      </section>
      <ContactFooter flush />
    </main>
  );
}
