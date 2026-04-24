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

import { useRouter } from "next/navigation";

export default function SidebarFilters({ selectedToCompare = [] }: { selectedToCompare?: string[] }) {
  const router = useRouter();
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

      {selectedToCompare.length > 0 && (
        <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-xl border border-[#E5E7EB] mt-6 sticky top-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Compare Universities</h2>
          <p className="text-sm text-gray-500 mb-6 font-medium">
            {selectedToCompare.length} selected (max 4)
          </p>
          <button 
            onClick={() => router.push(`/compareUniversities?ids=${selectedToCompare.join(',')}`)}
            disabled={selectedToCompare.length < 2}
            className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 ${
              selectedToCompare.length >= 2 
                ? 'bg-gradient-to-r from-[#4F39F6] to-[#9810FA] hover:scale-[1.02] text-white shadow-purple-600/20 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            {selectedToCompare.length < 2 ? (
              'Select at least 2'
            ) : (
              <>
                Compare Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
