"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search as SearchIcon, Mic, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";

// ─── Dummy data (replace with CMS fetch later) ───────────────────────────────

const TRENDING_COURSES = [
  "Online MBA",
  "Online BBA",
  "Online BCA",
  "1-year Online MBA",
  "Dual MBA",
];

const IN_DEMAND_SPECIALIZATIONS = [
  "Online MCA in Artificial Intelligence & Machine Learning",
  "Business Analytics",
  "Online MBA in Digital Marketing",
  "Online MCA in Cyber Security",
  "Online MBA in FinTech",
  "Healthcare and Hospital Administration",
  "IT Management",
  "Online MBA in Logistics & Supply Chain Management",
  "Online MBA in Marketing Management",
  "Operations Management",
];

// ─────────────────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3EEFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 16px 80px",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      {/* ── Outer wrapper: Back + Heading above + inner search box ── */}
      <div style={{ width: "100%", maxWidth: 1079 }}>

        {/* Back button + Heading row (three-column layout) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {/* Left column: Back control (keeps left alignment) */}
          <div style={{ flex: "0 0 auto" }}>
            <button
              onClick={() => router.back()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                padding: 0,
                border: "none",
                cursor: "pointer",
                color: "#6D28D9",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} />
              <span style={{ marginLeft: 4 }}>Back</span>
            </button>
          </div>

          {/* Center column: Heading */}
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 722, textAlign: "center" }}>
              <h1
                style={{
                  fontWeight: 700,
                  fontSize: 36,
                  lineHeight: "40px",
                  color: "#101828",
                  margin: 0,
                }}
              >
                Find your path with the right information!
              </h1>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "28px",
                  color: "#4A5565",
                  marginTop: 6,
                  marginBottom: 0,
                }}
              >
                Discover online courses, universities &amp; specializations.
              </p>
            </div>
          </div>

          {/* Right column: spacer to balance left */}
          <div style={{ flex: "0 0 120px" }} />
        </div>

        {/* ── Inner search box (1079×484, solid border, drop shadows) ── */}
        <div
          style={{
            width: "100%",
            minHeight: 484,
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow:
              "0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)",
            padding: "20px 32px 20px",
          }}
        >
          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1.5px solid #E2E8F0",
              borderRadius: 12,
              padding: "10px 16px",
              background: "#FFFFFF",
              boxShadow: "0px 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <SearchIcon style={{ width: 18, height: 18, color: "#94A3B8", flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search "University"'
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontFamily: "Inter, Arial, Helvetica, sans-serif",
                fontSize: 15,
                color: "#0F172A",
                background: "transparent",
              }}
            />
            <Mic style={{ width: 18, height: 18, color: "#94A3B8", flexShrink: 0, cursor: "pointer" }} />
          </div>

          {/* Trending Courses */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <TrendingUp style={{ width: 18, height: 18, color: "#7C3AED" }} />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#0F172A",
                }}
              >
                Trending Courses
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                rowGap: 10,
                columnGap: 8,
                alignContent: "space-between",
                paddingBottom: 8,
              }}
            >
              {TRENDING_COURSES.map((course) => (
                <button
                  key={course}
                  onClick={() => setQuery(course)}
                  style={{
                    border: "1px solid #E6E7EB",
                    borderRadius: 12,
                    background: "#F8FAFC",
                    padding: "8px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#374151",
                    cursor: "pointer",
                    fontFamily: "Inter, Arial, Helvetica, sans-serif",
                    lineHeight: "20px",
                  }}
                >
                  {course}
                </button>
              ))}
            </div>
          </div>

          {/* In-demand Specializations */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Sparkles style={{ width: 18, height: 18, color: "#7C3AED" }} />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#0F172A",
                }}
              >
                In-demand Specializations
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                rowGap: 10,
                columnGap: 8,
                alignContent: "space-between",
                paddingBottom: 8,
              }}
            >
              {IN_DEMAND_SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setQuery(spec)}
                  style={{
                    border: "1px solid #E6E7EB",
                    borderRadius: 12,
                    background: "#F8FAFC",
                    padding: "8px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#374151",
                    cursor: "pointer",
                    fontFamily: "Inter, Arial, Helvetica, sans-serif",
                    lineHeight: "20px",
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* ── end inner search box ── */}
      </div>
      {/* ── end outer wrapper ── */}

      {/* ── Browse categories: outside the search box, on lavender bg ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 28,
        }}
      >
        <p
          style={{
            fontWeight: 400,
            fontSize: 14,
            color: "#64748B",
            margin: 0,
          }}
        >
          Or explore by category
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              padding: "10px 28px",
              borderRadius: 8,
              border: "1.5px solid #7C3AED",
              background: "#FFFFFF",
              color: "#7C3AED",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: "20px",
              cursor: "pointer",
              fontFamily: "Inter, Arial, Helvetica, sans-serif",
              boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.06), 0px 2px 4px -2px rgba(0,0,0,0.06)",
            }}
          >
            Browse Programs
          </button>
          <button
            style={{
              padding: "10px 28px",
              borderRadius: 8,
              border: "1.5px solid #7C3AED",
              background: "#FFFFFF",
              color: "#7C3AED",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: "20px",
              cursor: "pointer",
              fontFamily: "Inter, Arial, Helvetica, sans-serif",
              boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.06), 0px 2px 4px -2px rgba(0,0,0,0.06)",
            }}
          >
            Browse Universities
          </button>
        </div>
      </div>
    </div>
  );
}
