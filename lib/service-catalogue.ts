import manifest from "@/content/service-illustrations.json";

/**
 * The 83-item service catalogue from "Flaz Technical Services.pdf", grouped under its seven categories.
 * Names, descriptions, image paths and alt text come from content/service-illustrations.json (the manifest, which also
 * holds the generation prompts — those never reach the client; only the fields below are passed on).
 * Each category is published on exactly one page (see `pageSlug`) — overlapping trades share an existing page.
 */

export type CatalogueKey =
  | "carpentry"
  | "painting"
  | "masonry-civil"
  | "vinyl-graphics-glass-film"
  | "electrical"
  | "plumbing"
  | "hvac-ac";

export type CatalogueIcon = "hammer" | "paint-roller" | "brick-wall" | "layers" | "zap" | "droplets" | "air-vent";

/** An approved AI-generated service illustration. Absent until the image has been generated and approved. */
export type ServiceImage = { src: string; srcSet?: string; width: number; height: number; alt: string };

export type CatalogueItem = {
  id: string;
  name: string;
  description: string;
  image: ServiceImage | null;
};

export type CatalogueCategory = {
  key: CatalogueKey;
  /** Full category name, as in the PDF */
  name: string;
  /** Compact label for chips */
  shortName: string;
  icon: CatalogueIcon;
  blurb: string;
  /** The public service page that carries this category's complete list */
  pageSlug: string;
  items: CatalogueItem[];
};

// The JSON types `image` as null until images are approved; widen it to the shape it takes afterwards.
type ManifestService = Omit<(typeof manifest.services)[number], "image"> & {
  image: { src: string; srcSet?: string; width: number; height: number } | null;
};

const itemsFor = (key: CatalogueKey): CatalogueItem[] =>
  (manifest.services as unknown as ManifestService[])
    .filter((s) => s.category === key)
    .map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      // Only approved images are published; anything else shows the labelled temporary placeholder.
      image: s.image && s.status === "approved" ? { ...s.image, alt: s.alt } : null,
    }));

const categories: Omit<CatalogueCategory, "items">[] = [
  {
    key: "carpentry",
    name: "Carpentry",
    shortName: "Carpentry",
    icon: "hammer",
    blurb: "Wardrobes, kitchens, doors, partitions, decking and wood flooring.",
    pageSlug: "finishing",
  },
  {
    key: "painting",
    name: "Painting",
    shortName: "Painting",
    icon: "paint-roller",
    blurb: "Interior, exterior and specialist coatings, waterproofing and repainting.",
    pageSlug: "finishing",
  },
  {
    key: "masonry-civil",
    name: "Masonry / Civil",
    shortName: "Masonry & Civil",
    icon: "brick-wall",
    blurb: "Blockwork, plastering, tiling, screeds, waterproofing and demolition.",
    pageSlug: "finishing",
  },
  {
    key: "vinyl-graphics-glass-film",
    name: "Vinyl / Graphics / Glass Film",
    shortName: "Vinyl & Glass Film",
    icon: "layers",
    blurb: "Glass film, vinyl and logo work, signage, wallpaper and floor coverings.",
    pageSlug: "vinyl-graphics-glass-film",
  },
  {
    key: "electrical",
    name: "Electrical",
    shortName: "Electrical",
    icon: "zap",
    blurb: "Lighting, power, DB works, wiring, CCTV, access control and fault-finding.",
    pageSlug: "electrical",
  },
  {
    key: "plumbing",
    name: "Plumbing",
    shortName: "Plumbing",
    icon: "droplets",
    blurb: "Leak detection, fixtures, pumps, tanks, drainage and water heaters.",
    pageSlug: "plumbing",
  },
  {
    key: "hvac-ac",
    name: "HVAC / AC",
    shortName: "HVAC / AC",
    icon: "air-vent",
    blurb: "AC installation, repair, ducting, annual maintenance and chilled-water FCU care.",
    pageSlug: "hvac-air-conditioning",
  },
];

export const catalogue: CatalogueCategory[] = categories.map((c) => ({ ...c, items: itemsFor(c.key) }));

export const catalogueByKey = Object.fromEntries(catalogue.map((c) => [c.key, c])) as Record<CatalogueKey, CatalogueCategory>;

export const catalogueTotal = catalogue.reduce((n, c) => n + c.items.length, 0);

/** Public URL of a category's complete list. */
export function catalogueHref(c: CatalogueCategory) {
  return `/services/${c.pageSlug}#${c.key}`;
}
