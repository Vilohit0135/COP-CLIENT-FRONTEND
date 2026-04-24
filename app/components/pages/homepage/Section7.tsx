"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import Image from "next/image";

interface Section7Props {
  section: SectionContent;
}

export default function Section7({ section }: Section7Props) {
  const v = section.values || {};

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

  // Main heading and subtitle (pill)
  const mainHeading = getFieldValue(["Main Heading", "Title", "Main Title", "heading"], "Why choose us");
  const textBelowHeading = getFieldValue([
    "Text Below Main Heading",
    "Pill",
    "Subtitle",
    "Subheading",
    "Description",
  ],
    "From help you to prepare to admissions, you'll get the everything done. Totally. We're here changing.");

  // 7 boxes (each with heading + content). Icons are images in /public named Container (56).png .. Container (62).png
  const boxFields = [
    {
      icon: "/Container (56).png",
      heading: getFieldValue(["Box 1 Heading", "Box1Heading", "Field1Heading", "Field 1 Heading"], "Smart Program Discovery"),
      content: getFieldValue(["Box 1 Content", "Box1Content", "Field1Content", "Field 1 Content"], "AI-powered search helps you find the perfect program"),
    },
    {
      icon: "/Container (57).png",
      heading: getFieldValue(["Box 2 Heading", "Box2Heading", "Field2Heading", "Field 2 Heading"], "Expert Counseling"),
      content: getFieldValue(["Box 2 Content", "Box2Content", "Field2Content", "Field 2 Content"], "Get personalized guidance from certified education counselors with 10+ years experience"),
    },
    {
      icon: "/Container (58).png",
      heading: getFieldValue(["Box 3 Heading", "Box3Heading", "Field3Heading", "Field 3 Heading"], "4.8 / 5 Average Rating"),
      content: getFieldValue(["Box 3 Content", "Box3Content", "Field3Content", "Field 3 Content"], "Trusted by thousands of learners for quality content, insightful mentors, and real results"),
    },
    {
      icon: "/Container (59).png",
      heading: getFieldValue(["Box 4 Heading", "Box4Heading", "Field4Heading", "Field 4 Heading"], "Scholarship Assistance"),
      content: getFieldValue(["Box 4 Content", "Box4Content", "Field4Content", "Field 4 Content"], "Access exclusive scholarships and financial aid opportunities"),
    },
    {
      icon: "/Container (60).png",
      heading: getFieldValue(["Box 5 Heading", "Box5Heading", "Field5Heading", "Field 5 Heading"], "50,000+ Enrolled"),
      content: getFieldValue(["Box 5 Content", "Box5Content", "Field5Content", "Field 5 Content"], "Join a thriving community of learners advancing their careers"),
    },
    {
      icon: "/Container (61).png",
      heading: getFieldValue(["Box 6 Heading", "Box6Heading", "Field6Heading", "Field 6 Heading"], "2000+ Programs"),
      content: getFieldValue(["Box 6 Content", "Box6Content", "Field6Content", "Field 6 Content"], "Explore a wide range of courses across domains designed for your goals"),
    },
    {
      icon: "/Container (62).png",
      heading: getFieldValue(["Box 7 Heading", "Box7Heading", "Field7Heading", "Field 7 Heading"], "500 +Partner University"),
      content: getFieldValue(["Box 7 Content", "Box7Content", "Field7Content", "Field 7 Content"], "Collaborate with top universities worldwide offering recognized industry - relevant education"),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Top: Image left, Heading + 2x2 grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-6">
          {/* Left: Image */}
          <div className="w-full">
            <Image
              src="/Choose us .png"
              alt="Why choose us"
              width={601}
              height={420}
              className="object-cover rounded-lg w-full h-auto"
              priority
            />
          </div>

          {/* Right: Heading + subtitle + 2x2 boxes */}
          <div>
            <h2 className="text-[32px] leading-[40px] font-bold text-[#1F2937] mb-3">{mainHeading}</h2>
            <p className="text-[16px] leading-[24px] text-[#6B7280] mb-6">{textBelowHeading}</p>
            <div className="grid grid-cols-2 gap-4">
              {boxFields.slice(0, 4).map((box, idx) => (
                <div key={idx} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-8 flex flex-col gap-3 items-start">
                  <div className="w-14 h-14 rounded-lg bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                    <Image src={box.icon} alt={`icon-${idx}`} width={28} height={28} />
                  </div>
                  <div>
                    <h3 className="text-[16px] leading-[22px] font-semibold text-[#1F2937] mb-1">{box.heading}</h3>
                    <p className="text-[13px] leading-[18px] text-[#6B7280]">{box.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: 3 boxes spanning full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {boxFields.slice(4, 7).map((box, idx) => (
            <div key={`bottom-${idx}`} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col gap-4 items-start">
              <div className="w-14 h-14 rounded-lg bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                <Image src={box.icon} alt={`icon-bottom-${idx}`} width={28} height={28} />
              </div>
              <div>
                <h3 className="text-[18px] leading-[24px] font-semibold text-[#1F2937] mb-2">{box.heading}</h3>
                <p className="text-[14px] leading-[20px] text-[#6B7280]">{box.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Export used fields for the section renderer
export const usedFields = [
  "Main Heading",
  "Title",
  "Main Title",
  "heading",
  "Text Below Main Heading",
  "Pill",
  "Subtitle",
  "Subheading",
  "Description",
  "Box 1 Heading",
  "Box1Heading",
  "Field1Heading",
  "Field 1 Heading",
  "Box 1 Content",
  "Box1Content",
  "Field1Content",
  "Field 1 Content",
  "Box 2 Heading",
  "Box2Heading",
  "Field2Heading",
  "Field 2 Heading",
  "Box 2 Content",
  "Box2Content",
  "Field2Content",
  "Field 2 Content",
  "Box 3 Heading",
  "Box3Heading",
  "Field3Heading",
  "Field 3 Heading",
  "Box 3 Content",
  "Box3Content",
  "Field3Content",
  "Field 3 Content",
  "Box 4 Heading",
  "Box4Heading",
  "Field4Heading",
  "Field 4 Heading",
  "Box 4 Content",
  "Box4Content",
  "Field4Content",
  "Field 4 Content",
  "Box 5 Heading",
  "Box5Heading",
  "Field5Heading",
  "Field 5 Heading",
  "Box 5 Content",
  "Box5Content",
  "Field5Content",
  "Field 5 Content",
  "Box 6 Heading",
  "Box6Heading",
  "Field6Heading",
  "Field 6 Heading",
  "Box 6 Content",
  "Box6Content",
  "Field6Content",
  "Field 6 Content",
  "Box 7 Heading",
  "Box7Heading",
  "Field7Heading",
  "Field 7 Heading",
  "Box 7 Content",
  "Box7Content",
  "Field7Content",
  "Field 7 Content",
];
