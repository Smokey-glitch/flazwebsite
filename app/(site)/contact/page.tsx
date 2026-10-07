import type { Metadata } from "next";
import ContactFooter from "@/components/ContactFooter";
import EnquiryForm from "@/components/EnquiryForm";
import { PageHero } from "@/components/ServicePageView";
import { CallButton, Eyebrow, PhoneIcon, WhatsAppButton, WhatsAppIcon } from "@/components/blocks";
import { INTENTS, company, waLink } from "@/lib/company";
import { coverageNote } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact Flaz — Quotes, Maintenance, AMC & Technical Support in Dubai",
  description:
    "Request a quote, maintenance support, an AMC proposal or a site visit — or WhatsApp and call Flaz Technical Services in Dubai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <PageHero
        image="/images/dubai-villa-pool.jpg"
        alt="Dubai villa with pool"
        eyebrow="Contact"
        title="Tell us what your property needs"
        lead="Send an enquiry below, or WhatsApp or call us. We will help you determine the right scope, team and next step."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Urgent */}
      <section className="order-3 lg:order-1 py-8 md:py-10 lg:border-b border-black/10 max-lg:border-t">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <Eyebrow>Urgent problem?</Eyebrow>
            <p className="font-medium text-[var(--flaz-dark)] text-[20px] md:text-[24px] leading-snug">
              AC, electrical or plumbing issue — WhatsApp or call us directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppButton message={INTENTS.technical.waMessage} label="WhatsApp Flaz" desktopOnly />
            <CallButton label={company.phone} desktopOnly />
          </div>
        </div>
      </section>

      <section className="order-2 py-8 md:py-20 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
        <div className="order-2 lg:order-1">
          <dl className="flex flex-col gap-5 text-[15px]">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1">Phone</dt>
              <dd>
                <a href={company.phoneHref} className="inline-flex items-center gap-2 min-h-[44px] font-medium text-[var(--flaz-dark)] hover:underline">
                  <PhoneIcon /> {company.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1">WhatsApp</dt>
              <dd>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[44px] font-medium text-[var(--flaz-dark)] hover:underline">
                  <WhatsAppIcon /> Message us
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1">Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="inline-flex items-center min-h-[44px] font-medium text-[var(--flaz-dark)] hover:underline break-all">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1">Office</dt>
              <dd className="font-light text-gray-700 leading-relaxed">{company.address}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1">Coverage</dt>
              <dd className="font-light text-gray-700 leading-relaxed">{coverageNote}</dd>
            </div>
          </dl>
        </div>

        <div id="enquiry" className="scroll-mt-24 order-1 lg:order-2">
          <Eyebrow>Send an enquiry</Eyebrow>
          <EnquiryForm />
        </div>
      </section>

      <div className="order-last">
        <ContactFooter />
      </div>
    </main>
  );
}
