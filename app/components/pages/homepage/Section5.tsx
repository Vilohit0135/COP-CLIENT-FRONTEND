'use client';

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
// TalkToExpertsForm loads Firebase — defer until section enters viewport
const TalkToExpertsForm = dynamic(() => import("../../shared/TalkToExpertsForm"), { ssr: false });

interface Section5Props {
  section: SectionContent;
}

export default function Section5({ section }: Section5Props) {
  const v = section.values || {};
  const sectionRef = useRef<HTMLElement>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setFormVisible(true); io.disconnect(); } },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const get = (aliases: string[], fallback = ""): string => {
    for (const alias of aliases) {
      if (v[alias]) return v[alias];
    }
    return fallback;
  };

  const title = get(["title", "Title", "Main Title"], "Talk to our expert counselors");
  const desc = get(["description", "Description", "subtitle"], "Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.");
  const officeImg = get(["officeImage", "Office Image", "image"], "/Section 5.webp");
  const indiaAddr = get(["indiaAddress", "India Address"], "123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001");
  const indiaPhone = get(["indiaPhone", "India Phone"], "+91 80 1234 5678");
  const usaAddr = get(["usaAddress", "USA Address"], "456 Tech Campus Drive\nSan Francisco, CA\n94105");
  const usaPhone = get(["usaPhone", "USA Phone"], "+1 415 123 4567");

  // Programs list from CMS or default
  const defaultPrograms = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];
  let programs = defaultPrograms;
  const progKey = Object.keys(v).find(k => k.toLowerCase().includes("program"));
  if (progKey && Array.isArray(v[progKey])) {
    programs = v[progKey].map((p: any) => (typeof p === "string" ? p : p.name || p.title || String(p)));
  }

  // ─── description paragraph (reused twice) ────────────────────────────────────
  const DescPara = () => (
    <p className="font-['Inter'] text-[clamp(15px,3.5vw,18px)] font-normal leading-[1.55] text-[#4A5565] max-w-[546px] mb-5">
      {richTextToPlain(desc)}
    </p>
  );

  return (
    <section ref={sectionRef} id="contact-experts" className="w-full bg-white py-[clamp(40px,6vw,60px)]">
      <div className="max-w-[1280px] mx-auto px-[clamp(16px,4vw,24px)]">

        {/* ── MOBILE VERSION (hidden on lg and up) ── */}
        <div className="lg:hidden text-center">
          <h2 className="font-['Inter'] text-[clamp(24px,6vw,32px)] font-bold leading-[1.2] text-[#101828] mb-4">{title}</h2>
          <DescPara />
          <div className="mt-6 text-left">
            {formVisible && <TalkToExpertsForm source="homepage_section5" isHomePage={true} programs={programs} />}
          </div>
        </div>

        {/* ── DESKTOP VERSION (hidden on md and down) ── */}
        <div className="hidden lg:flex gap-[clamp(32px,5vw,64px)] items-start">

          {/* ── LEFT SIDE ── */}
          <div className="flex-1 min-w-[300px]">
            <h2 className="font-['Inter'] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] text-[#101828] mb-4">
              {title}
            </h2>
            <DescPara />

            <p className="font-['Inter'] text-base font-bold text-[#101828] mb-3">Our office</p>
            <div className="mb-4 rounded-lg overflow-hidden">
              <img src={officeImg} alt="Our office" width={546} height={364} loading="lazy" decoding="async" className="w-full h-auto rounded-lg block" />
            </div>

            <div className="flex gap-[clamp(24px,4vw,48px)] flex-wrap">
              {/* India */}
              <div>
                <p className="font-['Inter'] text-sm font-semibold text-[#101828] mb-2">India</p>
                <div className="flex items-start gap-1.5 mb-2">
                  <img src="/Icon.webp" alt="Office address" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] whitespace-pre-line m-0">
                    {indiaAddr}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <img src="/Icon (2).webp" alt="Phone contact" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 shrink-0" />
                  <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] m-0">{indiaPhone}</p>
                </div>
              </div>

              {/* USA */}
              <div>
                <p className="font-['Inter'] text-sm font-semibold text-[#101828] mb-2">United States</p>
                <div className="flex items-start gap-1.5 mb-2">
                  <img src="/Icon.webp" alt="Office address" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] whitespace-pre-line m-0">
                    {usaAddr}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <img src="/Icon (2).webp" alt="Phone contact" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 shrink-0" />
                  <p className="font-['Inter'] text-sm leading-5 text-[#4A5565] m-0">{usaPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: FORM CARD ────────────────────────────────────────── */}
          {formVisible && <TalkToExpertsForm source="homepage_section5" isHomePage={true} programs={programs} />}
        </div>
      </div>
      <div id="recaptcha-s5" />
    </section>
  );
}

export const usedFields = [
  "title", "Title",
  "description", "Description",
  "leftImage", "Left Image", "image", "Image",
  "indiaAddress", "India Address",
  "indiaPhone", "India Phone",
  "usaAddress", "USA Address",
  "usaPhone", "USA Phone",
  "sendButton", "Send",
  "verifyButton", "Verify",
  "programs", "Programs", "Program List",
];
