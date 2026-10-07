import Link from "next/link";
import { Eyebrow, QuoteButton } from "@/components/blocks";

/** Shown when a service, project or article slug does not exist; keeps the site navigation and offers a way forward. */
export default function NotFound() {
  const link = "inline-flex items-center min-h-[44px] text-[15px] font-medium";
  return (
    <main className="py-16 md:py-24" style={{ maxWidth: "640px" }}>
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)", textWrap: "balance" } as React.CSSProperties}>
        We could not find that page
      </h1>
      <p className="mt-4 text-[16px] font-light leading-relaxed" style={{ color: "rgba(44,44,44,0.8)" }}>
        The link may be out of date. Choose where to go next, or tell us what your property needs.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
        <li><Link href="/" className={`${link} flaz-arrow-link`}>Home</Link></li>
        <li><Link href="/services" className={`${link} flaz-arrow-link`}>Services</Link></li>
        <li><Link href="/projects" className={`${link} flaz-arrow-link`}>Projects</Link></li>
        <li><Link href="/contact" className={`${link} flaz-arrow-link`}>Contact</Link></li>
      </ul>
      <div className="mt-6">
        <QuoteButton intent="quote" label="Get a quote" />
      </div>
    </main>
  );
}
