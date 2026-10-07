/**
 * The 83-item service catalogue from "Flaz Technical Services.pdf", grouped under its seven categories.
 * Item wording follows the PDF; only spacing, capitalisation and punctuation have been tidied.
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
  items: string[];
};

export const catalogue: CatalogueCategory[] = [
  {
    key: "carpentry",
    name: "Carpentry",
    shortName: "Carpentry",
    icon: "hammer",
    blurb: "Wardrobes, kitchens, doors, partitions, decking and wood flooring.",
    pageSlug: "finishing",
    items: [
      "Custom Wardrobe Installation",
      "Kitchen Cabinet Installation & Repair",
      "Wooden Door Installation & Fixing",
      "Door Lock & Handle Replacement",
      "Wooden Partition Works",
      "Gypsum Partition with Wooden Frame",
      "False Ceiling Wooden Design Works",
      "Pergola & Wooden Decking Works",
      "TV Unit & Wall Cladding Carpentry",
      "SPC Flooring Installation",
      "Wooden Flooring (Parquet) Installation",
      "Skirting & Architrave Fixing",
      "Reception Counter Fabrication",
      "Wooden Louvers Installation",
    ],
  },
  {
    key: "painting",
    name: "Painting",
    shortName: "Painting",
    icon: "paint-roller",
    blurb: "Interior, exterior and specialist coatings, waterproofing and repainting.",
    pageSlug: "finishing",
    items: [
      "Interior Wall Painting (Emulsion)",
      "Waterproofing on Indoor Walls",
      "Exterior Building Painting",
      "Villa Full Repainting",
      "Micro Cement Paint for Walls, Ceilings, Floors and Furniture, Indoor and Outdoor",
      "Enamel Painting for Doors & Metal",
      "Texture Painting & Design",
      "Waterproof Roof Paint (Roof Guard)",
      "Epoxy Floor Painting for Warehouse",
      "Spray Painting Works",
      "Wood Polish & Varnishing",
      "Wall Putty & Crack Filling",
      "Wallpaper Removal & Wall Repaint",
      "Line Marking for Parking",
      "Kitchen Cabinet Spray Painting",
      "Touch-up & Maintenance Painting",
    ],
  },
  {
    key: "masonry-civil",
    name: "Masonry / Civil",
    shortName: "Masonry & Civil",
    icon: "brick-wall",
    blurb: "Blockwork, plastering, tiling, screeds, waterproofing and demolition.",
    pageSlug: "finishing",
    items: [
      "Block Work & Partition",
      "Plastering & Skimming",
      "Floor Tile Installation (Ceramic, Porcelain)",
      "Wall Tile Installation (Bathroom, Kitchen)",
      "Marble & Granite Fixing",
      "Interlock Tile Fixing for Villa",
      "Self-Levelling & Screed Works",
      "Concrete Repair & Grouting",
      "Waterproofing (Bathroom, Roof, Balcony)",
      "Demolition & Dismantling Works",
    ],
  },
  {
    key: "vinyl-graphics-glass-film",
    name: "Vinyl / Graphics / Glass Film",
    shortName: "Vinyl & Glass Film",
    icon: "layers",
    blurb: "Glass film, vinyl and logo work, signage, wallpaper and floor coverings.",
    pageSlug: "vinyl-graphics-glass-film",
    items: [
      "Frosted Glass Film Installation (Plain & Logo)",
      "Vinyl Sticker & Logo Installation on Glass",
      "3M Branding & Company Logo Cutting",
      "One-Way Vision Sticker for Shop",
      "Wallpaper Installation (3D, Plain)",
      "Floor Vinyl & Carpet Installation",
      "Artificial Grass Wall & Floor Installation",
      "Acrylic Signage Letter Fixing",
      "Sun Control Film / Blackout Film",
    ],
  },
  {
    key: "electrical",
    name: "Electrical",
    shortName: "Electrical",
    icon: "zap",
    blurb: "Lighting, power, DB works, wiring, CCTV, access control and fault-finding.",
    pageSlug: "electrical",
    items: [
      "LED Light Installation & Replacement",
      "Chandelier & Spotlight Fixing",
      "DB Dressing & Breaker Replacement",
      "Power Socket & Switch Replacement",
      "New Power Point Wiring for AC / Heater",
      "Electrical Cable Pulling & Laying",
      "False Ceiling Light Wiring (Downlight, Strip Light)",
      "CCTV Installation & Wiring",
      "Door Access & Intercom Installation",
      "Water Heater Connection & Repair",
      "Exhaust Fan Installation",
      "Garden & Facade Light Installation",
      "Electrical Troubleshooting & Short Circuit Repair",
    ],
  },
  {
    key: "plumbing",
    name: "Plumbing",
    shortName: "Plumbing",
    icon: "droplets",
    blurb: "Leak detection, fixtures, pumps, tanks, drainage and water heaters.",
    pageSlug: "plumbing",
    items: [
      "Water Leak Detection & Repair",
      "Bathroom Mixer, Tap & Shower Replacement",
      "WC Installation & Repair",
      "Water Pump Installation",
      "Kitchen Sink & Drainage Fixing",
      "Water Tank Installation & Connection",
      "Pipe Leakage Repair (PPR, PVC, Copper)",
      "Floor Drain Unblocking & Cleaning",
      "Sanitary Ware Fixing (Basin, Bathtub)",
      "Water Heater Replacement",
    ],
  },
  {
    key: "hvac-ac",
    name: "HVAC / AC",
    shortName: "HVAC / AC",
    icon: "air-vent",
    blurb: "AC installation, repair, ducting, annual maintenance and chilled-water FCU care.",
    pageSlug: "hvac-air-conditioning",
    items: [
      "Split AC Installation (1 to 3 Ton)",
      "AC Gas Top-up & Leak Repair",
      "AC Duct Cleaning & Filter Cleaning",
      "Cassette AC & Ducted AC Installation",
      "AC Copper Piping Extension & Insulation",
      "AC Annual Maintenance Contract (AMC)",
      "Fresh Air & Exhaust Duct Installation",
      "Thermostat Installation & Repair",
      "Chilled Water FCU Maintenance",
      "AC Outdoor Unit Stand Fabrication & Fixing",
      "HVAC Troubleshooting & Repair",
    ],
  },
];

export const catalogueByKey = Object.fromEntries(catalogue.map((c) => [c.key, c])) as Record<CatalogueKey, CatalogueCategory>;

export const catalogueTotal = catalogue.reduce((n, c) => n + c.items.length, 0);

/** Public URL of a category's complete list. */
export function catalogueHref(c: CatalogueCategory) {
  return `/services/${c.pageSlug}#${c.key}`;
}
