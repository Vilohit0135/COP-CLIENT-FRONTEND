"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp, GraduationCap, BookOpen, Award, FileText, Briefcase, FlaskConical } from "lucide-react";

interface CourseItem {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  shortDescription: string;
  duration: string;
  minFees: number;
  providerCount: number;
  isTrending: boolean;
}

interface CourseGroup {
  degreeType: { name: string; slug: string; order: number };
  courses: CourseItem[];
}

interface Props {
  courseGroups: CourseGroup[];
}

// Map degree type slugs to an icon component
function DegreeIcon({ slug }: { slug: string }) {
  const cls = "w-5 h-5 text-purple-600";
  if (slug.includes("pg") || slug.includes("post")) return <GraduationCap className={cls} />;
  if (slug.includes("ug") || slug.includes("under")) return <BookOpen className={cls} />;
  if (slug.includes("diploma")) return <Award className={cls} />;
  if (slug.includes("cert")) return <FileText className={cls} />;
  if (slug.includes("exec")) return <Briefcase className={cls} />;
  if (slug.includes("doc") || slug.includes("phd")) return <FlaskConical className={cls} />;
  return <GraduationCap className={cls} />;
}

function formatFees(amount: number) {
  if (!amount) return "Contact for Fees";
  if (amount >= 100000) return `Rs ${(amount / 100000).toFixed(0)} Lakh`;
  if (amount >= 1000) return `Rs ${(amount / 1000).toFixed(0)}K`;
  return `Rs ${amount.toLocaleString("en-IN")}`;
}

export default function Section3Client({ courseGroups }: Props) {
  const [activeTab, setActiveTab] = useState(courseGroups[0]?.degreeType?.slug ?? "");

  const activeGroup = courseGroups.find((g) => g.degreeType.slug === activeTab);
  const visibleCourses = activeGroup?.courses?.slice(0, 3) ?? [];

  return (
    <>
      {/* Tabs + View All link */}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2 overflow-x-auto ml-20">
            {courseGroups.map((group) => (
              <button
                key={group.degreeType.slug}
                onClick={() => setActiveTab(group.degreeType.slug)}
                className={`px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  activeTab === group.degreeType.slug
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {group.degreeType.name}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-6 flex-shrink-0">
          <Link href="/explore-programs" className="text-purple-600 underline whitespace-nowrap font-medium">
            View all Courses
          </Link>
        </div>
      </div>

      {/* Course Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleCourses.length > 0 ? (
          visibleCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-52 md:h-60 bg-gray-100">
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100" />
                )}

                {/* Degree icon badge — top left */}
                <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow">
                  <DegreeIcon slug={activeTab} />
                </div>

                {/* Trending badge — top right */}
                {course.isTrending && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white text-purple-600 text-xs font-semibold px-2 py-1 rounded-full shadow">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "Inter", fontSize: "18px" }}
                >
                  {course.name}
                </h3>

                {course.shortDescription && (
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {course.shortDescription}
                  </p>
                )}

                {/* Duration */}
                {course.duration && (
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{course.duration}</span>
                  </div>
                )}

                {/* Fees */}
                <p className="text-purple-600 text-sm font-medium mb-3">
                  Fees Starting from {formatFees(course.minFees)}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-gray-700 text-sm font-medium">
                    {course.providerCount > 0 ? `${course.providerCount}+ Universities` : "—"}
                  </span>
                  <Link
                    href={`/course-detail?course=${course.slug}`}
                    className="text-purple-600 text-sm font-semibold hover:text-purple-800 transition-colors"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Skeleton placeholders while loading or if no data
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="flex justify-between pt-2">
                  <div className="h-4 bg-gray-100 rounded w-28" />
                  <div className="h-4 bg-gray-100 rounded w-20" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All CTA */}
      <div className="mt-12 flex justify-center">
        <Link
          href={`/explore-programs?degreeType=${activeTab}`}
          className="text-white font-semibold transition-all flex items-center justify-center"
          style={{
            width: "260px",
            height: "56px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4F39F6 0%, #9810FA 100%)",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            textDecoration: "none",
            fontFamily: "Inter",
            fontSize: "16px",
          }}
        >
          View All {activeGroup?.degreeType?.name ?? "Courses"}
        </Link>
      </div>
    </>
  );
}
