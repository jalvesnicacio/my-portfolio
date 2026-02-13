import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Produção
      {
        protocol: "https",
        hostname: "portfolio-api.jalvesnicacio.com",
        pathname: "/uploads/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/uploads/**"
      },
      {
        protocol: "http",
        hostname: "server",
        port: "5001",
        pathname: "/uploads/**"
      }
    ]
  }
};

export default nextConfig;
