import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverSourceMaps: false,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
