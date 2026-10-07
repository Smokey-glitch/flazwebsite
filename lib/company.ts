import siteSettings from "@/content/site-settings.json";

export const SITE_URL = "https://www.flaztechnicalservices.com";

/** Date shown as "Last updated" on every legal page. Update it whenever a policy changes. */
export const LEGAL_UPDATED = "7 October 2026";

export const company = {
  /**
   * Dubai trade licence number as printed on the licence (for example "123456"). When set it is shown in the
   * footer and on the legal pages. UAE rules on online business information expect this to be disclosed, so fill it in.
   */
  tradeLicence: "" as string,
  name: "Flaz Technical Services",
  phone: siteSettings.phone,
  phoneHref: siteSettings.phoneHref,
  email: siteSettings.email,
  whatsappHref: siteSettings.whatsappHref,
  address: siteSettings.address,
};

/** WhatsApp deep link with a prefilled message. */
export function waLink(message?: string) {
  return message
    ? `${company.whatsappHref}?text=${encodeURIComponent(message)}`
    : company.whatsappHref;
}

/** Contact intents — each CTA type routes to a tailored enquiry rather than one generic form. */
export const INTENTS = {
  quote: {
    label: "Project quote",
    title: "Get a quote",
    sub: "Tell us about the project and we will contact you to arrange a survey.",
    waMessage: "Hello Flaz, I would like a quote for a project.",
  },
  maintenance: {
    label: "Maintenance request",
    title: "Request maintenance support",
    sub: "Leave your details and we will contact you about your maintenance requirement.",
    waMessage: "Hello Flaz, I need maintenance support for my property.",
  },
  amc: {
    label: "AMC proposal",
    title: "Request an AMC proposal",
    sub: "Share your contact details and we will come back to scope an Annual Maintenance Contract.",
    waMessage: "Hello Flaz, I would like an Annual Maintenance Contract proposal.",
  },
  visit: {
    label: "Site visit",
    title: "Request a site visit",
    sub: "Leave your details and we will contact you to arrange a site visit.",
    waMessage: "Hello Flaz, I would like to arrange a site visit.",
  },
  technical: {
    label: "Technical problem",
    title: "Get technical support",
    sub: "Leave your details and a brief note, or WhatsApp us directly for urgent issues.",
    waMessage: "Hello Flaz, I have a technical issue at my property.",
  },
} as const;

export type IntentKey = keyof typeof INTENTS;
export const INTENT_KEYS = Object.keys(INTENTS) as IntentKey[];
