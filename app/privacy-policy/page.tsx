import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";
import ContactFooter from "@/components/ContactFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — Flaz Technical Services",
  description: "How Flaz Technical Services collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <LegalPageLayout
        eyebrow="Legal"
        title="Privacy Policy"
        lastUpdated="29 August 2026"
      >
        <p className="font-light text-gray-500 leading-relaxed" style={{ fontSize: "15px" }}>
          Flaz Technical Services (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates
          flaztechnicalservices.com. This page explains what information we collect when you use
          this website, how we use it, and your rights regarding that information.
        </p>

        <LegalSection title="Information we collect">
          <p>
            When you request a callback through our contact form, we collect the name and phone
            number you provide. We do not collect any other personal information through this
            website, and we do not use cookies, analytics, or tracking technologies on the public
            site.
          </p>
        </LegalSection>

        <LegalSection title="How we use your information">
          <p>
            Information submitted through the contact form is used solely to respond to your
            enquiry — typically by calling or messaging you back within 24 hours. We do not sell,
            rent, or share your information with third parties for marketing purposes.
          </p>
        </LegalSection>

        <LegalSection title="Data storage">
          <p>
            Contact form submissions are transmitted securely to our team by email. We retain this
            information only for as long as necessary to respond to your enquiry and manage the
            resulting project relationship.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Under the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), you
            have the right to request access to, correction of, or deletion of your personal data.
            To exercise these rights, contact us using the details below.
          </p>
        </LegalSection>

        <LegalSection title="Third-party services">
          <p>
            We use Resend, a transactional email provider, to deliver contact form submissions to
            our team. Resend processes this data solely to deliver the email and does not use it
            for any other purpose.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <p>
            We may update this policy from time to time. Changes will be posted on this page with
            an updated revision date.
          </p>
        </LegalSection>

        <LegalSection title="Contact us">
          <p>
            Flaz Technical Services
            <br />
            Office 510 B, 5th Floor, Al Barsha Business Center, Al Barsha 1, Dubai, United Arab
            Emirates
            <br />
            info@flaztechnicalservices.com
            <br />
            +971 54 258 9881
          </p>
        </LegalSection>
      </LegalPageLayout>

      <ContactFooter />
    </main>
  );
}
