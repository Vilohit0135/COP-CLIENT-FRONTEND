"use client";

import React, { useState, useMemo } from "react";
import { SectionContent, DegreeType, Course, Specialization } from "@/app/lib/types";
import { IconArrowLeft, IconZoom } from '@tabler/icons-react';
import SectionRenderer from "@/app/components/SectionRenderer";
import SidebarFilters from "./SidebarFilters";
import ProgramCard from "./ProgramCard";
import Link from "next/link";
import TalkToCounselor from "../../talkToCounselor";

interface ExploreProgramsPageProps {
  sections: SectionContent[];
  degreeTypes: DegreeType[];
  courses: Course[];
  specializations: Specialization[];
  initialType?: string;
  initialCourse?: string;
}

export default function ExploreProgramsPage({
  sections,
  degreeTypes,
  courses,
  specializations,
  initialType,
  initialCourse,
}: ExploreProgramsPageProps) {
  const [selectedDegreeTypeId, setSelectedDegreeTypeId] = React.useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    if (initialType && degreeTypes.length > 0) {
      const match = degreeTypes.find((dt) => {
        const type = initialType.toLowerCase();
        const name = dt.name.toLowerCase();
        const slug = dt.slug?.toLowerCase() || "";

        return (
          slug === type ||
          name.includes(type) ||
          type.includes(name) ||
          (type === "pg" && (name.includes("post graduate") || name.startsWith("master"))) ||
          (type === "ug" && (name.includes("under graduate") || name.startsWith("bachelor")))
        );
      });
      if (match) {
        setSelectedDegreeTypeId(match._id);
      }
    }

    if (initialCourse && courses.length > 0) {
      const match = courses.find((c) => c.slug === initialCourse || c._id === initialCourse);
      if (match) {
        setSelectedCourseId(match._id);
        const dId = typeof match.degreeTypeId === "string" ? match.degreeTypeId : match.degreeTypeId?._id;
        if (dId) setSelectedDegreeTypeId(dId);
      }
    }
  }, [initialType, initialCourse, degreeTypes, courses]);

  const filteredCourses = useMemo(() => {
    let list = courses;
    if (selectedDegreeTypeId) {
      list = list.filter((c) => {
        const dId = typeof c.degreeTypeId === "string" ? c.degreeTypeId : c.degreeTypeId?.["_id"];
        return dId === selectedDegreeTypeId;
      });
    }
    if (searchQuery) {
      list = list.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [courses, selectedDegreeTypeId, searchQuery]);

  const filteredSpecializations = useMemo(() => {
    let list = specializations;
    if (selectedCourseId) {
      list = list.filter((s) => {
        const cId = typeof s.courseId === "string" ? s.courseId : s.courseId?.["_id"];
        return cId === selectedCourseId;
      });
    } else if (selectedDegreeTypeId) {
      // Filter by degree type indirectly
      list = list.filter((s) => {
        const course = typeof s.courseId === "string" ? courses.find(c => c._id === s.courseId) : s.courseId as Course;
        const dId = typeof course?.degreeTypeId === "string" ? course.degreeTypeId : course?.degreeTypeId?.["_id"];
        return dId === selectedDegreeTypeId;
      });
    }
    if (searchQuery) {
      list = list.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [specializations, selectedCourseId, selectedDegreeTypeId, searchQuery, courses]);

  const isSpecializationView = !!selectedCourseId;

  const handleBack = () => {
    if (selectedCourseId) {
      setSelectedCourseId(null);
    } else if (selectedDegreeTypeId) {
      setSelectedDegreeTypeId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Hero / Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="flex items-center text-xl font-bold text-purple-600 mb-4 hover:text-purple-700 transition-colors"
          >
            <IconArrowLeft stroke={2} size={25} />
            {selectedCourseId ? "Back to Programs" : "Back to Home"}
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
            {isSpecializationView ? "Explore By Specializations" : "Explore Programs"}
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            {isSpecializationView
              ? "Choose a specialization to see universities offering it"
              : "Choose a program type to explore specializations and universities"}
          </p>
        </div>
      </div>

      <div className="max-w-[90vw] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <SidebarFilters
            degreeTypes={degreeTypes}
            selectedDegreeTypeId={selectedDegreeTypeId}
            onSelectDegreeType={(id) => {
              setSelectedDegreeTypeId(id);
              setSelectedCourseId(null);
            }}
          />

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder={isSpecializationView ? "Search specializations..." : "Search programs..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-6 rounded-2xl border border-[#D1D5DC] bg-white shadow-sm outline-none focus:border-purple-300 transition-all text-lg placeholder:font-semibold"
              />
              <IconZoom className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {!isSpecializationView ? (
                // Courses View
                filteredCourses.map((course) => (
                  <ProgramCard
                    key={course._id}
                    title={course.name}
                    subtitle={(typeof course.degreeTypeId === 'string' ? '' : course.degreeTypeId?.name) || 'Program'}
                    degreeType={typeof course.degreeTypeId === 'string' ? '' : course.degreeTypeId?.name}
                    count={specializations.filter(s => (typeof s.courseId === 'string' ? s.courseId : s.courseId?._id) === course._id).length}
                    onClick={() => setSelectedCourseId(course._id)}
                  />
                ))
              ) : (
                // Specializations View
                filteredSpecializations.map((spec) => (
                  <ProgramCard
                    key={spec._id}
                    variant="specialization"
                    title={spec.name}
                    subtitle="2-4 Years | 150+ Universities" // Placeholders as per image
                    onClick={() => { }} // Navigate to university listing filtered by this specialization if needed
                  />
                ))
              )}
            </div>

            {/* Banner */}
            <TalkToCounselor isSpecializationView={isSpecializationView} />
          </div>
        </div>
      </div>

      {/* Render CMS sections if any */}
      {/* <SectionRenderer sections={sections} /> */}
    </main>
  );
}
