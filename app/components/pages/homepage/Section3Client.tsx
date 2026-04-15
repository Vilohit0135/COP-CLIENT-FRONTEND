"use client";

import { useState } from "react";
import Link from "next/link";

// Navbar tabs for different course types
const TABS = [
  { id: "pg", label: "PG Courses" },
  { id: "ug", label: "UG Courses" },
  { id: "diploma", label: "Diploma" },
  { id: "certificate", label: "Certificate" },
  { id: "executive", label: "Executive Programs" },
  { id: "doctorate", label: "Doctorate" },
];

export default function Section3Client() {
  const [activeTab, setActiveTab] = useState("pg");

  return (
    <>
      {/* Navbar with right-aligned "View all Courses" link */}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 overflow-x-auto ml-20">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-6 flex-shrink-0">
          <Link href="/courses" className="text-purple-600 underline whitespace-nowrap">
            View all Courses
          </Link>
        </div>
      </div>

      {/* Course Cards Grid - 3 cards per tab */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Placeholder Image */}
            <div className="w-full h-48 bg-gray-200" />

            {/* Card Content */}
            <div className="p-5">
              <div className="h-6 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-100 rounded mb-4 w-3/4" />
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-100 rounded" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <div className="h-3 bg-gray-100 rounded w-24" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
              <div className="h-3 bg-gray-100 rounded w-32 mb-4" />
              <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                Explore &gt;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button (navigates to courses filtered by active tab) */}
      <div className="mt-12 flex justify-center">
        <Link
          href={`/courses?tab=${activeTab}`}
          className="text-white font-semibold transition-all flex items-center justify-center"
          style={{
            width: "240px",
            height: "56px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            textDecoration: "none",
            fontFamily: "Inter",
            fontSize: "16px",
          }}
        >
          View All {TABS.find((t) => t.id === activeTab)?.label}
        </Link>
      </div>
    </>
  );
}
