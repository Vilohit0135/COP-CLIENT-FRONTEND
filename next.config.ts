import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy /admin/* to cop-cms running on port 3001
      {
        source: "/admin",
        destination: "http://localhost:3001/admin",
      },
      {
        source: "/admin/:path*",
        destination: "http://localhost:3001/admin/:path*",
      },
      // Proxy API calls to cop-backend on port 5000
      {
        source: "/api/admin/:path*",
        destination: "http://localhost:5000/api/admin/:path*",
      },
      {
        source: "/api/public/:path*",
        destination: "http://localhost:5000/api/public/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:5000/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
