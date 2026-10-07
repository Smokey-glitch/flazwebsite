import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactFooter from "@/components/ContactFooter";
import { PageHero } from "@/components/ServicePageView";
import { CheckIcon, JsonLd, TextLink } from "@/components/blocks";
import { SITE_URL } from "@/lib/company";
import { articles, getArticle } from "@/lib/insights";
import { getService } from "@/lib/services-data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.metaDescription,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.metaDescription, images: [{ url: a.image }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const svc = getService(a.relatedService);

  return (
    <main>
      <PageHero
        image={a.image}
        alt={a.title}
        eyebrow={`${a.category} · ${a.readTime}`}
        title={a.title}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.category }]}
      />

      <article className="py-10 md:py-20 grid grid-cols-1 lg:grid-cols-[3fr_6fr_3fr] gap-10">
        <div className="hidden lg:block" />
        <div>
          <p className="font-medium text-[var(--flaz-dark)] leading-relaxed mb-8 md:mb-10" style={{ fontSize: "clamp(18px, 1.8vw, 22px)" }}>
            {a.summary}
          </p>
          {a.sections.map((s) => (
            <section key={s.heading} className="mb-8 md:mb-10">
              <h2 className="font-medium text-[var(--flaz-dark)] tracking-tight mb-4" style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 20)} className="font-light text-gray-700 leading-[1.8] mb-4" style={{ fontSize: "17px" }}>
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-3 mb-4">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 font-light text-gray-700 leading-snug" style={{ fontSize: "16px" }}>
                      <CheckIcon />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {svc && (
            <div className="bg-white rounded-sm p-6 mt-12">
              <p className="text-[11px] uppercase tracking-[0.15em] text-gray-600 mb-2">Related service</p>
              <p className="font-medium text-[var(--flaz-dark)] mb-3">{svc.title}</p>
              <TextLink href={`/services/${svc.slug}`}>Learn more</TextLink>
            </div>
          )}
        </div>
      </article>
      <ContactFooter flush />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.metaDescription,
          datePublished: a.date,
          image: `${SITE_URL}${a.image}`,
          author: { "@type": "Organization", name: "Flaz Technical Services" },
          publisher: { "@type": "Organization", name: "Flaz Technical Services", url: SITE_URL },
        }}
      />
    </main>
  );
}
