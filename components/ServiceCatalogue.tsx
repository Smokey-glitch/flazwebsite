import { Hammer, PaintRoller, BrickWall, Layers, Zap, Droplets, AirVent, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { CheckIcon, SectionHeading } from "@/components/blocks";
import {
  catalogueByKey,
  type CatalogueCategory,
  type CatalogueIcon,
  type CatalogueKey,
} from "@/lib/service-catalogue";

const ICONS: Record<CatalogueIcon, LucideIcon> = {
  hammer: Hammer,
  "paint-roller": PaintRoller,
  "brick-wall": BrickWall,
  layers: Layers,
  zap: Zap,
  droplets: Droplets,
  "air-vent": AirVent,
};

/** One consistent line icon per category, used wherever a photo is not available. */
export function CategoryIcon({ icon, size = 22, className = "" }: { icon: CatalogueIcon; size?: number; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" className={className} />;
}

export function IconTile({ icon, size = 44 }: { icon: CatalogueIcon; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-sm"
      style={{ width: size, height: size, backgroundColor: "rgba(77,200,200,0.14)", color: "var(--flaz-teal-text)" }}
    >
      <CategoryIcon icon={icon} size={Math.round(size * 0.5)} />
    </span>
  );
}

function CategoryList({ c }: { c: CatalogueCategory }) {
  const headingId = `${c.key}-heading`;
  return (
    <section id={c.key} aria-labelledby={headingId} className="bg-white rounded-sm p-5 md:p-8">
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <IconTile icon={c.icon} />
        <div>
          <h3 id={headingId} className="font-medium text-[var(--flaz-dark)] text-[19px] md:text-[22px] leading-snug">
            {c.name}
          </h3>
          <p className="text-[12px] uppercase tracking-[0.15em] font-medium" style={{ color: "var(--flaz-teal-text)" }}>
            {c.items.length} services
          </p>
        </div>
      </div>
      <ul className="md:columns-2 md:gap-x-10">
        {c.items.map((item) => (
          <li key={item} className="flex gap-3 py-3 border-t border-black/10 break-inside-avoid text-[14px] md:text-[15px] font-light text-gray-700 leading-snug">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Complete, grouped PDF service lists for the given categories. Jump links appear when a page carries several. */
export default function ServiceCatalogue({ keys }: { keys: CatalogueKey[] }) {
  const cats = keys.map((k) => catalogueByKey[k]);
  const total = cats.reduce((n, c) => n + c.items.length, 0);
  const multiple = cats.length > 1;
  return (
    <section className="pb-10 md:pb-20" aria-labelledby="service-list-heading">
      <SectionHeading
        eyebrow="Complete service list"
        title={multiple ? `${total} services across ${cats.length} trades` : `${total} ${cats[0].name} services`}
        id="service-list-heading"
        maxWidth="26ch"
      />
      {multiple && (
        <nav aria-label="Jump to a trade" className="flex flex-wrap gap-2 mb-5 md:mb-8">
          {cats.map((c) => (
            <Link
              key={c.key}
              href={`#${c.key}`}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-sm bg-white text-[14px] font-medium text-[var(--flaz-dark)] flaz-card"
            >
              <CategoryIcon icon={c.icon} size={16} />
              {c.shortName}
              <span className="text-[12px] font-light text-gray-600">{c.items.length}</span>
            </Link>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-4">
        {cats.map((c) => (
          <CategoryList key={c.key} c={c} />
        ))}
      </div>
    </section>
  );
}
