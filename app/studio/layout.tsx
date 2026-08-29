import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Studio — Flaz Technical Services",
  description: "Content editor for the Flaz Technical Services website.",
  robots: { index: false, follow: false },
};

// Independent root layout (Next's "multiple root layouts" pattern) — the studio
// deliberately does NOT inherit app/(site)/layout.tsx's Navbar/padding/ContactModal.
export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full" style={{ backgroundColor: "#ECEAE6" }}>
        {children}
      </body>
    </html>
  );
}
