import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection, LegalContact, LegalLinks } from "@/components/LegalPageLayout";
import ContactFooter from "@/components/ContactFooter";
import { LEGAL_UPDATED, company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Flaz Technical Services collects, uses, shares and protects your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalPageLayout eyebrow="Legal" title="Privacy Policy" lastUpdated={LEGAL_UPDATED}>
        <p className="font-light text-gray-600 leading-relaxed" style={{ fontSize: "15px" }}>
          {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates
          flaztechnicalservices.com. This policy explains what personal data we collect through this
          website and when you contact us, why we use it, who it is shared with, how long we keep it
          and the rights you have. We handle personal data in line with the UAE Personal Data
          Protection Law (Federal Decree-Law No. 45 of 2021).
        </p>

        <LegalSection title="Who is responsible for your data">
          <p>
            {company.name} is the controller of the personal data described in this policy. Our
            contact details are at the end of this page.
          </p>
        </LegalSection>

        <LegalSection title="What we collect">
          <p>
            <strong className="font-medium">Enquiry form.</strong> When you submit an enquiry we
            collect your name, your UAE mobile number, the type of enquiry you select and, if you
            choose to write one, a message describing your property and requirement. Please do not
            include sensitive information (such as identity document numbers, bank or card details or
            health information) in the message.
          </p>
          <p>
            <strong className="font-medium">Phone, email and WhatsApp.</strong> If you call, email or
            message us, we receive the details you choose to share, such as your number, name and
            message content.
          </p>
          <p>
            <strong className="font-medium">Technical data.</strong> Our hosting provider records
            standard server logs when pages are requested, including IP address, browser type,
            pages requested and time. We use this only to deliver and secure the website.
          </p>
          <p>
            We do not run advertising or analytics tracking on this website. See our{" "}
            <Link href="/cookie-policy" className="underline">Cookie Policy</Link>.
          </p>
        </LegalSection>

        <LegalSection title="Why we use it and our basis">
          <p>
            We use your enquiry details to respond to you, arrange a site survey or call-back, and
            prepare a quotation or proposal. We rely on your consent, which you give by ticking the
            consent box on the form, and on the need to take steps you have asked for before entering
            into a contract. You can withdraw consent at any time (see &ldquo;Your rights&rdquo;).
          </p>
          <p>
            We use technical data to operate and protect the website. We do not use your details for
            marketing messages unless you separately agree to that, and we do not sell your personal
            data.
          </p>
        </LegalSection>

        <LegalSection title="Who we share it with">
          <p>
            <strong className="font-medium">Resend</strong> (email delivery). Enquiry form
            submissions are passed to Resend, which sends them to our team by email. Resend acts on
            our instructions and processes the data to deliver that email.
          </p>
          <p>
            <strong className="font-medium">Vercel</strong> (website hosting), which processes the
            technical data described above.
          </p>
          <p>
            <strong className="font-medium">WhatsApp</strong> (Meta). If you choose to message us on
            WhatsApp, your use of WhatsApp is governed by WhatsApp&apos;s own terms and privacy
            policy.
          </p>
          <p>
            We may also disclose personal data where required by law or requested by a competent
            authority in the UAE.
          </p>
        </LegalSection>

        <LegalSection title="Transfers outside the UAE">
          <p>
            Our email and hosting providers operate internationally, so your data may be processed
            outside the UAE, including in the United States. Where this happens we take steps to
            ensure it is handled with appropriate safeguards, as required by UAE law.
          </p>
        </LegalSection>

        <LegalSection title="How long we keep it">
          <p>
            We keep enquiry details for as long as needed to deal with your enquiry and, if you
            become a client, for the duration of the engagement and the period we are required to keep
            business and contract records under UAE law. Enquiries that do not proceed are deleted
            within a reasonable period after we have dealt with them. You may ask us to delete your
            details sooner.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Subject to the conditions and exceptions in the law, you may ask us to: confirm what
            personal data we hold about you and give you a copy; correct inaccurate data; delete your
            data; restrict or object to our processing; and provide your data in a portable format. You
            may withdraw your consent at any time; this does not affect processing carried out before
            you withdrew it.
          </p>
          <p>
            To exercise these rights, email{" "}
            <a href={`mailto:${company.email}`} className="underline">{company.email}</a>. We may
            need to verify your identity first. If you are not satisfied with our response you may
            complain to the UAE Data Office.
          </p>
        </LegalSection>

        <LegalSection title="Security">
          <p>
            Enquiries are sent over an encrypted connection and delivered only to our team. No
            internet transmission is completely secure, so please use judgement about what you send.
          </p>
        </LegalSection>

        <LegalSection title="Children">
          <p>
            This website is intended for property owners, tenants and businesses. It is not directed
            at children and we do not knowingly collect their personal data.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <p>We may update this policy. The date at the top shows when it was last changed.</p>
        </LegalSection>

        <LegalContact />
        <LegalLinks />
      </LegalPageLayout>

      <ContactFooter />
    </main>
  );
}
