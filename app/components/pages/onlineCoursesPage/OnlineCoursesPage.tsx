"use client";

import React from "react";
import { DegreeType, Course } from "@/app/lib/types";
import Link from "next/link";
import TalkToCounselor from "../../talkToCounselor";
import { PageHeader } from "../../PageHeader";
import { CourseCard } from "./CourseCard";

interface OnlineCoursesPageProps {
  degreeTypes: DegreeType[];
  courses: Course[];
}

export default function OnlineCoursesPage({ degreeTypes, courses }: OnlineCoursesPageProps) {
  // Sort degree types by order
  const sortedDegreeTypes = [...degreeTypes].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumbs & Title */}
      <PageHeader
        title="Online Courses"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Online Course" }
        ]}
      />

      {/* Degree Type Sections */}
      <div className="max-w-[90vw] mx-auto px-4 pb-20 space-y-16">
        {sortedDegreeTypes.map((type) => {
          const typeCourses = courses.filter((c) => {
            const dId = typeof c.degreeTypeId === "string" ? c.degreeTypeId : c.degreeTypeId?._id;
            return dId === type._id;
          });

          if (typeCourses.length === 0) return null;

          return (
            <section key={type._id} className="space-y-8">
              <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-purple-600 bg-purple-50 p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.654l7.74-4.507m-15.48 0L12 5.64l7.74 4.507m-15.48 0v4.75c0 1.035.84 1.875 1.875 1.875h11.73c1.035 0 1.875-.84 1.875-1.875v-4.75m-15.48 0L12 14.654l7.74-4.507" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                    {type.name.toLowerCase().includes("course") ? type.name : `${type.name} Courses`}
                  </h2>
                </div>
                <Link
                  href={`/online-courses/${type.slug}`}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 uppercase tracking-widest flex items-center gap-1 group"
                >
                  View All {type.name} Programs
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Image has 2 rows in mockup for some reason or just repeated items */}
                {/* I'll just map the courses we have */}
                {typeCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[90vw] mx-auto mb-10">
        <TalkToCounselor isSpecializationView={false} />
      </div>
    </main>
  );
}
