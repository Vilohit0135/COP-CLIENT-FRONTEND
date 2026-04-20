import React from 'react';
import { IconUsers, IconBriefcase, IconStar } from '@tabler/icons-react';

const StatsSection = () => {
    return (
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
    );
};

export default StatsSection;
