"use client";

import Image from "next/image";
import Link from "next/link";
import siteSettings from "@/content/site-settings.json";

const { phone, phoneHref, email, whatsappHref, address, footerTagline, navLinks, serviceLinks } =
  siteSettings;

export default function ContactFooter() {
  return (
    <section
      id="contact"
      className="mt-14"
      style={{
        backgroundColor: "#1a1a1a",
        marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
        paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
        paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
      }}
    >
      {/* Teal accent top line */}
      <div style={{ height: "2px", background: "linear-gradient(to right, var(--flaz-teal), var(--flaz-teal-dark))", opacity: 0.85 }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* Left — Contact form */}
        <div
          className="py-14 pr-0 lg:pr-16 flex flex-col justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.2em] font-medium mb-5"
              style={{ color: "var(--flaz-teal)" }}
            >
              Get in touch
            </p>
            <h2
              className="font-medium text-white leading-tight tracking-tight mb-3"
              style={{ fontSize: "clamp(24px, 3.2vw, 44px)" }}
            >
              Ready to transform<br />your property?
            </h2>
            <p
              className="text-[15px] font-light mb-8 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Get in touch and we will call you within 24 hours.
            </p>

            <Link
              href="#contact"
              className="inline-flex px-8 py-3.5 rounded-sm text-white text-[14px] font-medium tracking-wide transition-all active:scale-[0.98]"
              style={{ backgroundColor: "var(--flaz-teal)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal)")}
            >
              Request a callback
            </Link>
          </div>

          {/* Contact details */}
          <div
            className="mt-10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.15em] mb-1.5"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Phone
              </p>
              <a
                href={phoneHref}
                className="text-[14px] font-light text-white/60 hover:text-white transition-colors"
              >
                {phone}
              </a>
            </div>
            <div className="min-w-0">
              <p
                className="text-[11px] uppercase tracking-[0.15em] mb-1.5"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="text-[14px] font-light text-white/60 hover:text-white transition-colors break-all"
              >
                {email}
              </a>
            </div>
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.15em] mb-1.5"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                WhatsApp
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-light text-white/60 hover:text-white transition-colors"
              >
                <WhatsAppIcon />
                Message us
              </a>
            </div>
          </div>
        </div>

        {/* Right — Brand + links */}
        <div
          className="py-14 pl-0 lg:pl-16 flex flex-col justify-between"
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            {/* Brand */}
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Flaz Technical Services" width={36} height={36} className="object-contain" />
              <div>
                <p className="text-white text-[15px] font-medium leading-none">Flaz Technical Services</p>
                <p
                  className="text-[12px] font-light mt-0.5"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Dubai, UAE
                </p>
              </div>
            </div>

            <p
              className="text-[14px] font-light leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.38)", maxWidth: "38ch" }}
            >
              {footerTagline}
            </p>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.15em] mb-4"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  Navigation
                </p>
                <ul className="flex flex-col gap-2.5">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[14px] font-light text-white/55 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.15em] mb-4"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  Services
                </p>
                <ul className="flex flex-col gap-2.5">
                  {serviceLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] font-light text-white/55 hover:text-white transition-colors leading-snug block"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Office address */}
          <div
            className="mt-10 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p
              className="text-[12px] font-light"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {address}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p
          className="text-[12px] font-light"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          © {new Date().getFullYear()} Flaz Technical Services. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href="/privacy-policy"
            className="text-[12px] font-light text-white/25 hover:text-white/50 transition-colors"
          >
            Privacy policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-[12px] font-light text-white/25 hover:text-white/50 transition-colors"
          >
            Terms of service
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
