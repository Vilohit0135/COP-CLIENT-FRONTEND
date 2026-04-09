import SectionRenderer from "@/app/components/SectionRenderer";
import Hero from "./Hero";
import { SectionContent } from "@/app/lib/types";

interface HomepageProps {
  sections: SectionContent[];
}

export default function Homepage({ sections }: HomepageProps) {
  // Pick out the hero section to render it explicitly at the top of the page.
  const heroIndex = sections.findIndex((s) => s.sectionApiId === "hero_section");
  const hero = heroIndex >= 0 ? sections[heroIndex] : null;
  // Remove any other hero sections so we don't render duplicates.
  const rest = sections.filter((s, i) => i !== heroIndex && s.sectionApiId !== "hero_section");

  return (
    <main className="min-h-screen w-full">
      {/* Hero: rendered explicitly so homepage layout is clear here. */}
      {hero ? <Hero key={hero._id} section={hero} /> : null}

      {/* Remaining sections: rendered by the generic SectionRenderer */}
      {rest.length > 0 && <SectionRenderer sections={rest} />}
    </main>
  );
}
