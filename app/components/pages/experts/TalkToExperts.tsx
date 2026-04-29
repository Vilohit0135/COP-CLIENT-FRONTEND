'use client';

import { useState, useEffect } from "react";
import { Phone, CheckCircle, Mail, MessageCircle, Clock, ChevronDown, Shield } from "lucide-react";
import { auth } from "@/app/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import toast from "react-hot-toast";

export default function TalkToExperts() {
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/student/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({
            ...prev,
            fullName: data.name || (data.firstName ? `${data.firstName} ${data.lastName || ''}`.trim() : prev.fullName),
            email: data.email || prev.email,
            phoneNumber: data.phone || prev.phoneNumber,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile for pre-filling form", err);
      }
    };
    fetchProfile();
  }, []);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => { console.log("Recaptcha verified"); },
          'expired-callback': () => { toast.error("Recaptcha expired. Please try again."); },
        });
      } catch (error) {
        console.error("Recaptcha initialization error:", error);
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
      const appVerifier = (window as any).recaptchaVerifier;
      let phoneNumber = formData.phoneNumber;
      if (!phoneNumber.startsWith('+')) phoneNumber = `+91${phoneNumber}`;
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
          "Authorization": `Bearer ${localStorage.getItem('studentToken') || ''}`,
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          courseOfInterest: formData.programOfInterest,
          source: "talk_to_experts",
          message: formData.message || "Talk to Experts Request",
          preferredTime: formData.preferredTime,
        }),
      });
      if (response.ok) {
        toast.success("Request sent successfully! Our experts will contact you soon.");
        setFormData({ fullName: "", email: "", phoneNumber: "", otp: "", programOfInterest: "", preferredTime: "", message: "" });
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

  // ─── static data ─────────────────────────────────────────────────────────────
  const contactMethods = [
    { icon: <Phone size={20} color="#7C3AED" />, title: "Schedule a Call",  subtitle: "Get personalized guidance over phone" },
    { icon: <Mail  size={20} color="#7C3AED" />, title: "Email Us",         subtitle: "We'll respond within 24 hours" },
    { icon: <MessageCircle size={20} color="#7C3AED" />, title: "Live Chat", subtitle: "Instant answers to your questions" },
  ];
  const benefits = ["Free career counseling", "Course recommendations", "University guidance", "Scholarship information", "EMI & payment options"];
  const experts = [
    { name: "Dr. Priya Sharma", role: "Education Counsellor",  exp: "24 yrs", spec: "Technology & Management",  img: "/Image (Dr. Priya Sharma).png" },
    { name: "Rajesh Kumar",     role: "Admission Advisor",     exp: "20 yrs", spec: "Technology & Engineering", img: "/Image (Rahul Mehta).png" },
    { name: "Anjali Verma",     role: "Admission Expert",      exp: "31 yrs", spec: "Healthcare & Science",     img: "/Image (Anita Desai).png" },
  ];
  const programs  = ["MBA & Management Programs", "Tech & Data Science", "International Programs"];
  const timeSlots = ["9 AM – 11 AM", "11 AM – 1 PM", "2 PM – 4 PM", "4 PM – 6 PM", "6 PM – 8 PM"];

  // ─── shared styles ────────────────────────────────────────────────────────────
  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", border: "1px solid #D1D5DB", borderRadius: 8,
    fontSize: 14, color: "#374151", outline: "none", boxSizing: "border-box",
    backgroundColor: "#FFFFFF", fontFamily: "Inter, sans-serif",
  };
  const lbl: React.CSSProperties = {
    display: "block", fontSize: 14, fontWeight: 500, color: "#101828",
    marginBottom: 6, fontFamily: "Inter, sans-serif",
  };
  const inpD: React.CSSProperties = { ...inp, fontFamily: "Inter", fontSize: "14px" };
  const lblD: React.CSSProperties = { display: "block", fontFamily: "Inter", fontSize: "14px", fontWeight: 500, color: "#101828", marginBottom: "6px" };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md and above)
      ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden" style={{ backgroundColor: "#F3F4F6", minHeight: "100vh", fontFamily: "Inter, sans-serif", paddingTop: 80, overflowX: "hidden" }}>

        {/* 1. CONTACT METHOD CARDS */}
        <div style={{ backgroundColor: "#FFFFFF", padding: "20px 16px 10px" }}>
          {contactMethods.map((m, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", marginBottom: 10,
              backgroundColor: "#FFFFFF", borderRadius: 12,
              border: "1px solid #F3F4F6",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", backgroundColor: "#EDE9FE",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{m.icon}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#101828", margin: 0 }}>{m.title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", margin: "2px 0 0" }}>{m.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. GET IN TOUCH FORM */}
        <div style={{ backgroundColor: "#FFFFFF", margin: "10px 0", padding: "20px 16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#101828", margin: 0 }}>Get In Touch</h2>
            <span style={{ backgroundColor: "#DCFCE7", color: "#16A34A", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#16A34A", display: "inline-block" }} />
              In touch
            </span>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={lbl}>Full Name <span style={{ color: "#EF4444" }}>*</span></label>
              <input type="text" placeholder="Enter your full name" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} style={inp} required />
            </div>
            <div>
              <label style={lbl}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ ...inp, paddingLeft: 34 }} required />
              </div>
            </div>
            <div>
              <label style={lbl}>Phone Number <span style={{ color: "#EF4444" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 3, fontSize: 13, fontWeight: 500, color: "#374151", pointerEvents: "none" }}>
                  <span style={{ fontSize: 16 }}>🇮🇳</span>
                  <span>+91</span>
                  <span style={{ color: "#D1D5DB", fontSize: 16, lineHeight: "1" }}>|</span>
                </div>
                <input type="tel" placeholder="00000-00000" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} style={{ ...inp, paddingLeft: 74, paddingRight: 80 }} required disabled={otpVerified} />
                {!otpVerified && (
                  <button type="button" onClick={handleSendOtp} disabled={otpLoading || !formData.phoneNumber} style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#7C3AED", fontSize: 11, fontWeight: 600, cursor: "pointer", opacity: (otpLoading || !formData.phoneNumber) ? 0.4 : 1, whiteSpace: "nowrap" }}>
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}
                {otpVerified && <CheckCircle size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#10B981" }} />}
              </div>
              {!otpVerified && <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>We'll send an OTP to verify your number</p>}
            </div>
            {otpSent && !otpVerified && (
              <div>
                <label style={lbl}>Enter OTP <span style={{ color: "#EF4444" }}>*</span></label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="text" placeholder="6-digit OTP" value={formData.otp} onChange={e => setFormData({ ...formData, otp: e.target.value })} style={{ ...inp, flex: 1 }} />
                  <button type="button" onClick={handleVerifyOtp} disabled={otpLoading} style={{ padding: "12px 18px", borderRadius: 8, backgroundColor: "#7C3AED", color: "#FFFFFF", fontSize: 14, fontWeight: 600, border: "none", cursor: otpLoading ? "not-allowed" : "pointer", opacity: otpLoading ? 0.6 : 1, whiteSpace: "nowrap" }}>
                    {otpLoading ? "..." : "Verify"}
                  </button>
                </div>
              </div>
            )}
            <div>
              <label style={lbl}>Preferred Program <span style={{ color: "#EF4444" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <select value={formData.programOfInterest} onChange={e => setFormData({ ...formData, programOfInterest: e.target.value })} style={{ ...inp, appearance: "none", cursor: "pointer" }} required>
                  <option value="">Select Program</option>
                  {programs.map((p, i) => <option key={i} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
              </div>
            </div>
            <div>
              <label style={lbl}>Preferred Time to Call</label>
              <div style={{ position: "relative" }}>
                <Clock size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                <select value={formData.preferredTime} onChange={e => setFormData({ ...formData, preferredTime: e.target.value })} style={{ ...inp, paddingLeft: 34, appearance: "none", cursor: "pointer" }}>
                  <option value="">Select time slot</option>
                  {timeSlots.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
              </div>
            </div>
            <div>
              <label style={lbl}>Your Message (Optional)</label>
              <textarea placeholder="Tell us about your career goals..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={3} style={{ ...inp, resize: "vertical", minHeight: 80 }} />
            </div>
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px 0", borderRadius: 10, backgroundColor: "#7C3AED", color: "#FFFFFF", fontSize: 15, fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, marginTop: 4, boxShadow: "0 4px 14px rgba(124,58,237,0.35)" }}>
              {loading ? "Sending…" : "Submit Request"}
            </button>
          </form>
        </div>

        {/* 3. WHAT YOU'LL GET */}
        <div style={{ backgroundColor: "#FFFFFF", margin: "10px 0", padding: "20px 16px 24px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#101828", margin: "0 0 16px" }}>What You'll Get</h2>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle size={13} color="#16A34A" />
              </div>
              <span style={{ fontSize: 14, color: "#374151" }}>{b}</span>
            </div>
          ))}
        </div>

        {/* 4. OUR EXPERT TEAM */}
        <div style={{ backgroundColor: "#FFFFFF", margin: "10px 0", padding: "20px 16px 24px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#101828", margin: "0 0 18px" }}>Our Expert Team</h2>
          {experts.map((ex, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: i < experts.length - 1 ? 18 : 0 }}>
              <img src={ex.img} alt={ex.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #EDE9FE" }} />
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#101828", margin: 0 }}>{ex.name}</p>
                <p style={{ fontSize: 13, color: "#6B7280", margin: "2px 0 3px" }}>{ex.role}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>• {ex.exp} &nbsp;• {ex.spec}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 5. NEED IMMEDIATE HELP CTA */}
        <div style={{ margin: "10px 16px 40px", borderRadius: 16, background: "linear-gradient(135deg, #7C3AED 0%, #9810FA 100%)", padding: "28px 20px 24px", textAlign: "center", color: "#FFFFFF" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Phone size={24} color="#FFFFFF" />
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Need Immediate Help?</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "0 0 18px" }}>Call us directly</p>
          <a href="tel:+1234567890" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#FFFFFF", color: "#7C3AED", padding: "13px 28px", borderRadius: 30, textDecoration: "none", fontWeight: 700, fontSize: 16, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
            <Phone size={16} color="#7C3AED" />
            +123 456 7890
          </a>
        </div>

        <div id="recaptcha-container" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════════════════════════ */}
      <section className="hidden md:block" style={{ width: "100%", backgroundColor: "#FFFFFF", paddingTop: "64px", paddingBottom: "64px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "64px", alignItems: "flex-start" }}>

            {/* ── LEFT ── */}
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h2 style={{ fontFamily: "Inter", fontSize: "48px", fontWeight: 700, lineHeight: "60px", color: "#101828", marginBottom: "16px" }}>
                Talk to our expert counselors
              </h2>
              <p style={{ fontFamily: "Inter", fontSize: "18px", fontWeight: 400, lineHeight: "28px", color: "#4A5565", maxWidth: "546px", marginBottom: "20px" }}>
                Have questions about programs, admissions, or career paths? Fill out the form and our expert counselors will be in touch directly.
              </p>
              <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 700, color: "#101828", marginBottom: "12px" }}>Our office</p>
              <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                <img src="/Section 5.png" alt="Our office" style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>India</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                    <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>{"123 Education Hub, Sector 5\nBengaluru, Karnataka\n560001"}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", margin: 0 }}>+91 80 1234 5678</p>
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 600, color: "#101828", marginBottom: "8px" }}>United States</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "8px" }}>
                    <img src="/Icon.png" alt="" style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", whiteSpace: "pre-line", margin: 0 }}>{"456 Tech Campus Drive\nSan Francisco, CA\n94105"}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <img src="/Icon (2).png" alt="" style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "20px", color: "#4A5565", margin: 0 }}>+1 415 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: FORM CARD ── */}
            <div style={{ width: "500px", flexShrink: 0, borderRadius: "16px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", padding: "33px 33px 24px 33px", boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)" }}>
              <h3 style={{ fontFamily: "Inter", fontSize: "22px", fontWeight: 700, color: "#101828", marginBottom: "20px" }}>Get In Touch</h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={lblD}>Full Name <span style={{ color: "#EF4444" }}>*</span></label>
                  <input type="text" placeholder="Enter your full name" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} style={inpD} required />
                </div>
                <div>
                  <label style={lblD}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
                  <input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inpD} required />
                </div>
                <div>
                  <label style={lblD}>Phone Number <span style={{ color: "#EF4444" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <Phone size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                    <input type="tel" placeholder="98765 43210" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} style={{ ...inpD, paddingLeft: "42px", paddingRight: "100px" }} required disabled={otpVerified} />
                    {!otpVerified && (
                      <button type="button" onClick={handleSendOtp} disabled={otpLoading || !formData.phoneNumber} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", backgroundColor: "transparent", color: "#9810FA", border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer", opacity: (otpLoading || !formData.phoneNumber) ? 0.5 : 1 }}>
                        {otpSent ? "Resend OTP" : "Send OTP"}
                      </button>
                    )}
                    {otpVerified && <CheckCircle size={18} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#10B981" }} />}
                  </div>
                </div>
                {otpSent && !otpVerified && (
                  <div>
                    <label style={lblD}>OTP <span style={{ color: "#EF4444" }}>*</span></label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input type="text" placeholder="Enter OTP" value={formData.otp} onChange={e => setFormData({ ...formData, otp: e.target.value })} style={{ ...inpD, flex: 1, width: "auto" }} />
                      <button type="button" onClick={handleVerifyOtp} disabled={otpLoading} style={{ padding: "12px 20px", borderRadius: "10px", backgroundColor: "#9810FA", color: "#FFFFFF", fontFamily: "Inter", fontSize: "14px", fontWeight: 600, border: "none", cursor: otpLoading ? "not-allowed" : "pointer", opacity: otpLoading ? 0.6 : 1 }}>
                        {otpLoading ? "..." : "Verify"}
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <label style={lblD}>Program of Interest <span style={{ color: "#EF4444" }}>*</span></label>
                  <div style={{ position: "relative" }}>
                    <select value={formData.programOfInterest} onChange={e => setFormData({ ...formData, programOfInterest: e.target.value })} style={{ ...inpD, appearance: "none", cursor: "pointer" }} required>
                      <option value="">Select Program</option>
                      {programs.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </select>
                    <svg style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <button type="submit" disabled={loading} style={{ width: "100%", height: "52px", borderRadius: "10px", backgroundColor: "#9810FA", color: "#FFFFFF", fontFamily: "Inter", fontSize: "16px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0px 4px 6px -4px rgba(173,70,255,0.30), 0px 10px 15px -3px rgba(173,70,255,0.30)" }}>
                  {loading ? "Sending…" : (
                    <>
                      Send
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
                <div style={{ height: "32px", borderRadius: "8px", backgroundColor: "#10B981", border: "1px solid #059669", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <Shield size={14} color="#FFFFFF" />
                  <span style={{ fontFamily: "Inter", fontSize: "13px", fontWeight: 500, color: "#FFFFFF" }}>No Spam Calls</span>
                </div>
                <p style={{ fontFamily: "Inter", fontSize: "12px", lineHeight: "19.5px", color: "#6A7282", textAlign: "center", margin: 0 }}>
                  By submitting, you agree to our{" "}
                  <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Terms &amp; Conditions</a>
                  {" "}and{" "}
                  <a href="#" style={{ color: "#9810FA", textDecoration: "underline" }}>Privacy Policy</a>
                </p>
              </form>
            </div>

          </div>
        </div>
        <div id="recaptcha-container-desktop" />
      </section>
    </>
  );
}
