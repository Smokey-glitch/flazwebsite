export type PrimitiveField = {
  type: "string" | "textarea" | "image";
  name: string;
  label: string;
};

export type ObjectListField = {
  type: "list";
  itemKind: "object";
  name: string;
  label: string;
  /** name of the sub-field shown as each item's collapsed preview text */
  previewField: string;
  fields: PrimitiveField[];
};

export type PrimitiveListField = {
  type: "list";
  itemKind: "string" | "image";
  name: string;
  label: string;
};

export type FieldSchema = PrimitiveField | ObjectListField | PrimitiveListField;

export type CollectionDef = {
  key: string;
  path: string;
  title: string;
  fields: FieldSchema[];
};

export const COLLECTIONS: Record<string, CollectionDef> = {
  hero: {
    key: "hero",
    path: "content/hero.json",
    title: "Homepage Hero",
    fields: [
      { type: "string", name: "eyebrow", label: "Eyebrow" },
      { type: "string", name: "heading", label: "Heading" },
      { type: "textarea", name: "description", label: "Description" },
      { type: "string", name: "primaryCtaLabel", label: "Primary button label" },
      { type: "string", name: "primaryCtaHref", label: "Primary button link" },
      { type: "string", name: "secondaryCtaLabel", label: "Secondary button label" },
      { type: "string", name: "secondaryCtaHref", label: "Secondary button link" },
      {
        type: "list",
        itemKind: "object",
        name: "slides",
        label: "Background slides",
        previewField: "alt",
        fields: [
          { type: "image", name: "src", label: "Photo" },
          { type: "string", name: "alt", label: "Alt text" },
        ],
      },
    ],
  },
  "why-us": {
    key: "why-us",
    path: "content/why-us.json",
    title: "Why Us Stats",
    fields: [
      {
        type: "list",
        itemKind: "object",
        name: "stats",
        label: "Stats",
        previewField: "highlight",
        fields: [
          { type: "string", name: "before", label: "Text before the highlight" },
          { type: "string", name: "highlight", label: "Highlighted phrase" },
          { type: "string", name: "rest", label: "Text after the highlight" },
        ],
      },
    ],
  },
  approach: {
    key: "approach",
    path: "content/approach.json",
    title: "How We Work",
    fields: [
      { type: "string", name: "eyebrow", label: "Eyebrow" },
      { type: "string", name: "headingLine1", label: "Heading — line 1" },
      { type: "string", name: "headingLine2", label: "Heading — line 2" },
      { type: "textarea", name: "intro", label: "Intro" },
      { type: "string", name: "ctaLabel", label: "Button label" },
      { type: "string", name: "ctaHref", label: "Button link" },
      {
        type: "list",
        itemKind: "object",
        name: "steps",
        label: "Steps",
        previewField: "title",
        fields: [
          { type: "string", name: "title", label: "Title" },
          { type: "textarea", name: "body", label: "Body" },
        ],
      },
    ],
  },
  testimonials: {
    key: "testimonials",
    path: "content/testimonials.json",
    title: "Testimonials",
    fields: [
      { type: "string", name: "aggregateRating", label: "Aggregate rating (e.g. 4.8)" },
      { type: "string", name: "aggregateSource", label: "Aggregate source (e.g. Google Reviews)" },
      {
        type: "list",
        itemKind: "object",
        name: "reviews",
        label: "Reviews",
        previewField: "name",
        fields: [
          { type: "string", name: "id", label: "ID (short, no spaces)" },
          { type: "textarea", name: "text", label: "Quote" },
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "role", label: "Role / property" },
          { type: "string", name: "origin", label: "Country of origin" },
        ],
      },
    ],
  },
  faq: {
    key: "faq",
    path: "content/faq.json",
    title: "FAQ",
    fields: [
      {
        type: "list",
        itemKind: "object",
        name: "faqs",
        label: "Questions",
        previewField: "q",
        fields: [
          { type: "string", name: "q", label: "Question" },
          { type: "textarea", name: "a", label: "Answer" },
        ],
      },
    ],
  },
  services: {
    key: "services",
    path: "content/services.json",
    title: "Services",
    fields: [
      {
        type: "list",
        itemKind: "object",
        name: "services",
        label: "Services",
        previewField: "title",
        fields: [
          { type: "string", name: "index", label: "Number (e.g. 01)" },
          { type: "string", name: "category", label: "Category label (e.g. HVAC)" },
          { type: "string", name: "title", label: "Title" },
          { type: "textarea", name: "desc", label: "Description" },
          { type: "image", name: "imageSrc", label: "Photo" },
        ],
      },
    ],
  },
  "site-settings": {
    key: "site-settings",
    path: "content/site-settings.json",
    title: "Contact & Footer",
    fields: [
      { type: "string", name: "phone", label: "Phone (display text)" },
      { type: "string", name: "phoneHref", label: "Phone link (tel:...)" },
      { type: "string", name: "email", label: "Email" },
      { type: "string", name: "whatsappHref", label: "WhatsApp link (https://wa.me/...)" },
      { type: "textarea", name: "address", label: "Office address" },
      { type: "textarea", name: "footerTagline", label: "Footer tagline" },
      {
        type: "list",
        itemKind: "object",
        name: "navLinks",
        label: "Footer navigation links",
        previewField: "label",
        fields: [
          { type: "string", name: "label", label: "Label" },
          { type: "string", name: "href", label: "Link" },
        ],
      },
      {
        type: "list",
        itemKind: "object",
        name: "serviceLinks",
        label: "Footer service links",
        previewField: "label",
        fields: [
          { type: "string", name: "label", label: "Label" },
          { type: "string", name: "href", label: "Link" },
        ],
      },
    ],
  },
};

/** Fields for the Projects folder collection (content/projects/*.json) — id/order handled separately. */
export const PROJECT_FIELDS: FieldSchema[] = [
  { type: "string", name: "title", label: "Title" },
  { type: "textarea", name: "desc", label: "Full description" },
  { type: "string", name: "shortDesc", label: "Short description (listing cards)" },
  { type: "image", name: "image", label: "Main photo" },
  { type: "image", name: "beforeImage", label: "Before photo (optional — enables before/after slider)" },
  { type: "list", itemKind: "image", name: "gallery", label: "Gallery photos" },
  { type: "list", itemKind: "string", name: "tags", label: "Tags" },
  { type: "string", name: "area", label: "Area" },
  { type: "string", name: "year", label: "Year" },
  { type: "string", name: "scope", label: "Scope of work" },
  { type: "string", name: "duration", label: "Duration" },
];
