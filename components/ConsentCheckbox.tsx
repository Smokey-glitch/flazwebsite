import { forwardRef } from "react";
import Link from "next/link";

/**
 * Required consent tick-box shown under the enquiry forms. It is a native checkbox, so it works with the keyboard
 * (Tab to reach, Space to toggle) and is announced with its full label and any error.
 */
const ConsentCheckbox = forwardRef<
  HTMLInputElement,
  {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    onBlur?: () => void;
    error?: string;
  }
>(function ConsentCheckbox({ id, checked, onChange, onBlur, error }, ref) {
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--flaz-teal-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--flaz-teal-dark)]"
        />
        <label htmlFor={id} className="text-[13px] font-light leading-relaxed text-gray-700">
          I agree that Flaz Technical Services may use my name, phone number and message to contact me about
          this enquiry, as described in the{" "}
          <Link href="/privacy-policy" target="_blank" className="underline">
            Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
          </Link>
          . I can withdraw my consent at any time.
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
});

export default ConsentCheckbox;
