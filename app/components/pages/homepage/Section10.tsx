"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { JsonLd, faqSchema } from "@/app/lib/jsonld";

interface Section10Props {
  section: SectionContent;
  questionsSection?: SectionContent | null;
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

const VISIBLE_COUNT = 4;

export default function Section10({ section, questionsSection }: Section10Props) {
  const v = section.values || {};
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [showAll, setShowAll] = useState(false);

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

  // Build FAQ list from the separate questions section — reads all fields generically
  const buildFaqsFromQuestions = (): { question: string; answer: string }[] => {
    if (!questionsSection?.values) return [];
    const qv = questionsSection.values;
    const faqs: { question: string; answer: string }[] = [];
    for (const key of Object.keys(qv)) {
      const raw = richTextToPlain(qv[key]).trim();
      if (!raw) continue;
      const newlineIdx = raw.indexOf("\n");
      if (newlineIdx === -1) {
        faqs.push({ question: raw, answer: "" });
      } else {
        faqs.push({
          question: raw.substring(0, newlineIdx).trim(),
          answer: raw.substring(newlineIdx + 1).trim(),
        });
      }
    }
    return faqs;
  };

  const allFaqs = buildFaqsFromQuestions();
  const faqs = allFaqs.length > 0 ? allFaqs : DEFAULT_FAQS;
  const visibleFaqs = showAll ? faqs : faqs.slice(0, VISIBLE_COUNT);
  const hasMore = faqs.length > VISIBLE_COUNT;

  const pill = getFieldValue(["Pill", "pill", "Badge", "badge"], "GOT QUESTIONS ?");
  const mainHeading = getFieldValue(
    ["Main Heading", "main heading", "heading", "Title", "title"],
    "Frequently Asked Questions"
  );
  const belowHeading = getFieldValue(
    ["Below Main Heading", "below main heading", "Subtitle", "subtitle", "Description", "description"],
    "Everything you need to know about online education"
  );

  const faqsForSchema = faqs
    .filter((f) => f.question && f.answer)
    .slice(0, 20);

  return (
    <section className="w-full bg-white py-8 md:py-16 px-4">
      {faqsForSchema.length > 0 && <JsonLd data={faqSchema(faqsForSchema)} />}
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Pill */}
        <span
          className="bg-[#EEF2FF] text-[#4F39F6] font-['Inter',_Arial,_Helvetica,_sans-serif] text-[clamp(11px,2.6vw,14px)] font-bold leading-5 tracking-[0.7px] uppercase py-2.5 px-[22px] min-h-[44px] max-w-full whitespace-nowrap inline-flex items-center justify-center rounded-full"
        >
          {pill}
        </span>

        {/* Main Heading */}
        <h2
          className="font-['Inter',_Arial,_Helvetica,_sans-serif] font-bold text-[clamp(22px,5.5vw,36px)] leading-[1.2] tracking-normal text-[#101828] text-center mt-4 mb-0"
        >
          {mainHeading}
        </h2>

        {/* Below Heading */}
        <p
          className="font-['Inter',_Arial,_Helvetica,_sans-serif] font-normal text-[clamp(14px,4vw,20px)] leading-7 tracking-normal text-[#4A5565] text-center mt-2 mb-0"
        >
          {belowHeading}
        </p>

        {/* FAQ Accordion */}
        <div
          className="w-full mt-10 flex flex-col gap-4"
        >
          {visibleFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#E5E7EB] rounded-xl bg-white overflow-hidden"
            >
              <button
                aria-expanded={openIndex === idx}
                className="hover:bg-gray-50 transition-colors duration-200 w-full flex items-center justify-between p-4 px-[clamp(14px,4vw,24px)] bg-transparent border-none cursor-pointer text-left gap-2"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span
                  className="font-['Inter',_Arial,_Helvetica,_sans-serif] font-medium text-[clamp(14px,3.5vw,16px)] leading-6 text-[#101828] flex-1 min-w-0"
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className="text-[#4F39F6] w-5 h-5 shrink-0 transition-transform duration-200"
                  style={{
                    transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {openIndex === idx && (
                <div
                  className="p-0 px-[clamp(14px,4vw,24px)] pb-4 font-['Inter',_Arial,_Helvetica,_sans-serif] font-normal text-sm leading-[22px] text-[#4A5565]"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View More Questions Button — only shown when CMS has >4 questions */}
        {hasMore && (
        <div className="w-full flex justify-center mt-6 sm:justify-end">
          <button
            className="hover:opacity-90 hover:scale-[1.02] transition-all duration-200 min-w-[200px] max-w-[90vw] min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#9810FA] to-[#8200DB] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10),0px_4px_6px_-1px_rgba(0,0,0,0.10)] font-['Inter',_Arial,_Helvetica,_sans-serif] font-semibold text-[clamp(15px,3.5vw,18px)] leading-6 tracking-normal text-white border-none cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "View More Questions"}
          </button>
        </div>
        )}

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
