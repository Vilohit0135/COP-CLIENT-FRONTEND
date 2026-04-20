import React from 'react';
import { IconLayoutGrid, IconMinus, IconPlus, IconArrowRight } from '@tabler/icons-react';

interface University {
    id: number;
    name: string;
    fee: string;
    feeDescription: string;
    logo: string;
}

interface UniversitySelectionProps {
    universities: University[];
    selectedUniversities: number[];
    onToggle: (id: number) => void;
    onCompare: () => void;
}

const UniversitySelection = ({ universities, selectedUniversities, onToggle, onCompare }: UniversitySelectionProps) => {
    return (
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
                        onClick={() => onToggle(uni.id)}
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
                    onClick={onCompare}
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
    );
};

export default UniversitySelection;
