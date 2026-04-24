"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, MapPin, Share2, Award, CheckCircle2,
  ChevronRight, Calendar, BookOpen, GraduationCap,
  Users, TrendingUp, Download, Phone, MessageCircle,
  FileText, ShieldCheck, Info, ArrowRight,
  ChevronDown, Briefcase, Trophy,
  Globe
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
      {/* Hero Section - Purple gradient banner */}
      <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 40%, #5B21B6 100%)" }}>
        {/* Background campus image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={provider.coverImage || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop"}
            alt={provider.name}
            fill
            className="object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-transparent to-purple-900/60" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-[1280px] mx-auto px-4 py-10 md:py-16 flex flex-col items-center text-center text-white">
          {/* Logo */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2 mb-4">
            <Image
              src={provider.logo || "/placeholder-logo.png"}
              alt={`${provider.name} Logo`}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* University Name */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
            {provider.name}
          </h1>
          <p className="text-white/70 text-sm mb-5 max-w-xl">
            {provider.shortExcerpt || "A premier institution offering high-quality education with a focus on innovation and excellence."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-purple-700 text-sm font-bold rounded-lg hover:bg-purple-50 transition-all shadow-md">
              <TrendingUp className="w-4 h-4" />
              Add to compare
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/25 transition-all text-white">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/universities" className="hover:text-purple-600 transition-colors">Universities</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-semibold">{provider.name}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 pb-8">
        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-x-auto no-scrollbar">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 lg:max-w-[calc(100%-360px)]">

            {/* About Section */}
            <section id="about" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 scroll-mt-16">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">About University</h2>
              </div>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-6">
                {provider.aboutContent ? (
                  <div dangerouslySetInnerHTML={{ __html: provider.aboutContent }} />
                ) : (
                  <p className="text-sm">
                    {provider.shortExcerpt || `${provider.name} is a premier institution offering high-quality education with a focus on innovation and excellence. With state-of-the-art infrastructure and experienced faculty, we provide a transformative learning experience for students globally.`}
                  </p>
                )}
              </div>

              {/* Info Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold text-gray-500 uppercase">Type of Education</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{provider.isActive === "active" ? "Online" : "Regular"}</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold text-gray-500 uppercase">On Paper Reviews</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-bold text-gray-900">{provider.averageRating || 0}/5</span>
                    <span className="text-xs text-gray-400 ml-1">({reviews.length} reviews)</span>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold text-gray-500 uppercase">Location</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{provider.comparison?.location || provider.location || "Online"}</p>
                </div>
              </div>
            </section>

            {/* Approvals & Accreditations */}
            {(provider.approvals && provider.approvals.length > 0) && (
              <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Approvals & Accreditations</h2>
                </div>
                {provider.approvalsDescription && (
                  <div className="text-gray-600 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: provider.approvalsDescription }} />
                )}
                <div className="flex flex-wrap gap-4">
                  {provider.approvals.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                      {a.logo && <Image src={a.logo} alt={a.name} width={28} height={28} className="object-contain" />}
                      <span className="text-sm font-semibold text-gray-700">{a.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Highlights */}
            {(provider.facts && provider.facts.length > 0) && (
              <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Key Highlights</h2>
                </div>
                {provider.factsDescription && (
                  <div className="text-gray-600 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: provider.factsDescription }} />
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {provider.facts.slice(0, 8).map((item: any, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-purple-200 transition-all">
                      <span className="text-lg">{item.icon || "✓"}</span>
                      <span className="text-sm font-medium text-gray-700">{typeof item.text === 'string' ? item.text : 'Highlight'}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Programs / Online Courses Table */}
            <section id="programs" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 scroll-mt-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Online Courses</h2>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${activeCategory === cat
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Courses Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Course Name</th>
                      <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                      <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Fees</th>
                      <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Mode</th>
                      <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr key={course._id} className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors">
                        <td className="py-3 px-3 font-semibold text-gray-900">{course.title}</td>
                        <td className="py-3 px-3 text-gray-600">{course.duration || "2 Years"}</td>
                        <td className="py-3 px-3 font-bold text-gray-900">₹{course.fees?.toLocaleString() || "1,50,000"}</td>
                        <td className="py-3 px-3"><span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md">{course.mode || "Online"}</span></td>
                        <td className="py-3 px-3"><button className="text-purple-600 text-xs font-bold hover:underline">View →</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sample Certificate */}
            {(provider.sampleCertificateImage || provider.sampleCertificateDescription) && (
              <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Sample Certificate</h2>
                </div>
                {provider.sampleCertificateDescription && (
                  <div className="text-gray-600 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: provider.sampleCertificateDescription }} />
                )}
                {provider.sampleCertificateImage && (
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                    <Image src={provider.sampleCertificateImage} alt="Sample Certificate" width={460} height={320} className="object-contain rounded-lg" />
                  </div>
                )}
              </section>
            )}

            {/* Admission Process */}
            <section id="admission" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6 scroll-mt-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Admission Process</h2>
              </div>
              {provider.admissionProcess && (
                <div className="text-gray-600 text-sm leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: provider.admissionProcess }} />
              )}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { title: "Fill Application", desc: "Register online with your details." },
                  { title: "Document Upload", desc: "Upload scanned documents." },
                  { title: "Fee Payment", desc: "Pay via secure gateway." },
                  { title: "Review & Selection", desc: "Committee reviews application." },
                  { title: "Confirmation", desc: "Receive admission letter." },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all">
                    <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold mb-2">{i + 1}</div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-gray-500 text-[11px] leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility Section */}
            <section id="eligibility" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 scroll-mt-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Eligibility Criteria</h2>
              </div>
              {provider.comparison?.eligibility ? (
                <div className="text-gray-600 text-sm leading-relaxed">
                  <p>{provider.comparison.eligibility}</p>
                  {provider.comparison.minimumRequirements && (
                    <p className="mt-3"><span className="font-semibold text-gray-900">Minimum Requirements:</span> {provider.comparison.minimumRequirements}</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.reduce((acc: { degree: string; eligibility: string }[], c) => {
                    const degreeName = (c.degreeTypeId as any)?.name || "General";
                    if (c.eligibility && !acc.find(a => a.degree === degreeName)) {
                      acc.push({ degree: degreeName, eligibility: c.eligibility });
                    }
                    return acc;
                  }, []).map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-purple-100 transition-all">
                      <h4 className="flex items-center gap-2 text-purple-600 font-bold mb-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {item.degree}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.eligibility}</p>
                    </div>
                  ))}
                  {courses.every(c => !c.eligibility) && (
                    <p className="text-gray-500 text-sm col-span-2">Eligibility information will be updated soon. Please contact the university for details.</p>
                  )}
                </div>
              )}
            </section>

            {/* Quick Facts */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Quick Facts</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { icon: MapPin, label: "Location", value: provider.comparison?.location || provider.location || "Online" },
                  ...(provider.comparison?.duration ? [{ icon: Calendar, label: "Duration", value: provider.comparison.duration }] : []),
                  ...(provider.comparison?.intakePeriod ? [{ icon: Calendar, label: "Intake", value: provider.comparison.intakePeriod }] : []),
                  ...(provider.comparison?.accreditation ? [{ icon: ShieldCheck, label: "Accreditation", value: provider.comparison.accreditation }] : []),
                  ...(provider.comparison?.placementRate ? [{ icon: TrendingUp, label: "Placement Rate", value: `${provider.comparison.placementRate}%` }] : []),
                  ...(provider.comparison?.totalSeatsAvailable ? [{ icon: Users, label: "Total Seats", value: provider.comparison.totalSeatsAvailable.toLocaleString() }] : []),
                  { icon: Globe, label: "Mode", value: provider.isActive === "active" ? "Online" : "Regular" },
                  { icon: Star, label: "Rating", value: `${provider.averageRating || 0}/5` },
                ].filter(Boolean).slice(0, 6).map((item: any, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase block">{item.label}</span>
                      <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Placements & Partners */}
            {(provider.placementPartners && provider.placementPartners.length > 0) && (
              <section id="placements" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 scroll-mt-16">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Placement Partners</h2>
                </div>
                {provider.placementPartnersDescription && (
                  <div className="text-gray-600 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: provider.placementPartnersDescription }} />
                )}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-items-center">
                  {provider.placementPartners.map((p, i) => (
                    <div key={i} className="h-12 w-24 relative">
                      <Image src={p.logo} alt={p.name} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Stats Section */}
            {(provider.comparison?.placementRate || provider.comparison?.averageSalary || (provider.placementPartners && provider.placementPartners.length > 0)) && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">How your life will change?</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ...(provider.comparison?.placementRate ? [{ value: `${provider.comparison.placementRate}%`, label: "Placement Rate", color: "bg-purple-600" }] : []),
                    ...(provider.comparison?.averageSalary ? [{ value: `₹${(provider.comparison.averageSalary / 100000).toFixed(1)}L`, label: "Avg. Salary", color: "bg-orange-500" }] : []),
                    ...(provider.placementPartners ? [{ value: `${provider.placementPartners.length}+`, label: "Hiring Partners", color: "bg-blue-600" }] : []),
                    ...(provider.comparison?.totalSeatsAvailable ? [{ value: `${(provider.comparison.totalSeatsAvailable / 1000).toFixed(0)}k+`, label: "Active Learners", color: "bg-emerald-600" }] : []),
                  ].map((stat, i) => (
                    <div key={i} className={`${stat.color} text-white p-5 rounded-xl text-center`}>
                      <h4 className="text-2xl font-extrabold mb-1">{stat.value}</h4>
                      <p className="text-white/80 text-xs font-semibold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section id="reviews" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6 scroll-mt-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                  <Star className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Student Reviews</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex flex-col items-center justify-center shrink-0">
                  <span className="text-5xl font-extrabold text-gray-900 mb-1">{provider.averageRating || "4.1"}</span>
                  <div className="flex gap-0.5 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(Number(provider.averageRating) || 4) ? "fill-current" : ""}`} />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs font-medium">Based on {reviews.length} reviews</span>
                </div>
                <div className="flex-1 space-y-3">
                  {[
                    { label: "Academics", score: 85 },
                    { label: "Faculty", score: 90 },
                    { label: "Campus Life", score: 70 },
                    { label: "Placement", score: 80 },
                  ].map((bar, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-500">
                        <span>{bar.label}</span>
                        <span>{(bar.score / 20).toFixed(1)}/5</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${bar.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {reviews.length > 0 ? reviews.map(rev => (
                  <div key={rev._id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                          {rev.studentId?.name?.[0] || "S"}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 text-sm">{rev.studentId?.name || "Student"}</h5>
                          <p className="text-xs text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{rev.content}</p>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm font-medium">No reviews yet</p>
                  </div>
                )}
              </div>
            </section>

            {/* FAQs */}
            {provider.faq && provider.faq.length > 0 && (
              <section id="faq" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 scroll-mt-16">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-50 flex items-center justify-center rounded-lg text-purple-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-2">
                  {provider.faq.map((item, i) => (
                    <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-gray-900 text-sm">{item.question}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                      </summary>
                      <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom CTA */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 p-8 text-center mb-6">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-[80px] -ml-24 -mt-24" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full blur-[80px] -mr-24 -mb-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Ready to start your journey?</h3>
                <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">See how your profile matches with {provider.name} and get personalized career guidance.</p>
                <button className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all shadow-lg">
                  Check Your Eligibility
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Disclaimer</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                The information provided on this page is for general informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind. All fees, courses, and programs are subject to change without notice. Please verify details directly with the university.
              </p>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="w-full lg:w-[340px] shrink-0">
            <div className="flex flex-col gap-4">

              {/* Apply Now Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-purple-600 p-5 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg p-1 shrink-0">
                      <Image src={provider.logo || "/placeholder-logo.png"} alt="logo" width={36} height={36} className="object-contain" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-purple-200 font-semibold uppercase">Enrolling Now</p>
                      <p className="text-sm font-bold text-white leading-tight truncate">{provider.name}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between items-center py-1.5 border-b border-white/15">
                      <span className="text-purple-200 text-xs font-semibold uppercase">Starting From</span>
                      <span className="text-lg font-extrabold text-white">₹{(provider.comparison?.feesStartingFrom || courses[0]?.fees || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-white/15">
                      <span className="text-purple-200 text-xs font-semibold uppercase">Mode</span>
                      <span className="text-white font-bold">100% Online</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-purple-200 text-xs font-semibold uppercase">Status</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${provider.admissionOpen?.isOpen
                          ? "bg-emerald-400/20 text-emerald-300"
                          : "bg-amber-400/20 text-amber-300"
                        }`}>
                        {provider.admissionOpen?.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2 text-sm">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <button className="w-full py-2.5 bg-purple-50 text-purple-600 font-semibold rounded-lg hover:bg-purple-100 transition-all flex items-center justify-center gap-2 text-sm border border-purple-100">
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </button>
                  <button className="w-full py-2.5 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-sm border border-gray-100">
                    <Phone className="w-4 h-4" />
                    Talk to Expert
                  </button>
                </div>
              </div>

              {/* EMI Options */}
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-2">EMI Options Available</h4>
                <p className="text-xs text-gray-500 mb-3">Starting from ₹{Math.round((provider.comparison?.feesStartingFrom || courses[0]?.fees || 0) / 12).toLocaleString()}/month</p>
                <button className="text-purple-600 text-xs font-bold hover:underline flex items-center gap-1">
                  Check EMI Plans <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Need Help */}
              <div className="bg-purple-600 rounded-xl p-5 text-white">
                <h4 className="text-sm font-bold mb-1">Need Admission Guidance?</h4>
                <p className="text-purple-200 text-xs leading-relaxed mb-4">Get a free consultation session with our experts.</p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-purple-50 transition-colors w-full">
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

