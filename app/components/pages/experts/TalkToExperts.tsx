'use client';

import { Phone, Mail, CheckCircle } from "lucide-react";
import TalkToExpertsForm from "../../shared/TalkToExpertsForm";

export default function TalkToExperts() {
  // ─── static data ─────────────────────────────────────────────────────────────
  const contactMethods = [
    { icon: <Phone size={20} color="#7C3AED" />, title: "Schedule a Call", subtitle: "Get personalized guidance over phone" },
    { icon: <Mail size={20} color="#7C3AED" />, title: "Email Us", subtitle: "We'll respond within 24 hours" },
  ];
  const benefits = ["Free career counseling", "Course recommendations", "University guidance", "Scholarship information", "EMI & payment options"];
  const experts = [
    { name: "Dr. Priya Sharma", role: "Education Counsellor", exp: "24 yrs", spec: "Technology & Management", img: "/Image (Dr. Priya Sharma).webp" },
    { name: "Rajesh Kumar", role: "Admission Advisor", exp: "20 yrs", spec: "Technology & Engineering", img: "/Image (Rahul Mehta).webp" },
    { name: "Anjali Verma", role: "Admission Expert", exp: "31 yrs", spec: "Healthcare & Science", img: "/Image (Anita Desai).webp" },
  ];
  const programs = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md and above)
      ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden bg-[#F3F4F6] min-h-screen font-['Inter',sans-serif] overflow-x-hidden">

        {/* 1. CONTACT METHOD CARDS */}
        <div className="bg-white pt-5 px-4 pb-2.5">
          {contactMethods.map((m, i) => (
            <div key={i} className="flex items-center gap-[14px] py-3.5 px-5 mb-2.5 bg-white rounded-full border border-[#F3F4F6] shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
              <div className="w-11 h-11 rounded-full bg-[#EDE9FE] flex items-center justify-center shrink-0">{m.icon}</div>
              <div>
                <p className="text-[15px] font-semibold text-[#101828] m-0">{m.title}</p>
                <p className="text-[13px] text-[#6B7280] mt-0.5">{m.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. GET IN TOUCH FORM */}
        <div className="py-2.5 px-4">
          <div className="bg-white rounded-2xl p-5 px-4 mb-2.5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#101828] m-0">Get In Touch</h2>
              <span className="bg-[#DCFCE7] text-[#16A34A] text-[12px] font-semibold py-1 px-2.5 rounded-[20px] flex items-center gap-1">
                <span className="w-[7px] h-[7px] rounded-full bg-[#16A34A] inline-block" />
                In touch
              </span>
            </div>
            <TalkToExpertsForm source="talk_to_experts" programs={programs} hideHeader={true} />
          </div>
        </div>

        {/* 3. WHAT YOU'LL GET */}
        <div className="bg-white my-2.5 pt-5 px-4 pb-6">
          <h2 className="text-[18px] font-bold text-[#101828] mb-4">What You'll Get</h2>
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 mb-3">
              <div className="w-[22px] h-[22px] rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                <CheckCircle size={13} color="#16A34A" />
              </div>
              <span className="text-sm text-[#374151]">{b}</span>
            </div>
          ))}
        </div>

        {/* 4. OUR EXPERT TEAM */}
        <div className="bg-white my-2.5 pt-5 px-4 pb-6">
          <h2 className="text-[18px] font-bold text-[#101828] mb-[18px]">Our Expert Team</h2>
          {experts.map((ex, i) => (
            <div key={i} className={`flex items-center gap-[14px] ${i < experts.length - 1 ? "mb-[18px]" : ""}`}>
              <img src={ex.img} alt={ex.name} className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-[#EDE9FE]" />
              <div>
                <p className="text-[15px] font-semibold text-[#101828] m-0">{ex.name}</p>
                <p className="text-[13px] text-[#6B7280] my-[2px] mt-0.5 mb-[3px]">{ex.role}</p>
                <p className="text-[12px] text-[#9CA3AF] m-0">• {ex.exp} &nbsp;• {ex.spec}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 5. NEED IMMEDIATE HELP CTA */}
        <div className="my-2.5 mx-4 mb-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#9810FA] pt-7 px-5 pb-6 text-center text-white">
          <div className="w-[52px] h-[52px] rounded-full bg-white/18 flex items-center justify-center mx-auto mb-3.5">
            <Phone size={24} color="#FFFFFF" />
          </div>
          <p className="text-[18px] font-bold mb-1">Need Immediate Help?</p>
          <p className="text-[13px] text-white/75 mb-[18px]">Call us directly</p>
          <a href="tel:+1234567890" className="inline-flex items-center gap-2 bg-white text-[#7C3AED] py-3.25 px-7 rounded-[30px] no-underline font-bold text-base shadow-[0_4px_14px_rgba(0,0,0,0.15)]">
            <Phone size={16} color="#7C3AED" />
            +123 456 7890
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════════════════════════ */}
      <section className="hidden md:block w-full bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex gap-16 items-start">

            {/* ── LEFT ── */}
            <div className="flex-1 min-w-[300px]">
              <h2 className="font-['Inter'] text-[48px] font-bold leading-[60px] text-[#101828] mb-4">
                Talk to our expert counselors
              </h2>
              <p className="font-['Inter'] text-[18px] font-normal leading-7 text-[#4A5565] max-w-[546px] mb-5">
                Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.
              </p>
              <p className="font-['Inter'] text-base font-bold text-[#101828] mb-3">Our office</p>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src="/Section 5.webp" alt="Our office" className="w-full h-auto rounded-lg block" />
              </div>
              <div className="flex gap-12 flex-wrap">
                <div>
                  <p className="font-['Inter'] text-sm font-semibold text-[#101828] mb-2">India</p>
                  <div className="flex items-start gap-1.5 mb-2">
                    <img src="/Icon.webp" alt="Office address" className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] whitespace-pre-line m-0">{"123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001"}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img src="/Icon (2).webp" alt="Phone contact" className="w-4 h-4 shrink-0" />
                    <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] m-0">+91 80 1234 5678</p>
                  </div>
                </div>
                <div>
                  <p className="font-['Inter'] text-sm font-semibold text-[#101828] mb-2">United States</p>
                  <div className="flex items-start gap-1.5 mb-2">
                    <img src="/Icon.webp" alt="Office address" className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] whitespace-pre-line m-0">{"456 Tech Campus Drive\nSan Francisco, CA\n94105"}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img src="/Icon (2).webp" alt="Phone contact" className="w-4 h-4 shrink-0" />
                    <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] m-0">+1 415 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: FORM CARD ── */}
            <TalkToExpertsForm source="talk_to_experts" programs={programs} />

          </div>
        </div>
      </section>
    </>
  );
}
