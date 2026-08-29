import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesGridSection from "@/components/ServicesGridSection";
import ProjectsSection from "@/components/ProjectsSection";
import ApproachSection from "@/components/ApproachSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyUsSection />
      <ServicesGridSection />
      <ProjectsSection />
      <ApproachSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFooter />
    </main>
  );
}
