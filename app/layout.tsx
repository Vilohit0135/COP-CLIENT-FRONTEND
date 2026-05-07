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
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
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
        <link rel="preconnect" href="https://cop-backend-js0.onrender.com" />
        <link rel="dns-prefetch" href="https://cop-backend-js0.onrender.com" />
        <link rel="dns-prefetch" href="https://encrypted-tbn0.gstatic.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
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

