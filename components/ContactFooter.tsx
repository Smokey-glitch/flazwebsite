import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/company";
import siteSettings from "@/content/site-settings.json";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/terms-of-service", label: "Terms of service" },
  { href: "/refund-policy", label: "Refund policy" },
];

const { phone, phoneHref, phone2, phone2Href, email, address, footerTagline, navLinks, serviceLinks } = siteSettings;

/** Shared compact footer used on every page. */
export default function ContactFooter({ flush = false }: { flush?: boolean }) {
  const link = "inline-flex items-center min-h-[44px] text-[14px] font-light text-white/75 hover:text-white transition-colors";
  return (
    <section
      id="contact"
      className={flush ? "" : "mt-4"}
      style={{
        backgroundColor: "#1a1a1a",
        marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
        paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
      }}
    >
      <div style={{ height: "2px", background: "linear-gradient(to right, var(--flaz-teal), var(--flaz-teal-dark))", opacity: 0.85 }} />

      {/* Contact + navigation */}
      <div className="py-8 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt="" width={32} height={32} className="object-contain" />
            <p className="text-white text-[15px] font-medium leading-none">Flaz Technical Services</p>
          </div>
          <div className="flex flex-col">
            <a href={phoneHref} className={link}>{phone}</a>
            <a href={phone2Href} className={link}>{phone2}</a>
            <a href={`mailto:${email}`} className={`${link} break-all`}>{email}</a>
          </div>
          <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "40ch" }}>
            {address}
          </p>
          <p className="hidden md:block mt-3 text-[13px] font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "40ch" }}>
            {footerTagline}
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8">
          <ul className="flex flex-col">
            {navLinks.filter((l) => l.href !== "/").map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-3 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-[12px] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>
          © {new Date().getFullYear()} Flaz Technical Services. All rights reserved.{company.tradeLicence ? ` Trade licence no. ${company.tradeLicence}.` : ""}
        </p>
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-2">
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center min-h-[44px] px-2 text-[12px] font-light text-white/70 hover:text-white transition-colors">{l.label}</Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
