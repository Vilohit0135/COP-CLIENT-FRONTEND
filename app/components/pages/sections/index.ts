import { ComponentType } from "react";
import { SectionContent } from "@/app/lib/types";
import * as HeroModule from "../homepage/Hero";
import * as AboutModule from "../homepage/About";
import * as TopUniversitiesModule from "../homepage/TopUniversities";
import * as Section3Module from "../homepage/Section3";
import * as Section4Module from "../homepage/Section4";
import * as Section5Module from "../homepage/Section5";
import * as Section6Module from "../homepage/Section6";
import * as Section7Module from "../homepage/Section7";
import * as Section8Module from "../homepage/Section8";
import * as Section10Module from "../homepage/Section10";

type SectionComponent = ComponentType<{ section: SectionContent }>;

type SectionEntry = {
  Component: SectionComponent;
  usedFields?: string[];
};

const sectionRegistry: Record<string, SectionEntry> = {
  hero_section: {
    Component: HeroModule.default,
    usedFields: HeroModule.usedFields,
  },
  about_us: {
    Component: AboutModule.default,
    usedFields: AboutModule.usedFields,
  },
  top_universities: {
    Component: TopUniversitiesModule.default,
    usedFields: TopUniversitiesModule.usedFields,
  },
  // CMS: "find your perfect program" — registered keys to match common identifiers
  find_your_perfect_program: {
    Component: Section3Module.default,
    usedFields: Section3Module.usedFields,
  },
  perfect_program: {
    Component: Section3Module.default,
    usedFields: Section3Module.usedFields,
  },
  // common variants
  "find-your-perfect-program": {
    Component: Section3Module.default,
    usedFields: Section3Module.usedFields,
  },
  "FindYourPerfectProgram": {
    Component: Section3Module.default,
    usedFields: Section3Module.usedFields,
  },
  "findYourPerfectProgram": {
    Component: Section3Module.default,
    usedFields: Section3Module.usedFields,
  },
  // Expert Counselors Section
  expert_counselors: {
    Component: Section4Module.default,
    usedFields: Section4Module.usedFields,
  },
  "expert-counselors": {
    Component: Section4Module.default,
    usedFields: Section4Module.usedFields,
  },
  expertCounselors: {
    Component: Section4Module.default,
    usedFields: Section4Module.usedFields,
  },
  "ExpertCounselors": {
    Component: Section4Module.default,
    usedFields: Section4Module.usedFields,
  },
  // Talk to Our Expert Counselors Section  
  talk_to_expert_counselors: {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  talk_to_our_expert_counselors: {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  "talk-to-expert-counselors": {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  "talk-to-our-expert-counselors": {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  talkToExpertCounselors: {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  talkToOurExpertCounselors: {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  "TalkToExpertCounselors": {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  "TalkToOurExpertCounselors": {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  section_5: {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  "section-5": {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  section5: {
    Component: Section5Module.default,
    usedFields: Section5Module.usedFields,
  },
  // Best ROI Programs Section
  best_roi: {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  "best-roi": {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  best_roi_programs: {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  bestRoiPrograms: {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  "best-roi-programs": {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  section_6: {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  "section-6": {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  section6: {
    Component: Section6Module.default,
    usedFields: Section6Module.usedFields,
  },
  // Choose Us Section
  choose_us: {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  "choose-us": {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  chooseUs: {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  "ChooseUs": {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  why_choose_us: {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  "why-choose-us": {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  whyChooseUs: {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  section_7: {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  "section-7": {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  section7: {
    Component: Section7Module.default,
    usedFields: Section7Module.usedFields,
  },
  // Student Testimonials Section
  student_testimonials: {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  "student-testimonials": {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  studentTestimonials: {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  testimonials: {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  section_8: {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  "section-8": {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  section8: {
    Component: Section8Module.default,
    usedFields: Section8Module.usedFields,
  },
  // Frequently Asked Questions Section
  frequently_asked_questions: {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  "frequently-asked-questions": {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  frequentlyAskedQuestions: {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  "FrequentlyAskedQuestions": {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  faq: {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  section_10: {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  "section-10": {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
  section10: {
    Component: Section10Module.default,
    usedFields: Section10Module.usedFields,
  },
};

export default sectionRegistry;
