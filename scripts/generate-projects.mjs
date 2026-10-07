// Reads content/projects/*.json (edited by hand),
// validates each entry, sorts by `order`, and writes lib/projects.generated.json.
// Runs before `next dev`/`next build` via the predev/prebuild npm hooks — kept out
// of lib/projects.ts itself because that module is imported by "use client" components
// and can't depend on Node built-ins like `fs`.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.join(__dirname, "..", "content", "projects");
const outFile = path.join(__dirname, "..", "lib", "projects.generated.json");

const requiredFields = [
  "id",
  "order",
  "title",
  "desc",
  "shortDesc",
  "image",
  "gallery",
  "tags",
  "area",
  "year",
  "scope",
  "duration",
];

const files = readdirSync(projectsDir).filter((f) => f.endsWith(".json"));

const projects = files.map((file) => {
  const filePath = path.join(projectsDir, file);
  const raw = readFileSync(filePath, "utf-8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error(`content/projects/${file} is not valid JSON: ${err.message}`);
  }

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      throw new Error(`content/projects/${file} is missing required field "${field}"`);
    }
  }

  return data;
});

projects.sort((a, b) => a.order - b.order);

writeFileSync(outFile, JSON.stringify(projects, null, 2) + "\n");
console.log(`Generated lib/projects.generated.json from ${projects.length} project(s).`);
