'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full lg:w-1/2 flex justify-center p-6 bg-white min-h-screen mt-20">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                        CollegeProgram
                    </span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome Back</h2>
                    <p className="text-gray-500">Sign in to continue your learning journey</p>
                </div>

                <form className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-purple-600" />
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-purple-600" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full pl-12 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-800 placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">Forgot password?</a>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-[#9810FA] text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="relative py-2">
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
                        className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign in with Google
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account? <a href="#" className="font-bold text-purple-600 hover:text-purple-700">Sign up</a>
                </p>

                <div className="mt-8 text-center text-xs text-gray-400">
                    By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
