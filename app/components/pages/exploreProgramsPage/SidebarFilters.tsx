"use client";

import React from "react";
import { IconBrain, IconBook, IconNotebook, IconFileCertificate } from '@tabler/icons-react';
import { DegreeType } from "@/app/lib/types";

interface SidebarFiltersProps {
  degreeTypes: DegreeType[];
  selectedDegreeTypeId: string | null;
  onSelectDegreeType: (id: string | null) => void;
}

const icons = [
  <IconBook stroke={2} />,
  <IconNotebook stroke={2} />,
  <IconBrain stroke={2} />,
  <IconFileCertificate stroke={2} />
];

export default function SidebarFilters({
  degreeTypes,
  selectedDegreeTypeId,
  onSelectDegreeType,
}: SidebarFiltersProps) {
  return (
    <aside className="w-full lg:w-[320px] shrink-0 space-y-8">
      {/* Category Section */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-xl border border-[#E5E7EB] ">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Explore by Category</h3>

        <div className="space-y-3">
          <button
            onClick={() => onSelectDegreeType(null)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${selectedDegreeTypeId === null
              ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
              : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
              }`}
          >
            <span className={selectedDegreeTypeId === null ? "text-white" : "text-purple-600"}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            <span className="font-semibold">All Programs</span>
          </button>

          {degreeTypes.map((type, idx) => (
            <button
              key={type._id}
              onClick={() => onSelectDegreeType(type._id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${selectedDegreeTypeId === type._id
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200"
                : "bg-white text-gray-700 border-gray-100 hover:bg-purple-50 hover:border-purple-200"
                }`}
            >
              <span className={selectedDegreeTypeId === type._id ? "text-white" : "text-purple-600"}>
                {icons[idx % icons.length]}
              </span>
              <span className="font-semibold">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Section */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-xl border border-[#E5E7EB] ">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Sort</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-purple-50/50">
            <span className="text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </span>
            <span className="font-semibold text-purple-700">All Programs</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl border border-transparent text-gray-500 hover:bg-gray-50 cursor-pointer">
            <span className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <span className="font-medium">UG Courses</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
