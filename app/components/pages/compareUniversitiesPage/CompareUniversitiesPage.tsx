"use client";

import React, { useState } from 'react';
import { Breadcrumbs } from '../../Breadcrumbs';
import HeroSection from './HeroSection';
import UniversitySelection from './UniversitySelection';
import ComparisonTable from './ComparisonTable';
import StatsSection from './StatsSection';
import Footer from '../../layout/Footer';

import { universities, University } from './universityData';

export default function CompareUniversitiesPage() {
    const [selectedUniversities, setSelectedUniversities] = useState<number[]>([]);
    const [view, setView] = useState<'selection' | 'comparison'>('selection');

    const toggleUniversity = (id: number) => {
        if (selectedUniversities.includes(id)) {
            setSelectedUniversities(selectedUniversities.filter(uId => uId !== id));
        } else {
            if (selectedUniversities.length < 3) {
                setSelectedUniversities([...selectedUniversities, id]);
            }
        }
    };

    const selectedData = universities.filter(u => selectedUniversities.includes(u.id));

    return (
        <div className="min-h-screen bg-[#FDFDFF] font-['Nunito']">
            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="mb-4">
                    <Breadcrumbs
                        items={[
                            { label: "Search Universities", href: "/universities" },
                            { label: "Compare Universities", href: "/compareUniversities" }
                        ]}
                    />
                </div>

                {view === 'selection' ? (
                    <>
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-[#111827] mb-2">Compare Universities</h1>
                            <p className="text-gray-500 font-medium">Select and compare the best universities and select the right choice</p>
                        </div>

                        <HeroSection />

                        <UniversitySelection
                            universities={universities}
                            selectedUniversities={selectedUniversities}
                            onToggle={toggleUniversity}
                            onCompare={() => setView('comparison')}
                        />
                    </>
                ) : (
                    <ComparisonTable
                        selectedData={selectedData}
                        onBack={() => setView('selection')}
                    />
                )}

                <StatsSection />
            </main>

            <Footer />
        </div>
    );
}
