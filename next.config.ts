import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first (WebP fallback) is noticeably smaller for the photo-heavy pages.
    formats: ["image/avif", "image/webp"],
    // 60 is used for the full-bleed hero photo (it sits under a dark scrim); everything else stays at the default 75.
    qualities: [60, 75],
    // Adds 1280/1440/1680/2560 so common laptop and retina widths no longer jump to a much larger candidate
    // (previously 1280px -> 1920w, retina 1280px -> 3840w).
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1680, 1920, 2560, 3840],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
