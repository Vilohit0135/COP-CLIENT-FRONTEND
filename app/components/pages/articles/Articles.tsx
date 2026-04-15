"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Dummy Data (replace with CMS fetch later) ────────────────────────────────

const CATEGORIES = [
  { label: "MBA", icon: "/Icon (4).png" },
  { label: "Technology", icon: "/Icon (5).png" },
  { label: "Business Strategy", icon: "/Icon (6).png" },
  { label: "Marketing", icon: "/Icon (7).png" },
  { label: "Leadership", icon: "/Icon (8).png" },
  { label: "Data Science", icon: "/Icon (9).png" },
];

const ALL_ARTICLES = [
  {
    slug: "top-10-mba-specializations-2026",
    category: "Career Guide",
    date: "March 8, 2026",
    readTime: "8 min read",
    title: "Top 10 MBA Specializations in 2026: Which One is Right for You?",
    description:
      "Explore the most in-demand MBA specializations and discover which one aligns with your career goals and industry trends.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "how-to-balance-work-and-online-learning",
    category: "Study Tips",
    date: "March 5, 2026",
    readTime: "6 min read",
    title: "How to Balance Work and Online Learning: 5 Proven Strategies",
    description:
      "Working professionals share their tips for successfully managing full-time jobs while pursuing online degrees.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "online-mba-admission-process-2026",
    category: "Admission Guide",
    date: "March 2, 2026",
    readTime: "10 min read",
    title: "Online MBA Admission Process 2026: Complete Step-by-Step Guide",
    description:
      "Everything you need to know about applying to top online MBA programs, from eligibility to entrance exams.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
  {
    slug: "top-10-mba-specializations-2026-b",
    category: "Career Guide",
    date: "March 8, 2026",
    readTime: "8 min read",
    title: "Top 10 MBA Specializations in 2026: Which One is Right for You?",
    description:
      "Explore the most in-demand MBA specializations and discover which one aligns with your career goals and industry trends.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "how-to-balance-work-and-online-learning-b",
    category: "Study Tips",
    date: "March 5, 2026",
    readTime: "6 min read",
    title: "How to Balance Work and Online Learning: 5 Proven Strategies",
    description:
      "Working professionals share their tips for successfully managing full-time jobs while pursuing online degrees.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "online-mba-admission-process-2026-b",
    category: "Admission Guide",
    date: "March 2, 2026",
    readTime: "10 min read",
    title: "Online MBA Admission Process 2026: Complete Step-by-Step Guide",
    description:
      "Everything you need to know about applying to top online MBA programs, from eligibility to entrance exams.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
  {
    slug: "is-online-mba-worth-it-2026",
    category: "Career Guide",
    date: "February 28, 2026",
    readTime: "7 min read",
    title: "Is an Online MBA Worth It? Honest Review from 2026 Graduates",
    description:
      "We surveyed 200 online MBA graduates to bring you an unfiltered look at ROI, promotions, and career shifts.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "5-best-note-taking-apps-2026",
    category: "Study Tips",
    date: "February 25, 2026",
    readTime: "5 min read",
    title: "5 Best Note-Taking Apps for Online Students in 2026",
    description:
      "Stay organized and ace your exams with these top-rated digital tools designed specifically for online learners.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "du-sol-admission-2026",
    category: "Admission Guide",
    date: "February 22, 2026",
    readTime: "9 min read",
    title: "Understanding DU-SOL Admission: Eligibility, Process & Fees",
    description:
      "A comprehensive guide to getting into Delhi University's School of Open Learning programs in 2026.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
  {
    slug: "top-companies-hiring-online-mba-2026",
    category: "Career Guide",
    date: "February 20, 2026",
    readTime: "6 min read",
    title: "Top Companies Hiring Online MBA Graduates in India – 2026 List",
    description:
      "Discover which top employers are actively recruiting candidates with online MBA degrees this year.",
    author: "Dr. Priya Sharma",
    image: "/Blogs.png",
  },
  {
    slug: "ai-ml-careers-online-mca",
    category: "Technology",
    date: "February 18, 2026",
    readTime: "8 min read",
    title: "AI & ML Careers: How to Get Started with an Online MCA",
    description:
      "A step-by-step roadmap for transitioning into Artificial Intelligence careers through online MCA programs.",
    author: "Rahul Mehta",
    image: "/Blogs.png",
  },
  {
    slug: "executive-education-vs-mba",
    category: "Leadership",
    date: "February 15, 2026",
    readTime: "7 min read",
    title: "Executive Education vs. MBA: Which Is Right for You?",
    description:
      "Breaking down the differences between short-term executive courses and full-degree MBA programs.",
    author: "Anita Desai",
    image: "/Blogs.png",
  },
];

const ARTICLES_PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(ALL_ARTICLES.length / ARTICLES_PER_PAGE);

// ─────────────────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("MBA");
  const [currentPage, setCurrentPage] = useState(1);

  const pageArticles = ALL_ARTICLES.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Header Section ── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          paddingTop: 40,
          paddingBottom: 24,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Inter",
            fontSize: 36,
            fontWeight: 700,
            lineHeight: "40px",
            color: "#101828",
            margin: "0 0 8px 0",
          }}
        >
          Latest Blogs &amp; Resources
        </h1>
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 20,
            fontWeight: 400,
            lineHeight: "28px",
            color: "#4A5565",
            margin: 0,
          }}
        >
          Expert insights on education and career growth
        </p>
      </div>

      {/* ── Breadcrumb ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          marginBottom: 24,
        }}
      >
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/"
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 400,
              color: "#6B7280",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
          <Link
            href="/articles"
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 500,
              color: "#4F39F6",
              textDecoration: "none",
            }}
          >
            View Articles
          </Link>
          <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 400,
              color: "#6B7280",
            }}
          >
            Article Page
          </span>
        </nav>
      </div>

      {/* ── Main Content: Sidebar + Grid ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
          display: "flex",
          gap: 28,
          alignItems: "flex-start",
        }}
      >
        {/* ── Left Sidebar ── */}
        <aside
          style={{
            width: 200,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: "20px 16px",
              background: "#FFFFFF",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                fontFamily: "Inter",
                fontSize: 18,
                fontWeight: 700,
                color: "#101828",
                lineHeight: "28px",
                margin: "0 0 16px 0",
              }}
            >
              Explore by Category
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.label;
                return (
                  <li key={cat.label}>
                    <button
                      onClick={() => {
                        setActiveCategory(cat.label);
                        setCurrentPage(1);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        background: isActive
                          ? "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)"
                          : "transparent",
                        transition: "background 0.15s",
                      }}
                    >
                      <span style={{ display: "inline-flex", width: 20, height: 20 }}>
                        <Image src={cat.icon} alt={`${cat.label} icon`} width={20} height={20} />
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter",
                          fontSize: 13,
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#FFFFFF" : "#374151",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {cat.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ── Articles Grid ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginBottom: 48,
            }}
          >
            {pageArticles.map((article, idx) => (
              <ArticleCard key={idx} article={article} />
            ))}
          </div>

          {/* ── Pagination ── */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
            {/* Prev */}
            <PaginationBtn
              label="‹"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              active={false}
            />

            {/* Page numbers */}
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
              <PaginationBtn
                key={page}
                label={String(page)}
                onClick={() => handlePageChange(page)}
                disabled={false}
                active={page === currentPage}
              />
            ))}

            {/* Next */}
            <PaginationBtn
              label="›"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === TOTAL_PAGES}
              active={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
}: {
  article: {
    slug: string;
    category: string;
    date: string;
    readTime: string;
    title: string;
    description: string;
    author: string;
    image: string;
  };
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image + category badge */}
      <div style={{ position: "relative", width: "100%", height: 180, flexShrink: 0 }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            color: "#FFFFFF",
            fontFamily: "Inter",
            fontSize: 11,
            fontWeight: 600,
            lineHeight: "16px",
            padding: "4px 12px",
            borderRadius: 9999,
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Date + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "Inter",
              fontSize: 12,
              color: "#6B7280",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {article.date}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "Inter",
              fontSize: 12,
              color: "#6B7280",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "22px",
            color: "#101828",
            margin: "0 0 8px 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "Inter",
            fontSize: 13,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#6B7280",
            margin: "0 0 16px 0",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.description}
        </p>

        {/* Footer: Author + Read link */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 400, color: "#6B7280" }}>
            By{" "}
            <strong style={{ color: "#101828", fontWeight: 600 }}>{article.author}</strong>
          </span>
          <Link
            href={`/articles/${article.slug}`}
            style={{
              fontFamily: "Inter",
              fontSize: 13,
              fontWeight: 600,
              color: "#4F39F6",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Read &#8594;
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── PaginationBtn ────────────────────────────────────────────────────────────

function PaginationBtn({
  label,
  onClick,
  disabled,
  active,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: active ? "none" : "1px solid #E5E7EB",
        background: active
          ? "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)"
          : "#FFFFFF",
        color: active ? "#FFFFFF" : disabled ? "#D1D5DB" : "#374151",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        boxShadow: active ? "0 2px 8px rgba(79,57,246,0.3)" : "none",
      }}
    >
      {label}
    </button>
  );
}
