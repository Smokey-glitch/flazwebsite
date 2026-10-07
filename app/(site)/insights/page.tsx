import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactFooter from "@/components/ContactFooter";
import { PageHero } from "@/components/ServicePageView";
import { ArrowIcon } from "@/components/blocks";
import { articles } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights — Practical Guides on MEP, Maintenance & Renovation in Dubai",
  description:
    "Practical guides from Flaz on AC servicing, Annual Maintenance Contracts and villa renovation in Dubai.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <main>
      <PageHero
        image="/images/dubai-villa-exterior.jpg"
        alt="Dubai villa exterior"
        eyebrow="Insights"
        title="Practical guides for Dubai property owners"
        lead="Straightforward advice on maintenance, technical systems and renovation — written to help you ask better questions and make better decisions."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <section className="py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {articles.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className="flaz-card group rounded-sm overflow-hidden flex md:flex-col">
              <div className="relative w-[112px] shrink-0 md:w-full md:aspect-[16/10] overflow-hidden flaz-img-zoom">
                <Image src={a.image} alt={a.title} fill className="object-cover" sizes="(max-width: 768px) 112px, 33vw" />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <p className="text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: "var(--flaz-teal-text)" }}>
                  {a.category} · {a.readTime}
                </p>
                <h2 className="font-medium text-[var(--flaz-dark)] text-[17px] md:text-[20px] leading-snug mb-2 md:mb-3">{a.title}</h2>
                <p className="text-[14px] font-light text-gray-600 leading-relaxed mb-3 md:mb-5 line-clamp-2 md:line-clamp-none">{a.summary}</p>
                <span className="flaz-arrow-link mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium">
                  Read guide <ArrowIcon size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactFooter />
    </main>
  );
}
