import React from 'react';
import { IconArrowLeft, IconStar, IconMapPin, IconCertificate, IconClock, IconCurrencyRupee, IconLayoutGrid, IconUsers, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { University } from './universityData';

interface ComparisonTableProps {
    selectedData: University[];
    onBack: () => void;
}

const ComparisonTable = ({ selectedData, onBack }: ComparisonTableProps) => {
    const router = useRouter();

    const handleDetailedComparison = () => {
        const ids = selectedData.map(u => u.id).join(',');
        router.push(`/compareUniversities/detailed?ids=${ids}`);
    };

    const features = [
        { label: "University Courses", key: "name" },
        { label: "Rating", key: "studentRating", isRating: true },
        { label: "Location", key: "location", icon: <IconMapPin size={16} /> },
        { label: "Accreditation", key: "accreditation", icon: <IconCertificate size={16} /> },
        { label: "Duration", key: "duration", icon: <IconClock size={16} /> },
        { label: "Total Fees", key: "fee", icon: <IconCurrencyRupee size={16} /> },
        { label: "Learning Mode", key: "learningMode" },
        { label: "Specializations", key: "specializations", icon: <IconLayoutGrid size={16} /> },
        { label: "Total Students", key: "totalStudents", icon: <IconUsers size={16} /> },
        { label: "Placement Rate", key: "placementRate" },
        { label: "Key Highlights", key: "keyHighlights", isList: true },
        { label: "Actions", key: "actions", isActions: true }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#803AF2] font-bold mb-6 hover:gap-3 transition-all"
            >
                <IconArrowLeft size={20} /> Back to Selection
            </button>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden mb-12">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-6 bg-[#C4B5FD] text-[#4C1D95] font-black text-sm uppercase tracking-wider w-[240px]">
                                    Features
                                </th>
                                {selectedData.map((uni, idx) => (
                                    <th key={uni.id} className="p-6 bg-white min-w-[300px] border-b border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-extrabold text-[#803AF2] text-xl leading-tight">{uni.name}</h3>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {features.map((feature) => (
                                <tr key={feature.label}>
                                    <td className="p-6 font-bold text-gray-700 bg-[#FDFDFF] divide-y divide-gray-100 border-r border-gray-50">
                                        {feature.label}
                                    </td>
                                    {selectedData.map((uni) => (
                                        <td key={uni.id} className="p-6 text-gray-600 font-medium">
                                            {feature.isRating ? (
                                                <div className="flex items-center gap-1">
                                                    <IconStar size={16} className="fill-yellow-400 text-yellow-400" />
                                                    <span className="font-bold text-[#111827]">{uni.studentRating}</span>
                                                </div>
                                            ) : feature.isList ? (
                                                <ul className="space-y-2">
                                                    {uni.keyHighlights.map((hl, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm">
                                                            <IconCheck size={14} className="text-green-500 mt-1 flex-shrink-0" />
                                                            <span>{hl}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : feature.isActions ? (
                                                <button className="w-full py-2 border-2 border-[#803AF2] text-[#803AF2] rounded-xl font-bold hover:bg-purple-50 transition-colors">
                                                    View Details
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    {feature.icon && <span className="text-gray-400">{feature.icon}</span>}
                                                    <span className={feature.label === 'Total Fees' ? 'font-black text-[#111827]' : ''}>
                                                        {feature.label === 'Placement Rate' ? uni.placements.rate : (uni as any)[feature.key!]}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-end mb-12">
                <button
                    onClick={handleDetailedComparison}
                    className="bg-[#803AF2] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95"
                >
                    View Detailed Comparison
                </button>
            </div>
        </div>
    );
};

export default ComparisonTable;
