import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, serviceSlugsFor, technicalScopeItems } from "@/lib/projects";
import { getService } from "@/lib/services-data";
import { ArrowIcon, JsonLd } from "@/components/blocks";
import { SITE_URL } from "@/lib/company";
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
    title: `${project.title} — Case Study`,
    description: `${project.shortDesc} ${project.area}, ${project.year}. Scope: ${project.scope}.`,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: { title: project.title, description: project.shortDesc, images: [{ url: project.image }] },
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
  const technical = technicalScopeItems(project);
  const relatedServices = serviceSlugsFor(project).map((slug) => getService(slug)).filter(Boolean);

  return (
    <main>
      {/* Back navigation */}
      <div className="pt-6 md:pt-10 pb-4 md:pb-5">
        <Link
          href="/projects"
          className="flaz-link-muted inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] font-medium py-3.5 -my-3.5"
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
            loading="eager"
            fetchPriority="high"
            quality={60}
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
              className="absolute text-[11px] uppercase tracking-[0.18em] font-medium px-2.5 py-1"
              style={{
                top: "20px",
                left: "20px",
                background: "rgba(20,20,20,0.82)",
                color: "#fff",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderRadius: "2px",
              }}
            >
              Before
            </span>
            <span
              className="absolute text-[11px] uppercase tracking-[0.18em] font-medium px-2.5 py-1"
              style={{
                top: "20px",
                right: "20px",
                background: "var(--flaz-teal)",
                color: "var(--flaz-dark)",
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
              className="text-[11px] uppercase tracking-[0.15em] font-medium px-3 py-1"
              style={{
                background: "rgba(10,10,10,0.62)",
                color: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(255,255,255,0.3)",
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
      <div className="pt-8 md:pt-14 pb-6 md:pb-8">
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
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div>
              <p className="text-[11px] uppercase tracking-[0.13em] text-gray-600 mb-0.5">Year</p>
              <p className="text-[15px] font-medium text-[var(--flaz-dark)]">{project.year}</p>
            </div>
            <div
              className="self-stretch"
              style={{ width: "1px", background: "rgba(44,44,44,0.12)" }}
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.13em] text-gray-600 mb-0.5">Duration</p>
              <p className="text-[15px] font-medium text-[var(--flaz-dark)]">{project.duration}</p>
            </div>
            <div
              className="self-stretch"
              style={{ width: "1px", background: "rgba(44,44,44,0.12)" }}
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.13em] text-gray-600 mb-0.5">Location</p>
              <p className="text-[15px] font-medium text-[var(--flaz-dark)]">{project.area}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body — case study */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 pb-10 md:pb-16"
        style={{
          borderTop: "1px solid rgba(44,44,44,0.1)",
          paddingTop: "clamp(28px, 3.5vw, 52px)",
        }}
      >
        <div className="md:col-span-7 flex flex-col gap-6 md:gap-10">
          <CaseBlock label="Project overview">{project.desc}</CaseBlock>
          {project.objective && <CaseBlock label="Client objective">{project.objective}</CaseBlock>}
          {project.challenge && <CaseBlock label="Challenge">{project.challenge}</CaseBlock>}
          {project.execution && <CaseBlock label="Execution">{project.execution}</CaseBlock>}
          {project.result && <CaseBlock label="Result">{project.result}</CaseBlock>}
        </div>

        <aside className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5" style={{ borderBottom: "1px solid rgba(44,44,44,0.1)", paddingBottom: "28px" }}>
            {[
              ["Location", project.area],
              ["Property type", project.propertyType],
              ["Year", project.year],
              ["Duration", project.duration],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-1">{k}</dt>
                  <dd className="text-[15px] font-medium text-[var(--flaz-dark)]">{v}</dd>
                </div>
              ))}
          </dl>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-600 mb-5">Scope of work</p>
            <div className="flex flex-col gap-3.5">
              {project.scope.split(",").map((item) => item.trim()).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--flaz-teal)" }} />
                  <span className="text-[13px] font-light text-[var(--flaz-dark)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {technical.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-600 mb-5">Technical services</p>
              <div className="flex flex-wrap gap-2">
                {technical.map((t) => (
                  <span key={t} className="text-[12px] px-3 py-1.5 rounded-sm text-[var(--flaz-dark)]" style={{ border: "1px solid rgba(44,44,44,0.2)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {relatedServices.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-600 mb-5">Related services</p>
              <ul className="flex flex-col">
                {relatedServices.map((svc) => (
                  <li key={svc!.slug}>
                    <Link href={`/services/${svc!.slug}`} className="flaz-arrow-link inline-flex items-center gap-1.5 text-[14px] font-medium min-h-[44px]">
                      {svc!.navLabel} <ArrowIcon size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Photo gallery */}
      <ProjectGallery images={project.gallery} title={project.title} />
      <ContactFooter flush />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projects/${project.id}` },
          ],
        }}
      />
    </main>
  );
}

function CaseBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4" style={{ color: "var(--flaz-teal-text)" }}>
        {label}
      </p>
      <p className="font-light text-gray-600 leading-relaxed" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", maxWidth: "60ch" }}>
        {children}
      </p>
    </div>
  );
}
