import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection, LegalContact, LegalLinks } from "@/components/LegalPageLayout";
import ContactFooter from "@/components/ContactFooter";
import { LEGAL_UPDATED, company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Flaz Technical Services website.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <main>
      <LegalPageLayout eyebrow="Legal" title="Terms of Service" lastUpdated={LEGAL_UPDATED}>
        <p className="font-light text-gray-600 leading-relaxed" style={{ fontSize: "15px" }}>
          These terms govern your use of flaztechnicalservices.com (the &ldquo;Website&rdquo;),
          operated by {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By using
          the Website you agree to these terms. If you do not agree, please do not use it.
        </p>

        <LegalSection title="Use of this website">
          <p>
            The Website provides information about our technical, maintenance and renovation services
            and lets you send us an enquiry. You must not use it unlawfully, submit false or
            misleading information, attempt to gain unauthorised access, send automated or bulk
            submissions, or do anything that could damage, disable or impair it.
          </p>
        </LegalSection>

        <LegalSection title="Enquiries and quotations">
          <p>
            Sending an enquiry does not create a contract. Information on this Website, including
            service descriptions, project examples, typical timelines and any pricing indications, is
            general information only and is not an offer or quotation. Scope, price, timeline and
            payment terms are confirmed in a written quotation after a site survey and become binding
            only when accepted in writing or in a signed agreement. Project examples show past work
            and do not promise the same result or timeline for your property.
          </p>
        </LegalSection>

        <LegalSection title="Services, approvals and third parties">
          <p>
            Many works in Dubai need approvals, NOCs or permits from the developer, community or a
            government authority. Where we help with these they are issued by those bodies, and we
            cannot guarantee that they will be granted or how long they will take.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            The content of this Website, including text, logos, graphics and images, belongs to{" "}
            {company.name} or its licensors and may not be copied, republished or used commercially
            without our written permission, except for your own personal, non-commercial viewing.
          </p>
        </LegalSection>

        <LegalSection title="Third-party links">
          <p>
            The Website links to third-party services such as WhatsApp and social media. We do not
            control them and are not responsible for their content, availability or privacy
            practices.
          </p>
        </LegalSection>

        <LegalSection title="Privacy and cookies">
          <p>
            How we handle personal data is explained in our{" "}
            <Link href="/privacy-policy" className="underline">Privacy Policy</Link>, and our use of
            cookies in our <Link href="/cookie-policy" className="underline">Cookie Policy</Link>.
            Cancellations and refunds are covered in our{" "}
            <Link href="/refund-policy" className="underline">Refund &amp; Cancellation Policy</Link>.
          </p>
        </LegalSection>

        <LegalSection title="Availability and accuracy">
          <p>
            We take reasonable care to keep the Website accurate and available, but it is provided
            &ldquo;as is&rdquo; and we do not promise that it will be uninterrupted, error-free or
            always up to date.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            To the extent permitted by UAE law, we are not liable for loss arising from your use of,
            or reliance on, the Website. Nothing in these terms excludes or limits liability that
            cannot be excluded or limited under UAE law, or your rights under any separate agreement
            with us for services.
          </p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>
            These terms are governed by the laws of the Emirate of Dubai and the federal laws of the
            United Arab Emirates applicable there, and any dispute is subject to the courts of Dubai.
          </p>
        </LegalSection>

        <LegalSection title="Changes to these terms">
          <p>
            We may update these terms. The date at the top shows the latest version, and continuing to
            use the Website after a change means you accept the updated terms.
          </p>
        </LegalSection>

        <LegalContact />
        <LegalLinks />
      </LegalPageLayout>

      <ContactFooter />
    </main>
  );
}
