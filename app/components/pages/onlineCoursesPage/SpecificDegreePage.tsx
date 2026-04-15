"use client";

import React from "react";
import { DegreeType, Course } from "@/app/lib/types";
import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import { PageHeader } from "../../PageHeader";
import { CourseCard } from "./CourseCard";

interface SpecificDegreePageProps {
  degreeType: DegreeType;
  allDegreeTypes: DegreeType[];
  courses: Course[];
}

export default function SpecificDegreePage({ degreeType, allDegreeTypes, courses }: SpecificDegreePageProps) {
  // Filter courses for THIS degree type
  const typeCourses = courses.filter((c) => {
    const dId = typeof c.degreeTypeId === "string" ? c.degreeTypeId : c.degreeTypeId?._id;
    return dId === degreeType._id;
  });

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Title & Breadcrumbs Section */}
      <PageHeader
        title={`${degreeType.name} COURSES`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Online Course", href: "/online-courses" },
          { label: `${degreeType.name} Course` }
        ]}
      />

      {/* Courses Grid Container */}
      <div className="max-w-[90vw] mx-auto px-6">
        {typeCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {typeCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-[40px] border border-gray-100">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No programs available</h3>
            <p className="text-gray-500 text-sm mt-1">We couldn't find any {degreeType.name} courses at this time.</p>
          </div>
        )}
      </div>
    </main>
  );
}

