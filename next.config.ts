import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Adjust the value based on your needs
    },
  },
  /* config options here */
};

export default nextConfig;
