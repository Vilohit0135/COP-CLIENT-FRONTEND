"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { universities } from '../../components/pages/compareUniversitiesPage/universityData';
import DetailedComparisonTable from '../../components/pages/compareUniversitiesPage/DetailedComparisonTable';
import Footer from '../../components/layout/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';

function DetailedComparisonContent() {
    const searchParams = useSearchParams();
    const idsString = searchParams.get('ids');
    const selectedIds = idsString ? idsString.split(',').map(Number) : [];

    const selectedData = universities.filter(u => selectedIds.includes(u.id));

    if (selectedData.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFF] p-4 text-center">
                <h1 className="text-2xl font-black text-[#111827] mb-4">No Universities Selected</h1>
                <p className="text-gray-500 mb-8">Please go back and select universities to compare.</p>
                <a href="/compareUniversities" className="bg-[#803AF2] text-white px-8 py-3 rounded-xl font-bold">
                    Back to Selection
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFF] font-['Nunito']">
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <div className="mb-8 ml-4">
                    <Breadcrumbs
                        items={[
                            { label: "Search Universities", href: "/universities" },
                            { label: "Compare Universities", href: "/compareUniversities" },
                            { label: "Detailed Comparison", href: "#" }
                        ]}
                    />
                </div>
                
                <DetailedComparisonTable universities={selectedData} />
            </main>
            <Footer />
        </div>
    );
}

export default function DetailedComparisonPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading comparison...</div>}>
            <DetailedComparisonContent />
        </Suspense>
    );
}
