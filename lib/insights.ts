export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
  relatedService: string;
};

export const articles: Article[] = [
  {
    slug: "what-an-ac-service-should-include",
    title: "What a proper AC service in Dubai should include",
    metaDescription:
      "A practical checklist of what a thorough air-conditioning service covers in Dubai — filters, coils, drainage, electrical checks and performance testing.",
    category: "HVAC",
    date: "2026-10-07",
    readTime: "4 min read",
    image: "/images/the-lakes-villa-living.jpg",
    summary:
      "A quick filter rinse is not a service. Here is what a thorough AC service should cover, and what to ask your contractor.",
    relatedService: "hvac-air-conditioning",
    sections: [
      {
        heading: "Why servicing matters here",
        paragraphs: [
          "Air-conditioning in Dubai runs for most of the year, often at high load. Dust, humidity and continuous operation mean small faults develop quickly: a blocked drain leaks onto a ceiling, a dirty coil cuts cooling, a failing capacitor stops a unit on the hottest day.",
          "A proper service is an inspection as well as a clean. It should leave you knowing the condition of each unit, not just that someone visited.",
        ],
      },
      {
        heading: "What a thorough service covers",
        list: [
          "Indoor unit: filters cleaned or replaced, coil and blower inspected, airflow checked.",
          "Condensate drain: drain pan and line cleared and tested for free flow — one of the most common causes of indoor leaks.",
          "Outdoor unit: coil cleaned, fan and housing inspected, mounting and vibration checked.",
          "Electrical: connections, capacitors, contactors and controls checked for wear or heat damage.",
          "Refrigerant circuit: visual check for leaks, and performance readings to confirm the system is cooling as it should.",
          "Thermostat and controls: operation confirmed against the settings.",
        ],
      },
      {
        heading: "Questions worth asking",
        list: [
          "Will each unit be inspected, or only cleaned?",
          "Will you tell me about faults found, even if they are not yet failures?",
          "Is the drain checked as part of the visit?",
          "Can servicing be scheduled before the summer peak?",
        ],
      },
      {
        heading: "When servicing is not enough",
        paragraphs: [
          "If a unit is old, repeatedly failing or unable to cool a space it once could, a service will not fix it. The right answer might be repair, resizing or replacement — which should follow diagnosis rather than precede it.",
          "For properties with several units, scheduling servicing under an Annual Maintenance Contract keeps visits regular and records consistent.",
        ],
      },
    ],
  },
  {
    slug: "annual-maintenance-contract-checklist",
    title: "Annual Maintenance Contracts: what to check before you sign",
    metaDescription:
      "What to look for in an Annual Maintenance Contract in Dubai — scope, visit frequency, corrective work, reporting and exclusions.",
    category: "AMC",
    date: "2026-10-07",
    readTime: "4 min read",
    image: "/images/dubai-villa-pool.jpg",
    summary:
      "Two AMCs with the same name can promise very different things. This checklist helps you compare them properly.",
    relatedService: "annual-maintenance-contracts",
    sections: [
      {
        heading: "What an AMC is for",
        paragraphs: [
          "An Annual Maintenance Contract turns property upkeep from a series of emergencies into a plan. You agree what will be maintained, how often it will be inspected, and how faults are handled in between.",
          "It is most valuable for owners who are away, landlords with multiple units, and commercial properties where downtime has a cost.",
        ],
      },
      {
        heading: "Check the scope",
        list: [
          "Which disciplines are covered — HVAC, electrical, plumbing, finishing?",
          "Is there an equipment list, or is the scope described only in general terms?",
          "Are all units and areas included, or only some?",
        ],
      },
      {
        heading: "Check the visits",
        list: [
          "How many preventive visits are planned per year, and when?",
          "What is inspected on each visit?",
          "Will you receive a report after each visit?",
        ],
      },
      {
        heading: "Check corrective work",
        list: [
          "How do you report a fault between scheduled visits?",
          "Are repairs included, or charged separately? Are parts included?",
          "What is treated as an exclusion — for example misuse, third-party damage or equipment beyond repair?",
        ],
      },
      {
        heading: "Check who is accountable",
        paragraphs: [
          "Contracts that split disciplines between different providers often leave gaps. A single team across HVAC, electrical and plumbing means one party owns the whole property — and one number to call.",
        ],
      },
    ],
  },
  {
    slug: "before-you-renovate-a-villa-in-dubai",
    title: "Before you renovate a villa in Dubai: survey, approvals and MEP",
    metaDescription:
      "What to settle before a villa renovation in Dubai — site survey, written scope, NOC approvals, MEP planning and handover.",
    category: "Renovation",
    date: "2026-10-07",
    readTime: "5 min read",
    image: "/images/palm-jumeirah-villa.jpg",
    summary:
      "Most renovation problems are decided before work starts. These are the questions to settle first.",
    relatedService: "renovation-fit-out",
    sections: [
      {
        heading: "Start with a site survey",
        paragraphs: [
          "A reliable quotation comes from someone who has seen the property. Existing services, structure and access all affect scope and cost, and none of them can be judged from drawings alone.",
        ],
      },
      {
        heading: "Get the scope in writing",
        paragraphs: [
          "A written scope states what is included, what is not, and the materials involved. It makes later changes visible as variations rather than arguments.",
        ],
      },
      {
        heading: "Identify approvals early",
        paragraphs: [
          "Many villa renovations need NOC approval from the developer, community management or relevant authority — particularly when structural, facade or services changes are involved. Requirements vary by community and scope, so ask what is needed before committing to a programme.",
        ],
      },
      {
        heading: "Plan the MEP before the finishes",
        list: [
          "Will the existing AC capacity support the new layout?",
          "Is the electrical board suitable for the new loads?",
          "Do drainage routes allow the planned bathrooms and kitchen?",
          "Where will ducts, pipes and cables run, and what will cover them?",
        ],
        paragraphs: [
          "These decisions are cheapest on paper and most expensive after tiling.",
        ],
      },
      {
        heading: "Agree how you will be kept informed",
        paragraphs: [
          "Decide up front who your point of contact is, how often you will receive progress updates, and what the handover will include — snag list, documentation and warranty support.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
