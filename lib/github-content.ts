const OWNER = "emicstllas";
const REPO = "flazwebsite";
const BRANCH = "master";
const API = "https://api.github.com";

export class GithubConflictError extends Error {}

async function gh(path: string, init?: RequestInit): Promise<Response> {
  const token = process.env.GITHUB_CONTENT_TOKEN;
  if (!token) throw new Error("GITHUB_CONTENT_TOKEN is not set");
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "flaz-studio",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function getFile(
  path: string
): Promise<{ sha: string; content: string } | null> {
  const res = await gh(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  const json = await res.json();
  return { sha: json.sha as string, content: Buffer.from(json.content, "base64").toString("utf-8") };
}

export async function putFile(opts: {
  path: string;
  content: string | Buffer;
  message: string;
  sha?: string;
}): Promise<{ sha: string }> {
  const body = Buffer.isBuffer(opts.content) ? opts.content : Buffer.from(opts.content, "utf-8");
  const res = await gh(`/repos/${OWNER}/${REPO}/contents/${opts.path}`, {
    method: "PUT",
    body: JSON.stringify({
      message: opts.message,
      content: body.toString("base64"),
      sha: opts.sha,
      branch: BRANCH,
    }),
  });
  if (res.status === 409 || res.status === 422) {
    throw new GithubConflictError("Content changed since it was loaded — reload and try again.");
  }
  if (!res.ok) throw new Error(`PUT ${opts.path} failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return { sha: json.content.sha as string };
}

export async function deleteFile(opts: {
  path: string;
  sha: string;
  message: string;
}): Promise<void> {
  const res = await gh(`/repos/${OWNER}/${REPO}/contents/${opts.path}`, {
    method: "DELETE",
    body: JSON.stringify({ message: opts.message, sha: opts.sha, branch: BRANCH }),
  });
  if (res.status === 409) {
    throw new GithubConflictError("Content changed since it was loaded — reload and try again.");
  }
  if (!res.ok) throw new Error(`DELETE ${opts.path} failed: ${res.status}`);
}

export async function listDir(
  path: string
): Promise<{ name: string; path: string; sha: string; type: "file" | "dir" }[]> {
  const res = await gh(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`);
  if (!res.ok) throw new Error(`list ${path} failed: ${res.status}`);
  return res.json();
}
