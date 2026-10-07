import Link from "next/link";
import type { ReactNode } from "react";
import { INTENTS, type IntentKey, company, waLink } from "@/lib/company";

export const PAD = "clamp(16px, calc(-57px + 19.5vw), 318px)";

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4"
      style={{ color: light ? "var(--flaz-teal)" : "var(--flaz-teal-text)" }}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  light,
  className = "",
  id,
  maxWidth = "20ch",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  light?: boolean;
  className?: string;
  id?: string;
  maxWidth?: string;
}) {
  return (
    <div className={`mb-6 md:mb-12 ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="font-medium tracking-tight leading-tight"
        style={
          {
            fontSize: "clamp(26px, 3.6vw, 50px)",
            maxWidth,
            textWrap: "balance",
            color: light ? "white" : "var(--flaz-dark)",
          } as React.CSSProperties
        }
      >
        {title}
      </h2>
      {body && (
        <p
          className="font-light leading-relaxed mt-5"
          style={{
            fontSize: "clamp(15px, 1.4vw, 18px)",
            maxWidth: "58ch",
            color: light ? "rgba(255,255,255,0.6)" : "rgba(44,44,44,0.8)",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/** Escapes the padded layout wrapper to span the viewport; re-applies padding inside. */
export function Bleed({
  children,
  bg,
  className = "",
  id,
}: {
  children: ReactNode;
  bg?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        marginLeft: `calc(${PAD} * -1)`,
        marginRight: `calc(${PAD} * -1)`,
        paddingLeft: PAD,
        paddingRight: PAD,
        backgroundColor: bg,
      }}
    >
      {children}
    </section>
  );
}

export function ArrowIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function PhoneIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--flaz-teal)", flexShrink: 0, marginTop: 4 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-sm text-[13px] md:text-[14px] font-medium px-6 min-h-[48px] whitespace-nowrap active:scale-[0.98] transition-transform";

/** Opens the contact modal with a tailored intent (handled by ContactModal's document listener). */
export function QuoteButton({
  intent = "quote",
  label,
  variant = "teal",
  className = "",
  desktopOnly = false,
}: {
  intent?: IntentKey;
  label?: string;
  variant?: "teal" | "ghost-light" | "ghost-dark";
  className?: string;
  /** Hide below lg, where the fixed mobile action bar already offers the same action. */
  desktopOnly?: boolean;
}) {
  const cls =
    variant === "teal"
      ? "flaz-btn-teal text-white"
      : variant === "ghost-light"
      ? "flaz-btn-ghost-light"
      : "flaz-btn-ghost-dark";
  return (
    <a href="#contact" data-intent={intent} className={`${btnBase} ${cls} ${desktopOnly ? "max-lg:hidden" : ""} ${className}`}>
      {label ?? INTENTS[intent].title}
      <ArrowIcon />
    </a>
  );
}

export function WhatsAppButton({
  message,
  label = "WhatsApp us",
  variant = "wa",
  className = "",
  desktopOnly = false,
}: {
  message?: string;
  label?: string;
  variant?: "wa" | "ghost-light" | "ghost-dark";
  className?: string;
  desktopOnly?: boolean;
}) {
  const cls =
    variant === "wa" ? "flaz-btn-wa" : variant === "ghost-light" ? "flaz-btn-ghost-light" : "flaz-btn-ghost-dark";
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnBase} ${cls} ${desktopOnly ? "max-lg:hidden" : ""} ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

export function CallButton({
  label = "Call us",
  variant = "ghost-dark",
  className = "",
  desktopOnly = false,
}: {
  label?: string;
  variant?: "ghost-light" | "ghost-dark";
  className?: string;
  desktopOnly?: boolean;
}) {
  return (
    <a
      href={company.phoneHref}
      className={`${btnBase} ${variant === "ghost-light" ? "flaz-btn-ghost-light" : "flaz-btn-ghost-dark"} ${desktopOnly ? "max-lg:hidden" : ""} ${className}`}
    >
      <PhoneIcon />
      {label}
    </a>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`flaz-arrow-link inline-flex items-center gap-1.5 text-[13px] font-medium py-3 -my-3 ${className}`}
    >
      {children}
      <ArrowIcon size={12} />
    </Link>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
