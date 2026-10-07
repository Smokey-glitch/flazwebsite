"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { servicePages } from "@/lib/services-data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: true },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) document.body.dataset.menuOpen = "";
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        backgroundColor: "rgba(236, 234, 230, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(44,44,44,0.08)",
        boxShadow: scrolled ? "0 1px 28px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 300ms ease",
      }}
    >
      {/* Inner row */}
      <div
        className="flaz-nav-pad h-[60px] lg:h-[68px] flex items-center justify-between lg:gap-6"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 min-h-[44px]">
          <Image
            src="/logo.png"
            alt="Flaz"
            width={32}
            height={32}
            className="block lg:hidden w-[28px] h-[28px] object-contain"
            priority
          />
          <Image
            src="/images/flazlogo&name.png"
            alt="Flaz Technical Services"
            width={240}
            height={56}
            className="hidden lg:block h-[40px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            const item = (
              <Link
                href={link.href}
                className="relative text-[14px] tracking-[0.03em] transition-colors duration-200 pb-0.5 flaz-link-muted"
                style={{ color: isActive ? "var(--flaz-dark)" : undefined }}
              >
                <span className={isActive ? "font-medium" : "font-light"}>{link.label}</span>
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full" style={{ backgroundColor: "var(--flaz-teal)" }} />
                )}
              </Link>
            );
            if (!link.children) return <div key={link.href}>{item}</div>;
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setSvcOpen(true)}
                onMouseLeave={() => setSvcOpen(false)}
                onFocus={() => setSvcOpen(true)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setSvcOpen(false); }}
              >
                {item}
                <div
                  className="absolute left-1/2 top-full pt-4 -translate-x-1/2"
                  style={{ visibility: svcOpen ? "visible" : "hidden", opacity: svcOpen ? 1 : 0, transition: "opacity 180ms ease" }}
                >
                  <div className="bg-white rounded-sm shadow-2xl w-[560px] p-3 grid grid-cols-2 gap-1" style={{ border: "1px solid rgba(44,44,44,0.08)" }}>
                    {servicePages.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        onClick={() => setSvcOpen(false)}
                        className="block rounded-sm px-4 py-3 hover:bg-[#ECEAE6] transition-colors"
                      >
                        <span className="block text-[13px] font-medium text-[var(--flaz-dark)]">{svc.navLabel}</span>
                        <span className="block text-[12px] font-light text-gray-600 leading-snug mt-0.5">{svc.navBlurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="https://wa.me/971565095690"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 text-[13px] font-medium transition-colors"
            style={{ color: "var(--flaz-dark)" }}
            aria-label="WhatsApp"
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flaz-teal-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--flaz-dark)")}
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
          <Link
            href="#contact"
            data-intent="quote"
            className="flaz-btn-teal text-[13px] font-medium px-4 py-2.5 rounded-sm whitespace-nowrap uppercase tracking-[0.06em]"
          >
            Get a quote
          </Link>
        </div>

        {/* Mobile right */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            ref={toggleRef}
            type="button"
            className="w-11 h-11 inline-flex items-center justify-center transition-colors"
            style={{ color: "var(--flaz-dark)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — CSS height transition */}
      <div
        id="mobile-menu"
        className="lg:hidden w-full overflow-hidden"
        inert={!menuOpen}
        style={{
          maxHeight: menuOpen ? "calc(100dvh - 60px)" : "0px", overflowY: "auto",
          overscrollBehavior: "contain",
          visibility: menuOpen ? "visible" : "hidden",
          opacity: menuOpen ? 1 : 0,
          borderTop: menuOpen ? "1px solid rgba(44,44,44,0.08)" : "none",
          transition: menuOpen
            ? "max-height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease"
            : "max-height 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease, visibility 0s linear 300ms",
        }}
      >
        <div
          className="pt-2 flex flex-col"
          style={{
            paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
            paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
          }}
        >
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <div key={link.href}>
              <Link
                href={link.href}
                className="flex items-center justify-between min-h-[48px] text-[15px] transition-colors"
                style={{
                  borderBottom: "1px solid rgba(44,44,44,0.07)",
                  color: isActive ? "var(--flaz-teal-text)" : "var(--flaz-dark)",
                  fontWeight: isActive ? 500 : 300,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--flaz-teal)" }} />
                )}
              </Link>
              {link.children && (
                <div className="pl-4 pb-2" style={{ borderBottom: "1px solid rgba(44,44,44,0.07)" }}>
                  {servicePages.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="flex items-center min-h-[44px] text-[14px] font-light text-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {svc.navLabel}
                    </Link>
                  ))}
                </div>
              )}
              </div>
            );
          })}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/#problems"
              className="flex items-center justify-between min-h-[48px] px-4 rounded-sm text-[14px] text-[var(--flaz-dark)]"
              style={{ border: "1px solid rgba(44,44,44,0.22)" }}
              onClick={() => setMenuOpen(false)}
            >
              <span>
                <span className="block font-medium">Not sure which service?</span>
                <span className="block font-light text-[13px] text-gray-700">Start with your problem</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#contact"
              data-intent="quote"
              className="flaz-btn-teal flex items-center justify-center min-h-[48px] text-[14px] font-medium px-5 rounded-sm text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
