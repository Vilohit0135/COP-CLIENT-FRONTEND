import React from "react";
import { getCourseDetail } from "@/app/lib/api";
import Link from "next/link";
import { ProviderCourse, Course } from "@/app/lib/types";

import { Breadcrumbs, Breadcrumb } from "@/app/components/Breadcrumbs";
import TalkToExperts from "../components/pages/experts/TalkToExperts";

interface CourseDetailResponse {
  course: Course;
  programs: ProviderCourse[];
}

export default async function CourseDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md border border-gray-100">
          <h1 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Course Not Found</h1>
          <p className="text-gray-500 mb-8">Please select a valid course from our listings.</p>
          <Link
            href="/online-courses"
            className="inline-block bg-[#8B5CF6] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#7C3AED] transition-all text-sm uppercase tracking-widest"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  let data: CourseDetailResponse | null = null;
  try {
    data = await getCourseDetail(id);
  } catch (error) {
    console.error("Error fetching course detail:", error);
  }

  if (!data || !data.course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase">Error Loading Course</h1>
          <Link href="/online-courses" className="text-purple-600 font-bold hover:underline">Return to Course List</Link>
        </div>
      </div>
    );
  }

  const { course, programs } = data;
  const firstProgram = programs[0] || ({} as ProviderCourse);

  // Extract unique specializations from all programs
  const specializations = Array.from(
    new Set(
      programs
        .map((p) => (typeof p.specializationId !== "string" ? p.specializationId?.name : null))
        .filter(Boolean)
    )
  );

  const degreeType = typeof course.degreeTypeId !== "string" ? course.degreeTypeId : null;
  const provider = typeof firstProgram.providerId !== "string" ? firstProgram.providerId : null;

  const breadcrumbItems: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: "Online Courses", href: "/online-courses" },
    ...(degreeType ? [{ label: degreeType.name, href: `/online-courses/${degreeType.slug}` }] : []),
    { label: course.name }
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-[1240px] mx-auto px-4 pt-12 md:pt-16 pb-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <Breadcrumbs
            items={breadcrumbItems}
            className="text-[11px] font-bold uppercase tracking-widest"
          />

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A2E] leading-[1.1] uppercase tracking-tighter text-balance">
              {course.name}
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
              {firstProgram.shortDescription || `Master the essentials of ${course.name} with our comprehensive online programs. Gain industry-relevant skills and advance your career with top-tier university credentials.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-200 transition-all active:scale-95">
              Apply Now
            </button>
            <button className="group border-2 border-gray-100 hover:border-[#8B5CF6] text-gray-400 hover:text-[#8B5CF6] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2">
              Download Brochure
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
          </div>
        </div>

        <div className="md:w-1/2 relative lg:w-[45%]">
          <div className="absolute -inset-4 bg-purple-50 rounded-[40px] -z-10" />
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
            <img
              src={provider?.coverImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60"}
              alt={course.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. Top Highlights Row */}
      <section className="bg-gray-50/50 py-12">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Duration", value: firstProgram.duration || "24 Months", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Eligibility", value: firstProgram.eligibility || "Graduation", icon: "M12 14l9-5-9-5-9 5 9 5z" },
            { label: "Level", value: firstProgram.difficultyLevel || "Advanced", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
            { label: "Mode", value: firstProgram.mode || "Online", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 transition-all hover:shadow-xl hover:shadow-purple-100 group">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">{item.label}</p>
                <p className="font-black text-gray-900 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Program Key Highlights */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Key Highlights of the Program</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Highly Industry Relevant", "Live Interaction Session", "Flexible Learning Options",
              "Dedicated Career Support", "Networking Opportunities", "Self Paced Learning"
            ].map((text, i) => (
              <div key={i} className="p-8 bg-[#F8F9FF] rounded-3xl flex flex-col items-center gap-4 border border-gray-50 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#8B5CF6] shadow-sm group-hover:bg-[#8B5CF6] group-hover:text-white transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-black text-gray-800 uppercase text-xs tracking-widest">{text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Specializations Offered */}
      {specializations.length > 0 && (
        <section className="bg-[#FAF9FF] py-24">
          <div className="max-w-[1240px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Specializations Offered</h2>
            <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specializations.map((spec, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl flex items-center gap-3 border border-gray-100 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <span className="font-bold text-gray-700 text-[11px] text-left uppercase">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Eligibility Criteria */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Eligibility Criteria</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Academic Qualification", desc: firstProgram.eligibility || "Bachelor's degree with minimum 50% marks from a recognized university." },
              { title: "Course Level", desc: `This is a ${degreeType?.name || 'Academic'} level program designed for ${degreeType?.name === 'Post Graduate' ? 'graduates' : 'professionals'}.` },
              { title: "Experience", desc: "No prior work experience is mandatory, though preference is given to professionals with 2+ years of exposure." }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[32px] border-2 border-gray-50 flex flex-col items-center text-center space-y-6 hover:border-[#8B5CF6]/20 transition-all bg-white shadow-sm hover:shadow-xl">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#8B5CF6]">
                  <span className="text-2xl font-black">0{i + 1}</span>
                </div>
                <h4 className="font-black text-[#1A1A2E] uppercase text-sm tracking-widest">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="h-1 w-12 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Talk to Expert Section */}
      <section className="bg-white py-24">
        <TalkToExperts />
      </section>

      {/* 7. Course Curriculum */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Course Curriculum</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((sem) => (
              <div key={sem} className="bg-[#FAF9FF] p-8 rounded-[32px] border border-gray-100 text-left hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-10 h-10 bg-[#8B5CF6] text-white rounded-xl flex items-center justify-center font-black mb-6 text-sm">
                  S{sem}
                </div>
                <h4 className="font-black text-[#1A1A2E] uppercase text-xs tracking-widest mb-6">Semester {sem}</h4>
                <ul className="space-y-4">
                  {["Core Foundations", "Advanced Strategies", "Elective Specialization", "Project & Case Study"].map((sub, j) => (
                    <li key={j} className="flex items-start gap-3 text-xs text-gray-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-1 flex-shrink-0" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Potential Career Roles */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Potential Career Roles</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {["Project Manager", "Team Lead", "Consultant", "Product Owner", "Operations Head", "Strategy Planner", "Business Analyst", "Resource Manager"].map((role, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center gap-4 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="font-bold text-gray-800 text-[11px] uppercase tracking-wider">{role}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8b. Salary Growth & Placement Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Salary Growth */}
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-2xl font-black text-[#1A1A2E] uppercase tracking-tight">Average Salary Growth After {course.name}</h2>
            <div className="bg-[#FAF9FF] p-8 rounded-[40px] border border-gray-100 relative h-64 flex items-end justify-between px-12">
              {/* Simple SVG Line Chart */}
              <svg className="absolute inset-0 w-full h-full p-12" viewBox="0 0 400 200">
                <path d="M0,180 Q100,160 200,100 T400,20" fill="none" stroke="#8B5CF6" strokeWidth="4" />
                {[0, 100, 200, 300, 400].map(x => (
                  <circle key={x} cx={x} cy={x === 0 ? 180 : x === 100 ? 160 : x === 200 ? 100 : x === 300 ? 60 : 20} r="6" fill="#8B5CF6" />
                ))}
              </svg>
              <div className="text-[10px] font-black text-gray-400 uppercase">Year 1</div>
              <div className="text-[10px] font-black text-gray-400 uppercase">Year 2</div>
              <div className="text-[10px] font-black text-gray-400 uppercase">Year 3</div>
              <div className="text-[10px] font-black text-gray-400 uppercase">Year 5</div>
            </div>
          </div>

          {/* Placement Stats */}
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="text-2xl font-black text-[#1A1A2E] uppercase tracking-tight">Placement Highlights</h2>
            <div className="bg-[#FAF9FF] p-10 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-12">
              <div className="w-40 h-40 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full text-[#8B5CF6]">
                  <path className="text-purple-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-900 leading-none">95%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Placement</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {[
                  { label: "High CTC", value: "₹24 LPA" },
                  { label: "Avg CTC", value: "₹8.5 LPA" },
                  { label: "Hiring Partners", value: "150+" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase">{stat.label}</span>
                    <span className="text-sm font-black text-[#1A1A2E]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Top Programs Offering {course.name}</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-8">
                  <th className="pb-6 pl-8">University</th>
                  <th className="pb-6">Fees</th>
                  <th className="pb-6">Eligibility</th>
                  <th className="pb-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {programs.map((program) => {
                  const p_provider = typeof program.providerId !== 'string' ? program.providerId : null;
                  return (
                    <tr key={program._id} className="group transition-all">
                      <td className="bg-[#FAF9FF] p-6 rounded-l-[32px] group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] border-y border-l border-gray-50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-50 p-2 flex items-center justify-center overflow-hidden">
                            {p_provider?.logo && (
                              <img
                                src={p_provider.logo}
                                alt={p_provider.name}
                                className="max-full max-h-full object-contain"
                              />
                            )}
                          </div>
                          <span className="font-black text-[11px] uppercase text-[#1A1A2E]">
                            {p_provider?.name || 'Provider'}
                          </span>
                        </div>
                      </td>
                      <td className="bg-[#FAF9FF] p-6 group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] border-y border-gray-50 transition-all font-black text-sm">
                        ₹{(program.discountedFees || program.fees).toLocaleString()}
                        {program.discountedFees && program.discountedFees < program.fees && (
                          <div className="text-[10px] text-gray-400 line-through font-bold">₹{program.fees.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="bg-[#FAF9FF] p-6 group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] border-y border-gray-50 transition-all text-[10px] font-bold text-gray-400 uppercase leading-relaxed max-w-[200px]">
                        {program.eligibility || 'Graduation'}
                      </td>
                      <td className="bg-[#FAF9FF] p-6 rounded-r-[32px] group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] border-y border-r border-gray-50 transition-all text-center">
                        <Link
                          href={`/universities/${p_provider?.slug || ''}`}
                          className="bg-[#8B5CF6] text-white text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-widest transition-all hover:bg-[#7C3AED] active:scale-95 inline-block"
                        >
                          View Program
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">What Our Students Say</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-50">
                <div className="flex gap-1 mb-6 justify-center">
                  {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-10 italic">
                  "The online {course.name} program exceeded my expectations. The curriculum was practical, and the faculty was incredibly supportive throughout the journey."
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-purple-50 rounded-full mb-4 overflow-hidden border-2 border-white shadow-md">
                    <img src={`https://i.pravatar.cc/150?u=${item}`} alt="Avatar" />
                  </div>
                  <h5 className="font-black text-gray-900 uppercase text-[11px] tracking-widest">Alumni {item}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight mb-4">Frequently Asked Questions</h2>
          <div className="w-20 h-1.5 bg-[#8B5CF6] mx-auto rounded-full mb-16" />

          <div className="space-y-4 text-left">
            {[
              "Is this degree recognized globally?",
              "What is the total fee for the program?",
              "Are there any scholarship options?",
              "What is the mode of examination?",
              "Can I work while pursuing this course?"
            ].map((q, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-6 border border-gray-100/50 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs uppercase text-gray-800 tracking-tight">{q}</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#8B5CF6] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Bottom CTA */}
      <section className="pb-24 px-4">
        <div className="max-w-[1240px] mx-auto bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">Ready to Transform <br /> Your Career?</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium opacity-80">
              Join thousands of students who have already started their journey with {course.name}.
            </p>
            <button className="bg-white text-[#8B5CF6] px-12 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:scale-105 active:scale-95">
              Apply Now
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}