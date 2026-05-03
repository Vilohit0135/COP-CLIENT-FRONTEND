import React from "react";

export default function TalkToCounselor({ isSpecializationView }: { isSpecializationView?: boolean }) {
    return (
        <div className="mt-10 md:mt-16 bg-gradient-to-br from-[#AD46FF] to-[#4F39F6] rounded-2xl p-6 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-black mb-4">
                    {isSpecializationView ? "Need Help Choosing?" : "Still Confused?"}
                </h2>
                <p className="text-purple-100 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
                    {isSpecializationView
                        ? "Our expert counselors can guide you to the right specialization based on your interests and career goals"
                        : "Our expert counselors are here to help you find the perfect program for your career goals"}
                </p>
                <a href="/talk-to-experts" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition-all transform hover:scale-105 shadow-xl text-sm md:text-base">
                    {isSpecializationView ? "Get Expert Guidance" : "Talk to a Counselor"}
                </a>
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>
    );
}