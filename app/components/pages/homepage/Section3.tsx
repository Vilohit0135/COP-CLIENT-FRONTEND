import { SectionContent } from "@/app/lib/types";
import { getCoursesHomeSummary } from "@/app/lib/api";
import Section3Client from "./Section3Client";

interface Section3Props {
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

export default async function Section3({ section }: Section3Props) {
  const v = section.values || {};

  // Try multiple possible CMS field names
  const title = resolveValue(v, ["Title", "title", "Main heading", "main heading", "main_heading", "mainHeading", "heading"]);
  
  // Get description and normalize whitespace
  const rawDescription = resolveValue(v, ["Description", "description", "Below main heading", "below main heading", "Subtitle", "subtitle"]);
  const normalized = typeof rawDescription === "string" ? rawDescription.replace(/\s+/g, " ").trim() : rawDescription;

  // Remove simple repeated-full-string duplicates like "A A" or "A A" (exact repetition)
  let displayText = normalized;
  if (typeof displayText === "string") {
    const m = displayText.match(/^([\s\S]+?)\s+\1$/);
    if (m && m[1]) displayText = m[1].trim();
  }

  // If subtitle contains the phrase "Designed for", split into two lines
  let descriptionFirst: string | null = null;
  let descriptionSecond: string | null = null;
  if (typeof displayText === "string") {
    const idx = displayText.search(/Designed for/i);
    if (idx > 0) {
      descriptionFirst = displayText.slice(0, idx).trim();
      descriptionSecond = displayText.slice(idx).trim();
    } else {
      descriptionFirst = displayText;
    }
  }

  // Fetch live course data from the backend
  let courseGroups: any[] = [];
  try {
    courseGroups = await getCoursesHomeSummary();
  } catch {
    courseGroups = [];
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {title && (
          <h2 
            className="text-center"
            style={{
              fontFamily: "Inter",
              fontSize: "48px",
              fontWeight: 700,
              color: "#101828",
              lineHeight: "48px",
            }}
          >
            {title}
          </h2>
        )}

        {descriptionFirst && (
          <p
            className="mt-4 text-center"
            style={{
              fontFamily: "Inter",
              fontSize: "18px",
              fontWeight: 400,
              color: "#4A5565",
              lineHeight: "28px",
            }}
          >
            {descriptionFirst}
            {descriptionSecond && (
              <>
                <br />
                {descriptionSecond}
              </>
            )}
          </p>
        )}

        {/* Interactive tabs and cards */}
        <Section3Client courseGroups={courseGroups} />
      </div>
    </section>
  );
}

// Tell the SectionRenderer which CMS field names this component consumes.
export const usedFields = [
  "Title",
  "title",
  "Main heading",
  "main heading",
  "Description",
  "description",
  "Below main heading",
  "Subtitle",
  "subtitle",
];
