import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "lucide-react"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "api.collegesathi.com" },
      { protocol: "https", hostname: "media.collegesathi.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
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
