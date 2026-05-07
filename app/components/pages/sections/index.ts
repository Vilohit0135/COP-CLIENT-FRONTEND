import { ComponentType } from "react";
import { SectionContent } from "@/app/lib/types";
import dynamic from "next/dynamic";
import * as HeroModule from "../homepage/Hero";
import * as AboutModule from "../homepage/About";
import * as TopUniversitiesModule from "../homepage/TopUniversities";
import * as Section3Module from "../homepage/Section3";
import * as Section4Module from "../homepage/Section4";
import * as Section5Module from "../homepage/Section5";
import * as Section6Module from "../homepage/Section6";
import * as Section7Module from "../homepage/Section7";
// Section 8/9/10 are below the fold and heavy (Section8 includes framer-motion).
// Dynamic import keeps them out of the initial JS bundle while still SSR-ing HTML.
type SectionComponent = ComponentType<{ section: SectionContent }>;
type SectionEntry = {
  Component: SectionComponent;
  usedFields?: string[];
};

const Section8Dynamic = dynamic(() => import("../homepage/Section8")) as SectionComponent;
const Section9Dynamic = dynamic(() => import("../homepage/Section9")) as SectionComponent;
const Section10Dynamic = dynamic(() => import("../homepage/Section10")) as SectionComponent;
const section8UsedFields = ["Pill","Badge","pill","badge","Main Heading","Title","Main Title","heading","Below Main Heading","below main heading","Subtitle","Subheading","Description","First Card","first card","Card 1","card1","Second Card","second card","Card 2","card2","Third Card","third card","Card 3","card3","Fourth Card","fourth card","Card 4","card4","Fifth Card","fifth card","Card 5","card5","Sixth Card","sixth card","Card 6","card6","Seventh Card","seventh card","Card 7","card7","Eighth Card","eighth card","Card 8","card8"];
const section9UsedFields = ["Pill","pill","Badge","badge","Main Heading","main heading","Title","title","heading","Below Main Heading","below main heading","Subtitle","subtitle","Description","description","First Article","first article","Article 1","article1","article_1","Second Article","second article","Article 2","article2","article_2","Third Article","third article","Article 3","article3","article_3"];
const section10UsedFields = ["Pill","pill","Badge","badge","Main Heading","main heading","heading","Title","title","Below Main Heading","below main heading","Subtitle","subtitle","Description","description"];

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
  student_testimonials: { Component: Section8Dynamic, usedFields: section8UsedFields },
  "student-testimonials": { Component: Section8Dynamic, usedFields: section8UsedFields },
  studentTestimonials: { Component: Section8Dynamic, usedFields: section8UsedFields },
  testimonials: { Component: Section8Dynamic, usedFields: section8UsedFields },
  section_8: { Component: Section8Dynamic, usedFields: section8UsedFields },
  "section-8": { Component: Section8Dynamic, usedFields: section8UsedFields },
  section8: { Component: Section8Dynamic, usedFields: section8UsedFields },
  // Blogs & Resources / Articles Section (Section 9)
  blogs__resources: { Component: Section9Dynamic, usedFields: section9UsedFields },
  blogs_resources: { Component: Section9Dynamic, usedFields: section9UsedFields },
  "blogs-resources": { Component: Section9Dynamic, usedFields: section9UsedFields },
  blogs_and_resources: { Component: Section9Dynamic, usedFields: section9UsedFields },
  blogsresources: { Component: Section9Dynamic, usedFields: section9UsedFields },
  articles: { Component: Section9Dynamic, usedFields: section9UsedFields },
  section_9: { Component: Section9Dynamic, usedFields: section9UsedFields },
  "section-9": { Component: Section9Dynamic, usedFields: section9UsedFields },
  section9: { Component: Section9Dynamic, usedFields: section9UsedFields },
  // Frequently Asked Questions Section
  frequently_asked_questions: { Component: Section10Dynamic, usedFields: section10UsedFields },
  "frequently-asked-questions": { Component: Section10Dynamic, usedFields: section10UsedFields },
  frequentlyAskedQuestions: { Component: Section10Dynamic, usedFields: section10UsedFields },
  "FrequentlyAskedQuestions": { Component: Section10Dynamic, usedFields: section10UsedFields },
  faq: { Component: Section10Dynamic, usedFields: section10UsedFields },
  section_10: { Component: Section10Dynamic, usedFields: section10UsedFields },
  "section-10": { Component: Section10Dynamic, usedFields: section10UsedFields },
  section10: { Component: Section10Dynamic, usedFields: section10UsedFields },
};

export default sectionRegistry;
