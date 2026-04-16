"use client";

import React from "react";
import { SectionContent, Provider } from "@/app/lib/types";
import SectionRenderer from "@/app/components/SectionRenderer";
import SidebarFilters from "./SidebarFilters";
import UniversityCard from "./UniversityCard";

interface UniversityPageProps {
  sections: SectionContent[];
  providers: Provider[];
}

export default function UniversityPage({ sections, providers }: UniversityPageProps) {
  // Pattern from homepage: pick out a specific section if needed
  // For now we'll just render the sections at the top/bottom and the listing in between
  // Or if there's no specific section setup, we render a default header.

  return (
    <main className="min-h-screen bg-[#FDFCFE]">
      {/* Dynamic Sections (like Hero for this page if it exists in CMS) */}
      {/* <SectionRenderer sections={sections.filter(s => s.sectionIndex === 0)} /> */}

      <div className="max-w-[90vw] mx-auto px-4 py-12">
        {/* Default Header if no sections define it */}
        {sections.length === 0 && (
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Top Universities
            </h1>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
              Explore and compare top-rated universities for online education
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <SidebarFilters />

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8">
              {providers.map((uni) => (
                <UniversityCard key={uni._id} university={uni} />
              ))}

              {/* Placeholder cards if no providers yet to match screenshot exactly */}
              {providers.length === 0 && Array.from({ length: 6 }).map((_, i) => (
                <UniversityCard key={i} university={{ _id: String(i), name: "NMIMS Global Access - School for Continuing Education", slug: "nmims", averageRating: 4.2 } as any} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Remaining CMS Sections */}
      {/* <SectionRenderer sections={sections.filter(s => s.sectionIndex > 0)} /> */}
    </main>
  );
}
