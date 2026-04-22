"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const usefulLinks = [
    { label: "Courses", href: "#" },
    { label: "Top Universities", href: "#" },
    { label: "Blogs", href: "#" },
    { label: "Compare Universities", href: "#" },
    { label: "Pricing Plan", href: "#" },
  ];

  const toolLinks = [
    { label: "Time Commitment Estimator", href: "#" },
    { label: "Eligibility Checker", href: "#" },
    { label: "ROI Calculator", href: "#" },
    { label: "Time Commitment Estimator", href: "#" },
    { label: "Eligibility Checker", href: "#" },
  ];

  return (
    <footer className="w-full text-white" style={{ background: "#0D1B2E" }}>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-8 sm:pt-10 md:pt-12 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 pb-8 sm:pb-10 md:pb-12">
          <div className="sm:col-span-2 md:col-span-1 flex flex-col">
            <div className="flex items-start gap-3 mb-0 sm:mb-0">
              <img src="/Container (40).png" alt="CollegeProgram logo" className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl block flex-shrink-0 -mt-7 -ml-5" />
              <span className="font-bold text-lg sm:text-xl leading-tight pt-0">CollegeProgram</span>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-5 sm:leading-6 mb-2 sm:mb-3 mt-0">
              Discover a world of knowledge and opportunities
              with our online education platform pursue a new
              career.
            </p>

            <div className="flex items-start gap-3 mb-3">
              <img src="/SVG.png" alt="Location icon" className="w-5 h-5 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-xs sm:text-sm">
                C/54 Northwest Freeway,<br />Houston, USA 485
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/phone.png" alt="Phone icon" className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-gray-300 text-xs sm:text-sm">+152 534-468-854</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm sm:text-base mb-4 sm:mb-5">Usefull Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-white transition text-xs sm:text-sm">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm sm:text-base mb-4 sm:mb-5">Tools for making informed Choices</h3>
            <ul className="space-y-2 sm:space-y-3">
              {toolLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-white transition text-xs sm:text-sm line-clamp-2">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm sm:text-base mb-4 sm:mb-5">Social Media Links</h3>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <Link href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition">
                <img src="/LinkedIn.png" alt="LinkedIn" className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition">
                <img src="/Facebook.png" alt="Facebook" className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition">
                <img src="/Instagram.png" alt="Instagram" className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Email" className="text-gray-300 hover:text-white transition">
                <img src="/Gmail.png" alt="Gmail" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-center py-4 sm:py-5 text-xs sm:text-sm text-gray-400 gap-2 px-4">
          <span className="text-center sm:text-left">&copy; 2026 CollegeProgram. Design &amp; Developed by</span>
          <img src="/image 15.png" alt="SuperCX" style={{ height: 14, width: "auto" }} className="sm:h-4.5" />
        </div>
      </div>
    </footer>
  );
}
