import React from 'react';
import { IconLayoutGrid, IconMinus, IconPlus, IconArrowRight } from '@tabler/icons-react';
import { IconMenu2 } from '@tabler/icons-react';
interface University {
    id: string;
    name: string;
    fee: string;
    feeDescription: string;
    logo: string;
}

interface UniversitySelectionProps {
    universities: University[];
    selectedUniversities: string[];
    onToggle: (id: string) => void;
    onCompare: () => void;
    isTableOpen?: boolean;
}

const UniversitySelection = ({ universities, selectedUniversities, onToggle, onCompare, isTableOpen }: UniversitySelectionProps) => {
    return (
        <section className="bg-white border border-gray-100 rounded-2xl p-8 mb-12 shadow-sm max-w-[1240px] mx-auto">
            <div className="flex items-center gap-3 pb-4 mb-10 border-b-[1px] border-[#E5E7EB]">
                <div className="bg-[#EEF2FF] p-2 rounded-xl text-white">
                    <IconMenu2 stroke={2} color='#7C3AED' />
                </div>
                <h3 className="text-xl font-bold text-[#111827]">Compare with similar Universities</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
                {universities.map((uni) => (
                    <div
                        key={uni.id}
                        className={`flex items-center gap-4 bg-[#F8FAFC] p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${selectedUniversities.includes(uni.id)
                            ? 'border-[#803AF2] bg-white shadow-md'
                            : 'border-transparent hover:border-gray-200 hover:shadow-sm'
                            }`}
                        onClick={() => onToggle(uni.id)}
                    >
                        <div className="w-16 h-16 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                            <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-bold text-[#111827] text-lg mb-1">{uni.name}</h4>
                            <div className="flex flex-col">
                                <span className="text-[#803AF2] font-black text-xl leading-none">{uni.fee}</span>
                                <span className="text-gray-400 text-[10px] mt-1 uppercase font-bold tracking-tight">{uni.feeDescription}</span>
                            </div>
                        </div>
                        <div className={`flex-shrink-0 w-24 py-2 rounded-xl text-sm font-bold transition-colors text-center ${selectedUniversities.includes(uni.id)
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : 'bg-[#FFFFFF] text-gray-700 border border-[#E2E8F0] hover:bg-[#803AF2] hover:text-white'
                            }`}>
                            {selectedUniversities.includes(uni.id) ? (
                                <span className="flex items-center justify-center gap-1">
                                    <IconMinus size={16} /> Remove
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-1">
                                    Compare
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center flex-col items-center">
                <button
                    onClick={onCompare}
                    className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${selectedUniversities.length >= 2
                        ? 'bg-[#803AF2] hover:bg-[#6D28D9] hover:scale-[1.01] cursor-pointer'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    disabled={selectedUniversities.length < 2}
                >
                    <IconArrowRight size={20} className={isTableOpen ? 'rotate-90 transition-transform' : 'transition-transform'} />
                    {isTableOpen ? 'Close Full Comparison Table' : 'Open Full Comparison Table'}
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
