'use client';

import { useState, useEffect } from "react";
import { Phone, Shield, CheckCircle } from "lucide-react";
import { auth } from "@/app/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import toast from "react-hot-toast";


export default function TalkToExperts() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    otp: "",
    programOfInterest: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/student/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({
            ...prev,
            fullName: data.name || (data.firstName ? `${data.firstName} ${data.lastName || ''}`.trim() : prev.fullName),
            email: data.email || prev.email,
            whatsappNumber: data.phone || prev.whatsappNumber,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile for pre-filling form", err);
      }
    };
    fetchProfile();
  }, []);

  const title = "Talk to our expert counselors";
  const description = "Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.";
  const imgSrc = "/Section 5.png";
  const indiaAddr = "123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001";
  const indiaPhone = "+91 80 1234 5678";
  const usaAddr = "456 Tech Campus Drive\nSan Francisco, CA\n94105";
  const usaPhone = "+1 415 123 4567";
  const sendBtn = "Send";
  const verifyBtn = "Verify";

  const programs = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': () => {
            console.log("Recaptcha verified");
          },
          'expired-callback': () => {
            toast.error("Recaptcha expired. Please try again.");
          }
        });
      } catch (error) {
        console.error("Recaptcha initialization error:", error);
      }
    }
  };

  const handleSendOtp = async () => {
    if (!formData.whatsappNumber || formData.whatsappNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setOtpLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      
      // Ensure phone number is in E.164 format
      let phoneNumber = formData.whatsappNumber;
      if (!phoneNumber.startsWith('+')) {
        phoneNumber = `+91${phoneNumber}`; // Defaulting to India
      }

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send OTP. Please check the number.");
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.render().then((widgetId: any) => {
          (window as any).recaptchaVerifier.reset(widgetId);
        });
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!confirmationResult) {
      toast.error("Please request OTP first");
      return;
    }

    setOtpLoading(true);
    try {
      await confirmationResult.confirm(formData.otp);
      setOtpVerified(true);
      toast.success("Phone number verified!");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

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
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('studentToken') || ''}`
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.whatsappNumber,
          courseOfInterest: formData.programOfInterest,
          source: "talk_to_experts",
          message: "Talk to Experts Request"
        }),
      });

      if (response.ok) {
        toast.success("Request sent successfully! Our experts will contact you soon.");
        setFormData({
          fullName: "",
          email: "",
          whatsappNumber: "",
          otp: "",
          programOfInterest: "",
        });
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to send request. Please try again later.");
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
                    style={{ ...inputStyle, paddingLeft: "42px", paddingRight: "100px" }}
                    required
                    disabled={otpVerified}
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading || !formData.whatsappNumber}
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "transparent",
                        color: "#9810FA",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity: (otpLoading || !formData.whatsappNumber) ? 0.5 : 1
                      }}
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  )}
                  {otpVerified && (
                    <CheckCircle size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#10B981" }} />
                  )}
                </div>
                <p style={{ fontFamily: "Inter", fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
                  {otpVerified ? "Number verified" : "We'll send an OTP to verify your number"}
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
                    disabled={otpVerified || !otpSent}
                  />
                  {/* Verify button — Figma: 89.78×50px, radius 10px, #9810FA */}
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || otpVerified || !otpSent}
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
                      cursor: (otpLoading || otpVerified || !otpSent) ? "not-allowed" : "pointer",
                      flexShrink: 0,
                      opacity: (otpLoading || otpVerified || !otpSent) ? 0.6 : 1,
                    }}
                  >
                    {otpLoading ? "..." : otpVerified ? "Done" : verifyBtn}
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
            <div id="recaptcha-container"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
