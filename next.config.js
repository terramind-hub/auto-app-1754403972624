/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: []
  },
  env: {
    PORT: '4000'
  }
};

module.exports = nextConfig;