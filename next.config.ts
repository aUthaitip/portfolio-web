import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  experimental: { turbopackFileSystemCacheForDev: false },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/th',
        destination: '/',
      },
      {
        source: '/th/:path*',
        destination: '/:path*',
      },
      {
        source: '/en',
        destination: '/',
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
