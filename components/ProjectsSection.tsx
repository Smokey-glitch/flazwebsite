"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects";

function useStaggerReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ArrowIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PortraitCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  return (
    <div
      data-reveal
      data-delay={delay}
      className="group relative overflow-hidden h-full"
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition:
          "opacity 700ms cubic-bezier(0.32, 0.72, 0, 1), transform 700ms cubic-bezier(0.32, 0.72, 0, 1)",
        border: "1px solid rgba(44,44,44,0.1)",
        borderRadius: "3px",
      }}
    >
      {/* Full-bleed image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,18,18,0.88) 0%, rgba(18,18,18,0.32) 45%, transparent 68%)",
        }}
      />

      {/* Glassmorphism bottom panel */}
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
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-[0.13em] font-medium px-2.5 py-0.5"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.62)",
                border: "1px solid rgba(255,255,255,0.1)",
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
          style={{ fontSize: "clamp(16px, 1.7vw, 23px)" }}
        >
          {project.title}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-light" style={{ color: "rgba(255,255,255,0.75)" }}>
            {project.area} · {project.year}
          </p>
          <Link
            href={`/projects/${project.id}`}
            className="group/btn inline-flex items-center gap-1.5 text-[13px] font-medium"
            style={{
              color: "rgba(255,255,255,0.62)",
              transition: "color 250ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--flaz-teal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.62)")}
          >
            View project
            <span
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function WideCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  return (
    <div
      data-reveal
      data-delay={delay}
      className="group overflow-hidden"
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition:
          "opacity 700ms cubic-bezier(0.32, 0.72, 0, 1), transform 700ms cubic-bezier(0.32, 0.72, 0, 1)",
        border: "1px solid rgba(44,44,44,0.1)",
        borderRadius: "3px",
        background: "rgba(44,44,44,0.02)",
        minHeight: "clamp(200px, 22vw, 340px)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left — text */}
        <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
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
              style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}
            >
              {project.title}
            </h3>
            <p
              className="text-[14px] md:text-[15px] font-light text-gray-600 leading-relaxed"
              style={{ maxWidth: "40ch" }}
            >
              {project.desc}
            </p>
          </div>

          <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.13em] text-gray-600 mb-0.5">
                Location · Year
              </p>
              <p className="text-[14px] font-medium text-[var(--flaz-dark)]">
                {project.area} · {project.year}
              </p>
            </div>
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--flaz-dark)] rounded-sm px-5 py-2.5"
              style={{
                backgroundColor: "var(--flaz-teal)",
                transition: "background-color 280ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--flaz-teal)")
              }
            >
              View project
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative" style={{ minHeight: "240px" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Subtle edge blend into the left panel */}
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
            style={{
              background: "linear-gradient(to right, rgba(236,234,230,0.1), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useStaggerReveal();

  return (
    <section ref={sectionRef} className="py-16 md:py-24">

      {/* Section header */}
      <div
        data-reveal
        data-delay="0"
        className="mb-12"
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition:
            "opacity 600ms cubic-bezier(0.32, 0.72, 0, 1), transform 600ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Eyebrow pill */}
        <div className="inline-flex items-center mb-5">
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full"
            style={{
              border: "1px solid rgba(77,200,200,0.35)",
              color: "var(--flaz-teal-text)",
              background: "rgba(77,200,200,0.07)",
            }}
          >
            Projects &amp; case studies
          </span>
        </div>

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2
            className="font-medium text-[var(--flaz-dark)] leading-none tracking-tight"
            style={
              {
                fontSize: "clamp(32px, 4.5vw, 56px)",
                textWrap: "balance",
              } as React.CSSProperties
            }
          >
            Projects &amp; Case Studies<br />
            <span style={{ fontWeight: 300, color: "rgba(44,44,44,0.7)" }}>
              across Dubai
            </span>
          </h2>
          <p
            className="text-[15px] font-light text-gray-600 leading-relaxed"
            style={{ maxWidth: "38ch" }}
          >
            Real FLAZ projects — each delivered from a single point of contact, from survey and approvals to build and handover.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-3"
        style={{
          gridTemplateRows:
            "clamp(255px, 27vw, 355px) clamp(255px, 27vw, 355px) auto",
        }}
      >
        {/* Large feature card — left, spans 2 rows */}
        <div className="md:col-span-7 md:row-span-2">
          <PortraitCard project={projects[0]} delay={120} />
        </div>

        {/* Top-right card */}
        <div className="md:col-span-5 md:row-start-1 md:col-start-8">
          <PortraitCard project={projects[1]} delay={220} />
        </div>

        {/* Bottom-right card */}
        <div className="md:col-span-5 md:row-start-2 md:col-start-8">
          <PortraitCard project={projects[2]} delay={320} />
        </div>

        {/* Wide landscape card */}
        <div className="md:col-span-12 md:row-start-3">
          <WideCard project={projects[3]} delay={420} />
        </div>
      </div>

      {/* View all CTA */}
      <div
        data-reveal
        data-delay="520"
        className="flex justify-center mt-12"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition:
            "opacity 600ms cubic-bezier(0.32, 0.72, 0, 1), transform 600ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 text-[14px] font-medium px-7 py-3 rounded-sm"
          style={{
            border: "1px solid var(--flaz-teal)",
            color: "var(--flaz-teal-text)",
            background: "transparent",
            transition:
              "background-color 280ms cubic-bezier(0.32, 0.72, 0, 1), color 280ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--flaz-teal)";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--flaz-teal)";
          }}
        >
          View all projects
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "rgba(77,200,200,0.12)" }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
