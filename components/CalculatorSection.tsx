"use client";

import { useState } from "react";

const propertyTypes = ["Villa", "Apartment", "Townhouse", "Commercial"];
const serviceTypes = [
  { label: "Basic", desc: "General maintenance, minor repairs, and inspections" },
  { label: "Standard", desc: "Full electrical, plumbing, and civil works" },
  { label: "TurnKey", desc: "Complete fit-out including finishing and MEP systems" },
];
const bathroomOptions = ["1", "2", "3", "4", "5+"];

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((o) => (
        <label key={o.label} className="flex items-start gap-2.5 cursor-pointer">
          <span
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors"
            style={{
              borderColor: value === o.label ? "var(--flaz-teal)" : "rgba(255,255,255,0.3)",
            }}
          >
            {value === o.label && (
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--flaz-teal)" }} />
            )}
          </span>
          <input
            type="radio"
            name={name}
            value={o.label}
            checked={value === o.label}
            onChange={() => onChange(o.label)}
            className="sr-only"
          />
          <div>
            <span className="text-sm transition-colors" style={{ color: value === o.label ? "var(--flaz-teal)" : "rgba(255,255,255,0.75)" }}>
              {o.label}
            </span>
            {o.desc && value === o.label && (
              <p className="text-white/40 text-xs mt-0.5 leading-snug">{o.desc}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export default function CalculatorSection() {
  const [propertyType, setPropertyType] = useState("Villa");
  const [area, setArea] = useState(100);
  const [bathrooms, setBathrooms] = useState("");
  const [serviceType, setServiceType] = useState("Basic");

  return (
    <section className="py-10">
      <div className="rounded-sm px-4 md:px-10 py-6 md:py-10" style={{ backgroundColor: "#2c2c2c" }}>

        {/* Title */}
        <h2 className="text-white text-xl md:text-2xl font-medium mb-8 tracking-wide">
          Calculate your service cost{" "}
          <span style={{ color: "var(--flaz-teal)" }}>now</span>
        </h2>

        {/* Grid — 1 col mobile, 4 col desktop */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-0">

          {/* Property Type */}
          <div className="border-l-2 border-white/10 pl-4 pr-0 xl:pr-8 xl:border-l-0 xl:border-r border-b xl:border-b-0 border-white/10 pb-4 xl:pb-0 mb-4 xl:mb-0">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Type of a Property</p>
            <RadioGroup
              name="propertyType"
              options={propertyTypes.map((t) => ({ label: t }))}
              value={propertyType}
              onChange={setPropertyType}
            />
          </div>

          {/* Area */}
          <div className="border-l-2 border-white/10 pl-4 pr-0 xl:px-8 xl:border-l-0 xl:border-r border-b xl:border-b-0 border-white/10 pb-4 xl:pb-0 mb-4 xl:mb-0">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="calc-area" className="text-white/60 text-xs uppercase tracking-widest">Area</label>
              <span className="text-white/60 text-xs">sqm</span>
            </div>
            <div className="flex flex-col gap-3">
              <input
                id="calc-area"
                type="range"
                min={100}
                max={2000}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ accentColor: "var(--flaz-teal)" }}
              />
              <div className="flex justify-between text-white/50 text-xs">
                <span>100 m²</span>
                <span className="text-white font-medium">{area} m²</span>
                <span>2000 m²</span>
              </div>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="border-l-2 border-white/10 pl-4 pr-0 xl:px-8 xl:border-l-0 xl:border-r border-b xl:border-b-0 border-white/10 pb-4 xl:pb-0 mb-4 xl:mb-0">
            <label htmlFor="calc-bathrooms" className="block text-white/60 text-xs uppercase tracking-widest mb-3">Number of Bathrooms</label>
            <select
              id="calc-bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full text-sm px-3 py-2.5 rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal)]"
              style={{
                backgroundColor: "#3d3d3d",
                color: bathrooms ? "white" : "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <option value="" disabled>Select</option>
              {bathroomOptions.map((n) => (
                <option key={n} value={n} style={{ color: "white", backgroundColor: "#3d3d3d" }}>{n}</option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div className="border-l-2 border-white/10 pl-5 xl:pl-8 xl:border-l-0">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Type of Service</p>
            <RadioGroup
              name="serviceType"
              options={serviceTypes}
              value={serviceType}
              onChange={setServiceType}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button
            className="w-full md:w-auto px-7 py-3 rounded-sm text-[var(--flaz-dark)] text-sm font-medium tracking-wide transition-colors"
            style={{ backgroundColor: "var(--flaz-teal)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal)")}
          >
            Get the cost
          </button>
        </div>
      </div>
    </section>
  );
}
