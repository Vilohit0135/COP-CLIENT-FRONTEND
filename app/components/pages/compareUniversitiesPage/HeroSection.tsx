import React from 'react';
import { IconStar, IconCircleCheckFilled } from '@tabler/icons-react';

const HeroSection = () => {
    return (
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
                        {[
                            "Offline semesters",
                            "₹ 2-10 Lakh fee",
                            "National Board",
                            "WES Approved"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <IconCircleCheckFilled className="text-[#FFD700]" size={24} />
                                <span className="font-bold text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-full flex items-center justify-center">
                    <div className="w-full h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-white/30 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <span className="text-white/50 font-medium">Hero Image Placeholder</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
