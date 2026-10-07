import type { Metadata, Viewport } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
// import FloatingWidget from "@/components/FloatingWidget"; // hidden for now
import ContactModal from "@/components/ContactModal";
import MobileActionBar from "@/components/MobileActionBar";
import ScrollReveal from "@/components/ScrollReveal";
import { JsonLd } from "@/components/blocks";
import { SITE_URL, company } from "@/lib/company";
import { preload } from "react-dom";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flaz Technical Services — MEP, Maintenance & Renovation in Dubai",
    template: "%s | Flaz Technical Services",
  },
  description:
    "Technical services, MEP and property solutions in Dubai. HVAC, electrical, plumbing, maintenance, AMC, renovation and fit-out from one accountable team.",
  applicationName: "Flaz Technical Services",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Flaz Technical Services",
    locale: "en_AE",
    images: [{ url: "/images/palm-jumeirah-villa.jpg" }],
  },
  twitter: { card: "summary_large_image" },
};

// viewport-fit=cover makes env(safe-area-inset-*) available to the fixed bars
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "LocalBusiness"],
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/images/palm-jumeirah-villa.jpg`,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 510 B, 5th Floor, Al Barsha Business Center, Al Barsha 1",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: { "@type": "City", name: "Dubai" },
  description:
    "Technical services, MEP, property maintenance, annual maintenance contracts, renovation and fit-out in Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Above-the-fold brand fonts (Light body text, Medium headings): start loading with the HTML instead of after the CSS
  preload("/fonts/F37%20Blanka%20Light.otf", { as: "font", type: "font/otf", crossOrigin: "anonymous" });
  preload("/fonts/F37%20Blanka%20Medium.otf", { as: "font", type: "font/otf", crossOrigin: "anonymous" });
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans")}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "#ECEAE6" }}>
        <Navbar />
        {/* Spacer to push content below the fixed navbar */}
        <div className="h-[60px] lg:h-[68px] shrink-0" />
        <div style={{ paddingLeft: "clamp(16px, calc(-57px + 19.5vw), 318px)", paddingRight: "clamp(16px, calc(-57px + 19.5vw), 318px)", position: "relative", zIndex: 1 }}>
          {children}
        </div>
        <ContactModal />
        <MobileActionBar />        <ScrollReveal />
        <JsonLd data={orgJsonLd} />
        {/* <FloatingWidget /> hidden for now */}
      </body>
    </html>
  );
}
