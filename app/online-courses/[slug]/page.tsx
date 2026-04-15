import React from "react";
import { getDegreeTypes, getCourses } from "@/app/lib/api";
import SpecificDegreePage from "@/app/components/pages/onlineCoursesPage/SpecificDegreePage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const degreeTypes = await getDegreeTypes();
  const degreeType = degreeTypes.find((t: any) => t.slug === slug);

  if (!degreeType) return { title: "Degree Not Found" };

  return {
    title: `Online ${degreeType.name} Courses | COP-CMS`,
    description: `Explore all online ${degreeType.name} programs available. Find the best course for your career development.`,
  };
}

export default async function OnlineCoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let degreeTypes = [];
    let courses = [];

    try {
        [degreeTypes, courses] = await Promise.all([
            getDegreeTypes(),
            getCourses(),
        ]);
    } catch (err) {
        console.error("Failed to load course data:", err);
    }

    const degreeType = degreeTypes.find((t: any) => t.slug === slug);

    if (!degreeType) {
        notFound();
    }

    return (
        <SpecificDegreePage 
            degreeType={degreeType}
            allDegreeTypes={degreeTypes}
            courses={courses}
        />
    );
}