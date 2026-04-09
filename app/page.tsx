import { getPageContent } from "@/app/lib/api";
import { PageResponse } from "@/app/lib/types";
import SectionRenderer from "@/app/components/SectionRenderer";
import Homepage from "@/app/components/pages/homepage";

function mergeWithPlaceholders(data: PageResponse) {
  const sections = data.page?.sections || [];
  const content = data.content || [];

  return sections
    .map((section, idx) => {
      // find matching saved item for this section
      const item = content.find((it) => {
        if (it.sectionApiId && section.apiIdentifier) return it.sectionApiId === section.apiIdentifier;
        return typeof it.sectionIndex === "number" && it.sectionIndex === idx;
      });

      // Only keep values that are declared on this page's section schema.
      const merged: Record<string, any> = {};
      for (const field of section.fields) {
        const name = field.name;

        if (
          item &&
          item.values &&
          Object.prototype.hasOwnProperty.call(item.values, name) &&
          item.values[name] !== undefined &&
          item.values[name] !== null &&
          item.values[name] !== ""
        ) {
          // Use saved value when present
          merged[name] = item.values[name];
        } else {
          // No saved value: fall back to the model placeholder so editors/public preview see something
          merged[name] = field.placeholder || "";
        }
      }

      return {
        _id: item?._id || `__placeholder_${section.apiIdentifier || idx}`,
        pageSlug: data.page?.slug,
        sectionApiId: section.apiIdentifier,
        sectionIndex: idx,
        itemIndex: item?.itemIndex ?? 0,
        values: merged,
      };
    })
    .filter(Boolean) as any[];
}

export default async function Home() {
  let data: PageResponse | null = null;

  try {
    data = await getPageContent("home-page");
  } catch (err) {
    console.error("Failed to load homepage:", err);
  }

  if (!data?.content?.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        No content available
      </div>
    );
  }

  const sections = mergeWithPlaceholders(data);

  return <Homepage sections={sections} />;
}
