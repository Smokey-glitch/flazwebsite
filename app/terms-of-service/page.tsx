import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";
import ContactFooter from "@/components/ContactFooter";

export const metadata: Metadata = {
  title: "Terms of Service — Flaz Technical Services",
  description: "The terms that govern your use of the Flaz Technical Services website.",
};

export default function TermsOfServicePage() {
  return (
    <main>
      <LegalPageLayout
        eyebrow="Legal"
        title="Terms of Service"
        lastUpdated="29 August 2026"
      >
        <p className="font-light text-gray-500 leading-relaxed" style={{ fontSize: "15px" }}>
          These terms govern your use of flaztechnicalservices.com (the &ldquo;Website&rdquo;),
          operated by Flaz Technical Services (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;). By using this Website, you agree to these terms.
        </p>

        <LegalSection title="Use of this website">
          <p>
            This Website is provided for informational purposes to showcase our renovation and
            technical services and to allow prospective clients to request a consultation. You may
            not use this Website for any unlawful purpose or in any way that could damage,
            disable, or impair it.
          </p>
        </LegalSection>

        <LegalSection title="No binding offer">
          <p>
            Information on this Website — including project examples, service descriptions, and
            pricing indications — is for general information only and does not constitute a
            binding offer or quotation. All project scopes, timelines, and pricing are confirmed in
            writing following a site survey and are subject to a separate signed agreement between
            Flaz Technical Services and the client.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            All content on this Website, including text, images, logos, and project photography,
            is the property of Flaz Technical Services unless otherwise credited, and may not be
            reproduced without our written permission.
          </p>
        </LegalSection>

        <LegalSection title="Third-party links">
          <p>
            This Website may link to third-party sites (such as WhatsApp or social media). We are
            not responsible for the content or practices of any linked third-party sites.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            While we make reasonable efforts to keep this Website accurate and up to date, we make
            no warranties about the completeness or accuracy of its content and are not liable for
            any loss arising from its use.
          </p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>
            These terms are governed by the laws of the Emirate of Dubai and the United Arab
            Emirates.
          </p>
        </LegalSection>

        <LegalSection title="Changes to these terms">
          <p>
            We may update these terms from time to time. Continued use of the Website after
            changes are posted constitutes acceptance of the revised terms.
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
