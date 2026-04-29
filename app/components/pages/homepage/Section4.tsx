import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { Star, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FocusCenterSlider from "./FocusCenterSlider";

interface Section4Props {
  section: SectionContent;
}

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  expertise: string;
  experience: string;
  studentsGuided: string;
}

export default function Section4({ section }: Section4Props) {
  const v = section.values || {};

  // ════════════════════════════════════════════════════════════════════════════════
  // CASCADE PRIORITY SYSTEM: CMS > PLACEHOLDER > HARDCODED DEFAULT
  // ════════════════════════════════════════════════════════════════════════════════
  const getFieldValue = (keyAliases: string[], placeholder?: string): string => {
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) {
        const value = v[foundKey];
        if (value !== undefined && value !== null) {
          const text = richTextToPlain(value);
          if (text.trim()) return text;
        }
      }
    }
    if (placeholder) return placeholder;
    return "";
  };

  // Track which CMS keys are explicitly used
  const usedKeys = new Set<string>();
  const trackKey = (keyAliases: string[]) => {
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) usedKeys.add(foundKey);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────────────
  // EXPERT COUNSELORS SECTION FIELDS
  // ──────────────────────────────────────────────────────────────────────────────────
  const badgeAliases = [
    "Badge",
    "Badge Text",
    "Badge Label",
    "badge",
    "heading_label",
    "Heading",
    "Heading Label",
    "heading label",
    "headingLabel",
    "heading_label",
    "Label",
    "label",
  ];
  const badge = getFieldValue(badgeAliases, "EXPERT GUIDANCE");
  trackKey(badgeAliases);

  const titleAliases = ["Title", "Main Title", "Main Heading", "Section Title", "title"];
  const title = getFieldValue(titleAliases, "Meet Our Expert Counselors");
  trackKey(titleAliases);

  const subtitleAliases = ["Subtitle", "Subheading", "Description", "subtitle", "description"];
  const subtitle = getFieldValue(subtitleAliases, "Get personalized guidance from India's top education counselors");
  trackKey(subtitleAliases);

  const buttonTextAliases = ["Button Text", "CTA Text", "Call to Action", "button_text", "ViewAllButtonText"];
  const buttonText = getFieldValue(buttonTextAliases, "View All Counsellors");
  trackKey(buttonTextAliases);

  // Parse counselor data from CMS
  // ── Parse counselor data from 3 named CMS textarea fields ──────────────────
  // Each field value is 4 lines: title, specialty, experience, studentsGuided
  const COUNSELOR_DEFS = [
    { name: "Dr. Priya Sharma", cmsKey: "Dr. Priya sharma", image: "/Image (Dr. Priya Sharma).png", rating: 4.9, reviewCount: 1250 },
    { name: "Rahul Mehta", cmsKey: "Rahul Mehta", image: "/Image (Rahul Mehta).png", rating: 4.9, reviewCount: 1250 },
    { name: "Anita Desai", cmsKey: "Anita Desai", image: "/Image (Anita Desai).png", rating: 5.0, reviewCount: 1250 },
  ];

  const FALLBACK_LINES = [
    ["Senior Education Counselor", "MBA & Management Programs", "12 years experience", "3500+ students guided"],
    ["Career Guidance Expert", "Tech & Data Science", "10 years experience", "2800+ students guided"],
    ["Study Abroad Specialist", "International Programs", "15 years experience", "4200+ students guided"],
  ];

  const counselors: Counselor[] = COUNSELOR_DEFS.map((def, idx) => {
    const rawKey = Object.keys(v).find((k) => k.toLowerCase() === def.cmsKey.toLowerCase());
    const raw = rawKey ? richTextToPlain(v[rawKey]).trim() : "";
    const lines = raw.split("\n").map((l: string) => l.trim()).filter(Boolean);
    const fb = FALLBACK_LINES[idx];
    return {
      id: String(idx + 1),
      name: def.name,
      image: def.image,
      rating: def.rating,
      reviewCount: def.reviewCount,
      title: lines[0] || fb[0],
      specialty: lines[1] || fb[1],
      expertise: lines[1] || fb[1],
      experience: lines[2] || fb[2],
      studentsGuided: lines[3] || fb[3],
    };
  });

  return (
    <section className="w-full bg-white py-10 md:py-16 -mt-6 md:-mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge (pill) */}
        <div className="flex justify-center mb-6">
          <div
            style={{
              width: "253px",
              height: "48px",
              backgroundColor: "#EEF2FF",
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.7px",
                color: "#4F39F6",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                padding: "0 12px",
                textAlign: "center",
              }}
            >
              {badge}
            </div>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(22px, 5.5vw, 36px)",
            fontWeight: 700,
            color: "#101828",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mb-8 md:mb-16 mx-auto px-4"
          style={{
            fontFamily: "Inter",
            maxWidth: "672px",
            width: "100%",
            fontSize: "clamp(15px, 3vw, 20px)",
            fontWeight: 400,
            color: "#4A5565",
            lineHeight: "28px",
          }}
        >
          {subtitle}
        </p>

        {/* Counselor Cards — Mobile focus-center slider */}
        <FocusCenterSlider className="mt-8 mb-8">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              style={{ width: '100%', minHeight: 300, borderRadius: 16, border: '1px solid #E5E7EB', backgroundColor: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', height: 160, background: '#E5E7EB', flexShrink: 0 }}>
                <Image src={counselor.image} alt={counselor.name} fill sizes="280px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,107,107,0.9)', borderRadius: 6, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={12} fill="white" color="white" />
                  <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{counselor.rating.toFixed(1)} / {counselor.reviewCount} reviews</span>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <h3 style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: '#101828', lineHeight: '20px', margin: 0 }}>{counselor.name}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#4F39F6', lineHeight: '18px', margin: 0 }}>{counselor.title}</p>
                <div style={{ borderTop: '1px solid #E5E7EB', marginTop: 6, paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="flex items-center gap-2" style={{ color: '#4A5565', fontSize: 13 }}>
                    <BookOpen size={14} color="#4F39F6" /><span>{counselor.expertise}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#4A5565', fontSize: 13 }}>
                    <Clock size={14} color="#4F39F6" /><span>{counselor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#4A5565', fontSize: 13 }}>
                    <Users size={14} color="#4F39F6" /><span>{counselor.studentsGuided}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </FocusCenterSlider>

        {/* Counselor Cards Grid — Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {counselors.map((counselor, idx) => (
            <div
              key={counselor.id}
              className="group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
              }}
            >
              {/* Image Container with Rating Badge */}
              <div className="relative h-52 md:h-60 overflow-hidden bg-gray-200">
                <Image
                  src={counselor.image}
                  alt={counselor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                {/* Rating Badge - Top Left */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-md text-white font-semibold text-sm flex items-center gap-1"
                  style={{ backgroundColor: "rgba(255, 107, 107, 0.9)", zIndex: 1 }}
                >
                  <Star size={14} fill="white" />
                  <span>{counselor.rating.toFixed(1)} / {counselor.reviewCount} reviews</span>
                </div>
              </div>


              {/* Content Section */}
              <div className="p-4">
                {/* Name */}
                <h3
                  className="font-bold mb-1"
                  style={{
                    fontSize: "20px", // spec
                    lineHeight: "28px",
                    color: "#101828",
                    fontFamily: "Inter",
                    fontWeight: 700,
                  }}
                >
                  {counselor.name}
                </h3>

                {/* Title/Role */}
                <p
                  className="mb-4"
                  style={{
                    fontSize: "16px", // spec
                    lineHeight: "24px",
                    color: "#4F39F6", // spec purple
                    fontFamily: "Inter",
                    fontWeight: 600,
                  }}
                >
                  {counselor.title}
                </p>

                {/* Divider */}
                <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded mb-4" />

                {/* Info Items */}
                <div className="space-y-3">
                  {/* Expertise */}
                  <div className="flex items-start gap-3">
                    <BookOpen
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#4F39F6" }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#4A5565",
                        fontFamily: "Inter",
                        lineHeight: "20px",
                      }}
                    >
                      {counselor.expertise}
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-start gap-3">
                    <Clock
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#4F39F6" }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#4A5565",
                        fontFamily: "Inter",
                        lineHeight: "20px",
                      }}
                    >
                      {counselor.experience}
                    </span>
                  </div>

                  {/* Students Guided */}
                  <div className="flex items-start gap-3">
                    <Users
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#4F39F6" }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#4A5565",
                        fontFamily: "Inter",
                        lineHeight: "20px",
                      }}
                    >
                      {counselor.studentsGuided}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

// Tell the SectionRenderer which CMS field names this component consumes
export const usedFields = [
  "Badge", "Badge Text", "Badge Label", "badge", "heading_label",
  "Main heading", "Main Heading", "Title", "Main Title", "Section Title", "title",
  "Below Main heading", "Below Main Heading", "Subtitle", "Subheading", "Description", "subtitle", "description",
  "Main pill",
  "Button Text", "CTA Text", "Call to Action", "button_text", "ViewAllButtonText",
  // Named counselor textarea fields
  "Dr. Priya sharma",
  "Rahul Mehta",
  "Anita Desai",
];
