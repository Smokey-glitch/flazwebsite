import raw from "./projects.generated.json";

export type Project = {
  id: string;
  title: string;
  desc: string;
  shortDesc: string;
  image: string;
  beforeImage?: string;
  gallery: string[];
  tags: string[];
  area: string;
  year: string;
  scope: string;
  duration: string;
  /** Optional case-study fields — only populate with verified facts about the project. */
  propertyType?: string;
  objective?: string;
  challenge?: string;
  execution?: string;
  result?: string;
};

export const projects: Project[] = raw as Project[];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

const SERVICE_KEYWORDS: [RegExp, string][] = [
  [/mep/i, "mep-technical-services"],
  [/hvac|air.?con/i, "hvac-air-conditioning"],
  [/electric/i, "electrical"],
  [/plumb/i, "plumbing"],
  [/renovat|fit-?out|design|build|structural|outdoor|pool|landscap/i, "renovation-fit-out"],
  [/joinery|cabinet|partition|stone|ceiling|paint|tiling|plaster/i, "finishing"],
];

/** Service pages relevant to a project, derived from its scope and tags. */
export function serviceSlugsFor(project: Project): string[] {
  const text = `${project.scope} ${project.tags.join(" ")}`;
  return SERVICE_KEYWORDS.filter(([re]) => re.test(text)).map(([, slug]) => slug);
}

/** Scope items that are technical (MEP) works. */
export function technicalScopeItems(project: Project): string[] {
  return project.scope.split(",").map((i) => i.trim()).filter((i) => /mep|plumb|hvac|electric|air.?con/i.test(i));
}
