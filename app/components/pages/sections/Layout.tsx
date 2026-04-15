import React from "react";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

