'use client';

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState } from "react";
import { Phone, Shield } from "lucide-react";

interface Section5Props {
  section: SectionContent;
}

export default function Section5({ section }: Section5Props) {
  const v = section.values || {};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    otp: "",
    programOfInterest: "",
  });
  const [loading, setLoading] = useState(false);

  const get = (aliases: string[], fallback = ""): string => {
    for (const alias of aliases) {
      const key = Object.keys(v).find((k) => k.toLowerCase() === alias.toLowerCase());
      if (key) {
        const text = richTextToPlain(v[key]).trim();
        if (text) return text;
      }
    }
    return fallback;
  };

  const title       = get(["title", "Title"], "Talk to our expert counselors");
  const description = get(["description", "Description"], "Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.");
  const imgSrc      = get(["leftImage", "Left Image", "image", "Image"], "/section%205.png");
  const indiaAddr   = get(["indiaAddress", "India Address"], "123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001");
  const indiaPhone  = get(["indiaPhone", "India Phone"], "+91 80 1234 5678");
  const usaAddr     = get(["usaAddress", "USA Address"], "456 Tech Campus Drive\nSan Francisco, CA\n94105");
  const usaPhone    = get(["usaPhone", "USA Phone"], "+1 415 123 4567");
  const sendBtn     = get(["sendButton", "Send"], "Send");
  const verifyBtn   = get(["verifyButton", "Verify"], "Verify");

  // Programs list from CMS or default
  const defaultPrograms = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];
  let programs = defaultPrograms;
  const progKey = Object.keys(v).find((k) => ["programs", "program list"].includes(k.toLowerCase()));
  if (progKey && Array.isArray(v[progKey]) && v[progKey].length > 0) {
    programs = v[progKey].map((p: any) => (typeof p === "string" ? p : p.name || p.title || String(p)));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  // ─── shared input style ───────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#374151",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    color: "#101828",
    marginBottom: "6px",
  };

  // ─── description paragraph (reused twice) ────────────────────────────────────
  const DescPara = () => (
    <p style={{
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "28px",
      color: "#4A5565",
      maxWidth: "546px",
    }}>
      {description}
    </p>
  );

  return (
    <section style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "64px", paddingBottom: "64px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: "64px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* ── LEFT SIDE ───────────────────────────────────────────────────── */}
          <div style={{ flex: 1, minWidth: "300px" }}>

            {/* Title — Figma: Inter 700, 48px, lh 60px, #101828 */}
            <h2 style={{
              fontFamily: "Inter",
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "60px",
              color: "#101828",
              letterSpacing: "0px",
              marginBottom: "16px",
              maxWidth: "640px",
            }}>
              {title}
            </h2>

            {/* Description — above image: Inter 400, 18px, lh 28px, #4A5565 */}
            <div style={{ marginBottom: "20px" }}>
              <DescPara />
            </div>

            {/* Our office label */}
            <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 700, color: "#101828", marginBottom: "12px" }}>
              Our office
            </p>

            {/* Office image */}
            <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
              <img
                src={imgSrc}
                alt="Our office"
                style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}
              />
            </div>

            {/* Description — below image (same text, per Figma) */}
            <div style={{ marginBottom: "16px" }}>
              <DescPara />
            </div>

            {/* India + USA addresses — 2 columns */}
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
              {/* India */}
              <div>
                <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>India</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                  <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>
                    {indiaAddr}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#4A5565", margin: 0 }}>
                    {indiaPhone}
                  </p>
                </div>
              </div>
              {/* USA */}
              <div>
                <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>United States</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                  <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>
                    {usaAddr}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: "20px", color: "#4A5565", margin: 0 }}>
                    {usaPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: FORM CARD ────────────────────────────────────────── */}
          {/* Figma: 500×727px, radius 16px, border 1px #E5E7EB, padding 33px 33px 1px, 2× box-shadow */}
          <div style={{
            width: "500px",
            flexShrink: 0,
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            padding: "33px 33px 1px 33px",
            boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
          }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Full Name */}
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: "#EF4444" }}>*</span></label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label style={labelStyle}>Whatsapp Number <span style={{ color: "#EF4444" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: "42px" }}
                    required
                  />
                </div>
                <p style={{ fontFamily: "Inter", fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                  We'll send an OTP to verify your number
                </p>
              </div>

              {/* OTP + Verify */}
              <div>
                <label style={labelStyle}>OTP <span style={{ color: "#EF4444" }}>*</span></label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    style={{ ...inputStyle, flex: 1, width: "auto" }}
                  />
                  {/* Verify button — Figma: 89.78×50px, radius 10px, #9810FA */}
                  <button
                    type="button"
                    style={{
                      width: "89.78px",
                      height: "50px",
                      borderRadius: "10px",
                      backgroundColor: "#9810FA",
                      color: "#FFFFFF",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {verifyBtn}
                  </button>
                </div>
              </div>

              {/* Program of Interest */}
              <div>
                <label style={labelStyle}>Program of Interest <span style={{ color: "#EF4444" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <select
                    value={formData.programOfInterest}
                    onChange={(e) => setFormData({ ...formData, programOfInterest: e.target.value })}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                    required
                  >
                    <option value="">Select Program</option>
                    {programs.map((p, i) => <option key={i} value={p}>{p}</option>)}
                  </select>
                  {/* chevron */}
                  <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Send button — Figma: 434×52px, radius 10px, #9810FA, 2× shadow #AD46FF 30% */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "434px",
                  height: "52px",
                  borderRadius: "10px",
                  backgroundColor: "#9810FA",
                  color: "#FFFFFF",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: 600,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "4px",
                  boxShadow: "0px 4px 6px -4px rgba(173,70,255,0.30), 0px 10px 15px -3px rgba(173,70,255,0.30)",
                }}
              >
                {loading ? "Sending…" : (
                  <>
                    {sendBtn}
                    {/* paper-plane icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {/* No Spam Calls — Figma: 431×32px, radius 8px, bg #10B981, border #059669, 2× shadow #000 10% */}
              <div style={{
                width: "431px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "#10B981",
                border: "1px solid #059669",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                boxShadow: "0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)",
              }}>
                <Shield size={14} color="#FFFFFF" />
                <span style={{ fontFamily: "Inter", fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}>
                  No Spam Calls
                </span>
              </div>

              {/* Terms text — Figma: Inter 400, 12px, lh 19.5px, #6A7282, center, 398px wide */}
              <p style={{
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "19.5px",
                color: "#6A7282",
                textAlign: "center",
                width: "398px",
                paddingBottom: "20px",
              }}>
                By submitting, you agree to our{" "}
                <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Terms & Conditions</a>
                {" "}and{" "}
                <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Privacy Policy</a>
              </p>

            </form>
          </div>
        </div>
      </div>
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
