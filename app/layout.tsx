import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "./components/pages/sections/Layout";
import OAuthProvider from "./components/providers/OAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollegeProgram",
  description: "Discover a world of knowledge and opportunities with our online education platform",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OAuthProvider>
          <Layout>
            <div className="pt-10">{children}</div>
          </Layout>
          <Toaster position="top-center" />
        </OAuthProvider>
      </body>
    </html>
  );
}

