"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/studio", label: "Dashboard" },
  { href: "/studio/projects", label: "Projects" },
  { href: "/studio/hero", label: "Hero" },
  { href: "/studio/why-us", label: "Why Us" },
  { href: "/studio/approach", label: "How We Work" },
  { href: "/studio/services", label: "Services" },
  { href: "/studio/testimonials", label: "Testimonials" },
  { href: "/studio/faq", label: "FAQ" },
  { href: "/studio/site-settings", label: "Contact & Footer" },
];

export default function StudioDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/studio/logout", { method: "POST" });
    const isCmsHost = window.location.host === "cms.flaztechnicalservices.com";
    window.location.href = isCmsHost ? "/login" : "/studio/login";
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className="w-56 shrink-0 flex flex-col justify-between py-8 px-5"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div>
          <p className="text-white text-[15px] font-medium mb-1">Flaz Studio</p>
          <p className="text-[11px] font-light mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Content editor
          </p>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] px-3 py-2 rounded-sm transition-colors"
                  style={{
                    color: active ? "white" : "rgba(255,255,255,0.55)",
                    backgroundColor: active ? "var(--flaz-teal)" : "transparent",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="text-[12px] text-left transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Log out
        </button>
      </aside>
      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  );
}
