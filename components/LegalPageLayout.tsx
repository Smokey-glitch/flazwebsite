export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-14">
      <p
        className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4"
        style={{ color: "var(--flaz-teal)" }}
      >
        {eyebrow}
      </p>
      <h1
        className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight mb-3"
        style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
      >
        {title}
      </h1>
      <p className="text-[13px] font-light text-gray-400 mb-12">Last updated: {lastUpdated}</p>
      <div className="flex flex-col gap-10" style={{ maxWidth: "68ch" }}>
        {children}
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="font-medium text-[var(--flaz-dark)] mb-3"
        style={{ fontSize: "clamp(17px, 1.8vw, 21px)" }}
      >
        {title}
      </h2>
      <div
        className="font-light text-gray-500 leading-relaxed flex flex-col gap-3"
        style={{ fontSize: "15px" }}
      >
        {children}
      </div>
    </section>
  );
}
