import Link from "next/link";
import { COLLECTIONS } from "@/lib/studio-schemas";

const SECTIONS = [
  { href: "/studio/projects", title: "Projects", desc: "Portfolio case studies — add, edit, reorder." },
  ...Object.values(COLLECTIONS).map((def) => ({
    href: `/studio/${def.key}`,
    title: def.title,
    desc: `Edit the ${def.title.toLowerCase()} section.`,
  })),
];

export default function StudioDashboardPage() {
  return (
    <div>
      <h1 className="text-[24px] font-medium text-[var(--flaz-dark)] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-5 rounded-sm border transition-colors hover:border-[var(--flaz-teal)]"
            style={{ borderColor: "rgba(44,44,44,0.12)", backgroundColor: "white" }}
          >
            <p className="text-[14px] font-medium text-[var(--flaz-dark)] mb-1">{section.title}</p>
            <p className="text-[12px] text-gray-400">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
