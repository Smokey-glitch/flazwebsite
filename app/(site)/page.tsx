import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ContactFooter from "@/components/ContactFooter";
import { ServicesGlance, SelectedProjects, WhyAndProcess } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: { absolute: "Technical Services, MEP & Property Solutions in Dubai | Flaz" },
  description:
    "HVAC, electrical, plumbing, property maintenance, AMC, renovation and fit-out in Dubai — one accountable team for your property. Get a quote or WhatsApp Flaz.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesGlance />
      <SelectedProjects />
      <WhyAndProcess />
      <ContactFooter />
    </main>
  );
}
