import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  transpilePackages: ["three"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
