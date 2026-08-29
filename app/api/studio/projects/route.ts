import { getFile, putFile, listDir, GithubConflictError } from "@/lib/github-content";

const DIR = "content/projects";

export async function GET() {
  try {
    const entries = await listDir(DIR);
    const files = entries.filter((e) => e.type === "file" && e.name.endsWith(".json"));

    const projects = await Promise.all(
      files.map(async (entry) => {
        const file = await getFile(entry.path);
        if (!file) return null;
        return { ...JSON.parse(file.content), sha: file.sha };
      })
    );

    return Response.json({
      projects: projects.filter((p): p is NonNullable<typeof p> => p !== null),
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load projects" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.id !== "string" || !body.id) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const id = body.id.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  if (!id) return Response.json({ error: "Invalid project id" }, { status: 400 });

  try {
    const { sha } = await putFile({
      path: `${DIR}/${id}.json`,
      content: JSON.stringify({ ...body, id }, null, 2) + "\n",
      message: `Add project "${id}" via studio`,
    });
    return Response.json({ ok: true, id, sha });
  } catch (err) {
    if (err instanceof GithubConflictError) {
      return Response.json({ error: "A project with that ID already exists" }, { status: 409 });
    }
    console.error(err);
    return Response.json({ error: "Failed to create project" }, { status: 502 });
  }
}
