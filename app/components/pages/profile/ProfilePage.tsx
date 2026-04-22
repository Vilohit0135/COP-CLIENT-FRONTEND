"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ── Dummy data ────────────────────────────────────────────────────────────────
const dummyUser = {
  firstName: "-",
  lastName: "-",
  idNo: "-",
  dateOfBirth: "-",
  email: "-",
  phone: "-",
  city: "-",
  state: "-",
  country: "-",
  currentEducation: "-",
  occupation: "-",
  company: "-",
};

type UserData = typeof dummyUser;

// ── Icons ─────────────────────────────────────────────────────────────────────
function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}

// ── Sidebar nav items ─────────────────────────────────────────────────────────
type NavKey = "profile" | "shortlisted" | "settings";

const navItems: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "My Profile", icon: <UserIcon className="w-4 h-4" /> },
  { key: "shortlisted", label: "Shortlisted Universities", icon: <BookmarkIcon className="w-4 h-4" /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon className="w-4 h-4" /> },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [activeNav, setActiveNav] = useState<NavKey>("profile");

  const [userData, setUserData] = useState<UserData>(dummyUser);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
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
          setUserData({
            ...dummyUser, // fallback for missing fields
            firstName: data.firstName || (data.name ? data.name.split(' ')[0] : dummyUser.firstName),
            lastName: data.lastName || (data.name ? data.name.split(' ').slice(1).join(' ') : dummyUser.lastName),
            email: data.email || dummyUser.email,
            phone: data.phone || dummyUser.phone,
            dateOfBirth: data.dateOfBirth || dummyUser.dateOfBirth,
            city: data.city || dummyUser.city,
            state: data.state || dummyUser.state,
            country: data.country || dummyUser.country,
            currentEducation: data.currentEducation || dummyUser.currentEducation,
            occupation: data.occupation || dummyUser.occupation,
            company: data.currentCompanyOrUniversity || dummyUser.company,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (updates: Partial<UserData>) => {
    const token = localStorage.getItem('studentToken');
    if (!token) return false;

    // Map local 'company' to API 'currentCompanyOrUniversity'
    // @ts-ignore
    const apiPayload: any = { ...updates };
    if (apiPayload.company !== undefined) {
      apiPayload.currentCompanyOrUniversity = apiPayload.company;
      delete apiPayload.company;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/student/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apiPayload)
      });
      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          ...updates,
        }));
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    toast.success("Logged out successfully", { position: 'bottom-right' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div style={{ width: "70vw", minHeight: "70vh" }} className="flex flex-col md:flex-row gap-6">

        {/* ── Left Sidebar ──────────────────────────────────────────────── */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
          {/* Profile card */}
          <div className="bg-[#6C3FC5] rounded-2xl p-6 flex flex-col items-center text-white">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-bold text-lg leading-tight">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-xs text-white/70 mt-1">{userData.occupation}</p>

            <nav className="w-full mt-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeNav === item.key
                    ? "bg-white text-[#6C3FC5]"
                    : "text-white/80 hover:bg-white/10"
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}

              <hr className="border-white/20 my-2" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-red-200 hover:bg-red-500/20 hover:text-white"
              >
                <LogoutIcon className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>

          {/* Help card */}
          <div className="bg-[#5A2EA6] rounded-2xl p-5 text-white flex flex-col items-center text-center">
            <h3 className="font-extrabold text-base leading-tight mb-2">Need Help Deciding?</h3>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">
              Our expert counselors can help you compare and choose the best university for your goals
            </p>
            <Link
              href="/talk-to-experts"
              className="bg-[#F5A623] hover:bg-[#e09510] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
            >
              Talk to an Expert
            </Link>
          </div>
        </aside>

        {/* ── Main Content ───────────────────────────────────────────────── */}
        <main className="flex-1">
          {activeNav === "profile" && <PersonalInfoPanel userData={userData} onUpdate={handleUpdateProfile} />}
          {activeNav === "shortlisted" && <ShortlistedPanel />}
          {activeNav === "settings" && <SettingsPanel userData={userData} />}
        </main>
      </div>
    </div>
  );
}

// ── Personal Information Panel ────────────────────────────────────────────────
function PersonalInfoPanel({ userData, onUpdate }: { userData: UserData, onUpdate: (data: Partial<UserData>) => Promise<boolean> }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<UserData>({ ...userData });
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    setForm({ ...userData });
  }, [userData]);

  function handleChange(field: keyof UserData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    const changes: Partial<UserData> = {};
    let hasChanges = false;
    (Object.keys(form) as (keyof UserData)[]).forEach(k => {
      if (form[k] !== userData[k]) {
        changes[k] = form[k];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setIsSaving(true);
      const success = await onUpdate(changes);
      setIsSaving(false);
      if (success) {
        toast.success("Profile updated successfully!", { position: 'bottom-right' });
        setEditMode(false);
      } else {
        toast.error("Failed to update profile.", { position: 'bottom-right' });
      }
    } else {
      setEditMode(false);
    }
  }

  function handleCancel() {
    setForm({ ...userData });
    setEditMode(false);
  }

  const data = editMode ? form : userData;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-gray-900">Personal Information</h1>

        {editMode ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#6C3FC5] hover:bg-[#5A2EA6] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <PencilIcon className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl border border-gray-300 transition-colors"
            >
              <XIcon className="w-4 h-4" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-[#6C3FC5] hover:bg-[#5A2EA6] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Basic Information */}
      <Section icon={<UserIcon className="w-5 h-5 text-[#6C3FC5]" />} title="Basic Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="First Name" value={data.firstName} editMode={editMode} onChange={(v) => handleChange("firstName", v)} />
          <Field label="Last Name" value={data.lastName} editMode={editMode} onChange={(v) => handleChange("lastName", v)} />
        </div>
        <div className="mt-6">
          <Field
            label="Date of Birth"
            value={data.dateOfBirth}
            editMode={editMode}
            onChange={(v) => handleChange("dateOfBirth", v)}
            placeholder="e.g. May 15, 1995"
          />
        </div>
      </Section>

      <hr className="border-gray-100 my-6" />

      {/* Contact Information */}
      <Section icon={<EnvelopeIcon className="w-5 h-5 text-[#6C3FC5]" />} title="Contact Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field
            label="Email Address"
            value={data.email}
            editMode={editMode}
            onChange={(v) => handleChange("email", v)}
            viewPrefix={<EnvelopeIcon className="w-4 h-4 text-gray-400" />}
          />
          <Field
            label="Phone Number"
            value={data.phone}
            editMode={editMode}
            onChange={(v) => handleChange("phone", v)}
            viewPrefix={<PhoneIcon className="w-4 h-4 text-gray-400" />}
          />
        </div>
      </Section>

      <hr className="border-gray-100 my-6" />

      {/* Location */}
      <Section icon={<MapPinIcon className="w-5 h-5 text-[#6C3FC5]" />} title="Location">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Field label="City" value={data.city} editMode={editMode} onChange={(v) => handleChange("city", v)} />
          <Field label="State" value={data.state} editMode={editMode} onChange={(v) => handleChange("state", v)} />
          <Field label="Country" value={data.country} editMode={editMode} onChange={(v) => handleChange("country", v)} />
        </div>
      </Section>

      <hr className="border-gray-100 my-6" />

      {/* Professional Information */}
      <Section icon={<BriefcaseIcon className="w-5 h-5 text-[#6C3FC5]" />} title="Professional Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Current Education" value={data.currentEducation} editMode={editMode} onChange={(v) => handleChange("currentEducation", v)} />
          <Field label="Occupation" value={data.occupation} editMode={editMode} onChange={(v) => handleChange("occupation", v)} />
        </div>
        <div className="mt-6">
          <Field label="Company" value={data.company} editMode={editMode} onChange={(v) => handleChange("company", v)} />
        </div>
      </Section>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <h2 className="font-bold text-gray-800 text-sm">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── Field — view or editable input ───────────────────────────────────────────
function Field({
  label,
  value,
  editMode,
  onChange,
  viewPrefix,
  placeholder,
}: {
  label: string;
  value: string;
  editMode: boolean;
  onChange: (v: string) => void;
  viewPrefix?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
      {editMode ? (
        <input
          type="text"
          value={value}
          placeholder={placeholder ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 font-medium outline-none focus:border-[#6C3FC5] focus:ring-1 focus:ring-[#6C3FC5] transition-colors bg-white"
        />
      ) : (
        <div className="flex items-center gap-1.5">
          {viewPrefix && <span className="flex-shrink-0">{viewPrefix}</span>}
          <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
      )}
    </div>
  );
}

// ── Placeholder panels ────────────────────────────────────────────────────────
// ── Shortlisted Universities dummy data ───────────────────────────────────────
const initialShortlisted = [
  {
    id: 1,
    initials: "NG",
    color: "bg-purple-600",
    name: "NMIMS Global Access",
    location: "Mumbai, Maharashtra",
    rating: "4.8",
    accreditations: "NAAC A+ | UGC | AICTE",
    program: "MBA",
    duration: "24 Months",
    fees: "₹1,20,000",
    startDate: "April 2028",
  },
  {
    id: 2,
    initials: "AO",
    color: "bg-orange-400",
    name: "Amity Online University",
    location: "Noida, Uttar Pradesh",
    rating: "4.6",
    accreditations: "NAAC A+ | UGC | AICTE",
    program: "PGDM",
    duration: "24 Months",
    fees: "₹1,10,000",
    startDate: "May 2026",
  },
  {
    id: 3,
    initials: "MU",
    color: "bg-red-500",
    name: "Manipal University Online",
    location: "Manipal, Karnataka",
    rating: "4.7",
    accreditations: "NAAC A | UGC | AICTE",
    program: "MBA",
    duration: "24 Months",
    fees: "₹1,35,000",
    startDate: "April 2026",
  },
  {
    id: 4,
    initials: "JU",
    color: "bg-blue-500",
    name: "Jain University Online",
    location: "Bangalore, Karnataka",
    rating: "4.5",
    accreditations: "NAAC A+ | UGC | AICTE",
    program: "BBA",
    duration: "36 Months",
    fees: "₹1,00,000",
    startDate: "June 2026",
  },
  {
    id: 5,
    initials: "CU",
    color: "bg-teal-500",
    name: "Chandigarh University Online",
    location: "Chandigarh, Punjab",
    rating: "4.4",
    accreditations: "NAAC A | UGC | AICTE",
    program: "MCA",
    duration: "24 Months",
    fees: "₹90,000",
    startDate: "May 2026",
  },
];

type ShortlistedEntry = typeof initialShortlisted[number];

function ShortlistedPanel() {
  const [list, setList] = useState<ShortlistedEntry[]>(initialShortlisted);
  const [search, setSearch] = useState("");

  const filtered = list.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.location.toLowerCase().includes(search.toLowerCase()) ||
    u.program.toLowerCase().includes(search.toLowerCase())
  );

  function remove(id: number) {
    setList((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search + Filter bar */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
        <SearchBarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search universities, programs, or locations..."
          className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
        />
        <FilterIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>

      {/* University Cards */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400 text-sm">
          No shortlisted universities found.
        </div>
      )}

      {filtered.map((uni) => (
        <div key={uni.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative">
          {/* Remove button */}
          <button
            onClick={() => remove(uni.id)}
            className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Remove"
          >
            <XIcon className="w-4 h-4" />
          </button>

          {/* Top row: avatar + name/meta */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`${uni.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-sm font-extrabold">{uni.initials}</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">{uni.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <PinIcon className="w-3 h-3 text-gray-400" />
                  {uni.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <StarIcon className="w-3 h-3 text-yellow-400" />
                  {uni.rating}
                </span>
                <span className="text-xs text-gray-400">{uni.accreditations}</span>
              </div>
            </div>
          </div>

          {/* Info strip */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 grid grid-cols-4 gap-3 mb-4">
            <InfoCell icon={<GraduationCapIcon className="w-4 h-4 text-purple-500" />} label="Program" value={uni.program} />
            <InfoCell icon={<ClockIcon className="w-4 h-4 text-purple-500" />} label="Duration" value={uni.duration} />
            <InfoCell icon={<RupeeIcon className="w-4 h-4 text-purple-500" />} label="Total Fees" value={uni.fees} />
            <InfoCell icon={<CalIcon className="w-4 h-4 text-purple-500" />} label="Start Date" value={uni.startDate} />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 border border-[#6C3FC5] text-[#6C3FC5] hover:bg-purple-50 text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
              View Details <span className="text-base leading-none">→</span>
            </button>
            <button className="flex items-center gap-1.5 bg-[#6C3FC5] hover:bg-[#5A2EA6] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
              Compare Programs
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Shortlisted panel icons ───────────────────────────────────────────────────
function SearchBarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.07-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.077 3.995-5.228 3.995-9.327 0-4.556-3.689-8.25-8.25-8.25S3.75 3.444 3.75 8c0 4.099 2.051 7.25 3.995 9.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M6.75 21L17.25 3" />
    </svg>
  );
}

function CalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function InfoCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
        {icon}
        {label}
      </div>
      <p className="text-xs font-bold text-gray-800">{value}</p>
    </div>
  );
}

type SettingsTab = "account" | "security";

function SettingsPanel({ userData }: { userData: UserData }) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <h1 className="text-xl font-extrabold text-gray-900 mb-5">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {(["account", "security"] as SettingsTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize transition-colors ${activeTab === tab
              ? "text-[#6C3FC5] border-b-2 border-[#6C3FC5]"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <div>
          <h2 className="font-bold text-gray-900 text-sm mb-5">Account Information</h2>
          <div className="flex flex-col gap-5">
            <SettingsField label="Username" value={`${userData.firstName} ${userData.lastName}`} />
            <SettingsField label="Email Address" value={userData.email.toLowerCase()} />
            <SettingsField label="Phone Number" value={userData.phone} />
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && <SecurityTab />}
    </div>
  );
}

// ── Security Tab ──────────────────────────────────────────────────────────────
function SecurityTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPw || !newPw) {
      toast.error("Current password and new password are required");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPw.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);
    const token = localStorage.getItem('studentToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/student/password/change`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: currentPw,
          newPassword: newPw,
          confirmPassword: confirmPw
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password updated successfully");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        toast.error(data.error || "Failed to update password");
      }
    } catch (err) {
      toast.error("An error occurred while changing password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async (password: string) => {
    setIsDeleting(true);
    const token = localStorage.getItem('studentToken');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/student/account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        toast.success("Account deleted successfully.");
        localStorage.removeItem('studentToken');
        router.push('/login');
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to delete account");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Change Password */}
      <div>
        <h2 className="font-bold text-gray-900 text-base mb-5">Change Password</h2>

        <div className="flex flex-col gap-4">
          {/* Current Password */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1.5">Current Password</p>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-[#6C3FC5] focus:ring-1 focus:ring-[#6C3FC5] transition-colors bg-white"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showCurrent ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1.5">New Password</p>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-[#6C3FC5] focus:ring-1 focus:ring-[#6C3FC5] transition-colors bg-white"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showNew ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1.5">Confirm New Password</p>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#6C3FC5] focus:ring-1 focus:ring-[#6C3FC5] transition-colors bg-white"
            />
          </div>
        </div>

        {/* Change Password Button */}
        <button
          onClick={handleChangePassword}
          disabled={isChangingPassword}
          className="mt-5 flex items-center gap-2 bg-[#6C3FC5] hover:bg-[#5A2EA6] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
        >
          <LockIcon className="w-4 h-4" />
          {isChangingPassword ? "Updating..." : "Change Password"}
        </button>
      </div>

      {/* Divider */}
      <hr className="border-red-200" />

      {/* Danger Zone */}
      <div>
        <h2 className="font-bold text-red-500 text-base mb-4">Danger Zone</h2>
        <div className="border border-red-100 bg-red-50 rounded-xl p-5">
          <p className="font-bold text-gray-900 text-sm mb-1">Delete Account</p>
          <p className="text-gray-500 text-xs mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}

function DeleteAccountModal({
  isOpen,
  isDeleting,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        {step === 1 && (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-sm text-gray-500 mb-4">Please enter your password to continue.</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors bg-white mb-6"
            />
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800">Cancel</button>
              <button 
                onClick={() => {
                  if (password.trim()) setStep(2);
                }} 
                disabled={!password.trim()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="text-lg font-bold text-red-600 mb-2">Warning!</h3>
            <p className="text-sm text-gray-700 mb-4">
              This action cannot be undone. All your data will be permanently deleted. Are you absolutely sure you want to delete your account?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setStep(1)} 
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Back
              </button>
              <button 
                onClick={() => onConfirm(password)} 
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 font-medium mb-1.5">{label}</p>
      <div className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 font-medium bg-white">
        {value}
      </div>
    </div>
  );
}
