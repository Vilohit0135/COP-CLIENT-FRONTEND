"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState, useEffect, useRef } from "react";
import { Star, CheckCircle, TrendingUp, Clock, IndianRupee } from "lucide-react";
import FocusCenterSlider from "./FocusCenterSlider";

interface Section6Props {
  section: SectionContent;
}

interface Program {
  _id: string;
  title: string;
  slug?: string;
  thumbnail?: string;
  fees: number;
  discountedFees?: number;
  duration?: string;
  trending?: boolean;
  certifications?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
  providerName?: string;
  providerSlug?: string;
  providerLogo?: string;
}

const MOCK_ROI: Program[] = [
  { _id: "p1", title: "Master of Computer Applications", fees: 120000, discountedFees: 100000, duration: "24 Months", trending: false, certifications: ["UGC", "NAAC A+"], features: ["Job Assistance", "Flexible Learning", "Industry Projects"], rating: 4.6, reviews: 189, providerName: "Amity Online", providerSlug: "amity-online" },
  { _id: "p2", title: "Executive MBA (Finance)", fees: 200000, discountedFees: 166667, duration: "18 Months", trending: true, certifications: ["UGC", "AIU"], features: ["Weekend Classes", "CFO Sessions", "Bloomberg Terminal"], rating: 4.9, reviews: 312, providerName: "Symbiosis Online", providerSlug: "symbiosis-online" },
  { _id: "p3", title: "MBA in Data Science", fees: 180000, discountedFees: 150000, duration: "24 Months", trending: false, certifications: ["UGC", "NAAC A+"], features: ["Industry Mentors", "Live Projects", "Placement Support"], rating: 4.7, reviews: 198, providerName: "NMIMS Online", providerSlug: "nmims-online" },
  { _id: "p4", title: "BBA in Business Analytics", fees: 120000, discountedFees: 100000, duration: "36 Months", trending: false, certifications: ["UGC", "AICTE"], features: ["Industry Projects", "Internships", "Job Assistance"], rating: 4.4, reviews: 134, providerName: "Jain Online", providerSlug: "jain-online" },
];

const MOCK_TRENDING: Program[] = [
  { _id: "t1", title: "MBA in Digital Marketing", fees: 150000, discountedFees: 125000, duration: "18 Months", trending: true, certifications: ["UGC", "NAAC A+"], features: ["Live Projects", "Agency Internship", "Google Certification"], rating: 4.7, reviews: 241, providerName: "Manipal Online", providerSlug: "manipal-online" },
  { _id: "t2", title: "B.Sc. in Data Science", fees: 130000, discountedFees: 108333, duration: "36 Months", trending: true, certifications: ["UGC", "AICTE"], features: ["Python & ML Labs", "Industry Mentors", "Placement Support"], rating: 4.8, reviews: 198, providerName: "LPU Online", providerSlug: "lpu-online" },
  { _id: "t3", title: "MBA in HR Management", fees: 160000, discountedFees: 133333, duration: "24 Months", trending: true, certifications: ["UGC", "AIU"], features: ["Case Study Method", "HR Simulations", "Global Exposure"], rating: 4.6, reviews: 175, providerName: "UPES Online", providerSlug: "upes-online" },
  { _id: "t4", title: "M.Com in Finance", fees: 110000, discountedFees: 91667, duration: "24 Months", trending: true, certifications: ["UGC", "NAAC A+"], features: ["CFA Prep Module", "Finance Labs", "Job Assistance"], rating: 4.5, reviews: 156, providerName: "Amity Online", providerSlug: "amity-online" },
];

type TabMode = "roi" | "trending";

export default function Section6({ section }: Section6Props) {
  const v = section.values || {};
  const [roiPrograms, setRoiPrograms] = useState<Program[]>(MOCK_ROI);
  const [trendingPrograms, setTrendingPrograms] = useState<Program[]>(MOCK_TRENDING);
  const [activeTab, setActiveTab] = useState<TabMode>("roi");
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getFieldValue = (aliases: string[], fallback = "") => {
    for (const a of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === a.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const cmsSubtitle = getFieldValue(["Subtitle", "Subheading", "Description", "subtitle"], "");

  const tabConfig = {
    roi: {
      pill: "BEST ROI",
      title: getFieldValue(["Title", "Main Title", "Main Heading", "title"], "Best ROI Programs"),
      subtitle: cmsSubtitle || "Handpicked programs with the highest return on your investment",
    },
    trending: {
      pill: "TRENDING NOW",
      title: "Best Trending Programs",
      subtitle: "Most popular programs students are enrolling in right now",
    },
  };

  const switchTab = (next: TabMode) => {
    setVisible(false);
    setTimeout(() => {
      setActiveTab(next);
      setVisible(true);
    }, 350);
  };

  // Auto-rotate every 10 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const next: TabMode = prev === "roi" ? "trending" : "roi";
        setVisible(false);
        setTimeout(() => setVisible(true), 350);
        return next;
      });
    }, 10000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Fetch real data for both tabs
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const fetchROI = async () => {
      try {
        const res = await fetch(`${apiBase}/api/public/providers/programs/best-roi`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setRoiPrograms(data);
        }
      } catch { /* fallback to mock */ }
    };

    const fetchTrending = async () => {
      try {
        const res = await fetch(`${apiBase}/api/public/providers/programs/trending`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setTrendingPrograms(data);
        }
      } catch { /* fallback to mock */ }
    };

    fetchROI();
    fetchTrending();
  }, []);

  const programs = (activeTab === "roi" ? roiPrograms : trendingPrograms).slice(0, 4);
  const { pill, title, subtitle } = tabConfig[activeTab];

  const formatCurrency = (amt: number) => {
    if (!amt && amt !== 0) return "";
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(2).replace(/\.?0+$/, '')}L`;
    if (amt >= 1000) return `₹${(amt / 1000).toFixed(0)}K`;
    return `₹${amt}`;
  };

  const emi = (amt = 0) => Math.round((amt || 0) / 12);

  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Tab toggle buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
          {(['roi', 'trending'] as TabMode[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                switchTab(tab);
                timerRef.current = setInterval(() => {
                  setActiveTab((prev) => {
                    const next: TabMode = prev === "roi" ? "trending" : "roi";
                    setVisible(false);
                    setTimeout(() => setVisible(true), 350);
                    return next;
                  });
                }, 10000);
              }}
              style={{
                padding: '10px 24px',
                borderRadius: 9999,
                border: activeTab === tab ? 'none' : '1.5px solid #E5E7EB',
                background: activeTab === tab ? 'linear-gradient(135deg,#4F39F6 0%,#9810FA 100%)' : '#fff',
                color: activeTab === tab ? '#fff' : '#6A7282',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.4px',
              }}
            >
              {tab === 'roi' ? 'Best ROI' : 'Best Trending'}
            </button>
          ))}
        </div>

        <div
          style={{
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-4">
            <span style={{ background: '#EEF2FF', color: '#4F39F6', fontFamily: 'Inter', fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '0.7px', textTransform: 'uppercase', padding: '0 20px', height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9999 }}>{pill}</span>
          </div>
          {title && <h2 style={{ fontFamily: 'Inter', fontSize: 'clamp(22px,5vw,36px)', fontWeight: 800, color: '#101828', lineHeight: '1.2', marginBottom: 8 }}>{title}</h2>}
          {subtitle && <p style={{ fontFamily: 'Inter', fontSize: 'clamp(13px,3vw,16px)', fontWeight: 400, color: '#6A7282', lineHeight: '24px' }}>{subtitle}</p>}
        </div>

        {/* Mobile focus-center slider */}
        <FocusCenterSlider className="mt-8 mb-8">
          {programs.map((p) => (
            <div key={`m-${p._id}`} style={{ width: '100%', minHeight: 220, borderRadius: 16, border: '1px solid #E5E7EB', backgroundColor: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Image area */}
              <div style={{ height: 100, position: 'relative', background: 'linear-gradient(180deg,#F3E8FF 0%,#EEF2FF 100%)', flexShrink: 0 }}>
                {p.thumbnail && <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                {p.thumbnail && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.3))' }} />}
                {p.trending && <div style={{ position: 'absolute', right: 8, top: 8, background: 'linear-gradient(90deg,#6B46FF,#9B2CFF)', color: '#fff', padding: '3px 7px', borderRadius: 999, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}><TrendingUp size={10} />Hot</div>}
                {p.rating ? <div style={{ position: 'absolute', left: 8, bottom: 6, background: '#fff', padding: '3px 5px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 3 }}><Star size={10} className="text-yellow-500" fill="#EAB308" /><strong style={{ fontSize: 10 }}>{p.rating}</strong></div> : null}
              </div>
              {/* Content */}
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
                <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 13, lineHeight: '18px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</h3>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#475569' }}>
                  <div><div style={{ fontSize: 10, color: '#94A3B8' }}>Duration</div><div style={{ fontWeight: 600, color: '#0F172A' }}>{p.duration || '—'}</div></div>
                  <div><div style={{ fontSize: 10, color: '#94A3B8' }}>Fee</div><div style={{ fontWeight: 600, color: '#0F172A' }}>{p.fees ? formatCurrency(p.fees) : '—'}</div></div>
                </div>
                {p.fees > 0 && <div style={{ background: '#ECFDF5', borderRadius: 6, padding: '4px 7px', color: '#065F46', fontWeight: 700, fontSize: 11 }}>EMI: {formatCurrency(emi(p.discountedFees || p.fees))}/mo</div>}
                <div className="mt-auto">
                  <a href={p.providerSlug ? `/universities/${p.providerSlug}` : '#'} style={{ display: 'block', padding: '8px 0', background: 'linear-gradient(90deg,#6B46FF,#9B2CFF)', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>View Details</a>
                </div>
              </div>
            </div>
          ))}
        </FocusCenterSlider>

        {/* Desktop grid — 4 cards */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {programs.slice(0, 4).map((p) => (
            <div key={p._id} style={{ background: '#fff', width: '100%', borderRadius: 20, border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 14px rgba(16,24,40,0.06)' }}>
              {/* Card image area */}
              <div style={{ height: 170, position: 'relative', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', background: 'linear-gradient(180deg, #F3E8FF 0%, #EEF2FF 100%)' }}>
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : null}
                {/* Dark gradient overlay for readability */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.65) 100%)' }} />

                {/* Trending badge — top right, only on trending tab */}
                {activeTab === 'trending' && p.trending && <div style={{ position: 'absolute', right: 12, top: 12, background: 'linear-gradient(90deg,#6B46FF,#9B2CFF)', color: '#fff', padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><TrendingUp size={12} />Trending</div>}

                {/* Bottom overlay: provider + title + rating */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {p.providerName && (
                    <>
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 500 }}>From</span>
                      <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: '16px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{p.providerName}</span>
                    </>
                  )}
                  <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15, lineHeight: '20px', color: '#fff', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</h3>
                  {p.rating ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <span style={{ fontSize: 13 }}>⭐</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                        {p.rating}{p.reviews ? ` (${p.reviews} reviews)` : ''}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11, color: '#475569', marginBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 2 }}><Clock size={10} color="#94A3B8" />Duration</div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{p.duration || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 2 }}><IndianRupee size={10} color="#94A3B8" />Total Fee</div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{p.fees ? formatCurrency(p.fees) : '—'}</div>
                  </div>
                </div>

                {p.fees > 0 && <div style={{ background: '#ECFDF5', borderRadius: 6, padding: '5px 8px', color: '#065F46', fontWeight: 700, fontSize: 11, marginBottom: 4 }}>EMI: {formatCurrency(emi(p.discountedFees || p.fees))}/mo</div>}

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                  {(p.certifications || []).map((c, i) => <span key={i} style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>{c}</span>)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {(p.features || []).slice(0, 2).map((f, i) => (
                      <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}><CheckCircle size={13} className="text-green-600" /><div style={{ fontSize: 11, color: '#334155' }}>{f}</div></div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <a href={p.slug ? `/online-courses/${p.slug}` : (p.providerSlug ? `/universities/${p.providerSlug}` : '#')} style={{ flex: 1, padding: '10px 12px', background: 'linear-gradient(90deg,#6B46FF,#9B2CFF)', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 600, textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>View Details</a>
                  <button style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #C4B5FD', background: 'transparent', color: '#6B46FF', fontWeight: 600 }}>Compare</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>{/* end fade wrapper */}

        <div className="text-center mt-12">
          <button
            style={{
              width: 293,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg,#4F39F6 0%,#9810FA 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              border: 'none',
              padding: '0 20px',
              cursor: 'pointer'
            }}
          >
            <span>Browse All 2000+ Programs</span>
            <img src="/Icon%20(3).png" alt="icon" style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    </section>
  );
}

export const usedFields = [
  'Badge', 'Pill', 'Badge Text', 'heading_label', 'Title', 'Main Title', 'Main Heading', 'title', 'Subtitle', 'Subheading', 'Description', 'subtitle'
];
