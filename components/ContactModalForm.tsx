"use client";

import { useEffect, useRef, useState } from "react";
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
import ConsentCheckbox from "@/components/ConsentCheckbox";
import type { IntentKey } from "@/lib/company";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^(0?5[0-9]{8})$/,
      "Enter a valid UAE mobile number (e.g. 0501234567)"
    ),
  message: z.string().max(1500, "Please keep this under 1500 characters"),
  consent: z.boolean().refine((v) => v, "Please tick the box to agree before sending"),
});

type FormValues = z.infer<typeof schema>;

/**
 * The enquiry form. Kept in its own module (loaded with next/dynamic) so zod, react-hook-form and the form
 * UI are only downloaded when a visitor shows intent to open the popup, not on every page view.
 */
export default function ContactModalForm({
  intent,
  active,
  onSent,
}: {
  intent: IntentKey;
  /** True when the dialog is open as this form mounts, so focus can move straight to the first field. */
  active: boolean;
  onSent: () => void;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", message: "", consent: false },
    mode: "onTouched",
  });

  // The dialog may have opened before this chunk finished loading; move focus into the form once it exists.
  useEffect(() => {
    if (active) formRef.current?.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone,
          intent,
          message: values.message.trim() || undefined,
          consent: true,
        }),
      });
      if (!res.ok) throw new Error();
      // Stay on the confirmation until the visitor dismisses it.
      onSent();
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

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
                  className="min-h-[48px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone — custom prefix layout; FormControl is applied to the real input so label and messages stay associated */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <div
                className="flex bg-white overflow-hidden"
                style={{
                  border: fieldState.error ? "1px solid #dc2626" : "1px solid #e0ddd9",
                  borderRadius: "6px",
                }}
              >
                <span className="pl-4 pr-3 text-[14px] text-gray-700 border-r border-gray-200 py-3 shrink-0 flex items-center gap-1.5" aria-hidden="true">
                  🇦🇪 <span className="text-gray-600">+971</span>
                </span>
                <FormControl>
                  <input
                    type="tel"
                    autoComplete="tel-national"
                    inputMode="tel"
                    placeholder="Phone Number…"
                    className="min-w-0 flex-1 min-h-[48px] text-[16px] md:text-[14px] px-3 py-3 text-gray-800 placeholder:text-gray-500 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--flaz-teal-dark)]"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Optional requirement */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Property and requirement <span className="font-light text-gray-600">(optional)</span>
              </FormLabel>
              <FormControl>
                <textarea
                  rows={3}
                  maxLength={1500}
                  placeholder="e.g. Villa in The Lakes, AC not cooling"
                  className="w-full min-h-[96px] resize-y bg-white text-[16px] md:text-[14px] px-4 py-3 text-gray-800 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal-dark)]"
                  style={{ border: "1px solid #e0ddd9", borderRadius: "6px" }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Consent */}
        <FormField
          control={form.control}
          name="consent"
          render={({ field, fieldState }) => (
            <ConsentCheckbox
              id="modal-consent"
              ref={field.ref}
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flaz-btn-teal mt-2 px-8 min-h-[48px] text-[15px] font-medium tracking-wide text-[var(--flaz-dark)] self-start disabled:opacity-60"
          style={{ borderRadius: "6px" }}
        >
          {form.formState.isSubmitting ? "Sending…" : "Send request"}
        </button>

        {submitError && (
          <p role="alert" className="text-[13px] text-red-600">{submitError}</p>
        )}
      </form>
    </Form>
  );
}
