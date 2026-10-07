"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PhoneIcon, WhatsAppIcon } from "@/components/blocks";
import { company, waLink } from "@/lib/company";

/**
 * The single mobile contact area (below lg): WhatsApp + Get a quote. On /contact the enquiry form is already on the
 * page, so the quote action is replaced by Call and no second form can be opened from the bar.
 * It steps aside (CSS in globals.css) while a modal, the mobile menu or a text field is active.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  const onContact = pathname === "/contact";

  // Hide the bar while typing so an on-screen keyboard never leaves it covering the field being edited.
  useEffect(() => {
    const isTextField = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      (el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        (el.tagName === "INPUT" && !["checkbox", "radio", "button", "submit", "range", "file"].includes((el as HTMLInputElement).type)));
    const on = (e: FocusEvent) => {
      if (isTextField(e.target)) document.body.dataset.fieldFocus = "";
    };
    const off = (e: FocusEvent) => {
      if (isTextField(e.target)) delete document.body.dataset.fieldFocus;
    };
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => {
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", off);
      delete document.body.dataset.fieldFocus;
    };
  }, []);

  const base = "flex-1 flex items-center justify-center gap-2 min-h-[56px] landscape-short:min-h-[44px] text-[13px] font-medium";
  return (
    <div
      className="flaz-action-bar lg:hidden fixed bottom-0 left-0 right-0 z-40 flex"
      style={{
        boxShadow: "0 -6px 24px rgba(0,0,0,0.12)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        backgroundColor: "#1a1a1a",
      }}
      aria-label="Quick contact"
      role="navigation"
    >
      <a
        href={waLink("Hello Flaz, I would like to discuss my property.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} text-white`}
        style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}
      >
        <WhatsAppIcon size={16} /> WhatsApp us
      </a>
      {onContact ? (
        <a href={company.phoneHref} className={`${base} flaz-btn-teal`}>
          <PhoneIcon size={16} /> Call us
        </a>
      ) : (
        <a href="#contact" data-intent="quote" data-intent-source="page" className={`${base} flaz-btn-teal`}>
          Get a quote
        </a>
      )}
    </div>
  );
}
