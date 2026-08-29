import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
