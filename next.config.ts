import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '', // Empty for custom domain (CNAME)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
