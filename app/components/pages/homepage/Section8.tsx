"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState } from "react";
import Image from "next/image";

interface Section8Props {
  section: SectionContent;
}

export default function Section8({ section }: Section8Props) {
  const v = section.values || {};
  const [activeSlide, setActiveSlide] = useState(0);

  const getFieldValue = (aliases: string[], fallback = "") => {
    for (const a of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === a.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const pill = getFieldValue(["Pill", "Badge", "pill", "badge"], "STUDENT TESTIMONIALS");
  const mainHeading = getFieldValue(["Main Heading", "Title", "Main Title", "heading"], "Trusted Because We Don't Sell Your Number");
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "Subheading", "Description"],
    "Because we respect your privacy, not exploit it."
  );

  const cards = [
    {
      quote: getFieldValue(
        ["First Card", "first card", "Card 1", "card1"],
        "Finally, a platform that doesn't spam! I compared 5 MBAs without a single call. When I was ready, I invited them — and they called exactly when scheduled."
      ),
      name: "Rahul Sharma",
      degree: "MBA Student",
      university: "IIMS",
      // use an existing public image as a safe placeholder to avoid 404s
      avatar: "/Girl.png",
    },
    {
      quote: getFieldValue(
        ["Second Card", "second card", "Card 2", "card2"],
        "The honest downsides section saved me from making a costly mistake. They showed me Manipal's proctored exams wouldn't work with my 12-hour shifts."
      ),
      name: "Priya Nair",
      degree: "MCA Student",
      university: "ALTIUS",
      avatar: "/image 15.png",
    },
    {
      quote: getFieldValue(
        ["Third Card", "third card", "Card 3", "card3"],
        "I was skeptical at first. But no calls, no pressure. Just clean data. When I asked for validation, their expert called in 2 hours — very professional."
      ),
      name: "Aditya Patel",
      degree: "BBA Student",
      university: "LPU",
      avatar: "/Container (40).png",
    },
  ];

  const totalDots = 4;
  const prev = () => setActiveSlide((p) => (p - 1 + totalDots) % totalDots);
  const next = () => setActiveSlide((p) => (p + 1) % totalDots);

  return (
    <section style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "64px", paddingBottom: "64px" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <span
            style={{
              background: "#EEF2FF",
              color: "#4F39F6",
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: "20px",
              letterSpacing: "0.7px",
              textTransform: "uppercase",
              width: 253,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
            }}
          >
            {pill}
          </span>
        </div>

        {/* Main Heading */}
        <h2
          style={{
            fontFamily: "Inter",
            fontSize: 36,
            fontWeight: 800,
            lineHeight: "40px",
            letterSpacing: "0px",
            color: "#101828",
            textAlign: "center",
            margin: "0 0 12px 0",
          }}
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: "24px",
            color: "#6A7282",
            textAlign: "center",
            margin: "0 0 48px 0",
          }}
        >
          {belowHeading}
        </p>

        {/* Carousel: Arrows + Cards */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "220px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                {/* Quote mark + text */}
                <div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 48,
                      lineHeight: "1",
                      color: "#E5E7EB",
                      marginBottom: "8px",
                      userSelect: "none",
                    }}
                  >
                    &ldquo;
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter",
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "22px",
                      color: "#374151",
                      margin: 0,
                    }}
                  >
                    {card.quote}
                  </p>
                </div>

                {/* Author row */}
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {/* Avatar */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: "#E5E7EB",
                          flexShrink: 0,
                          position: "relative",
                        }}
                      >
                        <Image
                          src={card.avatar}
                          alt={card.name}
                          fill
                          sizes="40px"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            const img = e?.target as HTMLImageElement | null;
                            if (img) img.style.display = "none";
                          }}
                        />
                      </div>
                      {/* Name + Degree */}
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#101828",
                            lineHeight: "20px",
                          }}
                        >
                          {card.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter",
                            fontSize: 12,
                            fontWeight: 400,
                            color: "#6B7280",
                            lineHeight: "16px",
                          }}
                        >
                          {card.degree}
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn icon */}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        background: "#0077B5",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                  </div>

                  {/* University */}
                  <div
                    style={{
                      textAlign: "right",
                      fontFamily: "Inter",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#9CA3AF",
                      marginTop: "8px",
                    }}
                  >
                    {card.university}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "24px" }}>
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === activeSlide ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === activeSlide ? "#4F39F6" : "#D1D5DB",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.2s ease, background 0.2s ease",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export const usedFields = [
  "Pill",
  "Badge",
  "pill",
  "badge",
  "Main Heading",
  "Title",
  "Main Title",
  "heading",
  "Below Main Heading",
  "below main heading",
  "Subtitle",
  "Subheading",
  "Description",
  "First Card",
  "first card",
  "Card 1",
  "card1",
  "Second Card",
  "second card",
  "Card 2",
  "card2",
  "Third Card",
  "third card",
  "Card 3",
  "card3",
];
