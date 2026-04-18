'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Phone, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="w-full lg:w-1/2 flex justify-center p-6 bg-white min-h-screen">
            <div className="w-full max-w-md mt-10">
                {/* Logo and Brand */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#9810FA] rounded-xl flex items-center justify-center text-white">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-[#9810FA]">
                        CollegeProgram
                    </span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Start Your Journey</h2>
                    <p className="text-gray-500 text-sm">Create an account to explore 1000+ college programs</p>
                </div>

                <form className="space-y-5">
                    {/* Full Name Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#9810FA] transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#9810FA] transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#9810FA] transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#9810FA] transition-all text-gray-800 placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#9810FA] transition-all text-gray-800 placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Terms and Policy */}
                    <div className="text-center text-sm text-gray-500">
                        I agree to the <Link href="#" className="text-[#9810FA] font-semibold hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#9810FA] font-semibold hover:underline">Privacy Policy</Link>
                    </div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-[#9810FA] text-white font-bold rounded-xl shadow-lg shadow-[#9810FA]/30 hover:shadow-[#9810FA]/40 transform hover:-translate-y-0.5 transition-all"
                    >
                        Create Account
                    </button>

                    {/* Divider */}
                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign up with Google
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-8 text-center text-gray-600 font-medium">
                    Already have an account? <Link href="/login" className="text-[#9810FA] font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
