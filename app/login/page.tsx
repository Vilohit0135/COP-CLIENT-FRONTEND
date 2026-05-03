import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LoginBanner from '../components/pages/login/LoginBanner';
import LoginForm from '../components/pages/login/LoginForm';

function LoginPage() {
    return (
        <main className="flex min-h-screen relative">
            <Link
                href="/"
                className="hidden lg:flex absolute top-8 left-8 z-50 items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all group"
            >
                <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm lg:text-base">Back to Home</span>
            </Link>
            <LoginBanner />
            <React.Suspense fallback={<div className="w-full lg:w-1/2 flex justify-center items-center bg-white min-h-screen">Loading...</div>}>
                <LoginForm />
            </React.Suspense>
        </main>
    );
}

export default LoginPage;