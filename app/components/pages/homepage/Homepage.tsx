import SectionRenderer from "@/app/components/SectionRenderer";
import Hero from "./Hero";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8";
import Section9 from "./Section9";
import Section10 from "./Section10";
import { SectionContent } from "@/app/lib/types";

interface HomepageProps {
  sections: SectionContent[];
}

export default function Homepage({ sections }: HomepageProps) {
  // Pick out the hero section to render it explicitly at the top of the page.
  const heroIndex = sections.findIndex((s) => s.sectionApiId === "hero_section");
  const hero = heroIndex >= 0 ? sections[heroIndex] : null;

  // Pick out Section 5 (Talk to Expert Counselors) to render it explicitly
  const section5Index = sections.findIndex(
    (s) =>
      s.sectionApiId === "talk_to_expert_counselors" ||
      s.sectionApiId === "talk-to-expert-counselors" ||
      s.sectionApiId === "talkToExpertCounselors" ||
      s.sectionApiId === "section_5" ||
      s.sectionApiId === "section5"
  );
  const section5 = section5Index >= 0 ? sections[section5Index] : null;

  // Pick out Section 6 (Best ROI Programs) to render it explicitly
  const section6Index = sections.findIndex(
    (s) =>
      s.sectionApiId === "best_roi_programs" ||
      s.sectionApiId === "best-roi-programs" ||
      s.sectionApiId === "bestRoiPrograms" ||
      s.sectionApiId === "section_6" ||
      s.sectionApiId === "section6" ||
      s.sectionApiId === "best_roi" ||
      s.sectionApiId === "best roi"
  );
  const section6 = section6Index >= 0 ? sections[section6Index] : null;

  // Pick out Section 7 (Choose Us) to render it explicitly after Best ROI
  const section7Index = sections.findIndex(
    (s) =>
      s.sectionApiId === "choose_us" ||
      s.sectionApiId === "choose-us" ||
      s.sectionApiId === "chooseUs" ||
      s.sectionApiId === "why_choose_us" ||
      s.sectionApiId === "section_7" ||
      s.sectionApiId === "section7"
  );
  const section7 = section7Index >= 0 ? sections[section7Index] : null;

  // Pick out Section 8 (Student Testimonials) to render it explicitly after Choose Us
  const section8Index = sections.findIndex(
    (s) =>
      s.sectionApiId === "student_testimonials" ||
      s.sectionApiId === "student-testimonials" ||
      s.sectionApiId === "studentTestimonials" ||
      s.sectionApiId === "testimonials" ||
      s.sectionApiId === "section_8" ||
      s.sectionApiId === "section8"
  );
  const section8 = section8Index >= 0 ? sections[section8Index] : null;

  // Pick out Section 9 (Blogs & Resources) to render it explicitly after Student Testimonials
  const section9Index = sections.findIndex(
    (s) =>
      s.sectionApiId === "blogs__resources" ||
      s.sectionApiId === "blogs_resources" ||
      s.sectionApiId === "blogs-resources" ||
      s.sectionApiId === "blogs_and_resources" ||
      s.sectionApiId === "blogsresources" ||
      s.sectionApiId === "section_9" ||
      s.sectionApiId === "section9"
  );
  const section9 = section9Index >= 0 ? sections[section9Index] : null;

  // Pick out Section 10 (Frequently Asked Questions) to render it explicitly after Blogs
  const section10Index = sections.findIndex(
    (s) =>
      s.sectionApiId === "frequently_asked_questions" ||
      s.sectionApiId === "frequently-asked-questions" ||
      s.sectionApiId === "frequentlyAskedQuestions" ||
      s.sectionApiId === "FrequentlyAskedQuestions" ||
      s.sectionApiId === "faq" ||
      s.sectionApiId === "section_10" ||
      s.sectionApiId === "section10"
  );
  const section10 = section10Index >= 0 ? sections[section10Index] : null;

  // Remove hero, section5, section6, section7, section8, section9 so we don't render duplicates
  const rest = sections.filter(
    (s, i) =>
      i !== heroIndex &&
      i !== section5Index &&
      i !== section6Index &&
      i !== section7Index &&
      i !== section8Index &&
      i !== section9Index &&
      i !== section10Index &&
      s.sectionApiId !== "hero_section"
  );

  return (
    <main className="min-h-screen w-full flex flex-col items-stretch" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
      {/* Hero: rendered explicitly so homepage layout is clear here. */}
      {hero ? (
        <div className="w-full">
          <Hero key={hero._id} section={hero} />
        </div>
      ) : null}

      {/* Remaining sections: rendered by the generic SectionRenderer */}
      {rest.length > 0 && (
        <div className="w-full">
          <SectionRenderer sections={rest} />
        </div>
      )}

      {/* Section 5: Talk to Expert Counselors - rendered explicitly */}
      {section5 ? (
        <div className="w-full">
          <Section5 key={section5._id} section={section5} />
        </div>
      ) : null}

      {/* Section 6: Best ROI Programs - rendered explicitly below Section 5 */}
      {section6 ? (
        <div className="w-full">
          <Section6 key={section6._id} section={section6} />
        </div>
      ) : null}

      {/* Section 7: Choose Us - rendered explicitly below Best ROI */}
      {section7 ? (
        <div className="w-full">
          <Section7 key={section7._id} section={section7} />
        </div>
      ) : null}

      {/* Section 8: Student Testimonials - rendered explicitly below Choose Us */}
      {section8 ? (
        <div className="w-full">
          <Section8 key={section8._id} section={section8} />
        </div>
      ) : null}

      {/* Section 9: Blogs & Resources - rendered explicitly below Student Testimonials */}
      {section9 ? (
        <div className="w-full">
          <Section9 key={section9._id} section={section9} />
        </div>
      ) : null}

      {/* Section 10: Frequently Asked Questions - rendered explicitly below Blogs & Resources */}
      {section10 ? (
        <div className="w-full">
          <Section10 key={section10._id} section={section10} />
        </div>
      ) : null}
    </main>
  );
}
