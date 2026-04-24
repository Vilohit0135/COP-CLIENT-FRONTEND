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
        justifyContent: "center",
        padding: "40px 20px 60px",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "65vw",
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      {/* ── Outer wrapper: Back + Heading above + inner search box ── */}
      <div style={{ width: "100%" }}>

        {/* Back button */}
        <div style={{ marginBottom: 32 }}>
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
              color: "#7C3AED",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: "20px",
            }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            <span>Back</span>
          </button>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              fontWeight: 700,
              fontSize: 32,
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
              fontSize: 16,
              lineHeight: "24px",
              color: "#6B7280",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Discover online courses, universities &amp; specializations.
          </p>
        </div>

        {/* ── Inner search box ── */}
        <div
          style={{
            width: "100%",
            background: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E5E7EB",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.08)",
            padding: "24px 28px",
          }}
        >
          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              padding: "12px 14px",
              background: "#FAFAFA",
            }}
          >
            <SearchIcon style={{ width: 18, height: 18, color: "#9CA3AF", flexShrink: 0 }} />
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
                fontSize: 14,
                color: "#1F2937",
                background: "transparent",
              }}
            />
            <Mic style={{ width: 18, height: 18, color: "#9CA3AF", flexShrink: 0, cursor: "pointer" }} />
          </div>

          {/* Trending Courses */}
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <TrendingUp style={{ width: 16, height: 16, color: "#7C3AED" }} />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#111827",
                }}
              >
                Trending Courses
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {TRENDING_COURSES.map((course) => (
                <button
                  key={course}
                  onClick={() => setQuery(course)}
                  style={{
                    border: "1px solid #D1D5DB",
                    borderRadius: 10,
                    background: "#F9FAFB",
                    padding: "7px 12px",
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
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Sparkles style={{ width: 16, height: 16, color: "#7C3AED" }} />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#111827",
                }}
              >
                In-demand Specializations
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {IN_DEMAND_SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setQuery(spec)}
                  style={{
                    border: "1px solid #D1D5DB",
                    borderRadius: 10,
                    background: "#F9FAFB",
                    padding: "7px 12px",
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
          gap: 12,
          marginTop: 24,
        }}
      >
        <p
          style={{
            fontWeight: 400,
            fontSize: 13,
            color: "#6B7280",
            margin: 0,
          }}
        >
          Or explore by category
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              padding: "8px 24px",
              borderRadius: 8,
              border: "1.5px solid #7C3AED",
              background: "#FFFFFF",
              color: "#7C3AED",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: "20px",
              cursor: "pointer",
              fontFamily: "Inter, Arial, Helvetica, sans-serif",
            }}
          >
            Browse Programs
          </button>
          <button
            style={{
              padding: "8px 24px",
              borderRadius: 8,
              border: "1.5px solid #7C3AED",
              background: "#FFFFFF",
              color: "#7C3AED",
              fontWeight: 600,
              fontSize: 13,
              lineHeight: "20px",
              cursor: "pointer",
              fontFamily: "Inter, Arial, Helvetica, sans-serif",
            }}
          >
            Browse Universities
          </button>
        </div>
      </div>
      </div>{/* ── end 70vw container ── */}
    </div>
  );
}
