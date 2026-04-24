import CompareUniversitiesPage from "@/app/components/pages/compareUniversitiesPage";
import { Suspense } from 'react';

export const metadata = {
  title: "Compare Universities | COP-CMS",
  description: "Compare top universities globally and find the one that fits your dreams and career goals perfectly.",
};

export default function CompareUniversitiesRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FDFDFF]">Loading comparison tool...</div>}>
      <CompareUniversitiesPage />
    </Suspense>
  );
}