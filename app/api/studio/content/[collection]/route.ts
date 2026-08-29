import { getFile, putFile, GithubConflictError } from "@/lib/github-content";
import { COLLECTIONS } from "@/lib/studio-schemas";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const def = COLLECTIONS[collection];
  if (!def) return Response.json({ error: "Unknown collection" }, { status: 404 });

  try {
    const file = await getFile(def.path);
    if (!file) return Response.json({ error: "Content file not found" }, { status: 404 });
    return Response.json({ data: JSON.parse(file.content), sha: file.sha });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load content" }, { status: 502 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const def = COLLECTIONS[collection];
  if (!def) return Response.json({ error: "Unknown collection" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("data" in body) || !("sha" in body)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const { sha } = await putFile({
      path: def.path,
      content: JSON.stringify(body.data, null, 2) + "\n",
      message: `Update ${def.title} via studio`,
      sha: body.sha,
    });
    return Response.json({ ok: true, sha });
  } catch (err) {
    if (err instanceof GithubConflictError) {
      return Response.json({ error: err.message }, { status: 409 });
    }
    console.error(err);
    return Response.json({ error: "Failed to save" }, { status: 502 });
  }
}
