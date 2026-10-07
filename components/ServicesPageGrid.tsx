import servicesData from "@/content/services.json";

const { services } = servicesData;

export default function ServicesPageGrid() {
  return (
    <section className="py-14">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3"
            style={{ color: "var(--flaz-teal-text)" }}
          >
            Full scope
          </p>
          <h2
            className="font-medium text-[var(--flaz-dark)] tracking-tight leading-tight"
            style={{ fontSize: "clamp(22px, 3.2vw, 46px)" }}
          >
            Everything under one roof
          </h2>
        </div>
        <p
          className="text-[15px] font-light text-gray-600 leading-relaxed"
          style={{ maxWidth: "38ch" }}
        >
          Every trade, fully coordinated. One team, one contract, zero gaps.
        </p>
      </div>

      {/* Full-width alternating cards */}
      <div className="flex flex-col gap-3 md:gap-4">
        {services.map((service, i) => {
          const imageLeft = i % 2 !== 0;
          return (
            <div
              key={service.index}
              className={`flex overflow-hidden rounded-sm ${imageLeft ? "flex-row-reverse" : "flex-row"}`}
              style={{
                height: "clamp(190px, 22vw, 260px)",
                border: "1px solid rgba(44,44,44,0.09)",
              }}
            >
              {/* Text panel */}
              <div
                className="flex flex-col justify-between shrink-0 px-8 py-7 md:px-10 md:py-8"
                style={{ width: "42%", backgroundColor: "#ffffff" }}
              >
                <div>
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                    style={{
                      border: "1px solid var(--flaz-teal)",
                      color: "var(--flaz-teal-text)",
                    }}
                  >
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-medium text-[var(--flaz-dark)] leading-snug mb-2"
                    style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-light leading-relaxed"
                    style={{ fontSize: "14px", color: "rgba(44,44,44,0.7)" }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Image panel */}
              <div
                className="flex-1 relative overflow-hidden"
                style={{ backgroundColor: "#1d1d1d" }}
              >
                {/* swap for <Image src={service.imageSrc} fill className="object-cover" /> when photos are ready */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: 0.18 }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
