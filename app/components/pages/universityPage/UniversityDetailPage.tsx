"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Share2, Heart, Award, CheckCircle2, 
  ChevronRight, Calendar, BookOpen, GraduationCap, 
  Users, TrendingUp, Download, Phone, MessageCircle,
  FileText, ShieldCheck, StarHalf, Play, Info, ArrowRight,
  ChevronDown, Search, Filter, Briefcase, Trophy, BarChart3,
  Globe, Mail, Clock, Check
} from "lucide-react";
import { Provider, ProviderCourse, Review } from "@/app/lib/types";

interface UniversityDetailPageProps {
  id: string;
}

export default function UniversityDetailPage({ id }: UniversityDetailPageProps) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [courses, setCourses] = useState<ProviderCourse[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
        // Fetch provider data, courses, and reviews using the slug (passed as prop 'id')
        const [providerRes, coursesRes, reviewsRes] = await Promise.all([
          fetch(`${baseUrl}/api/public/providers/${id}`),
          fetch(`${baseUrl}/api/public/providers/${id}/courses`),
          fetch(`${baseUrl}/api/public/providers/${id}/reviews`)
        ]);

        if (!providerRes.ok) {
          if (providerRes.status === 404) throw new Error("University not found");
          throw new Error("Failed to fetch university details");
        }

        const providerData = await providerRes.json();
        setProvider(providerData);

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const [activeTab, setActiveTab] = useState("about");
  const [activeCategory, setActiveCategory] = useState("All");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-bold animate-pulse">Loading University Details...</p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="text-center p-12 bg-white rounded-[32px] shadow-2xl shadow-indigo-100/50 border border-gray-100 max-w-lg mx-4">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-500 mb-8 font-medium">{error || "We couldn't find the university you're looking for."}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              Go Back Home
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-600 font-black rounded-2xl hover:border-indigo-100 hover:text-indigo-600 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categories = ["All", "Post Graduate", "Under Graduate", "Diploma", "Certificate"];
  
  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(c => {
        const degreeName = (c.degreeTypeId as any)?.name || "";
        if (activeCategory === "Post Graduate") return degreeName.includes("Masters") || degreeName.includes("MBA") || degreeName.includes("PG");
        if (activeCategory === "Under Graduate") return degreeName.includes("Bachelors") || degreeName.includes("BBA") || degreeName.includes("UG");
        if (activeCategory === "Diploma") return degreeName.includes("Diploma");
        if (activeCategory === "Certificate") return degreeName.includes("Certificate");
        return true;
      });

  const tabs = [
    { id: "about", label: "About University" },
    { id: "programs", label: "Programs Offered" },
    { id: "eligibility", label: "Eligibility" },
    { id: "admission", label: "Admission Process" },
    { id: "placements", label: "Placement & top recruiters" },
    { id: "reviews", label: "Review & Ratings" },
    { id: "faq", label: "FAQs" },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      {/* Hero Section */}
      <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
        {/* Banner Background */}
        <div className="absolute inset-0">
          <Image 
            src={provider.coverImage || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop"} 
            alt={provider.name}
            fill
            className="object-cover brightness-75 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Hero Content Container */}
        <div className="relative max-w-[1280px] mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl border border-white/20">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center p-2 shrink-0">
              <Image 
                src={provider.logo || "/placeholder-logo.png"} 
                alt={`${provider.name} Logo`}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* University Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {provider.admissionOpen?.isOpen ? "Admissions Open" : "Direct Admission"}
                </span>
                <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {provider.isActive === "active" ? "Online" : "Regular"}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {provider.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-600 font-medium">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-900 font-bold">{provider.averageRating || "4.1"}</span>
                  <span className="text-gray-400 text-sm">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  <span>{provider.location || "Udupi, Karnataka"}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 shrink-0 self-center md:self-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-300">
                <TrendingUp className="w-5 h-5" />
                Add to compare
              </button>
              <button className="flex items-center justify-center w-12 h-12 border-2 border-gray-200 rounded-xl hover:border-red-400 hover:text-red-500 transition-all duration-300">
                <Heart className="w-5 h-5 font-bold" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
                <Share2 className="w-5 h-5 font-bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="flex-1 lg:max-w-[calc(100%-380px)]">
            
            {/* Navigation Tabs */}
            <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-sm mb-8 overflow-x-auto no-scrollbar p-1.5">
              <div className="flex gap-1 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* About Section */}
            <section id="about" className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 mb-8 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">About University</h2>
              </div>
              
              <div className="prose prose-indigo max-w-none text-gray-600 font-medium leading-relaxed mb-8">
                {provider.aboutContent ? (
                   <div dangerouslySetInnerHTML={{ __html: provider.aboutContent }} />
                ) : (
                  <p>
                    {provider.shortExcerpt || `${provider.name} is a premier institution offering high-quality education with a focus on innovation and excellence. With state-of-the-art infrastructure and experienced faculty, we provide a transformative learning experience for students globally.`}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {["UGC Recognized", "NAAC A+ Accredited", "AICTE Approved", "WES Credentialed"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-full border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Overview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: "Establishment", value: "2011" },
                  { icon: MapPin, label: "Location", value: provider.location || "Online" },
                  { icon: Trophy, label: "Ranking", value: "NIRF Top 10" },
                  { icon: ShieldCheck, label: "Recognized", value: "UGC Approved" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl flex flex-col items-center text-center hover:border-indigo-100 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3">
                      <item.icon className="w-5 h-5 font-bold" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="mb-8 scroll-mt-32">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Programs Offered</h2>
                 </div>
                 
                 <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                          activeCategory === cat 
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                            : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course._id} className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                        {course.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{course.duration || "2 Years"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-indigo-500">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{course.mode || "Online Mode"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end shrink-0 gap-1">
                       <span className="text-2xl font-black text-gray-900">₹{course.fees?.toLocaleString() || "1,50,000"}</span>
                       <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility Section */}
            <section id="eligibility" className="mb-8 scroll-mt-32">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Eligibility Criteria</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { degree: "Post Graduate Programs", text: "Candidates must have a bachelor's degree with a minimum of 50% aggregate marks (45% for reserved categories)." },
                     { degree: "Under Graduate Programs", text: "Completion of 10+2 from a recognized board with at least 45% marks in aggregate." },
                     { degree: "MBA Programs", text: "Bachelor's degree + Work experience preferred. Some programs may require entrance exam scores." },
                     { degree: "Diploma Programs", text: "Graduation in any stream or relevant field. Some specialized diplomas require prior experience." },
                   ].map((item, i) => (
                     <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:border-indigo-100 transition-all">
                        <h4 className="flex items-center gap-2 text-indigo-600 font-black mb-3 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                           {item.degree}
                        </h4>
                        <p className="text-gray-600 text-sm font-medium leading-relaxed">{item.text}</p>
                     </div>
                   ))}
                </div>
            </section>

            {/* Admission Process */}
            <section id="admission" className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm mb-8 scroll-mt-32">
               <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Admission Process</h2>
                </div>

                <div className="relative space-y-12 pl-8 border-l-2 border-indigo-100 border-dashed ml-4">
                   {[
                     { title: "Fill Application Form", desc: "Register online and fill in your personal and academic details." },
                     { title: "Document Upload", desc: "Upload scanned copies of required documents and photographs." },
                     { title: "Fee Payment", desc: "Pay the required application fee through our secure payment gateway." },
                     { title: "Review & Selection", desc: "Your application will be reviewed by the admission committee." },
                     { title: "Final Confirmation", desc: "Receive your admission letter and complete the remaining formalities." },
                   ].map((step, i) => (
                     <div key={i} className="relative">
                        <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow-md flex items-center justify-center text-white text-[10px] font-black">
                           {i + 1}
                        </div>
                        <h4 className="text-lg font-black text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-500 font-medium text-sm">{step.desc}</p>
                     </div>
                   ))}
                </div>
            </section>

             {/* Placements */}
             <section id="placements" className="mb-8 scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Placement & Recruiters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                   {[
                     { label: "Placement Rate", value: "95%", icon: TrendingUp },
                     { label: "Highest Package", value: "₹45 LPA", icon: Award },
                     { label: "Average Package", value: "₹6.5 LPA", icon: BarChart3 },
                   ].map((stat, i) => (
                     <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-3">
                           <stat.icon className="w-5 h-5 font-bold" />
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-1">{stat.value}</h4>
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
                   <p className="text-gray-400 text-xs font-black uppercase tracking-widest text-center mb-8 italic">Our Top Recruiters</p>
                   <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                      {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <div key={i} className="h-10 w-24 relative">
                           <Image src={`https://placehold.co/120x60?text=Brand+${i}`} alt="Brand" fill className="object-contain" />
                        </div>
                      ))}
                   </div>
                </div>
             </section>

             {/* Reviews */}
             <section id="reviews" className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm mb-8 scroll-mt-32">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                    <Star className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Student Reviews</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-12 mb-12">
                   <div className="flex flex-col items-center justify-center shrink-0">
                      <span className="text-6xl font-black text-gray-900 mb-2">{provider.averageRating || "4.1"}</span>
                      <div className="flex gap-1 text-amber-500 mb-2">
                         <Star className="w-5 h-5 fill-current" />
                         <Star className="w-5 h-5 fill-current" />
                         <Star className="w-5 h-5 fill-current" />
                         <Star className="w-5 h-5 fill-current" />
                         <StarHalf className="w-5 h-5 fill-current" />
                      </div>
                      <span className="text-gray-400 text-xs font-bold uppercase">Based on {reviews.length} reviews</span>
                   </div>
                   
                   <div className="flex-1 space-y-4">
                      {[
                        { label: "Academics", score: 85 },
                        { label: "Faculty", score: 90 },
                        { label: "Campus Life", score: 70 },
                        { label: "Placement", score: 80 },
                      ].map((bar, i) => (
                        <div key={i} className="space-y-1.5">
                           <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-500">
                              <span>{bar.label}</span>
                              <span>{bar.score / 20}/5</span>
                           </div>
                           <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${bar.score}%` }} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   {reviews.length > 0 ? reviews.map(rev => (
                     <div key={rev._id} className="p-6 rounded-2xl bg-gray-50/50 border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-black">
                                 {rev.studentId?.name?.[0] || "S"}
                              </div>
                              <div>
                                 <h5 className="font-extrabold text-gray-900">{rev.studentId?.name || "Student"}</h5>
                                 <p className="text-xs text-gray-400 font-bold">{new Date(rev.createdAt).toLocaleDateString()}</p>
                              </div>
                           </div>
                           <div className="flex gap-1 text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-current" : ""}`} />
                              ))}
                           </div>
                        </div>
                        <p className="text-gray-600 text-sm font-medium leading-relaxed italic">"{rev.content}"</p>
                     </div>
                   )) : (
                     <div className="text-center py-10">
                        <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest italic">No reviews yet</p>
                     </div>
                   )}
                </div>
             </section>

             {/* FAQs */}
            <section id="faq" className="mb-12 scroll-mt-32">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-3">
                   {(provider.faq && provider.faq.length > 0 ? provider.faq : [
                     { question: "Is Manipal University Online UGC recognized?", answer: "Yes, Manipal University Online is fully recognized by the University Grants Commission (UGC) and holds NAAC A+ accreditation." },
                     { question: "What is the study mode for online programs?", answer: "All programs are delivered 100% online through a robust Learning Management System (LMS) with recorded and live sessions." },
                     { question: "Does the university provide placement assistance?", answer: "Yes, we have a dedicated career services department that provides placement assistance and organizes job fairs." },
                   ]).map((item, i) => (
                     <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all">
                        <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                           <span className="font-black text-gray-900">{item.question}</span>
                           <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        </button>
                        <div className="px-6 pb-6 text-gray-500 font-medium text-sm border-t border-gray-50 pt-4 hidden group-hover:block">
                           {item.answer}
                        </div>
                     </div>
                   ))}
                </div>
            </section>

            {/* Compare similarities Section */}
            <section className="mb-12">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Compare with similar Universities</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[1, 2].map((i) => (
                     <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-white border border-gray-50 rounded-xl p-2 shrink-0 shadow-sm">
                           <Image src={`https://placehold.co/100x100?text=Uni+${i}`} alt="Uni" width={60} height={60} className="object-contain" />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-black text-gray-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">Similar University {i}</h4>
                           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <span>3.9 Rating</span>
                              <div className="w-1 h-1 rounded-full bg-gray-200" />
                              <span>₹80k - 2L</span>
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600" />
                     </div>
                   ))}
                </div>
                <button className="w-full mt-6 py-4 bg-indigo-600/5 text-indigo-600 font-black rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-2 border border-indigo-100">
                   View Comparison with 50+ Universities
                   <ArrowRight className="w-5 h-5" />
                </button>
            </section>

             {/* Join Banner */}
             <div className="relative rounded-[32px] overflow-hidden bg-gray-900 p-12 text-center mb-12">
                <div className="absolute inset-0 opacity-20">
                   <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] -ml-32 -mt-32" />
                   <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] -mr-32 -mb-32" />
                </div>
                
                <div className="relative z-10">
                   <div className="flex justify-center -space-x-4 mb-6">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-900 overflow-hidden">
                           <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" width={48} height={48} />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-4 border-gray-900 bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                         43k+
                      </div>
                   </div>
                   <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Join 43,433 others on COP</h3>
                   <p className="text-gray-400 font-medium mb-8 max-w-lg mx-auto">See how your profile matches with {provider.name} and get personalized career guidance from our experts today.</p>
                   <button className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-black/20">
                      Check Your Eligibility
                   </button>
                </div>
             </div>

             {/* App Download Info Box */}
             <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center p-12 gap-12">
                   <div className="flex-1 text-center md:text-left">
                      <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Learning apps help the world learn and grow</h4>
                      <p className="text-gray-500 font-medium leading-relaxed mb-8">Download our mobile application to get the best learning experience. Access your courses, interact with peers, and track your progress on the go.</p>
                      
                      <div className="grid grid-cols-1 gap-4">
                         {[
                           { title: "Personalized Study Path", desc: "Get tailored recommendations based on your goals and learning style." },
                           { title: "Offline Access", desc: "Download study materials and videos to learn even without an internet connection." },
                           { title: "Track Progress", desc: "Monitor your completion rates and quiz scores with detailed analytics." }
                         ].map((item, i) => (
                           <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all group">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                 {i + 1}
                              </div>
                              <div>
                                 <h5 className="font-extrabold text-gray-900 text-sm mb-0.5">{item.title}</h5>
                                 <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="w-full md:w-1/3 aspect-[9/16] relative bg-gray-100 rounded-[40px] border-[12px] border-gray-900 shadow-2xl overflow-hidden shrink-0">
                      <Image src="https://images.unsplash.com/photo-1512428559083-a400a3b84631?q=80&w=2070&auto=format&fit=crop" alt="Mobile App" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                         <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                             <p className="text-white text-xs font-bold">New Course Available!</p>
                             <p className="text-white/60 text-[10px]">Check out the latest MBA Finance specializations.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="w-full lg:w-[340px] shrink-0">
             <div className="sticky top-4 flex flex-col gap-6">
                
                {/* Summary Card */}
                <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-indigo-100/50 border border-white p-2">
                   <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-[28px] p-6 text-white">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 bg-white rounded-lg p-1 shrink-0">
                            <Image src={provider.logo || "/placeholder-logo.png"} alt="mini logo" width={40} height={40} className="object-contain" />
                         </div>
                         <div className="overflow-hidden">
                            <h4 className="text-xs font-black text-indigo-200 uppercase tracking-widest">Enrolling Now</h4>
                            <p className="text-sm font-bold text-white leading-tight truncate">{provider.name}</p>
                         </div>
                      </div>

                      <div className="space-y-4 mb-8">
                         <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-indigo-200 text-xs font-black uppercase">Starting From</span>
                            <span className="text-xl font-black text-white">₹{courses[0]?.fees?.toLocaleString() || "1,50,000"}</span>
                         </div>
                         <div className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-indigo-200 text-xs font-black uppercase">Mode</span>
                            <span className="text-white font-bold">100% Online</span>
                         </div>
                         <div className="flex justify-between items-center py-2">
                            <span className="text-indigo-200 text-xs font-black uppercase">Status</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                               provider.admissionOpen?.isOpen 
                               ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                               : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            }`}>
                               {provider.admissionOpen?.isOpen ? "Admission Open" : "Admission Closed"}
                            </span>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2">
                            Apply Now
                            <ArrowRight className="w-5 h-5" />
                         </button>
                         <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Connect with Expert
                         </button>
                      </div>
                   </div>

                   <div className="p-4 space-y-2">
                      <button className="w-full py-3 bg-gray-50 hover:bg-indigo-50 text-indigo-600 font-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-100">
                         <Download className="w-4 h-4" />
                         Download Brochure
                      </button>
                   </div>
                </div>

                {/* Compare Box */}
                <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 -mr-12 -mt-12 rounded-full" />
                   <div className="relative">
                      <h4 className="text-lg font-black text-gray-900 mb-2">Compare Universities</h4>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4">Compare {provider.name} with similar institutions based on fees, ranking, and more.</p>
                      <button className="flex items-center gap-2 text-indigo-600 font-black text-xs group">
                         Start Comparing
                         <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>

                {/* Admission Help */}
                <div className="bg-indigo-600 rounded-[28px] p-8 text-white relative overflow-hidden group">
                   <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                   <h4 className="text-xl font-black mb-2 relative z-10">Need Admission Guidance?</h4>
                   <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-6 relative z-10">Get a free consultation session with our experts to find the right career path.</p>
                   <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-sm relative z-10 hover:bg-indigo-50 transition-colors shadow-xl">
                      Get Help Now
                   </button>
                </div>

             </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
