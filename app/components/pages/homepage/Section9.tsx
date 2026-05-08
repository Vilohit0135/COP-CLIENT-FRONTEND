"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import Image from "next/image";
import Link from "next/link";
import FocusCenterSlider from "./FocusCenterSlider";
import TrendingBadge from "@/app/components/ui/TrendingBadge";

interface Section9Props {
  section: SectionContent;
}

// Parse article textarea: split into title and description
function parseArticle(raw: string): { title: string; description: string } {
  const text = raw.trim();
  if (!text) return { title: "", description: "" };

  // Try newline split first
  const newlineIdx = text.indexOf("\n");
  if (newlineIdx > 0) {
    return { title: text.slice(0, newlineIdx).trim(), description: text.slice(newlineIdx + 1).trim() };
  }
  // Split at "? " after at least 10 chars
  const qIdx = text.indexOf("? ");
  if (qIdx > 10) {
    return { title: text.slice(0, qIdx + 1).trim(), description: text.slice(qIdx + 2).trim() };
  }
  // Split at first ". " after at least 30 chars
  for (let i = 30; i < text.length - 1; i++) {
    if (text[i] === "." && text[i + 1] === " ") {
      return { title: text.slice(0, i + 1).trim(), description: text.slice(i + 2).trim() };
    }
  }
  // Fallback: whole text is title
  return { title: text, description: "" };
}

const DEFAULT_ARTICLES = [
  {
    slug: "top-10-mba-specializations-2026",
    category: "Career Guide",
    date: "March 8, 2026",
    readTime: "8 min read",
    title: "Top 10 MBA Specializations in 2026: Which One is Right for You?",
    description:
      "Explore the most in-demand MBA specializations and discover which one aligns with your career goals and industry trends.",
    author: "Dr. Priya Sharma",
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
  },
  {
    slug: "best-online-universities-india-2026",
    category: "University Guide",
    date: "February 28, 2026",
    readTime: "7 min read",
    title: "Best Online Universities in India 2026: Rankings & Reviews",
    description:
      "A comprehensive ranking of India's top online universities based on faculty, placement support, and student satisfaction.",
    author: "Anita Desai",
  },
];

export default function Section9({ section }: Section9Props) {
  const v = section.values || {};

  const getFieldValue = (aliases: string[], fallback = ""): string => {
    for (const alias of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const pill = getFieldValue(["Pill", "pill", "Badge", "badge"], "KNOWLEDGE CENTRE");
  const mainHeading = getFieldValue(
    ["Main Heading", "main heading", "Title", "title", "heading"],
    "Latest Blogs & Resources"
  );
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "subtitle", "Description", "description"],
    "Expert insights on education and career growth"
  );

  // Known non-article fields to skip when scanning for article content
  const NON_ARTICLE_KEYS = new Set([
    "pill", "badge", "main heading", "title", "heading",
    "below main heading", "subtitle", "description",
  ]);

  // First try explicit aliases, then fall back to scanning ALL string values
  // in the section that aren't header fields — this way any field name works.
  const articleAliasGroups = [
    ["First Article", "first article", "Article 1", "article1", "article_1"],
    ["Second Article", "second article", "Article 2", "article2", "article_2"],
    ["Third Article", "third article", "Article 3", "article3", "article_3"],
    ["Fourth Article", "fourth article", "Article 4", "article4", "article_4"],
  ];

  // Collect raw article strings: try aliases first, then pick up any remaining
  // non-header textarea values in field order.
  const aliasHits = articleAliasGroups.map((aliases) => getFieldValue(aliases, ""));
  const anyAliasMatched = aliasHits.some(Boolean);

  let rawArticleValues: string[];
  if (anyAliasMatched) {
    rawArticleValues = aliasHits;
  } else {
    // No alias matched — collect every non-empty string value whose key isn't a header field
    rawArticleValues = Object.keys(v)
      .filter((k) => !NON_ARTICLE_KEYS.has(k.toLowerCase()))
      .map((k) => richTextToPlain(v[k]).trim())
      .filter(Boolean)
      .slice(0, 4);
  }

  const articles = rawArticleValues.length > 0
    ? rawArticleValues.map((raw, i) => {
      const parsed = parseArticle(raw);
      const def = DEFAULT_ARTICLES[i] || DEFAULT_ARTICLES[0];
      return {
        ...def,
        title: parsed.title || def.title,
        description: parsed.description || def.description,
      };
    })
    : DEFAULT_ARTICLES;

  return (
    <section className="w-full py-[clamp(32px,6vw,64px)]">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Pill */}
        <div className="flex justify-center mb-5">
          <span
            className="bg-[#EEF2FF] text-[#4F39F6] font-['Inter'] text-[clamp(11px, 2.6vw, 14px)] font-bold leading-5 tracking-[0.7px] uppercase py-2.5 px-[22px] min-h-[44px] max-w-full whitespace-nowrap inline-flex items-center justify-center rounded-full"
          >
            {pill}
          </span>
        </div>

        {/* Main Heading */}
        <h2
          className="font-['Inter'] text-[clamp(22px,5vw,36px)] font-bold leading-[1.2] tracking-normal text-[#101828] text-center mb-3"
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          className="font-['Inter'] text-[clamp(14px, 4vw, 20px)] font-normal leading-7 tracking-normal text-[#4A5565] text-center mb-12"
        >
          {belowHeading}
        </p>

        {/* Mobile: focus-center slider */}
        <FocusCenterSlider className="mt-8 mb-8" cardWidth={280}>
          {articles.map((article, idx) => (
            <div
              key={`m9-${idx}`}
              className="bg-[#FFFFFF] flex flex-col h-full overflow-hidden min-h-[360px] rounded-[20px]"
            >
              <div className="relative w-full h-40 shrink-0">
                <Image src="/Blogs.webp" alt={article.title} fill sizes="280px" className="object-cover" />
                <span className="absolute top-3 left-3 bg-[#4F39F6]/90 backdrop-blur-md text-white font-['Inter'] text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">{article.category}</span>
              </div>
              <div className="p-5 flex flex-col gap-2.5 flex-1">
                <div className="font-['Inter'] text-[11px] text-[#64748B] font-medium flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {article.date} · {article.readTime}
                </div>
                <h3 className="font-['Inter'] text-base font-bold text-[#101828] leading-[22px] m-0 line-clamp-2">{article.title}</h3>
                <p className="font-['Inter'] text-[13px] text-[#6B7280] leading-[19px] m-0 line-clamp-2">{article.description}</p>
                <Link href={`/articles/${article.slug}`} className="hover:opacity-70 transition-opacity duration-200 mt-auto pt-2 font-['Inter'] text-[13px] font-bold text-[#4F39F6] no-underline flex items-center gap-1 cursor-pointer">Read More <span className="text-base">→</span></Link>
              </div>
            </div>
          ))}
        </FocusCenterSlider>

        {/* Desktop: Cards Grid — 2 cols on tablet, 4 cols on desktop */}
        <div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-[clamp(16px,2.5vw,24px)] mb-12"
        >
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white border border-[#E5E7EB] overflow-hidden flex flex-col"
            >
              {/* Image with category badge overlay */}
              <div className="relative w-full h-40 shrink-0">
                <Image
                  src="/Blogs.webp"
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <TrendingBadge
                  icon={null}
                  className="absolute top-3 left-3 !px-3 !py-0.5 text-[11px] font-semibold"
                >
                  {article.category}
                </TrendingBadge>
              </div>

              {/* Card content */}
              <div className="p-4 px-5 pb-5 flex flex-col flex-1">

                {/* Date + read time */}
                <div
                  className="flex items-center gap-3.5 mb-2.5"
                >
                  <span
                    className="flex items-center gap-1 font-['Inter'] text-[12px] text-[#6B7280]"
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
                    className="flex items-center gap-1 font-['Inter'] text-[12px] text-[#6B7280]"
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
                  className="font-['Inter'] text-base font-bold leading-[22px] text-[#101828] mb-2 line-clamp-2"
                >
                  {article.title}
                </h3>

                {/* Description */}
                <p
                  className="font-['Inter'] text-[13px] font-normal leading-5 text-[#6B7280] mb-4 flex-1 line-clamp-2"
                >
                  {article.description}
                </p>

                {/* Footer: Author + Read link */}
                <div className="flex justify-between items-center">
                  <span
                    className="font-['Inter'] text-[13px] font-normal text-[#6B7280]"
                  >
                    By{" "}
                    <strong className="text-[#101828] font-semibold">{article.author}</strong>
                  </span>
                  <Link
                    href={`/articles/${article.slug || "the-future-of-business-education"}`}
                    className="hover:opacity-70 transition-opacity duration-200 font-['Inter'] text-[13px] font-semibold text-[#4F39F6] no-underline flex items-center gap-1 cursor-pointer"
                  >
                    Read &#8594;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="flex justify-center">
          <Link
            href="/articles"
            className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200 min-w-[220px] max-w-[90vw] min-h-[52px] py-3 px-6 rounded-[14px] bg-gradient-to-br from-[#4F39F6] to-[#9810FA] shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-['Inter'] text-[clamp(14px, 3.2vw, 16px)] font-semibold text-white no-underline inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            View All Articles &#8594;
          </Link>
        </div>

      </div>
    </section>
  );
}

// CMS field names consumed by this component — prevents auto-render duplicates
export const usedFields = [
  "Pill", "pill", "Badge", "badge",
  "Main Heading", "main heading", "Title", "title", "heading",
  "Below Main Heading", "below main heading", "Subtitle", "subtitle", "Description", "description",
  "First Article", "first article", "Article 1", "article1", "article_1",
  "Second Article", "second article", "Article 2", "article2", "article_2",
  "Third Article", "third article", "Article 3", "article3", "article_3",
];
