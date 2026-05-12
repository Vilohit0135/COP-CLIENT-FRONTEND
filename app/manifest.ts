import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CollegeProgram — Online Degrees from Top Universities",
    short_name: "CollegeProgram",
    description:
      "Discover online degree programs, universities, and courses. Compare options, talk to expert counselors, and find your perfect program.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b3d8c",
    icons: [
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.ico", sizes: "any" },
    ],
  };
}
