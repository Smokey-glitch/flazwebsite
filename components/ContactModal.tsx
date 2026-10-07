"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { INTENTS, company, waLink, type IntentKey } from "@/lib/company";

// zod + react-hook-form + the form UI (~100 KB compressed) are fetched on first intent or open, not on every page view.
type FormComponent = typeof import("@/components/ContactModalForm").default;
let formComponent: FormComponent | null = null;
let formPromise: Promise<FormComponent> | null = null;
function fetchForm(): Promise<FormComponent> {
  formPromise ??= import("@/components/ContactModalForm")
    .then((m) => (formComponent = m.default))
    .catch((err) => {
      formPromise = null; // allow a retry after a failed chunk load
      throw err;
    });
  return formPromise;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<IntentKey>("quote");
  const [sent, setSent] = useState(false);
  // The side photo is decorative and the dialog starts hidden, so only fetch it once the popup has been opened.
  const [hasOpened, setHasOpened] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [FormComp, setFormComp] = useState<FormComponent | null>(null);
  const [formError, setFormError] = useState(false);
  // The bundler caches a failed chunk load, so an in-place retry can fail again; the second time we offer a page reload.
  const [retries, setRetries] = useState(0);
  const retryRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const loadForm = useCallback(() => {
    setFormError(false);
    if (formComponent) {
      setFormComp(() => formComponent);
      return;
    }
    fetchForm()
      .then((C) => setFormComp(() => C))
      .catch(() => setFormError(true));
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSent(false);
    // Remount the form so the next opening starts clean (no stale values or validation errors).
    setFormKey((n) => n + 1);
    history.replaceState(null, "", " ");
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest('[href="#contact"]');
      if (target) {
        e.preventDefault();
        const el = target as HTMLElement;
        // The mobile action bar defers to the page: service pages declare their enquiry intent via data-page-intent.
        const requested = (el.dataset.intentSource === "page"
          ? document.querySelector<HTMLElement>("[data-page-intent]")?.dataset.pageIntent
          : el.dataset.intent) as IntentKey | undefined;
        setIntent(requested && requested in INTENTS ? requested : "quote");
        openerRef.current = target as HTMLElement;
        setHasOpened(true);
        setIsOpen(true);
        loadForm();
      }
    }
    // Start fetching the form chunk as soon as a visitor shows intent (hover, keyboard focus, touch) on a quote link.
    function warm(e: Event) {
      if ((e.target as Element).closest?.('[href="#contact"]')) fetchForm().catch(() => {});
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    document.addEventListener("touchstart", warm, { passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
      document.removeEventListener("touchstart", warm);
    };
  }, [loadForm]);

  // Move focus in on open; contain Tab; close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const first = dialog?.querySelector<HTMLElement>("input, textarea");
    // Wait a frame so the dialog is visible before it receives focus.
    const raf = requestAnimationFrame(() => (first ?? dialog)?.focus({ preventScroll: true }));

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === firstEl || active === dialog || !dialog.contains(active))) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && (active === lastEl || !dialog.contains(active))) {
        e.preventDefault();
        firstEl.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  // If the form chunk fails to load, put focus on "Try again" so keyboard users land on the recovery action.
  useEffect(() => {
    if (formError) retryRef.current?.focus({ preventScroll: true });
  }, [formError]);

  // After a successful send, move focus to the confirmation so it is announced and keyboard users are not left on a removed form.
  useEffect(() => {
    if (!sent) return;
    const raf = requestAnimationFrame(() => {
      const target = dialogRef.current?.querySelector<HTMLElement>("[data-success]") ?? dialogRef.current;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [sent]);

  // aria-modal needs the page behind to be unreachable: make every other body child inert while open.
  useEffect(() => {
    if (!isOpen) return;
    const modalRoots = [backdropRef.current, panelRef.current];
    const changed: Element[] = [];
    for (const el of Array.from(document.body.children)) {
      if (modalRoots.includes(el as HTMLDivElement) || el.tagName === "SCRIPT" || el.hasAttribute("inert")) continue;
      el.setAttribute("inert", "");
      changed.push(el);
    }
    return () => changed.forEach((el) => el.removeAttribute("inert"));
  }, [isOpen]);

  // Return focus to the opener once the page behind is interactive again (effect cleanups above run first).
  useEffect(() => {
    if (isOpen) return;
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) document.body.dataset.modalOpen = "";
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.modalOpen;
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop and dialog sit above the navbar and mobile action bar. */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[60]"
        aria-hidden="true"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          transition: "opacity 280ms ease",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={close}
      />

      {/* Modal panel. `inert` + visibility keep the closed dialog out of the tab order and the accessibility tree. */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-[61] flex items-center justify-center p-4"
        inert={!isOpen}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
          transition: isOpen ? "none" : "visibility 0s linear 280ms",
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          tabIndex={-1}
          className="relative w-full max-h-[calc(100dvh-2rem)] bg-white shadow-2xl overflow-x-hidden overflow-y-auto focus:outline-none"
          style={{
            maxWidth: "900px",
            borderRadius: "12px",
            transition: "opacity 280ms ease, transform 280ms ease",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(24px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-2 right-2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal-dark)] focus-visible:outline-none"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Persistent live region so the confirmation is announced when it appears */}
          <div role="status" aria-live="polite" className="sr-only">
            {sent ? "Request received. Thank you. Your request has been sent to the Flaz team." : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left — Form */}
            <div className="px-6 sm:px-8 md:px-12 py-8 md:py-10 flex flex-col justify-between" style={{ backgroundColor: "#ECEAE6" }}>
              <div>
                <h2 id="modal-title" className="text-[26px] md:text-[38px] font-medium text-[var(--flaz-dark)] leading-tight mb-3 tracking-tight pr-10">
                  {sent ? "Request received" : INTENTS[intent].title}
                </h2>
                <p id="modal-desc" className="text-[14px] font-light text-gray-600 mb-6">
                  {sent ? "Thank you. Your request has been sent to the Flaz team." : INTENTS[intent].sub}
                </p>

                {sent ? (
                  <div data-success tabIndex={-1} className="py-2 focus:outline-none">
                    <p className="text-[15px] font-light text-gray-700 mb-6">
                      We will use the number you provided to contact you about your enquiry.
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="flaz-btn-teal px-8 min-h-[48px] text-[15px] font-medium tracking-wide text-[var(--flaz-dark)]"
                      style={{ borderRadius: "6px" }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  hasOpened &&
                  (FormComp ? (
                    <FormComp key={formKey} intent={intent} active={isOpen} onSent={() => setSent(true)} />
                  ) : formError ? (
                    <div role="alert" style={{ minHeight: 340 }}>
                      <p className="text-[15px] font-medium text-[var(--flaz-dark)]">We could not load the enquiry form.</p>
                      <p className="mt-1 text-[14px] font-light text-gray-700">Check your connection and try again, or contact us directly.</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          ref={retryRef}
                          type="button"
                          onClick={() => {
                            if (retries >= 1) {
                              window.location.reload();
                              return;
                            }
                            setRetries(1);
                            // The button is about to unmount, so keep focus inside the dialog while the retry runs.
                            dialogRef.current?.focus({ preventScroll: true });
                            loadForm();
                          }}
                          className="flaz-btn-teal px-6 min-h-[48px] text-[15px] font-medium text-[var(--flaz-dark)]"
                          style={{ borderRadius: "6px" }}
                        >
                          {retries >= 1 ? "Reload page" : "Try again"}
                        </button>
                        <a href={company.phoneHref} className="flaz-btn-ghost-dark inline-flex items-center px-6 min-h-[48px] text-[15px] font-medium" style={{ borderRadius: "6px" }}>
                          Call {company.phone}
                        </a>
                        <a
                          href={waLink(INTENTS[intent].waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flaz-btn-ghost-dark inline-flex items-center px-6 min-h-[48px] text-[15px] font-medium"
                          style={{ borderRadius: "6px" }}
                        >
                          WhatsApp us
                        </a>
                      </div>
                    </div>
                  ) : (
                    // Reserve the form's height so the dialog does not jump; the text appears only if loading takes a moment.
                    <div role="status" className="flaz-delayed-in text-[14px] font-light text-gray-700" style={{ minHeight: 340 }}>
                      Loading enquiry form…
                    </div>
                  ))
                )}
              </div>

              <p className="text-[12px] text-gray-600 leading-relaxed mt-8">
                Prefer WhatsApp?{" "}
                <a href={waLink(INTENTS[intent].waMessage)} target="_blank" rel="noopener noreferrer" className="underline py-1 inline-block text-[#1f6f6f]">
                  Message us directly
                </a>
                . See our{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener" className="underline py-1 inline-block">Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.
              </p>
            </div>

            {/* Right — Image */}
            <div className="hidden md:block relative" style={{ minHeight: "480px" }}>
              {hasOpened && (
                <Image
                  src="/images/dubai-apartment-living.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="450px"
                />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(236,234,230,0.15), transparent)" }} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
