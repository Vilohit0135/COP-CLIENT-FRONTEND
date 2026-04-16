import type { ReactElement } from "react";

// split a CMS stat like "50,000+ Students Enrolled" => { value: "50,000+", label: "Students Enrolled" }
function splitStat(full?: string) {
  if (!full) return { value: "", label: "" };
  // match leading number-like token including +,.,/
  const m = full.match(/^([\d,.\/+]+)\s*(.*)$/);
  if (m) return { value: m[1].trim(), label: (m[2] || "").trim() };
  return { value: full.trim(), label: "" };
}

export default function StatsBox({
  stats,
}: {
  stats: {
    students?: string;
    counselling?: string;
    partners?: string;
    rating?: string;
  };
}): ReactElement {
  const { students = "50,000+ Students Enrolled", counselling = "2,000+ Programs Available", partners = "500+ Partner Universities", rating = "4.8/5" } = stats || {};
  const sStudents = splitStat(students);
  const sCounselling = splitStat(counselling);
  const sPartners = splitStat(partners);
  const sRating = splitStat(rating);
  return (
    <div
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #EAD8FF 0%, #E3CEFF 50%, #EAD8FF 100%)",
        padding: "clamp(1rem, 3.5vw, 2.25rem) clamp(0.75rem, 3vw, 1.25rem)",
        borderRadius: 12,
        minHeight: "140px",
      }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        style={{
          gap: "clamp(1rem, 3vw, 2rem)",
        }}
      >
        {/* Stat 1: Students */}
        <div className="flex flex-col items-center justify-center text-white text-center py-4">
          <img src="/Container (52).png" alt="Students" style={{ height: 56, width: "auto", marginBottom: 12, objectFit: "contain" }} />
          <div style={{ fontSize: "30px", fontWeight: 700, lineHeight: "36px", color: "#101828" }}>{sStudents.value}</div>
          <div style={{ fontSize: "14px", fontWeight: 400, color: "#4A5565", marginTop: 6 }}>{sStudents.label || "Students"}</div>
        </div>

        {/* Stat 2: Counselling */}
        <div className="flex flex-col items-center justify-center text-white text-center py-4">
          <img src="/Container (53).png" alt="Counselling" style={{ height: 56, width: "auto", marginBottom: 12, objectFit: "contain" }} />
          <div style={{ fontSize: "30px", fontWeight: 700, lineHeight: "36px", color: "#101828" }}>{sCounselling.value}</div>
          <div style={{ fontSize: "14px", fontWeight: 400, color: "#4A5565", marginTop: 6 }}>{sCounselling.label || "Counselling"}</div>
        </div>

        {/* Stat 3: Partners */}
        <div className="flex flex-col items-center justify-center text-white text-center py-4">
          <img src="/Container (54).png" alt="Partners" style={{ height: 56, width: "auto", marginBottom: 12, objectFit: "contain" }} />
          <div style={{ fontSize: "30px", fontWeight: 700, lineHeight: "36px", color: "#101828" }}>{sPartners.value}</div>
          <div style={{ fontSize: "14px", fontWeight: 400, color: "#4A5565", marginTop: 6 }}>{sPartners.label || "Partners"}</div>
        </div>

        {/* Stat 4: Rating */}
        <div className="flex flex-col items-center justify-center text-white text-center py-4">
          <img src="/Container (55).png" alt="Rating" style={{ height: 56, width: "auto", marginBottom: 12, objectFit: "contain" }} />
          <div style={{ fontSize: "30px", fontWeight: 700, lineHeight: "36px", color: "#101828" }}>{sRating.value}</div>
          <div style={{ fontSize: "14px", fontWeight: 400, color: "#4A5565", marginTop: 6 }}>{sRating.label || "Rating"}</div>
        </div>
      </div>
    </div>
  );
}
