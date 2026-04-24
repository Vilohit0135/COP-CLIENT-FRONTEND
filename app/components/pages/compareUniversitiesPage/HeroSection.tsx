import React from 'react';
import { IconSchool, IconBook2, IconTrendingUp, IconCertificate, IconMedal, IconStarFilled } from '@tabler/icons-react';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="relative w-[100vw] left-[calc(-50vw+50%)] overflow-hidden mb-12 bg-gradient-to-b from-[#7C3AED] via-[#A855F7] to-[#D946EF] pt-12 pb-32 text-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="pt-8">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 text-sm font-semibold border border-white/30">
                            <IconMedal size={16} />
                            <span>Top Ranked Universities</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                            Find Your Perfect <br />
                            <span className="text-[#FFD700]">University</span>
                        </h2>

                        <p className="text-white/90 text-lg md:text-xl mb-12 max-w-lg font-medium leading-relaxed">
                            Compare top universities side-by-side and make an informed decision about your future education journey.
                        </p>

                        <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10 flex-shrink-0">
                                    <IconSchool size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-none mb-1">50+ Universities</h4>
                                    <p className="text-white/70 text-sm font-medium">Accredited programs</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10 flex-shrink-0">
                                    <IconBook2 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-none mb-1">100% Online</h4>
                                    <p className="text-white/70 text-sm font-medium">Flexible learning</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10 flex-shrink-0">
                                    <IconTrendingUp size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-none mb-1">Career Growth</h4>
                                    <p className="text-white/70 text-sm font-medium">Placement support</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10 flex-shrink-0">
                                    <IconCertificate size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-none mb-1">UGC Approved</h4>
                                    <p className="text-white/70 text-sm font-medium">Valid degrees</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-full flex items-center justify-center mt-10 lg:mt-0">
                        <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/10">
                            <Image
                                src="/images/hero_guy_laptop.png"
                                alt="Student comparing universities"
                                fill
                                className="object-cover"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-xl p-6">
                                <div className="flex items-center justify-between divide-x divide-gray-100">
                                    <div className="flex-1 pr-4">
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Students Enrolled</p>
                                        <p className="text-[#8B5CF6] text-2xl font-black">50,000+</p>
                                    </div>
                                    <div className="flex-1 px-4 text-center">
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Success Rate</p>
                                        <p className="text-green-500 text-2xl font-black">95%</p>
                                    </div>
                                    <div className="flex-1 pl-4 text-right">
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Avg. Rating</p>
                                        <p className="text-[#EAB308] text-2xl font-black flex items-center justify-end gap-1">
                                            4.5
                                            <IconStarFilled size={20} className="text-[#EAB308]" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Slanted Curve */}

        </section>
    );
};

export default HeroSection;
