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
};

export const projects: Project[] = raw as Project[];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
