import { SectionContent } from "@/app/lib/types";

interface HeroProps {
  section: SectionContent;
}

function resolveValue(values: Record<string, any> | undefined, keys: string[]) {
  if (!values) return undefined;
  for (const k of keys) {
    const val = values[k];
    if (val !== undefined && val !== null && val !== "") return val;
  }
  return undefined;
}

function richTextToPlain(value: any) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.type === "doc" && Array.isArray(value.content)) {
    return value.content
      .map((block: any) => {
        if (block.type === "paragraph") {
          return (block.content || []).map((c: any) => c.text || "").join("");
        }
        return "";
      })
      .join("\n");
  }
  return String(value);
}

export default function Hero({ section }: HeroProps) {
  const v = section.values || {};

  // ════════════════════════════════════════════════════════════════════════════════
  // CASCADE PRIORITY SYSTEM: CMS > PLACEHOLDER > HARDCODED DEFAULT
  // ════════════════════════════════════════════════════════════════════════════════
  const getFieldValue = (keyAliases: string[], placeholder?: string): string => {
    // Priority 1: Try to find CMS value with case-insensitive key matching
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) {
        const value = v[foundKey];
        if (value !== undefined && value !== null) {
          const text = richTextToPlain(value);
          if (text.trim()) return text; // ✅ CMS value found and not empty
        }
      }
    }
    // Priority 2: Use placeholder if provided
    if (placeholder) return placeholder;
    // Priority 3: Return empty string
    return "";
  };

  // Track which CMS keys are explicitly used so we can auto-render remaining ones
  const usedKeys = new Set<string>();
  const trackKey = (keyAliases: string[]) => {
    for (const alias of keyAliases) {
      const foundKey = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (foundKey) usedKeys.add(foundKey);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────────────
  // HERO CORE FIELDS using cascading priority
  // ──────────────────────────────────────────────────────────────────────────────────
  const titleAliases = ["Title", "Main heading", "Main Heading", "title", "main_heading"];
  const title = getFieldValue(titleAliases);
  trackKey(titleAliases);

  const descAliases = ["Description", "description", "Subtitle", "Subheading", "Below main heading", "Below Main heading"];
  const description = getFieldValue(descAliases);
  trackKey(descAliases);

  const privacyAliases = ["Above main heading pill", "Above main heading", "Privacy pill", "Your Privacy Matters"];
  const privacyText = getFieldValue(privacyAliases, "Your Privacy Matters — No Spam Calls Guaranteed");
  trackKey(privacyAliases);

  // ──────────────────────────────────────────────────────────────────────────────────
  // STATS with cascading priority
  // ──────────────────────────────────────────────────────────────────────────────────
  const uniAliases = ["500 Universities", "500 universities", "500 Universities +", "500 Universities + Partnerships", "500 UNIVERSITIES"];
  const statUniversities = getFieldValue(uniAliases, "500 Universities +");
  trackKey(uniAliases);

  const progAliases = ["2000 programs", "2000+ programs", "2000 +Programs", "2000+ Programs", "2000+PROGRAMS"];
  const statPrograms = getFieldValue(progAliases, "2000 +Programs");
  trackKey(progAliases);

  const studAliases = ["50K Students", "50K+ Students", "50K+ Students Enrolled", "50K+ STUDENTS"];
  const statStudents = getFieldValue(studAliases, "50K+ Students");
  trackKey(studAliases);

  const trustedAliases = ["Trusted by 2.5 Lakh+ Students", "Trusted by", "Trusted Text", "trusted_text"];
  const trustedText = getFieldValue(trustedAliases, "");
  if (trustedText) trackKey(trustedAliases);

  const onlineCourseAliases = ["Online Courses", "online_courses", "Online courses", "online courses"];
  const onlineCourseText = getFieldValue(onlineCourseAliases, "");
  if (onlineCourseText) trackKey(onlineCourseAliases);

  return (
    <section className="relative w-full bg-white text-gray-900 overflow-visible">
      {/* Responsive container with proper scaling */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-0 pb-6 mt-20 lg:mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Left column: text */}
            <div className="w-full lg:w-1/2 text-left relative">
              {/* Privacy matters pill - text based (match CMS field if present) */}
              {(() => {
                const privacyAliases = ["Above main heading pill", "Above main heading", "Privacy pill", "Your Privacy Matters", "privacy_pill"];
                const privacyText = getFieldValue(privacyAliases, "Your Privacy Matters — No Spam Calls Guaranteed");
                trackKey(privacyAliases);

                return (
                  <div
                    className="mb-4 sm:mb-6 inline-flex items-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)",
                      color: "white",
                      paddingLeft: "clamp(10px, 2.4vw, 18px)",
                      paddingRight: "clamp(14px, 3vw, 22px)",
                      paddingTop: "clamp(6px, 0.8vw, 8px)",
                      paddingBottom: "clamp(6px, 0.8vw, 8px)",
                      gap: "clamp(8px, 1.2vw, 12px)",
                      alignItems: "center",
                      width: "auto",
                      display: "inline-flex",
                    }}
                  >
                    <img
                      src="/SVG%20(2).png"
                      alt="icon"
                      className="object-contain flex-shrink-0"
                      style={{ width: "clamp(18px, 2.4vw, 22px)", height: "clamp(18px, 2.4vw, 22px)" }}
                    />
                    <span
                      title={privacyText}
                      style={{
                        fontSize: "clamp(14px, 1.8vw, 18px)",
                        fontWeight: 600,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        display: "block",
                      }}
                    >
                      {privacyText}
                    </span>
                  </div>
                );
              })()}

              {title && (
                <h1 style={{
                  maxWidth: "min(720px, 100%)",
                  whiteSpace: "normal",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  letterSpacing: "0.02em",
                  color: "#161C2D",
                  fontFamily: "'edupath-streethemes', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  marginTop: "0.5rem"
                }}>
                  {title.split(" ").map((word: string, idx: number) => {
                    const isOnline = word === "Online";
                    const isFrom = word === "From";
                    return (
                      <span key={idx}>
                        {isOnline ? (
                          <span style={{
                            display: "inline-block",
                            margin: "0 clamp(2px, 0.5vw, 6px)",
                            transform: "skewY(-5deg)",
                            background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)",
                            padding: "0"
                          }}>
                            <span style={{
                              display: "inline-block",
                              padding: "clamp(4px, 1vw, 8px) clamp(10px, 2vw, 16px)",
                              color: "white",
                              transform: "skewY(5deg)",
                              fontStyle: "italic",
                              fontWeight: 700
                            }}>
                              {word}
                            </span>
                          </span>
                        ) : isFrom ? (
                          <>
                            <br />
                            <span>{word} </span>
                          </>
                        ) : (
                          <span>{word} </span>
                        )}
                      </span>
                    );
                  })}
                </h1>
              )}

              {description && (
                <p style={{
                  marginTop: "clamp(1.5rem, 3vw, 2rem)",
                  fontSize: "clamp(16px, 2vw, 18px)",
                  color: "#6A7282",
                  maxWidth: "38rem",
                  lineHeight: "1.6",
                  letterSpacing: "0.01em"
                }}>
                  {description}
                </p>
              )}

              {/* Stats row - larger icons aligned to text */}
              <div className="mt-8 lg:mt-10 xl:mt-12 flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 items-center flex-wrap">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img src="/Container%20(47).png" alt="icon" className="object-contain flex-shrink-0" style={{ width: "clamp(32px, 3.2vw, 44px)", height: "clamp(32px, 3.2vw, 44px)" }} />
                  <div>
                      <div className="font-semibold text-gray-900" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: "1.1", whiteSpace: "nowrap", color: "#161C2D", fontWeight: "600" }}>{statUniversities}</div>
                      <div className="text-xs text-gray-600" style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#6A7282", marginTop: "2px" }}>Partnerships</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img src="/Container%20(48).png" alt="icon" className="object-contain flex-shrink-0" style={{ width: "clamp(32px, 3.2vw, 44px)", height: "clamp(32px, 3.2vw, 44px)" }} />
                  <div>
                    <div className="font-semibold text-gray-900" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: "1.1", whiteSpace: "nowrap", color: "#161C2D", fontWeight: "600" }}>{statPrograms}</div>
                    <div className="text-xs text-gray-600" style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#6A7282", marginTop: "2px" }}>Available</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img src="/Container%20(49).png" alt="icon" className="object-contain flex-shrink-0" style={{ width: "clamp(32px, 3.2vw, 44px)", height: "clamp(32px, 3.2vw, 44px)" }} />
                  <div>
                    <div className="font-semibold text-gray-900" style={{ fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: "1.1", whiteSpace: "nowrap", color: "#161C2D", fontWeight: "600" }}>{statStudents}</div>
                    <div className="text-xs text-gray-600" style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#6A7282", marginTop: "2px" }}>Enrolled</div>
                  </div>
                </div>
              </div>

              {/* Trusted badge */}
              {trustedText && (
                <div className="mt-6 lg:mt-8 text-sm text-gray-600" style={{ color: "#6A7282", fontWeight: "500", fontSize: "clamp(13px, 1.5vw, 15px)", lineHeight: "1.5" }}>
                  {trustedText}
                </div>
              )}

              {/* 4-box group (100% Secure, 4.8 Rating, Certifications, Counselling) - RESPONSIVE and evenly spaced */}
              <div className="mt-6 lg:mt-8 flex items-center gap-4 w-full lg:w-fit justify-start">
                <div className="flex items-center justify-center" style={{ width: "clamp(110px, 22vw, 150px)", height: "clamp(36px, 6vw, 44px)" }}>
                  <img src="/Stats.png" alt="100% Secure" className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center justify-center" style={{ width: "clamp(110px, 22vw, 150px)", height: "clamp(36px, 6vw, 44px)" }}>
                  <img src="/Container%20(43).png" alt="4.8 Rating" className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center justify-center" style={{ width: "clamp(110px, 22vw, 150px)", height: "clamp(36px, 6vw, 44px)" }}>
                  <img src="/Container%20(44).png" alt="Certifications" className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center justify-center" style={{ width: "clamp(110px, 22vw, 150px)", height: "clamp(36px, 6vw, 44px)" }}>
                  <img src="/Container%20(45).png" alt="Counselling" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            {/* Right column: image + decorative circle + overlays */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative" style={{ paddingLeft: "0", paddingRight: "clamp(0px, 2vw, 32px)", minHeight: "400px" }}>
              {/* Decorative purple circle - responsive */}
              <div className="absolute rounded-full bg-gradient-to-br from-purple-300 to-purple-600 opacity-30 -z-10" style={{
                width: "clamp(300px, 50vw, 600px)",
                height: "clamp(300px, 50vw, 600px)",
                left: "clamp(-100px, -10vw, -50px)",
                top: "50%",
                transform: "translateY(-50%)"
              }} />

              {/* Main image - without white background box - responsive */}
              <img
                src="/Margin.png"
                alt="Hero student"
                className="relative z-10 rounded-2xl object-cover"
                style={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  width: "clamp(300px, 80vw, 548px)",
                  height: "auto",
                  aspectRatio: "548/663.42"
                }}
              />

              {/* Small top-right badge - Online Course Box - CMS driven - responsive */}
              {onlineCourseText && (
                <div
                  className="absolute rounded-lg"
                  style={{
                    width: "auto",
                    height: "auto",
                    padding: "clamp(8px, 1.5vw, 12px)",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: "clamp(10px, 1.5vw, 14px)",
                    borderRadius: "8px",
                    zIndex: "20",
                    top: "clamp(30px, 8vw, 80px)",
                    right: "clamp(-30px, -5vw, -50px)",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Icon - circular badge */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      minWidth: "56px",
                      minHeight: "56px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(124, 58, 237, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/Container%20(51).png"
                      alt="online course icon"
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Text content - stacked vertically */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    {/* Label */}
                    <div
                      style={{
                        fontFamily: "Inter",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "0px",
                        color: "#9CA3AF",
                      }}
                    >
                      Online Courses
                    </div>
                    {/* CMS Value */}
                    <div
                      style={{
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontWeight: 700,
                        lineHeight: "28px",
                        letterSpacing: "0px",
                        color: "#161C2D",
                      }}
                    >
                      {onlineCourseText}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* AUTO-RENDER NEW CMS FIELDS (Dynamic Section) */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {(() => {
            // Collect all CMS fields NOT explicitly used
            const usedKeysLower = Array.from(usedKeys).map((k) => k.toLowerCase());
            const promoAliases = ["promo", "Promo", "PROMO", "promoText", "promo_text"].map((s) => String(s).toLowerCase());
            const dynamicFields = Object.entries(v).filter(([k, val]) => {
              if (usedKeysLower.includes(k.toLowerCase())) return false; // Skip used fields
              if (promoAliases.includes(k.toLowerCase())) return false; // Skip promo field (rendered in Navbar)
              if (val === undefined || val === null) return false;
              const text = typeof val === "string" ? val : JSON.stringify(val);
              return text.trim().length > 0; // Only render non-empty
            });

            if (dynamicFields.length === 0) return null; // No new fields to render

            return (
              <div className="mt-12 lg:mt-16 w-full">
                  {dynamicFields.map(([fieldKey, fieldValue]) => {
                    const displayText = typeof fieldValue === "string" 
                      ? fieldValue 
                      : richTextToPlain(fieldValue);

                    return (
                      <div key={fieldKey}>
                        {displayText}
                      </div>
                    );
                  })}
                </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

// fields that Hero explicitly consumes from CMS — used to avoid duplicate rendering
export const usedFields = [
  "Title",
  "Main heading",
  "Main Heading",
  "title",
  "main_heading",
  "Description",
  "description",
  "Subtitle",
  "Subheading",
  "Below main heading",
  "Below Main heading",
  "CTA Text",
  "CTA",
  "Call To Action",
  "CTA Link",
  "CTA Link URL",
  "CTA_Link",
  "Image",
  "image",
  "Hero Image",
  "Trusted by 2.5 Lakh+ Students",
  "Above main heading pill",
  "Above main heading",
  "Privacy pill",
  "Your Privacy Matters",
  "Online Courses",
  "online_courses",
  "Online courses",
  "online courses",
  // Common stat keys from CMS to avoid leftover rendering
  "500 universities",
  "500 Universities",
  "500 Universities +",
  "2000 programs",
  "2000+ programs",
  "2000 +Programs",
  "50K Students",
  "50K+ Students",
  "50K+ Students Enrolled",
  // Admin/editor fields that accidentally appeared on Home — suppress them
  "Services",
  "Use of it",
  "Saksham",
  "Dahiya",
  // Promo field (rendered in Navbar) - avoid showing as leftover under the hero
  "Promo",
  "promo",
  "PROMO",
  "promoText",
  "promo_text",
];
