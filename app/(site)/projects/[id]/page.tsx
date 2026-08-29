import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import ContactFooter from "@/components/ContactFooter";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectGallery from "@/components/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};
  return {
    title: `${project.title} — Flaz Technical Services`,
    description: project.shortDesc,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const hasBeforeAfter = !!project.beforeImage;

  return (
    <main>
      {/* Back navigation */}
      <div className="pt-10 pb-5">
        <Link
          href="/projects"
          className="flaz-link-muted inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] font-medium"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All projects
        </Link>
      </div>

      {/* Full-bleed hero — before/after slider if available, else plain image */}
      <div
        className="relative"
        style={{
          marginLeft: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          marginRight: "calc(clamp(16px, calc(-57px + 19.5vw), 318px) * -1)",
          height: "clamp(300px, 52vw, 680px)",
        }}
      >
        {hasBeforeAfter ? (
          <BeforeAfterSlider
            before={project.beforeImage!}
            after={project.image}
            alt={project.title}
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* Gradient overlay — pointer-events: none so slider drag works */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(14,14,14,0.72) 0%, rgba(14,14,14,0.2) 40%, transparent 65%)",
          }}
        />

        {/* Before / After labels — only when slider is active */}
        {hasBeforeAfter && (
          <div className="absolute inset-0 pointer-events-none">
            <span
              className="absolute text-[10px] uppercase tracking-[0.18em] font-medium px-2.5 py-1"
              style={{
                top: "20px",
                left: "20px",
                background: "rgba(30,30,30,0.65)",
                color: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderRadius: "2px",
              }}
            >
              Before
            </span>
            <span
              className="absolute text-[10px] uppercase tracking-[0.18em] font-medium px-2.5 py-1"
              style={{
                top: "20px",
                right: "20px",
                background: "rgba(77,200,200,0.75)",
                color: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderRadius: "2px",
              }}
            >
              After
            </span>
          </div>
        )}

        {/* Floating tags — pointer-events: none */}
        <div
          className="absolute bottom-0 flex flex-wrap gap-2 pb-8 pointer-events-none"
          style={{
            paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)",
            paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-[0.15em] font-medium px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                borderRadius: "2px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Project header */}
      <div className="pt-14 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1
            className="font-medium text-[var(--flaz-dark)] leading-tight tracking-tight"
            style={
              {
                fontSize: "clamp(28px, 4vw, 52px)",
                maxWidth: "18ch",
                textWrap: "balance",
              } as React.CSSProperties
            }
          >
            {project.title}
          </h1>

          {/* Quick meta */}
          <div className="flex items-center gap-6 shrink-0">
            <div>
              <p className="text-[10px] uppercase tracking-[0.13em] text-gray-400 mb-0.5">Year</p>
              <p className="text-[15px] font-medium text-[var(--flaz-dark)]">{project.year}</p>
            </div>
            <div
              className="self-stretch"
              style={{ width: "1px", background: "rgba(44,44,44,0.12)" }}
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.13em] text-gray-400 mb-0.5">Duration</p>
              <p className="text-[15px] font-medium text-[var(--flaz-dark)]">{project.duration}</p>
            </div>
            <div
              className="self-stretch"
              style={{ width: "1px", background: "rgba(44,44,44,0.12)" }}
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.13em] text-gray-400 mb-0.5">Location</p>
              <p className="text-[15px] font-medium text-[var(--flaz-dark)]">{project.area}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body — description + scope */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-16"
        style={{
          borderTop: "1px solid rgba(44,44,44,0.1)",
          paddingTop: "clamp(28px, 3.5vw, 52px)",
        }}
      >
        {/* Description */}
        <div className="md:col-span-7">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-medium mb-5"
            style={{ color: "var(--flaz-teal)" }}
          >
            About this project
          </p>
          <p
            className="font-light text-gray-600 leading-relaxed"
            style={{ fontSize: "clamp(15px, 1.6vw, 18px)", maxWidth: "60ch" }}
          >
            {project.desc}
          </p>
        </div>

        {/* Scope sidebar */}
        <div className="md:col-span-5">
          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-6">
            Scope of work
          </p>
          <div className="flex flex-col gap-3.5">
            {project.scope.split(", ").map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "var(--flaz-teal)" }}
                />
                <span className="text-[13px] font-light text-[var(--flaz-dark)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo gallery carousel */}
      <ProjectGallery images={project.gallery} title={project.title} />

      {/* CTA */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-6 py-12 mb-4"
        style={{ borderTop: "1px solid rgba(44,44,44,0.1)", borderBottom: "1px solid rgba(44,44,44,0.1)" }}
      >
        <div>
          <p className="font-medium text-[var(--flaz-dark)] text-[18px] md:text-[22px] tracking-tight mb-1">
            Start your own project
          </p>
          <p className="text-[13px] font-light text-gray-500">
            Leave your details and we will call you within 24 hours.
          </p>
        </div>
        <a
          href="#contact"
          className="flaz-btn-teal inline-flex items-center gap-2.5 text-[13px] font-medium text-white rounded-sm px-7 py-3 shrink-0"
        >
          Get in touch
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>

      <ContactFooter />
    </main>
  );
}
