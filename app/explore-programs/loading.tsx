import React from "react";
import { IconArrowLeft, IconZoom } from "@tabler/icons-react";

export default function LoadingExplorePrograms() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] pt-7">
      {/* Hero / Header Section Skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[87vw] mx-auto py-8 animate-pulse">
          <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      <div className="max-w-[90vw] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar Skeleton */}
          <div className="w-full lg:w-72 flex-shrink-0 animate-pulse">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
              <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-gray-200"></div>
                    <div className="h-5 w-40 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 space-y-8 animate-pulse">
            {/* Search Bar Skeleton */}
            <div className="w-full h-14 rounded-2xl bg-white border border-[#D1D5DC] shadow-sm"></div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#FFFFFF] rounded-2xl px-4 py-4 border border-[#E5E7EB] shadow-xl flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                  <div>
                    <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-2"></div>
                    <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
