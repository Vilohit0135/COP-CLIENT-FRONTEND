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

        {/* Mobile layout */}
        <div className="md:hidden pb-10">
          {/* Row 1: Logo full width */}
          <div className="mb-6">
            <img src="/logo.svg" alt="CollegeProgram logo" className="h-24 w-auto object-contain" />
          </div>

          {/* Row 2: Social Media Links heading | icons horizontal */}
          <div className="flex items-center justify-between mb-7">
            <h3 className="font-bold text-white" style={{ fontSize: '5vw' }}>Social Media Links</h3>
            <div className="flex items-center gap-5">
              <Link href="#" aria-label="LinkedIn">
                <img src="/LinkedIn.png" alt="LinkedIn" className="w-8 h-8" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <img src="/Facebook.png" alt="Facebook" className="w-8 h-8" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <img src="/Instagram.png" alt="Instagram" className="w-8 h-8" />
              </Link>
              <Link href="#" aria-label="Email">
                <img src="/Gmail.png" alt="Gmail" className="w-8 h-8" />
              </Link>
            </div>
          </div>

          {/* Row 3: Address | Phone */}
          <div className="grid gap-4 mb-7" style={{ gridTemplateColumns: '3fr 2fr' }}>
            <div className="flex items-start gap-2">
              <img src="/SVG.png" alt="Location icon" className="w-6 h-6 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300" style={{ fontSize: '3.5vw', lineHeight: '1.6' }}>
                C/54 Northwest Freeway,<br />Houston, USA 485
              </span>
            </div>
            <div className="flex items-start gap-2">
              <img src="/phone.png" alt="Phone icon" className="w-6 h-6 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 whitespace-nowrap" style={{ fontSize: '3.5vw', lineHeight: '1.6' }}>+152 534-468-854</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-9" style={{ fontSize: '4.5vw', lineHeight: '1.7' }}>
            Discover a world of knowledge and opportunities
            with our online education platform pursue a new
            career.
          </p>

          {/* Useful Links */}
          <div className="mb-9">
            <h3 className="font-bold text-white mb-5" style={{ fontSize: '5vw' }}>Usefull Links</h3>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-3 text-gray-300 hover:text-white transition" style={{ fontSize: '4.5vw' }}>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="mb-2">
            <h3 className="font-bold text-white mb-5" style={{ fontSize: '5vw' }}>Tools for making informed Choices</h3>
            <ul className="space-y-4">
              {toolLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center gap-3 text-gray-300 hover:text-white transition" style={{ fontSize: '4.5vw' }}>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-14 pb-8 sm:pb-10 md:pb-12">
          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <img src="/logo.svg" alt="CollegeProgram logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-gray-300 text-sm leading-6 mb-3">
              Discover a world of knowledge and opportunities
              with our online education platform pursue a new
              career.
            </p>
            <div className="flex items-start gap-3 mb-3">
              <img src="/SVG.png" alt="Location icon" className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                C/54 Northwest Freeway,<br />Houston, USA 485
              </span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/phone.png" alt="Phone icon" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">+152 534-468-854</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-5">Usefull Links</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm">
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-5">Tools for making informed Choices</h3>
            <ul className="space-y-3">
              {toolLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm">
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-5">Social Media Links</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="#" aria-label="LinkedIn">
                <img src="/LinkedIn.png" alt="LinkedIn" className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <img src="/Facebook.png" alt="Facebook" className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <img src="/Instagram.png" alt="Instagram" className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Email">
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
