"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SchemaForm } from "./SchemaForm";
import { PROJECT_FIELDS } from "@/lib/studio-schemas";

type Data = Record<string, unknown>;

export function ProjectEditor({ id }: { id: string }) {
  const router = useRouter();
  const [state, setState] = useState<{ data: Data; sha: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/studio/projects/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load");
        }
        return res.json();
      })
      .then((body) => setState({ data: body.data, sha: body.sha }))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [id]);

  async function handleSubmit(data: Data) {
    if (!state) return;
    const res = await fetch(`/api/studio/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, sha: state.sha }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error ?? "Failed to save");
    setState({ data, sha: body.sha });
  }

  return (
    <div>
      <button
        onClick={() => router.push("/studio/projects")}
        className="text-[12px] mb-6"
        style={{ color: "var(--flaz-teal)" }}
      >
        ← All projects
      </button>
      <h1 className="text-[24px] font-medium text-[var(--flaz-dark)] mb-1">Edit project</h1>
      <p className="text-[12px] text-gray-400 mb-8">{id}</p>
      {error && <p className="text-[13px] text-red-600 mb-4">{error}</p>}
      {!state && !error && <p className="text-[13px] text-gray-400">Loading…</p>}
      {state && (
        <SchemaForm fields={PROJECT_FIELDS} initialData={state.data} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
