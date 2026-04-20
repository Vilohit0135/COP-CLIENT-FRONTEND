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
                className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all group"
            >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back to Home
            </Link>
            <LoginBanner />
            <LoginForm />
        </main>
    );
}

export default LoginPage;