import { ComponentType } from "react";
import { SectionContent } from "@/app/lib/types";
import * as HeroModule from "../pages/homepage/Hero";
import * as AboutModule from "../pages/homepage/About";

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
};

export default sectionRegistry;
