import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "components", "lib"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doeresults.gitam.edu",
      },
    ],
  },
};

export default nextConfig;
