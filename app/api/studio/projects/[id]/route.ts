import { getFile, putFile, deleteFile, GithubConflictError } from "@/lib/github-content";

function pathFor(id: string) {
  return `content/projects/${id}.json`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const file = await getFile(pathFor(id));
    if (!file) return Response.json({ error: "Project not found" }, { status: 404 });
    return Response.json({ data: JSON.parse(file.content), sha: file.sha });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load project" }, { status: 502 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("data" in body) || !("sha" in body)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const { sha } = await putFile({
      path: pathFor(id),
      content: JSON.stringify({ ...body.data, id }, null, 2) + "\n",
      message: `Update project "${id}" via studio`,
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.sha !== "string") {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await deleteFile({ path: pathFor(id), sha: body.sha, message: `Delete project "${id}" via studio` });
    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof GithubConflictError) {
      return Response.json({ error: err.message }, { status: 409 });
    }
    console.error(err);
    return Response.json({ error: "Failed to delete" }, { status: 502 });
  }
}
