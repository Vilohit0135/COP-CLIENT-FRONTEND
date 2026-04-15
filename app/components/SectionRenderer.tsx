import { SectionContent } from "@/app/lib/types";
import sectionRegistry from "./pages/sections";
import { GLOBAL_USED_FIELDS } from "@/app/lib/globalUsedFields";

interface SectionRendererProps {
  sections: SectionContent[];
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  // For each sectionApiId prefer the most recent item that has any non-empty value.
  // Fallback to the highest itemIndex if none have values.
  const grouped: Record<string, typeof sections[0][]> = {};
  for (const s of sections) {
    const key = s.sectionApiId || `__unknown_${s.sectionIndex}`;
    grouped[key] = grouped[key] || [];
    grouped[key].push(s);
  }

  const pickBest = (items: typeof sections[0][]) => {
    // sort descending by itemIndex
    const sorted = [...items].sort((a, b) => (b.itemIndex ?? 0) - (a.itemIndex ?? 0));
    // first item that has at least one non-empty value
    for (const it of sorted) {
      const vals = it.values || {};
      const hasValue = Object.keys(vals).some((k) => {
        const v = vals[k];
        if (v === undefined || v === null) return false;
        if (typeof v === "string") return v.trim() !== "";
        // objects like richtext should be considered non-empty if they have content
        if (typeof v === "object") {
          if (Array.isArray(v)) return v.length > 0;
          if (v.type === "doc" && Array.isArray(v.content)) return v.content.length > 0;
          return Object.keys(v).length > 0;
        }
        return true;
      });
      if (hasValue) return it;
    }
    // fallback to latest
    return sorted[0];
  };

  const deduped = Object.values(grouped).map(pickBest);

  // Sort sections by sectionIndex to ensure correct rendering order
  const sorted = deduped.sort((a, b) => (a.sectionIndex ?? 0) - (b.sectionIndex ?? 0));

  const extractTextFromDoc = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    let out = "";
    if (Array.isArray(node)) {
      for (const n of node) out += extractTextFromDoc(n);
      return out;
    }
    if (node.type === "text" && typeof node.text === "string") return node.text;
    if (node.content && Array.isArray(node.content)) {
      for (const c of node.content) out += extractTextFromDoc(c);
    }
    return out;
  };

  const renderGenericValue = (v: any) => {
    if (v === undefined || v === null) return null;
    if (typeof v === "string") return <div className="prose">{v}</div>;
    if (Array.isArray(v)) return <div className="prose">{v.join(", ")}</div>;
    if (typeof v === "object") {
      if (v.type === "doc" && Array.isArray(v.content)) {
        return <div className="prose">{extractTextFromDoc(v)}</div>;
      }
      try {
        return (
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded">{JSON.stringify(v, null, 2)}</pre>
        );
      } catch (e) {
        return null;
      }
    }
    return <div>{String(v)}</div>;
  };

  return (
    <>
      {sorted.map((section) => {
        const entry = sectionRegistry[section.sectionApiId];

        if (!entry) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div
                key={section._id}
                className="p-6 bg-yellow-50 border border-yellow-300 text-yellow-800 text-center"
              >
                Unknown section: <strong>{section.sectionApiId}</strong>
              </div>
            );
          }
          return null;
        }

        const Component = entry.Component;
        // Normalize entry.usedFields into an array of strings safely so runtime
        // errors don't occur if a module exported a non-array by mistake.
        const normalizeToArray = (v: any): string[] => {
          if (!v) return [];
          if (Array.isArray(v)) return v.map((s) => String(s));
          if (typeof v === "string") return [v];
          if (typeof v === "object") return Object.keys(v).map((k) => String(k));
          return [String(v)];
        };

        const sectionUsed = normalizeToArray(entry.usedFields).map((s) => String(s).toLowerCase());
        const globalUsed = normalizeToArray(GLOBAL_USED_FIELDS).map((s) => String(s).toLowerCase());
        const usedSet = new Set([...sectionUsed, ...globalUsed]);
        const vals = section.values || {};
        const leftoverKeys = Object.keys(vals).filter((k) => {
          const v = vals[k];
          if (v === undefined || v === null) return false;
          if (typeof v === "string" && v.trim() === "") return false;
          return !usedSet.has(k.toLowerCase());
        });

        // By default we do NOT render a generic leftover block — this avoids
        // showing admin/editor-only fields on pages. Enable with
        // NEXT_PUBLIC_SHOW_LEFTOVERS=true when you need to inspect leftovers.
        const showLeftovers = process.env.NEXT_PUBLIC_SHOW_LEFTOVERS === "true";

        return (
          <div key={section._id}>
            <Component section={section} />

            {showLeftovers && leftoverKeys.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded">
                {leftoverKeys.map((k) => (
                  <div key={k} className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">{k}</div>
                    <div>{renderGenericValue(vals[k])}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
