"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface Section10Props {
  section: SectionContent;
}

const DEFAULT_FAQS = [
  {
    question: "How do I choose the right online degree program?",
    answer:
      "Our expert counselors help you choose based on your career goals, budget, timeline, and educational background. We also offer a free AI-powered quiz that matches you with suitable programs. You can compare programs side-by-side using our comparison tool to make an informed decision.",
  },
  {
    question: "Are online degrees recognized by employers?",
    answer:
      "Yes, online degrees from accredited universities are widely recognized by employers. Many top companies actively hire graduates from reputable online programs.",
  },
  {
    question: "What is the fee structure and are EMI options available?",
    answer:
      "Fee structures vary by program and institution. Most universities offer flexible payment options including EMI plans. Contact our counselors for detailed fee information.",
  },
  {
    question: "How long does the admission process take?",
    answer:
      "The admission process typically takes 1–2 weeks from application submission to final decision. Requirements and timelines vary by university and program.",
  },
];

export default function Section10({ section }: Section10Props) {
  const v = section.values || {};
  const [openIndex, setOpenIndex] = useState<number>(0);
  const router = useRouter();

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

  const pill = getFieldValue(["Pill", "pill", "Badge", "badge"], "GOT QUESTIONS ?");
  const mainHeading = getFieldValue(
    ["Main Heading", "main heading", "heading", "Title", "title"],
    "Frequently Asked Questions"
  );
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "subtitle", "Description", "description"],
    "Everything you need to know about online education"
  );

  return (
    <section className="w-full bg-white py-16 px-4">
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Pill */}
        <span
          style={{
            background: "#EEF2FF",
            color: "#4F39F6",
            fontFamily: "Inter, Arial, Helvetica, sans-serif",
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

        {/* Main Heading */}
        <h2
          style={{
            fontFamily: "Inter, Arial, Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: 36,
            lineHeight: "40px",
            letterSpacing: "0px",
            color: "#101828",
            textAlign: "center",
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          style={{
            fontFamily: "Inter, Arial, Helvetica, sans-serif",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "28px",
            letterSpacing: "0px",
            color: "#4A5565",
            textAlign: "center",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {belowHeading}
        </p>

        {/* FAQ Accordion */}
        <div
          style={{
            width: "100%",
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {DEFAULT_FAQS.map((faq, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                background: "#FFFFFF",
                overflow: "hidden",
              }}
            >
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span
                  style={{
                    fontFamily: "Inter, Arial, Helvetica, sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: "24px",
                    color: "#101828",
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  style={{
                    color: "#4F39F6",
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {openIndex === idx && (
                <div
                  style={{
                    padding: "0 24px 20px 24px",
                    fontFamily: "Inter, Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "22px",
                    color: "#4A5565",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View More Questions Button */}
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button
            onClick={() => router.push("/search")}
            style={{
              width: 227,
              height: 48,
              borderRadius: 10,
              background: "linear-gradient(to right, #9810FA, #8200DB)",
              boxShadow:
                "0px 2px 4px -2px rgba(0,0,0,0.10), 0px 4px 6px -1px rgba(0,0,0,0.10)",
              fontFamily: "Inter, Arial, Helvetica, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "24px",
              letterSpacing: "0px",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            View More Questions
          </button>
        </div>

      </div>
    </section>
  );
}

export const usedFields = [
  "Pill",
  "pill",
  "Badge",
  "badge",
  "Main Heading",
  "main heading",
  "heading",
  "Title",
  "title",
  "Below Main Heading",
  "below main heading",
  "Subtitle",
  "subtitle",
  "Description",
  "description",
];
