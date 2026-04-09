import { NextResponse } from "next/server";
import { getPageContent } from "@/app/lib/api";

export async function GET() {
  try {
    const data = await getPageContent("home-page");
    // If backend returned page+content, assemble per-section best item for easier inspection
    try {
      const page = data.page || data?.page || null;
      const content = data.content || data?.content || [];

      if (page && Array.isArray(page.sections)) {
        const assembled = page.sections.map((sec: any, idx: number) => {
          const candidates = content.filter((c: any) => {
            if (c.sectionApiId && sec.apiIdentifier) return c.sectionApiId === sec.apiIdentifier;
            return typeof c.sectionIndex === "number" && c.sectionIndex === idx;
          });

          // pick best: prefer item with at least one non-empty value
          const pickBest = (items: any[]) => {
            const sorted = [...items].sort((a, b) => (b.itemIndex ?? 0) - (a.itemIndex ?? 0));
            for (const it of sorted) {
              const vals = it.values || {};
              const hasValue = Object.keys(vals).some((k) => {
                const v = vals[k];
                if (v === undefined || v === null) return false;
                if (typeof v === "string") return v.trim() !== "";
                if (typeof v === "object") {
                  if (Array.isArray(v)) return v.length > 0;
                  if (v.type === "doc" && Array.isArray(v.content)) return v.content.length > 0;
                  return Object.keys(v).length > 0;
                }
                return true;
              });
              if (hasValue) return it;
            }
            return sorted[0] || null;
          };

          const picked = pickBest(candidates) || null;
          return {
            sectionIndex: idx,
            sectionApiId: sec.apiIdentifier,
            schema: sec,
            pickedContent: picked,
          };
        });

        return NextResponse.json({ ok: true, data, assembled });
      }
    } catch (e) {
      // fallthrough to return raw data
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
