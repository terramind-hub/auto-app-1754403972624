import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: []
  },
  env: {
    PORT: '4000'
  }
};

export default nextConfig;