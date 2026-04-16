import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "http://localhost:3001/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
