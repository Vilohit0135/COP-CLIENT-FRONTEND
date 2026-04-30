'use client';

import { SectionContent } from "@/app/lib/types";
import { richTextToPlain } from "./tuUtils";
import { useState } from "react";
import { Phone, Shield, CheckCircle, Clock, ChevronDown } from "lucide-react";
import { auth } from "@/app/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import toast from "react-hot-toast";

interface Section5Props {
  section: SectionContent;
}

export default function Section5({ section }: Section5Props) {
  const v = section.values || {};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
    programOfInterest: "",
    preferredTime: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

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
    if (!otpVerified) {
      toast.error("Please verify your phone number first");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          courseOfInterest: formData.programOfInterest,
          source: "homepage_section5",
          message: formData.message || "Homepage counselor request",
          preferredTime: formData.preferredTime,
        }),
      });
      if (response.ok) {
        toast.success("Request sent! Our counselors will be in touch soon.");
        setFormData({ fullName: "", email: "", phoneNumber: "", otp: "", programOfInterest: "", preferredTime: "", message: "" });
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        const err = await response.json();
        toast.error(err.error || "Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifierS5) {
      try {
        (window as any).recaptchaVerifierS5 = new RecaptchaVerifier(auth, 'recaptcha-s5', {
          size: 'invisible',
          callback: () => {},
          'expired-callback': () => { toast.error("Recaptcha expired. Please try again."); },
        });
      } catch (error) {
        console.error("Recaptcha init error:", error);
      }
    }
  };

  const handleSendOtp = async () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setOtpLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifierS5;
      let phoneNumber = formData.phoneNumber;
      if (!phoneNumber.startsWith('+')) phoneNumber = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    if (!confirmationResult) { toast.error("Please request OTP first"); return; }
    setOtpLoading(true);
    try {
      await confirmationResult.confirm(formData.otp);
      setOtpVerified(true);
      toast.success("Phone number verified!");
    } catch {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
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
    <section style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "clamp(32px,6vw,64px)", paddingBottom: "clamp(32px,6vw,64px)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Mobile-only heading */}
        <h2
          className="md:hidden text-center mb-6"
          style={{
            fontFamily: "Inter",
            fontSize: "clamp(22px,6vw,36px)",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#101828",
          }}
        >
          {title}
        </h2>

        <div style={{ display: "flex", gap: "64px", alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* ── LEFT SIDE — hidden on mobile ────────────────────────────────── */}
          <div className="hidden md:block" style={{ flex: 1, minWidth: "300px" }}>

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
            width: "100%",
            maxWidth: "500px",
            flexShrink: 0,
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            padding: "33px",
            position: "relative",
            boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
            margin: "0 auto lg:margin-0",
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

              {/* Phone Number with inline Send OTP */}
              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: "#EF4444" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: "42px", paddingRight: "100px" }}
                    required
                    disabled={otpVerified}
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading || !formData.phoneNumber}
                      style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", backgroundColor: "transparent", color: "#9810FA", border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer", opacity: (otpLoading || !formData.phoneNumber) ? 0.5 : 1 }}
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  )}
                  {otpVerified && <CheckCircle size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#10B981" }} />}
                </div>
                {!otpVerified && <p style={{ fontFamily: "Inter", fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>We'll send an OTP to verify your phone number</p>}
              </div>

              {/* OTP — only shown after Send OTP is clicked */}
              {otpSent && !otpVerified && (
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
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otpLoading}
                      style={{ padding: "12px 20px", borderRadius: "10px", backgroundColor: "#9810FA", color: "#FFFFFF", fontFamily: "Inter", fontSize: "14px", fontWeight: 600, border: "none", cursor: otpLoading ? "not-allowed" : "pointer", opacity: otpLoading ? 0.6 : 1, flexShrink: 0 }}
                    >
                      {otpLoading ? "..." : "Verify"}
                    </button>
                  </div>
                </div>
              )}

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
                  <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                </div>
              </div>

              {/* Preferred Time to Call */}
              <div>
                <label style={labelStyle}>Preferred Time to Call</label>
                <div style={{ position: "relative" }}>
                  <Clock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: "34px", appearance: "none", cursor: "pointer" }}
                  >
                    <option value="">Select time slot</option>
                    {["9 AM – 11 AM", "11 AM – 1 PM", "2 PM – 4 PM", "4 PM – 6 PM", "6 PM – 8 PM"].map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Your Message (Optional)</label>
                <textarea
                  placeholder="Tell us about your career goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {/* No Spam Calls badge */}
              <div style={{ height: "32px", borderRadius: "8px", backgroundColor: "#10B981", border: "1px solid #059669", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <Shield size={14} color="#FFFFFF" />
                <span style={{ fontFamily: "Inter", fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}>No Spam Calls</span>
              </div>

              {/* Terms text */}
              <p style={{ fontFamily: "Inter", fontSize: "12px", lineHeight: "19.5px", color: "#6A7282", textAlign: "center", width: "100%", maxWidth: "398px", margin: "0 auto", paddingBottom: "20px" }}>
                By submitting, you agree to our{" "}
                <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Terms & Conditions</a>
                {" "}and{" "}
                <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Privacy Policy</a>
              </p>

            </form>
          </div>
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
