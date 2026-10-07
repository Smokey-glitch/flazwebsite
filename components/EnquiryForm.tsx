"use client";

import { useEffect, useRef, useState } from "react";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { INTENTS, INTENT_KEYS, type IntentKey } from "@/lib/company";

const UAE_MOBILE = /^(0?5[0-9]{8})$/;

/** Short enquiry form for the contact page: name, phone, enquiry type, optional note. */
export default function EnquiryForm({ initialIntent = "quote" }: { initialIntent?: IntentKey }) {
  const [intent, setIntent] = useState<IntentKey>(initialIntent);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const consentRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name";
    if (!UAE_MOBILE.test(phone.replace(/\s/g, ""))) next.phone = "Enter a valid UAE mobile number (e.g. 0501234567)";
    if (!consent) next.consent = "Please tick the box to agree before sending";
    setErrors(next);
    if (Object.keys(next).length) {
      // Move focus to the first invalid field so keyboard and screen-reader users land on the problem.
      (next.name ? nameRef : next.phone ? phoneRef : consentRef).current?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\s/g, ""),
          intent,
          message: message.trim() || undefined,
          consent: true,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  if (status === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="bg-white rounded-sm p-8 md:p-10 focus:outline-none">
        <p className="text-[20px] font-medium" style={{ color: "var(--flaz-teal-text)" }}>Thank you.</p>
        <p className="text-[15px] font-light text-gray-600 mt-2">We have your request and will be in touch shortly.</p>
      </div>
    );
  }

  const field = "w-full bg-white text-[16px] md:text-[15px] px-4 py-3 min-h-[48px] text-gray-800 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal)]";
  const fieldStyle = { border: "1px solid #e0ddd9", borderRadius: "6px" } as const;

  return (
    <form onSubmit={onSubmit} noValidate className="bg-white rounded-sm p-5 md:p-10 flex flex-col gap-4 md:gap-5">
      <fieldset aria-describedby="enq-intent-help">
        <legend className="text-[12px] uppercase tracking-[0.15em] text-gray-600 mb-3">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {INTENT_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setIntent(k)}
              aria-pressed={intent === k}
              className="px-4 min-h-[44px] rounded-sm text-[13px] transition-colors"
              style={{
                border: `1px solid ${intent === k ? "var(--flaz-teal)" : "rgba(44,44,44,0.18)"}`,
                background: intent === k ? "rgba(77,200,200,0.12)" : "transparent",
                color: "var(--flaz-dark)",
                fontWeight: intent === k ? 500 : 300,
              }}
            >
              {INTENTS[k].label}
            </button>
          ))}
        </div>
        <p id="enq-intent-help" className="mt-3 text-[14px] font-light text-gray-700">
          {INTENTS[intent].sub}
        </p>
      </fieldset>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-[var(--flaz-dark)]">Name</span>
        <input ref={nameRef} id="enq-name" className={field} style={{ ...fieldStyle, ...(errors.name ? { borderColor: "#b91c1c" } : null) }} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "enq-name-error" : undefined} />
        {errors.name && <span id="enq-name-error" role="alert" className="text-[13px] text-red-700">{errors.name}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-[var(--flaz-dark)]">Mobile number</span>
        <input ref={phoneRef} id="enq-phone" className={field} style={{ ...fieldStyle, ...(errors.phone ? { borderColor: "#b91c1c" } : null) }} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" inputMode="tel" placeholder="05X XXX XXXX" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "enq-phone-error" : undefined} />
        {errors.phone && <span id="enq-phone-error" role="alert" className="text-[13px] text-red-700">{errors.phone}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-[var(--flaz-dark)]">
          Property and requirement <span className="font-light text-gray-600">(optional)</span>
        </span>
        <textarea
          id="enq-message"
          autoComplete="off"
          className={`${field} min-h-[110px] resize-y`}
          style={fieldStyle}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1500}
          placeholder="e.g. 4-bed villa in The Lakes, AC not cooling in two rooms"
        />
      </label>

      <ConsentCheckbox
        id="enq-consent"
        ref={consentRef}
        checked={consent}
        onChange={(v) => {
          setConsent(v);
          if (v) setErrors((e) => ({ ...e, consent: undefined }));
        }}
        error={errors.consent}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="flaz-btn-teal text-[var(--flaz-dark)] text-[15px] font-medium min-h-[52px] px-8 rounded-sm self-start disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-[13px] text-red-700">Something went wrong. Please try WhatsApp or call us directly.</p>
      )}
    </form>
  );
}
