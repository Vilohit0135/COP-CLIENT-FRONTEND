import React from "react";
import { Course } from "@/app/lib/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const CourseCard = ({ course }: { course: Course }) => {
    // Placeholder description since the Course model doesn't have one
    const description = "An online Dual MBA is a postgraduate degree, which means that students can major in two fields of management simultaneously.";

    // Placeholder image
    const imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center p-3 md:p-5 transition-all hover:shadow-xl hover:-translate-y-1 group">
            <div className="w-full h-40 md:h-52 rounded-xl overflow-hidden mb-4 relative">
                <img
                    src={imageUrl}
                    alt={course.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-col items-center flex-grow w-full">
                <h4 className="text-base md:text-xl font-bold text-gray-900 mb-2 text-center uppercase tracking-tight group-hover:text-[#8B5CF6] transition-colors">
                    {course.name}
                </h4>
                <p className="text-[10px] md:text-xs text-gray-500 text-center mb-6 leading-relaxed line-clamp-3 px-2">
                    {description}
                </p>
                
                <div className="mt-auto w-full flex justify-center">
                    <Link
                        href={`/course-detail?id=${course._id}`}
                        className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-[10px] md:text-xs font-bold py-2.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-purple-200/50 uppercase tracking-wider"
                    >
                        View Program
                    </Link>
                </div>
            </div>
        </div>
    );
};