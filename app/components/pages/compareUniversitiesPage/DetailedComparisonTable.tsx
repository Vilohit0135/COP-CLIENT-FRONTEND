import React from 'react';
import { IconArrowLeft, IconStar, IconCertificate, IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { University } from './universityData';

interface DetailedComparisonTableProps {
    universities: University[];
}

interface ComparisonRow {
    label: string;
    key: string;
    isTitle?: boolean;
    isPurpleText?: boolean;
    isBold?: boolean;
    isRating?: boolean;
    isBadges?: boolean;
    isPurpleBg?: boolean;
}

interface ComparisonSection {
    title: string;
    rows: ComparisonRow[];
}

const DetailedComparisonTable = ({ universities }: DetailedComparisonTableProps) => {
    const router = useRouter();

    const sections: ComparisonSection[] = [
        {
            title: "BASIC INFORMATION",
            rows: [
                { label: "University Name", key: "name", isTitle: true },
                { label: "Location", key: "location" },
                { label: "Program Type", key: "programType" },
            ]
        },
        {
            title: "FEES & COSTS",
            rows: [
                { label: "Total Fees", key: "fee", isPurpleText: true, isBold: true },
                { label: "EMI Option", key: "emiOption" },
            ]
        },
        {
            title: "PROGRAM DETAILS",
            rows: [
                { label: "Duration", key: "duration" },
                { label: "Intake Period", key: "intakePeriod" },
                { label: "Time Commitment", key: "timeCommitment" },
                { label: "Total Seats", key: "totalSeats" },
            ]
        },
        {
            title: "RANKINGS & RECOGNITION",
            rows: [
                { label: "Overall Rating", key: "studentRating", isRating: true },
                { label: "National Ranking", key: "nationalRanking" },
                { label: "Accreditation", key: "accreditation", isBadges: true },
            ]
        },
        {
            title: "PLACEMENTS",
            rows: [
                { label: "Placement Rate", key: "placements.rate" },
                { label: "Average Salary", key: "placements.average", isPurpleBg: true },
            ]
        },
        {
            title: "ELIGIBILITY",
            rows: [
                { label: "Minimum Requirements", key: "minRequirements" },
            ]
        }
    ];

    const getValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    return (
        <div className="animate-in fade-in duration-700 mx-auto px-4 lg:pt-10 pb-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[#803AF2] font-bold mb-8 hover:gap-3 transition-all cursor-pointer"
            >
                <IconArrowLeft size={20} /> Back to Comparison
            </button>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-[#803AF2] p-2.5 rounded-xl text-white shadow-lg shadow-purple-100">
                        <IconCertificate size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#111827]">University Comparison</h1>
                        <p className="text-gray-500 font-medium">Compare universities side-by-side • Research Freely Mode ON 🌟</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem('selectedToCompare');
                        router.push('/compareUniversities');
                    }}
                    className="text-gray-400 hover:text-gray-600 font-bold transition-colors cursor-pointer"
                >
                    Clear All
                </button>
            </div>

            <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow overflow-hidden mb-12">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-8 w-[280px]">
                                    <div className="bg-[#C4B5FD] p-6 rounded-2xl h-full flex items-center justify-center text-[#4C1D95] font-black text-lg">
                                        CRITERIA
                                    </div>
                                </th>
                                {universities.map((uni) => (
                                    <th key={uni.id} className="p-8 min-w-[350px]">
                                        <div className="bg-white border-2 border-gray-50 rounded-2xl p-6 relative group hover:border-purple-100 transition-all duration-300">
                                            <button
                                                onClick={() => {
                                                    const remainingIds = universities
                                                        .filter(u => u.id !== uni.id)
                                                        .map(u => u.id);
                                                    const newIdsString = remainingIds.join(',');
                                                    localStorage.setItem('selectedToCompare', JSON.stringify(remainingIds));

                                                    if (newIdsString) {
                                                        router.push(`/compareUniversities/detailed?ids=${newIdsString}`);
                                                    } else {
                                                        router.push('/compareUniversities');
                                                    }
                                                }}
                                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <h3 className="font-black text-[#111827] text-xl mb-1">{uni.name}</h3>
                                            <p className="text-gray-400 text-sm font-medium">{uni.location}</p>
                                            {uni.bestROI && (
                                                <div className="mt-4 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-black border border-green-100">
                                                    <div className="w-1 h-1 rounded-full bg-green-500" />
                                                    Best Value
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((section) => (
                                <React.Fragment key={section.title}>
                                    <tr className="bg-[#F8FAFC]">
                                        <td colSpan={universities.length + 1} className="px-8 py-4 text-[#803AF2] font-black text-xs tracking-widest">
                                            {section.title}
                                        </td>
                                    </tr>
                                    {section.rows.map((row) => (
                                        <tr key={row.label} className="border-b border-gray-50">
                                            <td className="px-8 py-6 font-bold text-gray-600">
                                                {row.label}
                                            </td>
                                            {universities.map((uni) => {
                                                const value = getValue(uni, row.key);
                                                return (
                                                    <td key={uni.id} className={`px-8 py-6 ${row.isPurpleBg ? 'bg-[#E9D5FF]/30' : ''}`}>
                                                        {row.isRating ? (
                                                            <div className="flex items-center gap-1">
                                                                <div className="flex gap-0.5">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <IconStar
                                                                            key={i}
                                                                            size={14}
                                                                            className={`${i < Math.floor(value) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-gray-200 fill-gray-200'}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-400 ml-1">{value}/5</span>
                                                            </div>
                                                        ) : row.isBadges ? (
                                                            <div className="flex flex-wrap gap-2">
                                                                {typeof value === 'string' && value.split(',').map((badge: string, i: number) => (
                                                                    <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-black border border-blue-100">
                                                                        {badge.trim()}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <span className={`
                                                                text-sm font-semibold
                                                                ${row.isTitle ? 'text-[#803AF2] font-black' : 'text-gray-700'}
                                                                ${row.isPurpleText ? 'text-[#803AF2] font-black text-lg' : ''}
                                                            `}>
                                                                {value}
                                                            </span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-[#EFF6FF] border-t border-blue-100">
                    <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm self-start inline-flex p-4 rounded-2xl border border-blue-100">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <IconInfoCircle size={20} />
                        </div>
                        <div>
                            <p className="text-blue-900 font-black text-sm">✨ Research Freely Mode</p>
                            <p className="text-blue-700/70 text-xs font-medium">All comparison data is available without login or contact information. Add or remove universities anytime to refine your research.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedComparisonTable;
