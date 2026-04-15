import { IconBook, IconBrain, IconFileCertificate, IconRosetteDiscountCheck, IconBriefcase } from "@tabler/icons-react";
import React from "react";

const categories = [
  {
    label: "PG Courses",
    icon: (
      <IconBrain stroke={2} />
    ),
  },
  {
    label: "UG Courses",
    icon: (
      <IconBook stroke={2} />
    ),
  },
  {
    label: "Diploma",
    icon: (
      <IconFileCertificate stroke={2} />
    ),
  },
  {
    label: "Certificate",
    icon: (
      <IconRosetteDiscountCheck stroke={2} />
    ),
  },
  {
    label: "Executive Programs",
    icon: (
      <IconBriefcase stroke={2} />
    ),
  },
];

export default function SidebarFilters() {
  return (
    <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
      <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-xl border border-[#E5E7EB]">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search university here..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#D1D5DC] outline-none focus:border-purple-600 focus:bg-white transition-all text-sm"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Courses & Specializations</h3>
          <div className="space-y-2.5">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-white hover:bg-purple-50 hover:border-purple-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="text-[15px] font-semibold text-gray-700">{cat.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
