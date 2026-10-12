import { Hammer, PaintRoller, BrickWall, Layers, Zap, Droplets, AirVent, type LucideIcon } from "lucide-react";
import type { CatalogueIcon } from "@/lib/service-catalogue";

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
