import Link from "next/link";
import { company } from "@/lib/company";

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-10 md:py-14">
      <p
        className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4"
        style={{ color: "var(--flaz-teal-text)" }}
      >
        {eyebrow}
      </p>
      <h1
        className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight mb-3"
        style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
      >
        {title}
      </h1>
      <p className="text-[13px] font-light text-gray-600 mb-8 md:mb-12">Last updated: {lastUpdated}</p>
      <div className="flex flex-col gap-7 md:gap-10" style={{ maxWidth: "68ch" }}>
        {children}
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="font-medium text-[var(--flaz-dark)] mb-3"
        style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}
      >
        {title}
      </h2>
      <div
        className="font-light text-gray-600 leading-relaxed flex flex-col gap-3"
        style={{ fontSize: "15px" }}
      >
        {children}
      </div>
    </section>
  );
}

export function LegalContact() {
  return (
    <LegalSection title="Contact us">
      <p>
        {company.name}
        <br />
        {company.address}
        <br />
        <a href={`mailto:${company.email}`} className="underline">{company.email}</a>
        <br />
        <a href={company.phoneHref} className="underline">{company.phone}</a>
        {company.tradeLicence && (
          <>
            <br />
            Trade licence no. {company.tradeLicence}
          </>
        )}
      </p>
    </LegalSection>
  );
}

export function LegalLinks() {
  const link = "underline";
  return (
    <p>
      <Link href="/privacy-policy" className={link}>Privacy Policy</Link> ·{" "}
      <Link href="/cookie-policy" className={link}>Cookie Policy</Link> ·{" "}
      <Link href="/terms-of-service" className={link}>Terms of Service</Link> ·{" "}
      <Link href="/refund-policy" className={link}>Refund &amp; Cancellation Policy</Link>
    </p>
  );
}
