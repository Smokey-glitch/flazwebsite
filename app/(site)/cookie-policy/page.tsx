import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection, LegalContact, LegalLinks } from "@/components/LegalPageLayout";
import ContactFooter from "@/components/ContactFooter";
import { LEGAL_UPDATED } from "@/lib/company";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies and similar technologies flaztechnicalservices.com uses.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main>
      <LegalPageLayout eyebrow="Legal" title="Cookie Policy" lastUpdated={LEGAL_UPDATED}>
        <p className="font-light text-gray-600 leading-relaxed" style={{ fontSize: "15px" }}>
          Cookies are small files a website stores on your device. This page explains how
          flaztechnicalservices.com uses cookies and similar technologies such as local storage.
        </p>

        <LegalSection title="Our website does not set cookies">
          <p>
            The public pages of this website do not set cookies and do not store information in your
            browser&apos;s local or session storage. We do not use analytics, advertising, social
            media tracking pixels, session-recording tools or embedded third-party widgets such as
            maps or videos. Fonts and images are served from our own website.
          </p>
          <p>Because no non-essential cookies are used, we do not show a cookie consent banner.</p>
        </LegalSection>

        <LegalSection title="Server logs">
          <p>
            Like all websites, our hosting provider records technical request data (such as IP address
            and browser type) in server logs. This is not a cookie. See our{" "}
            <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
          </p>
        </LegalSection>

        <LegalSection title="Links to other services">
          <p>
            Links to WhatsApp or social media take you to services run by other companies. They may
            set their own cookies once you open them, under their own policies. We do not control
            these.
          </p>
        </LegalSection>

        <LegalSection title="If this changes">
          <p>
            If we later add analytics or any other non-essential cookie or tracker, we will first ask
            for your consent through a cookie banner, let you refuse as easily as you accept, and
            update this policy.
          </p>
        </LegalSection>

        <LegalContact />
        <LegalLinks />
      </LegalPageLayout>

      <ContactFooter />
    </main>
  );
}
