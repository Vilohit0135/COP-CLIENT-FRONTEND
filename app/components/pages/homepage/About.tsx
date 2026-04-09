import { SectionContent } from "@/app/lib/types";

interface AboutProps {
  section: SectionContent;
}

export default function About({ section }: AboutProps) {
  const v = section.values;

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {v["Title"] && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
            {v["Title"]}
          </h2>
        )}

        {v["Subtitle"] && (
          <p className="mt-2 text-lg text-purple-600 font-semibold text-center">
            {v["Subtitle"]}
          </p>
        )}

        {v["Description"] && (
          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto text-center">
            {v["Description"]}
          </p>
        )}

        {v["Image"] && (
          <img
            src={v["Image"]}
            alt={v["Title"] || "About image"}
            className="mt-10 rounded-2xl shadow-lg mx-auto max-w-full md:max-w-2xl"
          />
        )}
      </div>
    </section>
  );
}

// fields that About explicitly consumes from CMS — used to avoid duplicate rendering
export const usedFields = [
  "Title",
  "Subtitle",
  "Description",
  "Image",
  "title",
  "subtitle",
  "description",
  "image",
];
