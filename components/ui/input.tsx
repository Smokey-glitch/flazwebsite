import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "w-full bg-white text-[16px] md:text-[14px] px-4 py-3 text-gray-800 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal)] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    style={{ border: "1px solid #e0ddd9", borderRadius: "6px" }}
    {...props}
  />
));
Input.displayName = "Input";
