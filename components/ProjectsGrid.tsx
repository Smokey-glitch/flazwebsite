"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { imageAlt } from "@/lib/image-alt";
import { type Project } from "@/lib/projects";

/**
 * Subtle staggered reveal for cards that start below the fold. Content is visible by default (server HTML,
 * no-JS, reduced motion); only after hydration are below-the-fold cards marked pending, then revealed as they
 * scroll into view. Cards already on screen are never hidden, so nothing flashes.
 */
function useStaggerReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Number(el.dataset.delay ?? 0)}ms`;
          el.classList.remove("flaz-reveal-pending");
          observer.unobserve(el);
        });
      },
      { threshold: 0.07 }
    );
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight) return;
      item.classList.add("flaz-reveal-pending");
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
      items.forEach((item) => item.classList.remove("flaz-reveal-pending"));
    };
  }, []);
  return ref;
}

function ArrowIcon({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PortraitCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      data-reveal
      data-delay={delay}
      className="group relative overflow-hidden block h-full"
      style={{
        border: "1px solid rgba(44,44,44,0.1)",
        borderRadius: "3px",
        minHeight: "clamp(240px, 32vw, 480px)",
      }}
    >
      <Image
        src={project.image}
        alt={imageAlt(project.image, project.title)}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(18,18,18,0.92) 0%, rgba(18,18,18,0.72) 40%, rgba(18,18,18,0.2) 70%, transparent 88%)" }}
      />

      {/* Glass panel */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-5"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(12,12,12,0.22)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          maskImage: "linear-gradient(to top, black 62%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 62%, transparent 100%)",
        }}
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-[0.13em] font-medium px-2.5 py-0.5"
              style={{
                background: "rgba(10,10,10,0.55)",
                color: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="text-white font-medium leading-snug tracking-tight mb-3"
          style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}
        >
          {project.title}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.85)" }}>
            {project.area} · {project.year}
          </p>
          <span
            className="inline-flex items-center gap-1.5 text-[12px] font-medium transition-all duration-300"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            View project
            <span
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <ArrowIcon />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({ project, delay, flip = false, eager = false }: { project: Project; delay: number; flip?: boolean; eager?: boolean }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      data-reveal
      data-delay={delay}
      className="group overflow-hidden block"
      style={{
        border: "1px solid rgba(44,44,44,0.1)",
        borderRadius: "3px",
        background: "rgba(44,44,44,0.02)",
        minHeight: "clamp(200px, 22vw, 320px)",
      }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 h-full ${flip ? "md:[direction:rtl]" : ""}`}>
        {/* Text side */}
        <div
          className="flex flex-col justify-between p-8 md:p-10 lg:p-12"
          style={{ direction: "ltr" }}
        >
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.15em] font-medium px-3 py-1"
                  style={{
                    border: "1px solid rgba(77,200,200,0.35)",
                    color: "var(--flaz-teal-text)",
                    background: "rgba(77,200,200,0.06)",
                    borderRadius: "2px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3
              className="font-medium text-[var(--flaz-dark)] leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(18px, 2vw, 28px)" }}
            >
              {project.title}
            </h3>
            <p
              className="text-[13px] font-light text-gray-600 leading-relaxed"
              style={{ maxWidth: "40ch" }}
            >
              {project.shortDesc}
            </p>
          </div>

          <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.13em] text-gray-600 mb-0.5">Location · Year</p>
              <p className="text-[13px] font-medium text-[var(--flaz-dark)]">{project.area} · {project.year}</p>
            </div>
            <span
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--flaz-dark)] rounded-sm px-5 py-2.5 transition-colors duration-300"
              style={{ backgroundColor: "var(--flaz-teal)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--flaz-teal-dark)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--flaz-teal)")}
            >
              View project
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                <ArrowIcon />
              </span>
            </span>
          </div>
        </div>

        {/* Image side */}
        <div className="relative" style={{ minHeight: "220px", direction: "ltr" }}>
          <Image
            src={project.image}
            alt={imageAlt(project.image, project.title)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            sizes="(max-width: 768px) 100vw, 45vw"
            loading={eager ? "eager" : undefined}
          />
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
            style={{ background: flip ? "linear-gradient(to left, rgba(236,234,230,0.1), transparent)" : "linear-gradient(to right, rgba(236,234,230,0.1), transparent)" }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useStaggerReveal();

  const [p0, p1, p2, p3, p4, p5] = projects;

  return (
    <section ref={ref} className="pb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* Row 1 — wide featured card */}
        <div className="md:col-span-12 md:row-start-1">
          <FeaturedCard project={p0} delay={80} eager />
        </div>

        {/* Row 2 — large left + small right */}
        <div className="md:col-span-7 md:row-start-2">
          <PortraitCard project={p1} delay={160} />
        </div>
        <div className="md:col-span-5 md:row-start-2">
          <PortraitCard project={p2} delay={240} />
        </div>

        {/* Row 3 — small left + large right (zigzag) */}
        <div className="md:col-span-5 md:row-start-3">
          <PortraitCard project={p3} delay={320} />
        </div>
        <div className="md:col-span-7 md:row-start-3">
          <PortraitCard project={p4} delay={400} />
        </div>

        {/* Row 4 — second wide featured card (flipped) */}
        <div className="md:col-span-12 md:row-start-4">
          <FeaturedCard project={p5} delay={480} flip />
        </div>
      </div>
    </section>
  );
}
