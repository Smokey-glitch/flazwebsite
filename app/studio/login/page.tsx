"use client";

import { useState, type FormEvent } from "react";

export default function StudioLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Login failed");
        return;
      }
      // Full page load so the host-aware routing (proxy.ts) resolves the dashboard
      // correctly whether we're on cms.flaztechnicalservices.com or /studio locally.
      const dashboardPath = window.location.pathname.replace(/\/login\/?$/, "") || "/";
      window.location.href = dashboardPath;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#ECEAE6" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 p-10 bg-white rounded-sm"
        style={{ maxWidth: "360px", border: "1px solid rgba(44,44,44,0.1)" }}
      >
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-medium mb-2"
            style={{ color: "var(--flaz-teal)" }}
          >
            Flaz Technical Services
          </p>
          <h1 className="text-[22px] font-medium text-[var(--flaz-dark)]">Studio</h1>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--flaz-dark)]">Password</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-sm px-3 py-2 text-[14px]"
            style={{ borderColor: "rgba(44,44,44,0.15)" }}
          />
        </label>

        {error && <p className="text-[12px] text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !password}
          className="text-[13px] font-medium px-5 py-2.5 rounded-sm text-white transition-colors disabled:opacity-60"
          style={{ backgroundColor: "var(--flaz-teal)" }}
        >
          {submitting ? "Signing in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
