import React from 'react';
import { CheckCircle2, GraduationCap, Award, Users, TrendingUp } from 'lucide-react';

const LoginBanner = () => {
    const features = [
        "Access to 500+ top universities",
        "Personalized course recommendations",
        "Expert counseling & career guidance",
        "Compare programs & universities",
        "Scholarship & financial aid info",
        "24/7 support & assistance"
    ];

    const stats = [
        { label: "Universities", value: "500+", icon: GraduationCap },
        { label: "Programs", value: "1000+", icon: Award },
        { label: "Students", value: "100K+", icon: Users },
        { label: "Success Rate", value: "95%", icon: TrendingUp }
    ];

    return (
        <div className="relative hidden lg:flex flex-col w-1/2 min-h-screen bg-[#9810FA] text-white p-24 overflow-hidden">
            {/* Background Image / Gradient Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1523050335102-c325091423ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-[#9810FA]/80 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                        Transform Your Future <br />
                        with Quality Education
                    </h1>
                    <p className="text-lg text-white/80 max-w-md">
                        Join thousands of students who have found their dream college programs through our platform
                    </p>
                </div>

                <ul className="space-y-4 mb-12">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400 fill-green-400/20" />
                            <span className="text-white/90">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="grid grid-cols-2 gap-4 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col gap-2">
                            <stat.icon className="w-6 h-6 text-white/70" />
                            <div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-auto bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 relative">
                    <p className="text-white/90 italic mb-6">
                        "This platform helped me find the perfect MBA program that aligned with my career goals. The expert guidance was invaluable!"
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                            RK
                        </div>
                        <div>
                            <div className="font-bold text-white">Rajesh Kumar</div>
                            <div className="text-sm text-white/70">MBA Graduate, 2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBanner;
