"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SortableList } from "@/components/studio/SortableList";

type ProjectRow = {
  id: string;
  order: number;
  title: string;
  sha: string;
  [key: string]: unknown;
};

export default function StudioProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/studio/projects")
      .then((res) => res.json())
      .then((body) =>
        setProjects([...(body.projects as ProjectRow[])].sort((a, b) => a.order - b.order))
      )
      .catch(() => setError("Failed to load projects"));
  }, []);

  async function persistOrder(newList: ProjectRow[]) {
    if (!projects) return;
    setSaving(true);
    setError(null);
    try {
      const renumbered = newList.map((p, i) => ({ ...p, order: i + 1 }));
      const changed = renumbered.filter((p) => {
        const original = projects.find((orig) => orig.id === p.id);
        return original && original.order !== p.order;
      });

      const results = await Promise.all(
        changed.map(async (p) => {
          const { sha, ...data } = p;
          const res = await fetch(`/api/studio/projects/${p.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data, sha }),
          });
          const body = await res.json();
          if (!res.ok) throw new Error(body.error ?? "Failed to save order");
          return { id: p.id, sha: body.sha as string };
        })
      );

      setProjects(
        renumbered.map((p) => {
          const updated = results.find((r) => r.id === p.id);
          return updated ? { ...p, sha: updated.sha } : p;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save order");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, sha: string) {
    if (!confirm(`Delete project "${id}"? This can't be undone.`)) return;
    const res = await fetch(`/api/studio/projects/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sha }),
    });
    if (res.ok) {
      setProjects((prev) => prev?.filter((p) => p.id !== id) ?? null);
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[var(--flaz-dark)]">Projects</h1>
        <Link
          href="/studio/projects/new"
          className="text-[13px] font-medium px-4 py-2 rounded-sm text-white"
          style={{ backgroundColor: "var(--flaz-teal)" }}
        >
          + Add project
        </Link>
      </div>

      {error && <p className="text-[13px] text-red-600 mb-4">{error}</p>}
      {saving && <p className="text-[12px] text-gray-400 mb-4">Saving order…</p>}
      {!projects && !error && <p className="text-[13px] text-gray-400">Loading…</p>}

      {projects && (
        <SortableList
          items={projects}
          getId={(p) => p.id}
          onReorder={persistOrder}
          renderItem={(project, _index, dragHandle) => (
            <div
              className="flex items-center justify-between gap-4 border rounded-sm px-4 py-3 bg-white"
              style={{ borderColor: "rgba(44,44,44,0.12)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  {...dragHandle.attributes}
                  {...dragHandle.listeners}
                  className="cursor-grab text-gray-400"
                  aria-label="Drag to reorder"
                >
                  ⠿
                </span>
                <span className="truncate text-[14px] text-[var(--flaz-dark)]">
                  {project.title}
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href={`/studio/projects/${project.id}`}
                  className="text-[12px] font-medium"
                  style={{ color: "var(--flaz-teal)" }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id, project.sha)}
                  className="text-[12px] font-medium text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}
