import type { IntentKey } from "./company";

export type Faq = { q: string; a: string };

export type ServicePage = {
  slug: string;
  category: "mep" | "maintenance" | "renovation";
  navLabel: string;
  navBlurb: string;
  /** H1 */
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  /** Lead paragraph under the H1 */
  lead: string;
  overview: string[];
  capabilityHeading: string;
  capabilities: { title: string; body: string }[];
  /** Short, practical notes — the "why this matters in Dubai" layer */
  notes: { title: string; body: string }[];
  residential: string[];
  commercial: string[];
  support: { heading: string; body: string; points: string[] };
  processHeading: string;
  process: { title: string; body: string }[];
  relatedProjects: string[];
  relatedProjectsLabel: string;
  related: string[];
  faqs: Faq[];
  cta: { intent: IntentKey; label: string; heading: string; body: string };
};

const standardProcess = (first: string, last: string) => [
  {
    title: "Survey & scoping",
    body: `${first} We confirm what is in scope, what is not, and record it in a written quotation before work begins.`,
  },
  {
    title: "Dedicated oversight",
    body: "A named project manager coordinates the trades involved, so you deal with one person rather than several contractors.",
  },
  {
    title: "Live progress updates",
    body: "You are kept informed as work progresses, with photo reports and calls — useful if you are away from Dubai.",
  },
  {
    title: "Clean handover",
    body: last,
  },
];

export const servicePages: ServicePage[] = [
  /* ───────────────────────── MEP & TECHNICAL ───────────────────────── */
  {
    slug: "mep-technical-services",
    category: "mep",
    navLabel: "MEP & Technical Services",
    navBlurb: "Mechanical, electrical and plumbing — coordinated",
    title: "MEP & Technical Services in Dubai",
    metaTitle: "MEP Contractor Dubai — MEP & Technical Services",
    metaDescription:
      "Coordinated mechanical, electrical and plumbing works for villas, apartments, offices and retail in Dubai — installation, testing, commissioning and maintenance from one accountable team.",
    eyebrow: "MEP & technical services",
    heroImage: "/images/business-bay-office.jpg",
    heroAlt: "Commercial office fit-out in Business Bay with coordinated MEP works",
    lead: "Mechanical, electrical and plumbing works delivered by one coordinated team — from installation through testing and commissioning to ongoing maintenance.",
    overview: [
      "Most property problems cross trades. A cooling issue turns out to be a drainage fault; a new kitchen needs power, water and extraction planned together; an office fit-out needs air-conditioning, lighting and plumbing to fit into the same ceiling void. When each trade is a separate contractor, the coordination falls to you.",
      "FLAZ provides mechanical, electrical and plumbing works as one managed scope. We survey the property, define the work across disciplines, sequence the trades and stay accountable from first fix to final testing — for residential and commercial properties across Dubai.",
    ],
    capabilityHeading: "What we deliver across the three disciplines",
    capabilities: [
      {
        title: "Mechanical systems",
        body: "Air-conditioning, ventilation and associated mechanical installations — selected, installed and tested to suit the building and its use.",
      },
      {
        title: "Electrical systems",
        body: "Power distribution, wiring, lighting and distribution board works, installed and tested before the property is re-energised.",
      },
      {
        title: "Plumbing systems",
        body: "Water supply, drainage and sanitary installations, including pumps and water heaters.",
      },
      {
        title: "Coordination",
        body: "Services are planned together so ducting, pipework, conduits and fittings do not clash with each other or with the finishes.",
      },
      {
        title: "Installation",
        body: "New-build and renovation installations, in occupied or vacant properties, sequenced around the other trades on site.",
      },
      {
        title: "Testing",
        body: "Systems are checked before handover — circuits, pipework and equipment are tested rather than assumed to work.",
      },
      {
        title: "Commissioning",
        body: "Equipment is brought into service and verified against its intended operation, so the system performs as designed from day one.",
      },
      {
        title: "Maintenance",
        body: "Preventive and corrective maintenance, individually or under an Annual Maintenance Contract, for the systems we install or inherit.",
      },
    ],
    notes: [
      {
        title: "Coordination is where fit-outs go wrong",
        body: "Ceiling voids, risers and wall chases are shared by every service. Agreeing routes and levels before first fix prevents rework once finishes are in.",
      },
      {
        title: "Building rules apply",
        body: "Towers and communities usually have their own requirements for contractor works, access and approvals. We identify these during the survey so they do not delay the programme.",
      },
      {
        title: "Handover documentation matters",
        body: "Property managers and landlords increasingly ask what was installed and how it was tested. Documented handover keeps that record in one place.",
      },
    ],
    residential: [
      "Villa renovations needing new power, cooling and plumbing layouts",
      "Apartment refurbishments and kitchen or bathroom relocations",
      "Pool, outdoor living and extension works requiring services",
      "Replacing ageing systems across a whole property",
    ],
    commercial: [
      "Office fit-outs with air-conditioning, lighting and small power",
      "Retail, showroom and restaurant technical installations",
      "Partition and layout changes that move services",
      "Technical works for developers and main contractors",
    ],
    support: {
      heading: "Maintenance of installed systems",
      body: "Systems perform best when they are maintained by the team who understands how they were installed. FLAZ can maintain MEP systems on a one-off or contract basis.",
      points: [
        "Scheduled preventive inspections across disciplines",
        "Corrective repairs with root-cause diagnosis",
        "Annual Maintenance Contracts covering HVAC, electrical and plumbing",
      ],
    },
    processHeading: "How an MEP scope is delivered",
    process: standardProcess(
      "We inspect the property and existing systems and agree the mechanical, electrical and plumbing scope together.",
      "Systems are tested and commissioned, snags cleared, and documentation handed over before we close the project."
    ),
    relatedProjects: ["villa-lakes", "damac-office", "fairway-apt"],
    relatedProjectsLabel: "Projects with MEP scope",
    related: ["hvac-air-conditioning", "electrical", "plumbing", "annual-maintenance-contracts"],
    faqs: [
      {
        q: "What does MEP include?",
        a: "MEP stands for mechanical, electrical and plumbing. In practice that means air-conditioning and ventilation, power, lighting and distribution, and water supply, drainage and sanitary works — planned and installed together.",
      },
      {
        q: "Do you handle MEP for fit-outs and renovations?",
        a: "Yes. MEP is part of most of our renovation and fit-out projects, and it is coordinated with the finishing trades so services and finishes align.",
      },
      {
        q: "Can you work with our consultant's drawings?",
        a: "Yes. If you already have drawings or a specification, we price and deliver against them. If you do not, we scope the works from a site survey.",
      },
      {
        q: "Do you provide MEP maintenance after the project?",
        a: "Yes. We can maintain systems on a call-out basis or under an Annual Maintenance Contract.",
      },
    ],
    cta: {
      intent: "quote",
      label: "Get a quote",
      heading: "Planning technical works?",
      body: "Tell us about the property and the systems involved. We will arrange a survey and define the scope.",
    },
  },

  /* ───────────────────────────── HVAC ───────────────────────────── */
  {
    slug: "hvac-air-conditioning",
    category: "mep",
    navLabel: "HVAC",
    navBlurb: "AC installation, repair, servicing and ventilation",
    title: "HVAC & Air-Conditioning Services in Dubai",
    metaTitle: "HVAC Services Dubai — AC Installation, Repair & Maintenance",
    metaDescription:
      "AC installation, repair, servicing and preventive maintenance for villas, apartments and offices in Dubai. VRF/VRV, ducting, ventilation, AHU and FCU works.",
    eyebrow: "HVAC & air-conditioning",
    heroImage: "/images/the-lakes-villa-living.jpg",
    heroAlt: "Villa interior in The Lakes with air-conditioned living space",
    lead: "Installation, repair, servicing and maintenance of air-conditioning and ventilation systems for residential and commercial properties in Dubai.",
    overview: [
      "In Dubai, air-conditioning is not a comfort extra — it runs for most of the year and carries a large share of a property's running cost. Systems that are poorly installed or rarely serviced cool less, use more power and fail at the worst time.",
      "FLAZ covers the full HVAC cycle: new installations and replacements, repairs, routine servicing, ducting and ventilation works, and planned preventive maintenance. The same team can coordinate HVAC with the electrical, plumbing and finishing works around it.",
    ],
    capabilityHeading: "HVAC capabilities",
    capabilities: [
      {
        title: "AC installation",
        body: "Supply and installation of split, ducted and packaged systems, positioned and sized for the space rather than just replaced like-for-like.",
      },
      {
        title: "AC repair",
        body: "Diagnosis and repair of cooling, airflow, noise, leakage and electrical faults, with the cause identified rather than the symptom reset.",
      },
      {
        title: "AC servicing",
        body: "Cleaning and inspection of indoor and outdoor units, filters, coils and drainage so the system keeps performing.",
      },
      {
        title: "VRF / VRV systems",
        body: "Variable refrigerant flow installations for villas, offices and commercial spaces that need zoned control across multiple areas.",
      },
      {
        title: "Ducting",
        body: "Duct design, fabrication and installation for ducted air-conditioning and ventilation, coordinated with ceilings and finishes.",
      },
      {
        title: "Ventilation",
        body: "Fresh air, extraction and ventilation works for kitchens, bathrooms, offices and commercial spaces.",
      },
      {
        title: "AHU / FCU",
        body: "Servicing, repair and installation of air handling units and fan coil units, including chilled-water systems.",
      },
      {
        title: "Preventive maintenance",
        body: "Scheduled inspections and servicing designed to catch faults before the summer peak, individually or under an AMC.",
      },
    ],
    notes: [
      {
        title: "Water leaking from an indoor unit",
        body: "A common cause is a blocked condensate drain. It is usually a servicing issue rather than a failed unit, which is why drain checks are part of a proper service.",
      },
      {
        title: "Weak cooling does not always mean a failed compressor",
        body: "Dirty filters and coils, restricted airflow, refrigerant issues and poor installation all reduce cooling. Diagnosis comes before any decision to replace.",
      },
      {
        title: "Chilled-water and district cooling buildings",
        body: "Many apartments use fan coil units fed from the building's chilled-water system. Responsibility is split between the unit inside the apartment and the building plant — we help identify which side a fault is on.",
      },
    ],
    residential: [
      "Split and ducted AC for villas and townhouses",
      "FCU servicing and repair in apartments",
      "Replacing underperforming systems during renovation",
      "Extraction and ventilation for kitchens and bathrooms",
    ],
    commercial: [
      "VRF / VRV systems for offices and retail",
      "Ducting and ventilation for fit-outs",
      "AHU and FCU servicing for commercial properties",
      "Scheduled maintenance for multiple units or floors",
    ],
    support: {
      heading: "Maintenance & urgent support",
      body: "Servicing before peak season prevents most summer breakdowns. For faults that cannot wait, contact us directly and we will advise on the next step.",
      points: [
        "Scheduled servicing visits, individually or under an AMC",
        "Corrective repairs with root-cause diagnosis",
        "Direct WhatsApp and phone access for urgent HVAC issues",
      ],
    },
    processHeading: "How HVAC work is delivered",
    process: standardProcess(
      "We inspect the existing system or space, check loads and layouts, and recommend repair, replacement or upgrade.",
      "Installed systems are tested and commissioned, performance is verified, and you are walked through operation and care."
    ),
    relatedProjects: ["villa-lakes", "damac-office", "palm-villa"],
    relatedProjectsLabel: "Properties with HVAC in scope",
    related: ["mep-technical-services", "electrical", "annual-maintenance-contracts", "property-maintenance"],
    faqs: [
      {
        q: "Do you provide AC maintenance in Dubai?",
        a: "Yes. We provide AC servicing and preventive maintenance for villas, apartments, offices and commercial properties, either as one-off visits or under an Annual Maintenance Contract.",
      },
      {
        q: "My AC is not cooling properly. What should I do?",
        a: "Switch the unit off if you notice water leaking or unusual noise. Then contact us with the symptoms — ideally by WhatsApp with a short video or photo — and we will advise on the next step and arrange an inspection.",
      },
      {
        q: "How often should an AC be serviced?",
        a: "At least once a year, ideally before the summer peak. Properties with heavy use, dust or many units benefit from more frequent preventive visits.",
      },
      {
        q: "Do you install VRF / VRV systems?",
        a: "Yes. We install VRF / VRV systems for villas, offices and commercial spaces, coordinated with electrical works and ceiling layouts.",
      },
      {
        q: "Can you replace an old system during a renovation?",
        a: "Yes, and it is often the best time to do it. We coordinate the HVAC with ceilings, electrical and finishes so nothing is opened up twice.",
      },
    ],
    cta: {
      intent: "technical",
      label: "Get HVAC support",
      heading: "AC not performing?",
      body: "Describe the problem or share a photo on WhatsApp. We will advise on the next step.",
    },
  },

  /* ─────────────────────────── ELECTRICAL ─────────────────────────── */
  {
    slug: "electrical",
    category: "mep",
    navLabel: "Electrical",
    navBlurb: "Installation, wiring, lighting, DB and panel works",
    title: "Electrical Services in Dubai",
    metaTitle: "Electrical Services Dubai — Installation, Wiring & Maintenance",
    metaDescription:
      "Electrical installation, wiring, lighting, distribution board works, troubleshooting and maintenance for villas, apartments and commercial properties in Dubai.",
    eyebrow: "Electrical",
    heroImage: "/images/dubai-apartment-living.jpg",
    heroAlt: "Apartment interior with integrated lighting",
    lead: "Electrical installation, repair and maintenance for residential and commercial properties — carried out, tested and documented to a professional standard.",
    overview: [
      "Electrical work is where shortcuts cost the most. Under-sized circuits, overloaded boards and poor terminations may work for months before they trip, overheat or fail. Reliable electrical work depends on planning the load, using the right components and testing before power is restored.",
      "FLAZ handles electrical installation, lighting, distribution and panel works for renovations and fit-outs, and provides troubleshooting, repair and preventive maintenance for existing properties.",
    ],
    capabilityHeading: "Electrical capabilities",
    capabilities: [
      {
        title: "Electrical installation",
        body: "New circuits and installations for renovated and fitted-out spaces, planned around the room layout and the equipment it must carry.",
      },
      {
        title: "Wiring",
        body: "New wiring and rewiring in villas, apartments and commercial spaces, including concealed and surface-mounted routes.",
      },
      {
        title: "Lighting",
        body: "General, feature and architectural lighting, including control layouts that suit how the space is actually used.",
      },
      {
        title: "Power distribution",
        body: "Planning and installing distribution for new loads — kitchens, workshops, offices, pools and outdoor areas.",
      },
      {
        title: "DB / panel works",
        body: "Distribution board upgrades, rearrangement and replacement, with circuits clearly labelled for future maintenance.",
      },
      {
        title: "Troubleshooting",
        body: "Systematic fault-finding for tripping breakers, dead circuits, flickering lights and intermittent faults.",
      },
      {
        title: "Repairs",
        body: "Replacement of faulty sockets, switches, fittings, breakers and components.",
      },
      {
        title: "Preventive maintenance",
        body: "Scheduled inspection and testing of boards, circuits and fittings to identify problems before they cause a failure.",
      },
    ],
    notes: [
      {
        title: "Tripping breakers are a message",
        body: "A breaker that keeps tripping is protecting the circuit from overload, a fault or a failing appliance. Resetting it repeatedly hides the cause — diagnosis should come first.",
      },
      {
        title: "Plan the load before the finishes",
        body: "Adding an induction hob, extra AC units or a workshop later is much harder than allowing for it during first fix. Electrical planning belongs at the start of a renovation.",
      },
      {
        title: "Building approvals",
        body: "Works that affect the building's supply or common infrastructure can require approval from building management or the relevant authority. We raise this during the survey.",
      },
    ],
    residential: [
      "Full or partial rewiring of villas and apartments",
      "Lighting design layouts for living and outdoor spaces",
      "Distribution board upgrades for added loads",
      "Fault-finding and repair of existing circuits",
    ],
    commercial: [
      "Power and lighting for office and retail fit-outs",
      "Distribution and panel works for commercial units",
      "Maintenance of electrical systems across properties",
      "Electrical works within developer and contractor packages",
    ],
    support: {
      heading: "Electrical maintenance & support",
      body: "Regular inspection and testing is the most reliable way to prevent electrical faults. For active faults, contact us directly.",
      points: [
        "Scheduled inspection of boards, circuits and fittings",
        "Corrective repair with documented findings",
        "Direct WhatsApp and phone access for urgent electrical issues",
      ],
    },
    processHeading: "How electrical work is delivered",
    process: standardProcess(
      "We survey the property, review the existing installation and agree the electrical scope.",
      "Circuits are tested before energising, boards are labelled, and documentation is handed over."
    ),
    relatedProjects: ["villa-lakes", "damac-office", "fairway-apt"],
    relatedProjectsLabel: "Projects with electrical in scope",
    related: ["mep-technical-services", "hvac-air-conditioning", "property-maintenance", "annual-maintenance-contracts"],
    faqs: [
      {
        q: "Do you provide electrical maintenance?",
        a: "Yes. We provide preventive and corrective electrical maintenance for villas, apartments, offices and commercial properties, either on request or under an Annual Maintenance Contract.",
      },
      {
        q: "Why does my breaker keep tripping?",
        a: "Common causes are an overloaded circuit, a faulty appliance or damaged wiring. If it trips repeatedly, switch off the affected circuit and contact us — the cause needs to be found rather than reset.",
      },
      {
        q: "Can you upgrade my distribution board?",
        a: "Yes. We upgrade and rearrange distribution boards to suit new loads, with circuits clearly labelled.",
      },
      {
        q: "Do you handle electrical works in renovations?",
        a: "Yes. Electrical is planned together with the other trades during renovation and fit-out, so layouts, lighting and loads are agreed before finishes begin.",
      },
    ],
    cta: {
      intent: "technical",
      label: "Get electrical support",
      heading: "Electrical problem at your property?",
      body: "Tell us what is happening. For urgent issues, WhatsApp or call us directly.",
    },
  },

  /* ─────────────────────────── PLUMBING ─────────────────────────── */
  {
    slug: "plumbing",
    category: "mep",
    navLabel: "Plumbing",
    navBlurb: "Water supply, drainage, sanitary works, leak detection",
    title: "Plumbing Services in Dubai",
    metaTitle: "Plumbing Services Dubai — Installation, Repair & Leak Detection",
    metaDescription:
      "Plumbing installation, repair and maintenance in Dubai: water supply, drainage, sanitary works, pumps, water heaters and leak detection for homes and commercial properties.",
    eyebrow: "Plumbing",
    heroImage: "/images/jvc-one-bedroom.jpg",
    heroAlt: "Renovated apartment in Jumeirah Village Circle",
    lead: "Plumbing installation, repair and maintenance for villas, apartments and commercial properties — from new layouts to leak detection.",
    overview: [
      "Plumbing problems rarely stay small. A slow leak can damage joinery, ceilings and neighbouring units long before it is visible, and a poorly planned drainage run limits what a bathroom or kitchen can become.",
      "FLAZ provides plumbing for renovation and fit-out projects, and repair and maintenance for existing properties. We plan water supply, drainage and fixtures together with the other trades, and treat leak detection as a diagnostic task rather than guesswork.",
    ],
    capabilityHeading: "Plumbing capabilities",
    capabilities: [
      {
        title: "Water supply",
        body: "New and replacement supply lines for kitchens, bathrooms, laundry and outdoor areas.",
      },
      {
        title: "Drainage",
        body: "Drainage installation and repair, including clearing blockages and correcting falls that cause recurring problems.",
      },
      {
        title: "Sanitary works",
        body: "Installation of WCs, basins, showers, baths and associated fittings, aligned with the finishes around them.",
      },
      {
        title: "Pumps",
        body: "Installation, servicing and repair of water pumps, including booster arrangements for properties with pressure issues.",
      },
      {
        title: "Water heaters",
        body: "Supply, installation, repair and replacement of water heaters.",
      },
      {
        title: "Leak detection",
        body: "Locating leaks before opening up walls or floors, so repairs are targeted and damage is limited.",
      },
      {
        title: "Repairs",
        body: "Repair of taps, mixers, valves, flush systems, pipework and fittings.",
      },
      {
        title: "Maintenance",
        body: "Scheduled checks of supply, drainage, heaters and pumps to prevent avoidable failures.",
      },
    ],
    notes: [
      {
        title: "Find the leak before opening the wall",
        body: "Leak detection narrows the location so only the affected area is opened. It also confirms whether a visible stain is the source or just where water has travelled to.",
      },
      {
        title: "Drainage decides the layout",
        body: "Where waste pipes can run determines where a bathroom or kitchen can sit. Checking drainage at the survey stage avoids redesigning after work has started.",
      },
      {
        title: "Water damage affects neighbours",
        body: "In apartments, a leak can reach units below. Acting early limits both repair cost and disputes.",
      },
    ],
    residential: [
      "Bathroom and kitchen plumbing for renovations",
      "Leak detection and repair in villas and apartments",
      "Water heater replacement and servicing",
      "Pump and pressure issues",
    ],
    commercial: [
      "Plumbing and sanitary works for office and retail fit-outs",
      "Restaurant and showroom plumbing installations",
      "Maintenance of plumbing across managed properties",
      "Pump and water heater servicing for commercial premises",
    ],
    support: {
      heading: "Plumbing maintenance & urgent support",
      body: "If water is actively leaking, isolate the supply if you can and contact us immediately with photos or video.",
      points: [
        "Scheduled plumbing inspections, individually or under an AMC",
        "Corrective repair with the cause identified",
        "Direct WhatsApp and phone access for urgent plumbing issues",
      ],
    },
    processHeading: "How plumbing work is delivered",
    process: standardProcess(
      "We inspect the existing supply and drainage and agree the plumbing scope with the layout in mind.",
      "Supply and drainage are pressure-checked and tested, fixtures commissioned, and snags cleared before handover."
    ),
    relatedProjects: ["fairway-apt", "jvc-apartment", "villa-lakes"],
    relatedProjectsLabel: "Projects with plumbing in scope",
    related: ["mep-technical-services", "property-maintenance", "renovation-fit-out", "annual-maintenance-contracts"],
    faqs: [
      {
        q: "Do you offer plumbing repair?",
        a: "Yes. We repair leaks, taps, mixers, flush systems, water heaters, pumps and drainage in villas, apartments and commercial properties.",
      },
      {
        q: "There is water leaking in my property. What should I do?",
        a: "If you can, isolate the water supply to the affected area and contact us with photos or video. We will advise on the next step and arrange an inspection.",
      },
      {
        q: "Can you find a hidden leak?",
        a: "Yes. We use a diagnostic approach to locate leaks before opening walls or floors, so repairs stay targeted.",
      },
      {
        q: "Do you do plumbing as part of a renovation?",
        a: "Yes. Plumbing is planned with the layout, joinery and finishes so fixtures and drainage line up before tiling begins.",
      },
    ],
    cta: {
      intent: "technical",
      label: "Get plumbing support",
      heading: "Water leaking or a plumbing fault?",
      body: "Send us details and photos. For urgent leaks, WhatsApp or call us directly.",
    },
  },

  /* ───────────────────── PROPERTY MAINTENANCE ───────────────────── */
  {
    slug: "property-maintenance",
    category: "maintenance",
    navLabel: "Property Maintenance",
    navBlurb: "Preventive, corrective and emergency technical support",
    title: "Property Maintenance Services in Dubai",
    metaTitle: "Property Maintenance Dubai — Villa, Apartment & Commercial",
    metaDescription:
      "Preventive and corrective property maintenance for villas, apartments, offices and commercial properties in Dubai. HVAC, electrical and plumbing from one accountable team.",
    eyebrow: "Property maintenance",
    heroImage: "/images/dubai-villa-exterior.jpg",
    heroAlt: "Dubai villa exterior maintained by Flaz",
    lead: "Preventive and corrective maintenance for villas, apartments, offices and commercial properties — coordinated across HVAC, electrical, plumbing and finishing.",
    overview: [
      "Most property failures are predictable. A neglected AC drain floods a ceiling, a loose connection overheats a socket, a small leak softens a floor. Planned maintenance catches these early and costs far less than repairing the damage.",
      "FLAZ provides property maintenance as one multi-trade service. Instead of calling an AC company, an electrician and a plumber separately, you deal with one team that understands the whole property.",
    ],
    capabilityHeading: "Maintenance services",
    capabilities: [
      {
        title: "Preventive maintenance",
        body: "Scheduled inspections and servicing designed to identify problems before they become expensive failures.",
      },
      {
        title: "Corrective maintenance",
        body: "Diagnosis, repair and restoration when something goes wrong, with the cause addressed rather than only the symptom.",
      },
      {
        title: "Emergency technical support",
        body: "Support for urgent HVAC, electrical, plumbing and property-related issues. Contact us directly by phone or WhatsApp.",
      },
      {
        title: "Multi-trade maintenance",
        body: "One accountable team coordinating multiple technical disciplines, so a single issue does not need several contractors.",
      },
      {
        title: "HVAC maintenance",
        body: "Servicing and repair of air-conditioning and ventilation equipment.",
      },
      {
        title: "Electrical maintenance",
        body: "Inspection, testing and repair of distribution boards, circuits, lighting and fittings.",
      },
      {
        title: "Plumbing maintenance",
        body: "Checks and repair of supply, drainage, water heaters and pumps.",
      },
      {
        title: "Finishing repairs",
        body: "Touch-up and repair of painting, tiling, plaster, ceilings and carpentry once the technical issue is resolved.",
      },
    ],
    notes: [
      {
        title: "Maintenance is cheaper than damage",
        body: "The cost of a scheduled service is small compared with water damage, an AC failure in summer or an electrical fault.",
      },
      {
        title: "Landlords and tenants",
        body: "Clear maintenance responsibilities and records help landlords, tenants and property managers resolve issues quickly.",
      },
      {
        title: "A record builds over time",
        body: "When one team maintains the property, recurring issues and ageing equipment are easier to spot and plan for.",
      },
    ],
    residential: [
      "Villa maintenance, indoors and outdoors",
      "Apartment technical maintenance",
      "Holiday and rental property upkeep",
      "Pre-handover and post-tenancy repairs",
    ],
    commercial: [
      "Offices and retail units",
      "Restaurants and showrooms",
      "Managed buildings and portfolios",
      "Property managers handling multiple units",
    ],
    support: {
      heading: "Emergency technical support",
      body: "Responsive support for urgent HVAC, electrical, plumbing and property issues. Contact us on the number below or by WhatsApp and we will advise on the next step.",
      points: [
        "Direct phone and WhatsApp contact",
        "Multi-trade support from one team",
        "Option to move onto an Annual Maintenance Contract",
      ],
    },
    processHeading: "How maintenance is organised",
    process: [
      {
        title: "Property survey",
        body: "We inspect the property and its systems, record what is there and agree what needs regular attention.",
      },
      {
        title: "Maintenance plan",
        body: "A written scope sets out what is inspected, how often, and what falls under preventive versus corrective work.",
      },
      {
        title: "Scheduled visits",
        body: "Preventive visits are carried out to the plan, with findings reported back to you.",
      },
      {
        title: "Corrective response",
        body: "When something fails, the same team diagnoses and repairs it, and recommends changes if a fault keeps recurring.",
      },
    ],
    relatedProjects: ["arabian-ranches", "villa-lakes", "palm-villa"],
    relatedProjectsLabel: "Recent property work",
    related: ["annual-maintenance-contracts", "hvac-air-conditioning", "electrical", "plumbing"],
    faqs: [
      {
        q: "What does property maintenance include?",
        a: "Preventive inspections and servicing, corrective repairs, and emergency technical support across HVAC, electrical, plumbing and general property works.",
      },
      {
        q: "Do you maintain villas and apartments?",
        a: "Yes. We maintain villas, townhouses and apartments, for owners, landlords and property managers.",
      },
      {
        q: "Do you work with offices and commercial properties?",
        a: "Yes. We support offices, retail units, restaurants, showrooms and managed buildings.",
      },
      {
        q: "Do you provide emergency technical support?",
        a: "Yes. Contact us by phone or WhatsApp and we will advise on the next step. For recurring needs, an Annual Maintenance Contract formalises support arrangements.",
      },
      {
        q: "Do you work with property managers?",
        a: "Yes. We coordinate maintenance across multiple units and technical disciplines, with a single point of contact.",
      },
    ],
    cta: {
      intent: "maintenance",
      label: "Request maintenance support",
      heading: "Keep your property running",
      body: "Tell us about the property and what it needs. We will recommend a maintenance approach.",
    },
  },

  /* ───────────────────────────── AMC ───────────────────────────── */
  {
    slug: "annual-maintenance-contracts",
    category: "maintenance",
    navLabel: "Annual Maintenance Contracts",
    navBlurb: "One contract, year-round property support",
    title: "Annual Maintenance Contracts (AMC) in Dubai",
    metaTitle: "Annual Maintenance Contract Dubai — AMC for Villas & Commercial",
    metaDescription:
      "Annual Maintenance Contracts in Dubai covering HVAC, electrical, plumbing and finishing for villas, apartments, offices and commercial properties. Request an AMC proposal.",
    eyebrow: "Annual Maintenance Contracts",
    heroImage: "/images/dubai-villa-pool.jpg",
    heroAlt: "Villa with pool maintained under an annual maintenance contract",
    lead: "One contract. Year-round property support. Preventive and corrective maintenance across HVAC, electrical, plumbing and finishing, with a single accountable team.",
    overview: [
      "An Annual Maintenance Contract replaces reactive, case-by-case repairs with a structured plan: defined equipment, scheduled inspections, a clear route for corrective work and a single contact when something goes wrong.",
      "FLAZ scopes AMCs around the property rather than selling a fixed package. A villa, a retail unit and a managed building have different systems and different risks, so each contract is written to match.",
    ],
    capabilityHeading: "What an AMC can cover",
    capabilities: [
      {
        title: "HVAC",
        body: "Scheduled servicing and repair of air-conditioning, ventilation and associated equipment.",
      },
      {
        title: "Electrical",
        body: "Inspection and maintenance of distribution boards, circuits, lighting and fittings.",
      },
      {
        title: "Plumbing",
        body: "Checks and maintenance of water supply, drainage, water heaters and pumps.",
      },
      {
        title: "Civil / finishing",
        body: "Repairs to painting, plaster, tiling, ceilings and carpentry arising during the contract.",
      },
      {
        title: "Preventive maintenance",
        body: "Planned visits scheduled across the year to inspect and service the agreed equipment.",
      },
      {
        title: "Corrective maintenance",
        body: "A defined route for reporting and repairing faults between scheduled visits.",
      },
      {
        title: "Maintenance reporting",
        body: "Findings and work carried out are recorded, giving owners and managers a clear view of the property's condition.",
      },
      {
        title: "Priority support",
        body: "Contract clients have a direct line to the team that already knows the property.",
      },
    ],
    notes: [
      {
        title: "Scope is everything in an AMC",
        body: "Two contracts with the same title can cover very different things. Compare which equipment is included, how many visits are planned, and what is treated as chargeable repair.",
      },
      {
        title: "Ask what happens between visits",
        body: "Faults do not wait for the next scheduled visit. A good contract defines how issues are reported and how the team responds.",
      },
      {
        title: "Reporting protects you",
        body: "Records of inspections and repairs help with tenancy handovers, warranty discussions and budgeting for replacements.",
      },
    ],
    residential: [
      "Villas and townhouses",
      "Apartments, individually or across a portfolio",
      "Holiday homes and rental properties",
      "Owners who are often away from Dubai",
    ],
    commercial: [
      "Offices",
      "Retail properties",
      "Commercial properties and showrooms",
      "Managed properties and multi-unit buildings",
    ],
    support: {
      heading: "How an AMC proposal works",
      body: "We do not publish fixed AMC prices because the cost depends on the property and equipment. A proposal is prepared after we understand what you have.",
      points: [
        "Site survey or equipment list to define scope",
        "Written proposal setting out inclusions, visits and responsibilities",
        "Clear separation of preventive visits and corrective work",
      ],
    },
    processHeading: "From enquiry to contract",
    process: [
      {
        title: "Property survey",
        body: "We review the property or portfolio and list the equipment and systems to be maintained.",
      },
      {
        title: "Scope & proposal",
        body: "You receive a written proposal covering disciplines, visit frequency, reporting and how corrective work is handled.",
      },
      {
        title: "Scheduled maintenance",
        body: "Preventive visits are carried out through the year to the agreed plan.",
      },
      {
        title: "Review & renewal",
        body: "At renewal we review findings with you and adjust the scope if the property's needs have changed.",
      },
    ],
    relatedProjects: ["arabian-ranches", "palm-villa", "damac-office"],
    relatedProjectsLabel: "Properties we have worked on",
    related: ["property-maintenance", "hvac-air-conditioning", "electrical", "plumbing"],
    faqs: [
      {
        q: "Do you provide Annual Maintenance Contracts?",
        a: "Yes. We provide AMCs for villas, apartments, offices, retail and commercial properties, covering HVAC, electrical, plumbing and finishing.",
      },
      {
        q: "How much does an AMC cost?",
        a: "It depends on the property, the equipment and the scope. We prepare a written proposal after a survey rather than quoting a fixed price blind.",
      },
      {
        q: "What is the difference between preventive and corrective maintenance?",
        a: "Preventive maintenance is scheduled inspection and servicing to avoid failures. Corrective maintenance is repair when something has failed. A good AMC defines how each is handled.",
      },
      {
        q: "Can an AMC cover several properties?",
        a: "Yes. Property managers and landlords can bring multiple units or buildings under a single structured arrangement.",
      },
    ],
    cta: {
      intent: "amc",
      label: "Request an AMC proposal",
      heading: "One contract. Year-round support.",
      body: "Tell us about the property and its systems. We will prepare a proposal around what it actually needs.",
    },
  },

  /* ───────────────────── RENOVATION & FIT-OUT ───────────────────── */
  {
    slug: "renovation-fit-out",
    category: "renovation",
    navLabel: "Renovation & Fit-Out",
    navBlurb: "Villas, apartments, offices and retail — managed end to end",
    title: "Renovation & Fit-Out in Dubai",
    metaTitle: "Villa Renovation & Office Fit-Out Dubai",
    metaDescription:
      "Managed villa renovation, apartment renovation, office and retail fit-out in Dubai — from survey and scoping to coordination, MEP and a clean handover.",
    eyebrow: "Renovation & fit-out",
    heroImage: "/images/palm-jumeirah-villa.jpg",
    heroAlt: "Palm Jumeirah waterfront villa renovation by Flaz",
    lead: "Renovation and fit-out managed from initial survey and scope development through execution, coordination and final handover — by one accountable team.",
    overview: [
      "A renovation succeeds or fails on coordination. The finishes are what you see, but they sit on top of MEP, civil works, approvals and sequencing. Split across separate contractors, small gaps between scopes become delays, disputes and rework.",
      "FLAZ manages the entire project as one team. We survey, define the scope, manage approvals where required, coordinate MEP and finishing trades, keep you updated through the build and hand over cleanly. It is the same approach behind our villa, apartment and commercial projects across Dubai.",
    ],
    capabilityHeading: "What we renovate and fit out",
    capabilities: [
      {
        title: "Villa renovation",
        body: "Full and partial villa renovations, including structural changes, joinery, outdoor areas and technical systems.",
      },
      {
        title: "Apartment renovation",
        body: "Layout changes, kitchens, bathrooms and complete refurbishments in apartments and towers.",
      },
      {
        title: "Office fit-out",
        body: "Workspaces planned for daily use — reception, open work zones, meeting rooms and the services behind them.",
      },
      {
        title: "Retail fit-out",
        body: "Showroom and retail interiors delivered to a brand brief and programme.",
      },
      {
        title: "Interior renovation",
        body: "Interior works across floors, walls, ceilings, joinery and finishes.",
      },
      {
        title: "Design & build",
        body: "A single contract covering design development and delivery, with FF&E coordination.",
      },
      {
        title: "MEP coordination",
        body: "Mechanical, electrical and plumbing works planned with the layout and finishes.",
      },
      {
        title: "Finishing works",
        body: "Tiling, painting, plaster, carpentry, wallpaper and ceilings completed by the same team.",
      },
    ],
    notes: [
      {
        title: "Approvals take planning",
        body: "Many renovations in Dubai need NOCs from the developer, community or authority. Identifying them at survey stage keeps them off the critical path.",
      },
      {
        title: "Fixed scope, written down",
        body: "Our quotations define the agreed scope in writing before work begins, which is what makes variations visible and manageable.",
      },
      {
        title: "You do not need to be on site",
        body: "Photo reports and progress calls mean owners abroad can follow the project without relying on visits.",
      },
    ],
    residential: [
      "Villa transformations in communities such as The Lakes, Arabian Ranches and Palm Jumeirah",
      "Apartment renovations in Dubai Hills and JVC",
      "Studio-to-one-bedroom layout conversions",
      "Outdoor living areas, pool decks and landscaping",
    ],
    commercial: [
      "Office fit-outs in Business Bay and across Dubai",
      "Retail, showroom and restaurant interiors",
      "Partitioning and layout changes",
      "Technical works coordinated with landlord requirements",
    ],
    support: {
      heading: "Warranty & aftercare",
      body: "Our involvement does not end at handover. Any warranty or defects-liability terms are set out in your written agreement, and we can maintain the property afterwards.",
      points: [
        "Warranty terms confirmed in your written agreement",
        "Option to move onto an Annual Maintenance Contract",
        "Same team that built it, available for later changes",
      ],
    },
    processHeading: "The FLAZ delivery process",
    process: [
      {
        title: "Survey & scoping",
        body: "We visit the site, assess the full scope and produce a detailed written quotation. The price and scope are set out in writing before work starts.",
      },
      {
        title: "Dedicated oversight",
        body: "A named project manager as your point of contact.",
      },
      {
        title: "Live progress updates",
        body: "Weekly photo reports and progress calls so you know exactly where the project stands.",
      },
      {
        title: "Clean handover",
        body: "Final walkthrough, snag list cleared and all documentation handed over. Outstanding items are recorded and agreed with you at handover.",
      },
    ],
    relatedProjects: ["villa-lakes", "palm-villa", "fairway-apt", "damac-office"],
    relatedProjectsLabel: "Renovation & fit-out projects",
    related: ["finishing", "mep-technical-services", "property-maintenance", "annual-maintenance-contracts"],
    faqs: [
      {
        q: "Do you handle renovation and fit-out?",
        a: "Yes. We manage villa and apartment renovations, office and retail fit-outs and design-and-build projects from survey through to handover.",
      },
      {
        q: "How long does a project take?",
        a: "It depends on scope. A standard apartment fit-out typically takes 4–8 weeks, while larger villa or commercial projects can range from 2–6 months. You receive a schedule before work begins.",
      },
      {
        q: "Do I need approvals or NOCs?",
        a: "Most renovation and fit-out works in Dubai require NOC approvals from the developer, community or authority. We can help prepare and submit the applications on your behalf where this is within the agreed scope; approvals are issued by the relevant authority and are not guaranteed.",
      },
      {
        q: "Can I live in the property during works?",
        a: "Often yes, depending on scope. For full fit-outs or major civil works we recommend temporarily moving out. We plan this with you at the survey stage.",
      },
      {
        q: "Who manages the project?",
        a: "Each project has a dedicated project manager and site engineer who coordinate the trades and act as your single point of contact.",
      },
    ],
    cta: {
      intent: "quote",
      label: "Get a quote",
      heading: "Planning a renovation or fit-out?",
      body: "Talk to our project team. We will survey the property and define a clear scope.",
    },
  },

  /* ───────────────────────── FINISHING ───────────────────────── */
  {
    slug: "finishing",
    category: "renovation",
    navLabel: "Finishing Services",
    navBlurb: "Tiling, painting, carpentry, ceilings, plaster, wallpaper",
    title: "Finishing Services in Dubai",
    metaTitle: "Finishing Works Dubai — Tiling, Painting, Carpentry & Ceilings",
    metaDescription:
      "Interior finishing works in Dubai: tiling, painting, carpentry and wood flooring, wallpaper, false ceilings, partitions and plaster for villas, apartments and commercial spaces.",
    eyebrow: "Finishing services",
    heroImage: "/images/emirati-majlis.jpg",
    heroAlt: "Finished villa interior with carpentry and ceiling details",
    lead: "Tiling, painting, carpentry, wallpaper, ceilings and plaster — the visible layer of every project, delivered by the same team that coordinates what sits behind it.",
    overview: [
      "Finishes are what clients judge a project by, but they depend entirely on the work beneath them. Tiles laid on an uneven substrate, paint over unprepared plaster, or a ceiling that has to be opened for a late services change all show in the final result.",
      "FLAZ's finishing teams work alongside our MEP and civil teams, so surfaces are prepared properly, services are installed before the finish goes on, and the trades are sequenced to avoid damage and rework.",
    ],
    capabilityHeading: "Finishing capabilities",
    capabilities: [
      {
        title: "Floor & wall tiling",
        body: "Premium materials, precise setting out and cuts, and professional finishes for every surface.",
      },
      {
        title: "Painting contracting",
        body: "Interior and exterior painting with quality coatings and proper surface preparation.",
      },
      {
        title: "Carpentry & wood flooring",
        body: "Custom carpentry, joinery and wood flooring made to the property's specification.",
      },
      {
        title: "Wallpaper fixing",
        body: "Professional installation with careful seam alignment across interior spaces.",
      },
      {
        title: "False ceilings & light partitions",
        body: "Design and installation of false ceilings and partition systems, coordinated with lighting and HVAC.",
      },
      {
        title: "Plaster works",
        body: "Smooth, durable wall and ceiling finishes across all property types.",
      },
    ],
    notes: [
      {
        title: "Preparation decides the finish",
        body: "Most visible defects — cracking paint, lifting tiles, uneven walls — trace back to preparation rather than the finish itself.",
      },
      {
        title: "Services first, finishes second",
        body: "Electrical, plumbing and HVAC should be installed and tested before ceilings are closed and walls finished. This is where a single coordinating team helps most.",
      },
      {
        title: "Match for repairs",
        body: "When finishes are repaired after a technical fix, matching existing materials and sheens requires planning rather than a quick touch-up.",
      },
    ],
    residential: [
      "Villa interiors — joinery, tiling, ceilings and painting",
      "Apartment refurbishments",
      "Outdoor areas and facades",
      "Repairs after leaks or technical works",
    ],
    commercial: [
      "Office and retail interior finishes",
      "False ceilings and partitions for fit-outs",
      "Showroom and restaurant surface finishes",
      "Repainting and refurbishment of commercial units",
    ],
    support: {
      heading: "Finishing repairs & maintenance",
      body: "Finishing teams are also available for repair work, whether after a technical issue or as part of an Annual Maintenance Contract.",
      points: [
        "Repair of paint, plaster, tiling and ceilings",
        "Touch-ups after technical fixes",
        "Finishing scope within an AMC",
      ],
    },
    processHeading: "How finishing is delivered",
    process: standardProcess(
      "We inspect surfaces and substrates and agree materials, finishes and sequencing.",
      "Finishes are inspected against the agreed specification, snags cleared and surfaces handed over clean."
    ),
    relatedProjects: ["fairway-apt", "palm-villa", "arabian-ranches"],
    relatedProjectsLabel: "Projects with finishing scope",
    related: ["renovation-fit-out", "mep-technical-services", "property-maintenance", "annual-maintenance-contracts"],
    faqs: [
      {
        q: "Can you provide finishing without a full renovation?",
        a: "Yes. We carry out standalone tiling, painting, carpentry, ceiling and plaster work as well as finishing within larger projects.",
      },
      {
        q: "Do you supply materials?",
        a: "We can supply and install, or work with materials you or your designer specify. This is agreed in the written quotation.",
      },
      {
        q: "Can you repair finishes after a leak or electrical work?",
        a: "Yes. Because we handle both the technical work and the finishing, repairs are coordinated rather than left to a second contractor.",
      },
    ],
    cta: {
      intent: "quote",
      label: "Get a quote",
      heading: "Need finishing works?",
      body: "Tell us the scope and we will arrange a survey and a written quotation.",
    },
  },
];

export const servicesBySlug = Object.fromEntries(servicePages.map((s) => [s.slug, s]));

export function getService(slug: string) {
  return servicesBySlug[slug];
}
