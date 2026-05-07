import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Layout from "./components/pages/sections/Layout";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "CollegeProgram",
  description: "Discover a world of knowledge and opportunities with our online education platform",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${nunito.variable}`}
    >
      <head>
        {/* Backend fetches run server-side (Vercel→Render); browsers never connect directly.
            Preconnecting to onrender.com wastes browser connection budget. */}
        <link rel="dns-prefetch" href="https://encrypted-tbn0.gstatic.com" />
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.pinimg.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Layout>
            {children}
          </Layout>
        </SmoothScroll>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

