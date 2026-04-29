import React from "react";

export default function LoadingUniversities() {
  return (
    <main className="min-h-screen bg-[#FDFCFE] lg:pt-7">
      <div className="max-w-[90vw] mx-auto px-4 py-12 animate-pulse">
        {/* Default Header Skeleton */}
        <div className="text-center mb-16">
          <div className="h-12 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar Skeleton */}
          <aside className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F3F4F6]">
              <div className="h-8 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-8"></div>
              <div className="h-12 w-full bg-gray-200 rounded-xl mb-6"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-14 w-full bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-purple-900/5 border border-purple-50">
                  {/* Banner Skeleton */}
                  <div className="h-48 sm:h-40 bg-gray-200 relative">
                    {/* Logo Skeleton */}
                    <div className="absolute bottom-4 left-4 w-14 h-14 bg-gray-100 rounded-2xl border border-gray-100"></div>
                  </div>
                  
                  {/* Content Skeleton */}
                  <div className="p-5 space-y-4">
                    {/* Title */}
                    <div className="h-6 w-3/4 bg-gray-200 rounded-lg"></div>
                    
                    {/* Rating */}
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                      <div className="flex gap-2">
                        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Highlights */}
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="space-y-3 pt-2">
                      <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="w-full h-10 bg-gray-200 rounded-xl"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
