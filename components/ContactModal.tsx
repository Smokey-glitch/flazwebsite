"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^(0?5[0-9]{8})$/,
      "Enter a valid UAE mobile number (e.g. 0501234567)"
    ),
});

type FormValues = z.infer<typeof schema>;

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "" },
    mode: "onTouched",
  });

  const close = useCallback(() => {
    setIsOpen(false);
    form.reset();
    history.replaceState(null, "", " ");
  }, [form]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest('[href="#contact"]');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();

      setSent(true);
      setTimeout(() => {
        setSent(false);
        form.reset();
        close();
      }, 2000);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <>
      {/* Backdrop — z-[45] sits above content but below navbar (z-50) */}
      <div
        className="fixed inset-0 z-[45]"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          transition: "opacity 280ms ease",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={close}
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 z-[46] flex items-center justify-center px-4"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative w-full bg-white shadow-2xl overflow-hidden"
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
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal)] focus-visible:outline-none"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Left — Form */}
            <div className="px-8 md:px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "#ECEAE6" }}>
              <div>
                <h2 id="modal-title" className="text-[36px] md:text-[44px] font-medium text-[var(--flaz-dark)] leading-tight mb-3 tracking-tight">
                  Ready to transform<br />your property?
                </h2>
                <p className="text-[14px] font-light text-gray-500 mb-8">
                  Leave your contact details and we will contact you shortly.
                </p>

                {sent ? (
                  <div className="py-10 text-center">
                    <p className="text-[18px] font-medium" style={{ color: "var(--flaz-teal)" }}>Thank you!</p>
                    <p className="text-gray-500 text-[14px] mt-2">We&apos;ll be in touch shortly.</p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

                      {/* Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Your Name…"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone — custom prefix layout, skip FormControl wrapper */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <div
                              className="flex bg-white overflow-hidden"
                              style={{
                                border: fieldState.error ? "1px solid #ef4444" : "1px solid #e0ddd9",
                                borderRadius: "6px",
                              }}
                            >
                              <span className="pl-4 pr-3 text-[14px] text-gray-600 border-r border-gray-200 py-3 shrink-0 flex items-center gap-1.5">
                                🇦🇪 <span className="text-gray-400">+971</span>
                              </span>
                              <input
                                type="tel"
                                autoComplete="tel"
                                placeholder="Phone Number…"
                                aria-invalid={!!fieldState.error}
                                className="flex-1 text-[14px] px-3 py-3 text-gray-800 placeholder:text-gray-400 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal)]"
                                {...field}
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="mt-2 px-8 py-3 text-white text-[15px] font-medium tracking-wide transition-colors self-start disabled:opacity-60"
                        style={{ backgroundColor: "var(--flaz-teal)", borderRadius: "6px" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal)")}
                      >
                        {form.formState.isSubmitting ? "Sending…" : "Send"}
                      </button>

                      {submitError && (
                        <p className="text-[13px] text-red-500">{submitError}</p>
                      )}
                    </form>
                  </Form>
                )}
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed mt-8">
                By subscribing, you agree to our research communication guidelines and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>

            {/* Right — Image */}
            <div className="hidden md:block relative" style={{ minHeight: "480px" }}>
              <Image
                src="/images/dubai-apartment-living.jpg"
                alt="Flaz property transformation"
                fill
                className="object-cover"
                sizes="450px"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(236,234,230,0.15), transparent)" }} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
