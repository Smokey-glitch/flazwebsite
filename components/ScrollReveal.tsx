"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll reveal. Top-level blocks of each page's <main> (and the footer) that start below the fold are
 * hidden after hydration, then fade up as they scroll into view. Content on screen is never hidden, and nothing
 * is touched under reduced motion, so the page stays fully visible without JS.
 */
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main > *, #contact")).filter(
      (el) => !el.hasAttribute("data-reveal") && !el.closest("[data-reveal]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("flaz-reveal-pending");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05 }
    );
    const added: HTMLElement[] = [];
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.setAttribute("data-reveal", "");
      el.classList.add("flaz-reveal-pending");
      observer.observe(el);
      added.push(el);
    });
    return () => {
      observer.disconnect();
      added.forEach((el) => {
        el.classList.remove("flaz-reveal-pending");
        el.removeAttribute("data-reveal");
      });
    };
  }, [pathname]);
  return null;
}
