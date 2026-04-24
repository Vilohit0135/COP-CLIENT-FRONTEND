"use client";

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState, useEffect } from "react";
import { Star, BookOpen, CheckCircle, TrendingUp } from "lucide-react";

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

export default function Section6({ section }: Section6Props) {
  const v = section.values || {};
  const [programs, setPrograms] = useState<Program[]>([
    { _id: "p1", title: "Master of Computer Applications", fees: 120000, discountedFees: 100000, duration: "24 Months", trending: false, certifications: ["UGC", "NAAC A+"], features: ["Job Assistance", "Flexible Learning", "Industry Projects"], rating: 4.6, reviews: 189 },
    { _id: "p2", title: "Executive MBA (Finance)", fees: 200000, discountedFees: 166667, duration: "18 Months", trending: true, certifications: ["UGC", "AIU"], features: ["Weekend Classes", "CFO Sessions", "Bloomberg Terminal"], rating: 4.9, reviews: 312 },
    { _id: "p3", title: "MBA in Data Science", fees: 180000, discountedFees: 150000, duration: "24 Months", trending: false, certifications: ["UGC", "NAAC A+"], features: ["Industry Mentors", "Live Projects", "Placement Support"], rating: 4.7, reviews: 198 },
    { _id: "p4", title: "BBA in Business Analytics", fees: 120000, discountedFees: 100000, duration: "36 Months", trending: false, certifications: ["UGC", "AICTE"], features: ["Industry Projects", "Internships", "Job Assistance"], rating: 4.4, reviews: 134 },
  ]);
  // Suppress unused warning while the live fetch is disabled.
  void setPrograms;

  // Disabled until the backend exposes a best-ROI programs endpoint.
  // useEffect(() => {
  //   const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${apiBase}/api/public/providers/programs/best-roi`, { cache: "no-store" });
  //       if (res.ok) {
  //         const data = await res.json();
  //         if (Array.isArray(data) && data.length > 0) {
  //           setPrograms(data.slice(0, 4));
  //         }
  //       }
  //     } catch (e) {
  //       // ignore — falls back to mock data above
  //     }
  //   };
  //   fetchData();
  // }, []);

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

  const pill = getFieldValue(["Badge", "Pill", "Badge Text", "heading_label"], "MOST POPULAR");
  const title = getFieldValue(["Title", "Main Title", "Main Heading", "title"], "Best ROI Programs");
  const subtitle = getFieldValue(["Subtitle", "Subheading", "Description", "subtitle"], "Handpicked programs from top universities with excellent placement records");

  useEffect(() => {
    // Try to fetch real best-roi programs from API; fallback to mock
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiBase}/api/public/providers/programs/best-roi`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPrograms(data);
            return;
          }
        }
      } catch (e) {
        // ignore
      }

      // Mock fallback
      setPrograms([
        { _id: "p1", title: "Master of Computer Applications", fees: 120000, discountedFees: 100000, duration: "24 Months", trending: false, certifications: ["UGC","NAAC A+"], features: ["Job Assistance","Flexible Learning","Industry Projects"], rating: 4.6, reviews: 189, providerName: "Amity Online", providerSlug: "amity-online" },
        { _id: "p2", title: "Executive MBA (Finance)", fees: 200000, discountedFees: 166667, duration: "18 Months", trending: true, certifications: ["UGC","AIU"], features: ["Weekend Classes","CFO Sessions","Bloomberg Terminal"], rating: 4.9, reviews: 312, providerName: "Symbiosis Online", providerSlug: "symbiosis-online" },
        { _id: "p3", title: "MBA in Data Science", fees: 180000, discountedFees: 150000, duration: "24 Months", trending: false, certifications: ["UGC","NAAC A+"], features: ["Industry Mentors","Live Projects","Placement Support"], rating: 4.7, reviews: 198, providerName: "NMIMS Online", providerSlug: "nmims-online" },
        { _id: "p4", title: "BBA in Business Analytics", fees: 120000, discountedFees: 100000, duration: "36 Months", trending: false, certifications: ["UGC","AICTE"], features: ["Industry Projects","Internships","Job Assistance"], rating: 4.4, reviews: 134, providerName: "Jain Online", providerSlug: "jain-online" },
      ]);
    };
    fetchData();
  }, []);

  const formatCurrency = (amt: number) => {
    if (!amt && amt !== 0) return "";
    if (amt >= 100000) return `₹${(amt/100000).toFixed(2).replace(/\.?0+$/,'')}L`;
    if (amt >= 1000) return `₹${(amt/1000).toFixed(0)}K`;
    return `₹${amt}`;
  };

  const emi = (amt = 0) => Math.round((amt || 0)/12);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span style={{background: '#EEF2FF', color: '#4F39F6', fontFamily: 'Inter', fontSize: 14, fontWeight: 700, lineHeight: '20px', letterSpacing: '0.7px', textTransform: 'uppercase', width: 253, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9999}}>{pill}</span>
          </div>
          {title && <h2 style={{fontFamily: 'Inter', fontSize: 36, fontWeight: 800, color: '#101828', lineHeight: '40px', marginBottom: 8}}>{title}</h2>}
          {subtitle && <p style={{fontFamily: 'Inter', fontSize: 16, fontWeight: 400, color: '#6A7282', lineHeight: '24px'}}>{subtitle}</p>}
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32}}>
          {programs.slice(0, 3).map((p) => (
            <div key={p._id} style={{background:'#fff', width: '100%', borderRadius: 24, border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 6px 18px rgba(16,24,40,0.06)'}}>
              {/* Card image area */}
              <div style={{height:240, position:'relative', borderTopLeftRadius: 24, borderTopRightRadius:24, overflow:'hidden', background: 'linear-gradient(180deg, #F3E8FF 0%, #EEF2FF 100%)'}}>
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
                ) : null}
                {/* Dark overlay for readability */}
                {p.thumbnail && <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 100%)'}} />}

                {/* Provider name top-left */}
                {p.providerName && (
                  <div style={{position:'absolute', left:12, top:12, display:'flex', flexDirection:'column', gap:1}}>
                    <span style={{color: p.thumbnail ? '#ffffffcc' : '#94A3B8', fontSize:11, fontWeight:500}}>From</span>
                    <span style={{color: p.thumbnail ? '#fff' : '#1E293B', fontSize:13, fontWeight:700, lineHeight:'16px', textShadow: p.thumbnail ? '0 1px 3px rgba(0,0,0,0.5)' : 'none'}}>{p.providerName}</span>
                  </div>
                )}

                {p.trending && <div style={{position:'absolute', right:12, top:12, background: 'linear-gradient(90deg,#6B46FF,#9B2CFF)', color:'#fff', padding:'6px 10px', borderRadius:999, fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:6}}><TrendingUp size={12}/>Trending</div>}
                {p.rating ? <div style={{position:'absolute', left:12, bottom:12, background:'#fff', padding:'6px 8px', borderRadius:8, display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 6px rgba(16,24,40,0.06)'}}><Star size={12} className="text-yellow-500" fill="#EAB308"/><strong style={{fontSize:12}}>{p.rating}</strong>{p.reviews ? <span style={{color:'#64748B', fontSize:12}}>({p.reviews} reviews)</span> : null}</div> : null}
              </div>

              <div style={{padding:16, display:'flex', flexDirection:'column', gap:8, flex:1}}>
                <div>
                  <h3 style={{fontFamily:'Inter', fontWeight:700, fontSize:15, marginBottom:8}}>{p.title}</h3>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:12, color:'#475569', marginBottom:6}}>
                  <div>
                    <div style={{fontSize:11, color:'#94A3B8'}}>Duration</div>
                    <div style={{fontWeight:600, color:'#0F172A'}}>{p.duration || '—'}</div>
                  </div>
                  <div>
                    <div style={{fontSize:11, color:'#94A3B8'}}>Total Fee</div>
                    <div style={{fontWeight:600, color:'#0F172A'}}>{p.fees ? formatCurrency(p.fees) : '—'}</div>
                  </div>
                </div>

                {p.fees > 0 && <div style={{background:'#ECFDF5', borderRadius:8, padding:'8px 10px', color:'#065F46', fontWeight:700, maxWidth: '100%', marginBottom:8}}>EMI Starting: {formatCurrency(emi(p.discountedFees || p.fees))}/mo</div>}

                <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:8}}>
                  {(p.certifications||[]).map((c, i) => <span key={i} style={{background:'#F1F5F9', padding:'4px 8px', borderRadius:6, fontSize:12}}>{c}</span>)}
                </div>

                <div style={{flex:1}}>
                  <div style={{borderTop:'1px solid #F1F5F9', paddingTop:8, display:'flex', flexDirection:'column', gap:8}}>
                    {(p.features||[]).map((f,i)=> (
                      <div key={i} style={{display:'flex', gap:8, alignItems:'flex-start'}}><CheckCircle size={16} className="text-green-600"/><div style={{fontSize:13, color:'#334155'}}>{f}</div></div>
                    ))}
                  </div>
                </div>

                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <a href={p.providerSlug ? `/universities/${p.providerSlug}` : '#'} style={{flex:1, padding:'10px 12px', background:'linear-gradient(90deg,#6B46FF,#9B2CFF)', color:'#fff', borderRadius:8, border:'none', fontWeight:600, textAlign:'center', textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>View Details</a>
                  <button style={{padding:'10px 12px', borderRadius:8, border:'1px solid #C4B5FD', background:'transparent', color:'#6B46FF', fontWeight:600}}>Compare</button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
            <img src="/Icon%20(3).png" alt="icon" style={{width:20, height:20}} />
          </button>
        </div>
      </div>
    </section>
  );
}

export const usedFields = [
  'Badge','Pill','Badge Text','heading_label','Title','Main Title','Main Heading','title','Subtitle','Subheading','Description','subtitle'
];
