"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const explorePrograms = [
  { label: "PG Courses", href: "/explore-programs?type=PG", icon: (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-3.5l4 2 4-2" /></svg>
  ) },
  { label: "UG Courses", href: "/explore-programs?type=UG", icon: (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
  ) },
  { label: "Diploma", href: "/explore-programs?type=Diploma", icon: (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
  ) },
  { label: "Certificate", href: "/explore-programs?type=Certificate", icon: (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.723 3.066 3.745 3.745 0 01-3.066.723 3.745 3.745 0 01-3.068 1.593 3.745 3.745 0 01-3.068-1.594 3.745 3.745 0 01-3.066-.722 3.745 3.745 0 01-.723-3.067A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.723-3.066 3.745 3.745 0 013.066-.723A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.066.723 3.745 3.745 0 01.723 3.066A3.745 3.745 0 0121 12z" /></svg>
  ) },
  { label: "Executive Programs", href: "/explore-programs?type=Executive", icon: (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
  ) },
  { label: "Doctorate", href: "/explore-programs?type=Doctorate", icon: (
    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
  ) },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-[#7C3AED] text-white text-sm py-2 px-6">
        <div className="flex items-center justify-around max-w-[1440px] mx-auto">
          <span>Extra 40% off sale styles*<strong>Use code</strong></span>
          <span>Extra 40% off sale styles*<strong>Use code</strong></span>
          <span>Extra 40% off sale styles*<strong>Use code</strong></span>
        </div>
      </div>

      <div className="px-3 py-2.5 bg-white">
      <div
        className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-4 h-[70px] text-white"
        style={{
          background: "linear-gradient(90deg, #9D6FDD 0%, #A884F4 55%, #8B5CF6 100%)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.30)",
          boxShadow: "0 8px 32px rgba(157, 111, 221, 0.35)"
        }}
      >

          <Link href="/" className="flex items-center gap-1 flex-shrink-0">
            <img src="/Container%20(40).png" alt="CollegeProgram logo" style={{ width: 75, height: 75, display: "block", borderRadius: 14, flexShrink: 0 }} />
            <span className="font-black text-[20px] leading-[28px]" style={{ letterSpacing: "-0.55px", fontFamily: "'Nunito', sans-serif" }}>CollegeProgram</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-1 font-semibold text-[13px] leading-[19.5px] hover:text-white/80 transition"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Explore Programs
                <svg
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100">
                  {explorePrograms.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition text-sm font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/universities" className="font-semibold text-[13px] leading-[19.5px] hover:text-white/80 transition" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Top Universities
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-0">
              <div className="w-px h-6 bg-white/30 mx-2" />
              <div className="flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 transition px-3 py-1.5">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search programs..."
                  className="bg-transparent outline-none text-sm placeholder-white/70 text-white w-36"
                />
              </div>
              <div className="w-px h-6 bg-white/30 mx-2" />
            </div>

            <button className="hidden sm:flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 text-[13px] leading-[19.5px] font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Compare
            </button>

            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg text-[13px] leading-[19.5px] font-bold shadow" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Talk to Expert
            </button>

            <Link
              href="#"
              className="hidden sm:block rounded-lg border border-white/50 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
