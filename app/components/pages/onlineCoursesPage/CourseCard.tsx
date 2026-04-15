import React from "react";
import { Course } from "@/app/lib/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const CourseCard = ({ course }: { course: Course }) => {
    // Placeholder description since the Course model doesn't have one
    const description = "An online Dual MBA is a postgraduate degree, which means that students can major in two fields of management simultaneously - learned in physical classes but Dual MBA is a postgraduate degree.";

    // Placeholder image
    const imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center p-4 transition-all hover:shadow-md">
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                    src={imageUrl}
                    alt={course.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2 text-center uppercase tracking-tight">
                {course.name}
            </h4>
            <p className="text-xs text-gray-500 text-center mb-6 leading-relaxed line-clamp-3">
                {description}
            </p>
            <Link
                href={`/course-detail?id=${course._id}`}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold py-2.5 px-6 rounded-md transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-purple-200/50"
            >
                View Program
            </Link>
        </div>
    );
};