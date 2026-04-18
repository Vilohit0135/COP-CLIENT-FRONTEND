"use client";

import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
    IconCircleCheckFilled,
    IconUsers,
    IconBriefcase,
    IconStar,
    IconArrowRight,
    IconPlus,
    IconMinus,
    IconLayoutGrid
} from '@tabler/icons-react';

const universities = [
    {
        id: 1,
        name: "Amity University Noida",
        fee: "₹2,50,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).png", // Placeholder using existing asset
    },
    {
        id: 2,
        name: "Manipal University",
        fee: "₹2,50,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).png",
    },
    {
        id: 3,
        name: "Chandigarh University",
        fee: "₹1,80,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).png",
    },
    {
        id: 4,
        name: "Amrita Vishwavidyapeetham",
        fee: "₹1,80,000",
        feeDescription: "First Year Total University Fees",
        logo: "/Container (40).png",
    }
];

export default function CompareUniversitiesPage() {
    const [selectedUniversities, setSelectedUniversities] = useState<number[]>([]);
    const [view, setView] = useState<'selection' | 'comparison'>('selection');

    const universities = [
        {
            id: 1,
            name: "Amity University Noida",
            location: "Noida, Uttar Pradesh",
            programType: "Online/Distance",
            duration: "2-4 Years",
            fee: "₹2,50,000",
            feeDescription: "First Year Total University Fees",
            logo: "/Container (40).png",
            intake: "July / January",
            recognition: { ugc: "Yes", aicte: "Yes", naac: "A++", nirf: "Top 50" },
            ranking: "35th in India",
            studentRating: 4.8,
            placements: { highest: "58 LPA", average: "8.5 LPA" }
        },
        {
            id: 2,
            name: "Manipal University",
            location: "Manipal, Karnataka",
            programType: "Online/Distance",
            duration: "2-3 Years",
            fee: "₹2,50,000",
            feeDescription: "First Year Total University Fees",
            logo: "/Container (40).png",
            intake: "August / February",
            recognition: { ugc: "Yes", aicte: "Yes", naac: "A+", nirf: "Top 70" },
            ranking: "42nd in India",
            studentRating: 4.6,
            placements: { highest: "45 LPA", average: "7.2 LPA" }
        },
        {
            id: 3,
            name: "Chandigarh University",
            location: "Mohali, Punjab",
            programType: "Online/Distance",
            duration: "3 Years",
            fee: "₹1,80,000",
            feeDescription: "First Year Total University Fees",
            logo: "/Container (40).png",
            intake: "June / December",
            recognition: { ugc: "Yes", aicte: "Yes", naac: "A++", nirf: "Top 30" },
            ranking: "27th in India",
            studentRating: 4.7,
            placements: { highest: "52 LPA", average: "9.1 LPA" }
        },
        {
            id: 4,
            name: "Amrita Vishwavidyapeetham",
            location: "Coimbatore, Tamil Nadu",
            programType: "Online/Distance",
            duration: "2-4 Years",
            fee: "₹1,80,000",
            feeDescription: "First Year Total University Fees",
            logo: "/Container (40).png",
            intake: "July / January",
            recognition: { ugc: "Yes", aicte: "Yes", naac: "A++", nirf: "Top 10" },
            ranking: "7th in India",
            studentRating: 4.9,
            placements: { highest: "56 LPA", average: "10.2 LPA" }
        }
    ];

    const toggleUniversity = (id: number) => {
        if (selectedUniversities.includes(id)) {
            setSelectedUniversities(selectedUniversities.filter(uId => uId !== id));
        } else {
            if (selectedUniversities.length < 3) { // Limit to 3 for comparison layout
                setSelectedUniversities([...selectedUniversities, id]);
            }
        }
    };

    const getSelectedData = () => {
        return universities.filter(u => selectedUniversities.includes(u.id));
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] font-['Nunito']">
            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="mb-4">
                    <Breadcrumbs
                        items={[
                            { label: "Search Universities", href: "/universities" },
                            { label: "Compare Universities", href: "/compareUniversities" }
                        ]}
                    />
                </div>

                {view === 'selection' ? (
                    <>
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-[#111827] mb-2">Compare Universities</h1>
                            <p className="text-gray-500 font-medium">Select and compare the best universities and select the right choice</p>
                        </div>

                        {/* Hero Section */}
                        <section className="relative rounded-[32px] overflow-hidden mb-12 bg-gradient-to-br from-[#803AF2] via-[#B22DE2] to-[#9D14E3] p-8 md:p-12 text-white min-h-[420px]">
                            <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                                <div className="z-10">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 text-sm font-semibold border border-white/20">
                                        <IconStar size={16} fill="white" />
                                        <span>Top Research University</span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                        Find Your Perfect <br />
                                        <span className="text-[#FFD700]">University</span>
                                    </h2>

                                    <p className="text-white/80 text-lg mb-8 max-w-md">
                                        Compare top universities globally and find the one that fits your dreams and career goals perfectly.
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                        <div className="flex items-center gap-3">
                                            <IconCircleCheckFilled className="text-[#FFD700]" size={24} />
                                            <span className="font-bold text-sm">Offline semesters</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <IconCircleCheckFilled className="text-[#FFD700]" size={24} />
                                            <span className="font-bold text-sm">₹ 2-10 Lakh fee</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <IconCircleCheckFilled className="text-[#FFD700]" size={24} />
                                            <span className="font-bold text-sm">National Board</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <IconCircleCheckFilled className="text-[#FFD700]" size={24} />
                                            <span className="font-bold text-sm">WES Approved</span>
                                        </div>
                                    </div>

                                    {/* Stats Card Overlay (Desktop) */}
                                    <div className="hidden lg:flex absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-[#111827] shadow-xl border border-white/30 items-center justify-between gap-8 min-w-[500px]">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Students Study</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-black text-[#803AF2]">50,000+</span>
                                                <IconUsers size={20} className="text-[#803AF2]" />
                                            </div>
                                        </div>
                                        <div className="w-px h-10 bg-gray-200"></div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Placement Rate</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-black text-[#22C55E]">98%</span>
                                                <IconBriefcase size={20} className="text-[#22C55E]" />
                                            </div>
                                        </div>
                                        <div className="w-px h-10 bg-gray-200"></div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Avg. Rating</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-black text-[#EAB308]">4.5+</span>
                                                <IconStar size={20} className="text-[#EAB308]" fill="#EAB308" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative h-full flex items-center justify-center">
                                    {/* User said they will put the image themselves */}
                                    <div className="w-full h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-white/30 rounded-2xl bg-white/5 backdrop-blur-sm">
                                        <span className="text-white/50 font-medium">Hero Image Placeholder</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Compare Universities Selection Section */}
                        <section className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 mb-12 shadow-sm">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="bg-[#803AF2] p-2 rounded-lg text-white">
                                    <IconLayoutGrid size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#111827]">Compare with similar Universities</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                {universities.map((uni) => (
                                    <div
                                        key={uni.id}
                                        className={`flex items-center gap-4 bg-[#F8FAFC] p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${selectedUniversities.includes(uni.id)
                                                ? 'border-[#803AF2] bg-white shadow-md'
                                                : 'border-transparent hover:border-gray-200 hover:shadow-sm'
                                            }`}
                                        onClick={() => toggleUniversity(uni.id)}
                                    >
                                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 p-2">
                                            <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-[#111827] text-lg mb-1">{uni.name}</h4>
                                            <div className="flex flex-col">
                                                <span className="text-[#803AF2] font-black text-xl leading-none">{uni.fee}</span>
                                                <span className="text-gray-400 text-[10px] mt-1 uppercase font-bold tracking-tight">{uni.feeDescription}</span>
                                            </div>
                                        </div>
                                        <div className={`flex-shrink-0 w-32 py-2 rounded-lg text-sm font-bold transition-colors text-center ${selectedUniversities.includes(uni.id)
                                                ? 'bg-red-50 text-red-600 border border-red-100'
                                                : 'bg-white text-gray-700 border border-gray-100'
                                            }`}>
                                            {selectedUniversities.includes(uni.id) ? (
                                                <span className="flex items-center justify-center gap-1">
                                                    <IconMinus size={16} /> Remove
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-1">
                                                    <IconPlus size={16} /> Add to compare
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center flex-col items-center">
                                <button
                                    onClick={() => setView('comparison')}
                                    className={`w-full max-w-2xl py-5 rounded-2xl font-black text-xl text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${selectedUniversities.length >= 2
                                            ? 'bg-gradient-to-r from-[#803AF2] to-[#B22DE2] hover:scale-[1.02] shadow-purple-200 cursor-pointer'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                    disabled={selectedUniversities.length < 2}
                                >
                                    Compare Your Universities
                                    <IconArrowRight size={24} />
                                </button>
                                {selectedUniversities.length < 2 && (
                                    <p className="mt-4 text-gray-400 text-sm font-medium italic">
                                        * Please select at least 2 universities to compare
                                    </p>
                                )}
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => setView('selection')}
                            className="flex items-center gap-2 text-[#803AF2] font-bold mb-6 hover:gap-3 transition-all"
                        >
                            <IconArrowRight size={20} className="rotate-180" /> Back to Selection
                        </button>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-[#803AF2] p-2 rounded-lg text-white">
                                <IconLayoutGrid size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-[#111827]">University Comparison</h1>
                                <p className="text-gray-500 font-medium">Detailed comparison of your selected universities</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden mb-12">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#F8FAFC]">
                                            <th className="p-6 border-b border-gray-100 min-w-[250px]">
                                                <div className="text-[#803AF2] font-black text-xl uppercase tracking-wider">Features</div>
                                            </th>
                                            {getSelectedData().map(uni => (
                                                <th key={uni.id} className="p-6 border-b border-gray-100 min-w-[300px]">
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-4">
                                                            <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <h3 className="font-extrabold text-[#111827] text-lg leading-tight mb-2">{uni.name}</h3>
                                                        <div className="bg-purple-50 text-[#803AF2] text-xs font-bold px-3 py-1 rounded-full border border-purple-100">
                                                            SELECTED
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {/* Basic Info Section */}
                                        <tr className="bg-purple-50/30">
                                            <td colSpan={getSelectedData().length + 1} className="p-4 font-black text-[#803AF2] text-sm uppercase tracking-widest pl-6">Basic Information</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">Location</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-semibold text-[#111827]">{uni.location}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">Program Type</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-semibold text-[#111827]">{uni.programType}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">Duration</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-semibold text-[#111827]">{uni.duration}</td>
                                            ))}
                                        </tr>

                                        {/* Fee Section */}
                                        <tr className="bg-purple-50/30">
                                            <td colSpan={getSelectedData().length + 1} className="p-4 font-black text-[#803AF2] text-sm uppercase tracking-widest pl-6">Finances</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">Annual Fee</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-black text-2xl text-[#803AF2]">{uni.fee}</td>
                                            ))}
                                        </tr>

                                        {/* Recognition Section */}
                                        <tr className="bg-purple-50/30">
                                            <td colSpan={getSelectedData().length + 1} className="p-4 font-black text-[#803AF2] text-sm uppercase tracking-widest pl-6">Recognition & Rankings</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">NAAC Grade</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6">
                                                    <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-lg font-black text-sm border border-green-100">
                                                        {uni.recognition.naac}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">NIRF Ranking</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-semibold text-[#111827]">{uni.recognition.nirf}</td>
                                            ))}
                                        </tr>

                                        {/* Placements Section */}
                                        <tr className="bg-purple-50/30">
                                            <td colSpan={getSelectedData().length + 1} className="p-4 font-black text-[#803AF2] text-sm uppercase tracking-widest pl-6">Placements</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">Avg. Package</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-black text-[#111827]">{uni.placements.average}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-gray-500">Highest Package</td>
                                            {getSelectedData().map(uni => (
                                                <td key={uni.id} className="p-6 font-black text-green-600">{uni.placements.highest}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Personal Guide Banner */}
                            <div className="bg-[#EBF5FF] p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-blue-100">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600 p-3 rounded-full text-white shadow-lg shadow-blue-200">
                                        <IconUsers size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-blue-900 text-lg">Personal Guide Mode</h4>
                                        <p className="text-blue-700/70 font-medium">Get expert advice on which university fits your career trajectory best.</p>
                                    </div>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                                    Talk to Expert Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Section for Mobile (Alternative to absolute card) */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-xl text-[#803AF2]">
                            <IconUsers size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-[#111827]">50,000+</div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Students</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-xl text-green-600">
                            <IconBriefcase size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-[#111827]">98%</div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Placement</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600">
                            <IconStar size={24} fill="#EAB308" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-[#111827]">4.5+</div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Rating</div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}