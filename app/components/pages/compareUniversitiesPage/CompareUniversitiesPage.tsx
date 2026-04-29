"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '../../Breadcrumbs';
import HeroSection from './HeroSection';
import UniversitySelection from './UniversitySelection';
import ComparisonTable from './ComparisonTable';
import StatsSection from './StatsSection';
import Footer from '../../layout/Footer';

import { University } from './universityData';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CompareUniversitiesPage() {
    const searchParams = useSearchParams();
    const tableRef = useRef<HTMLDivElement>(null);
    const [universityList, setUniversityList] = useState<University[]>([]);
    const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
    const [isTableOpen, setIsTableOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const ids = searchParams.get('ids');
        if (ids) {
            const idList = ids.split(',').filter(id => id.trim() !== '');
            if (idList.length > 0) {
                setSelectedUniversities(idList);
                localStorage.setItem('selectedToCompare', JSON.stringify(idList));
                setIsTableOpen(true);

                // Scroll to comparison table
                setTimeout(() => {
                    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
            }
        } else {
            const saved = localStorage.getItem('selectedToCompare');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setSelectedUniversities(parsed);
                        // Optional: automatically open table if returning with saved selection
                        // setIsTableOpen(true);
                    }
                } catch (e) {
                    console.error("Failed to parse selectedToCompare from localStorage", e);
                }
            }
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/public/providers`);
                const data = await response.json();

                const mappedData: University[] = data.map((provider: any) => {
                    const comp = provider.comparison || {};
                    return {
                        id: provider._id,
                        name: provider.name,
                        location: comp.location || "N/A",
                        programType: "Online Degree",
                        duration: comp.duration || "N/A",
                        fee: comp.feesStartingFrom ? `₹${comp.feesStartingFrom.toLocaleString()}` : "N/A",
                        feeDescription: "Starting Fees",
                        logo: provider.logo || "/placeholder-logo.png",
                        intakePeriod: comp.intakePeriod || "N/A",
                        timeCommitment: comp.timeCommitment || "N/A",
                        totalSeats: comp.totalSeatsAvailable ? comp.totalSeatsAvailable.toString() : "N/A",
                        studentRating: comp.overallRating || provider.averageRating || 0,
                        nationalRanking: "N/A",
                        accreditation: comp.accreditation || "N/A",
                        placements: {
                            rate: comp.placementRate ? `${comp.placementRate}%` : "N/A",
                            average: comp.averageSalary ? `${comp.averageSalary} LPA` : "N/A",
                        },
                        minRequirements: comp.minimumRequirements || comp.eligibility || "N/A",
                        learningMode: "Online",
                        specializations: "Multiple",
                        totalStudents: "10,000+",
                        keyHighlights: provider.shortExcerpt ? [provider.shortExcerpt] : ["Expert Faculty", "Global Recognition"],
                        emiOption: comp.emiOption || "Available",
                        bestROI: provider.bestROI || false
                    };
                });
                setUniversityList(mappedData);
            } catch (error) {
                console.error("Failed to fetch universities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    const toggleUniversity = (id: string) => {
        let newList: string[];
        if (selectedUniversities.includes(id)) {
            newList = selectedUniversities.filter(uId => uId !== id);
        } else {
            if (selectedUniversities.length < 4) {
                newList = [...selectedUniversities, id];
            } else {
                return;
            }
        }
        setSelectedUniversities(newList);
        localStorage.setItem('selectedToCompare', JSON.stringify(newList));
    };

    const selectedData = universityList.filter(u => selectedUniversities.includes(u.id));

    return (
        <div className="min-h-screen bg-[#FDFDFF] font-['Nunito'] overflow-hidden lg:pt-7">
            <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* back to universities */}
                <div className="mb-4 sm:mb-6 mt-4 md:mt-0">
                    <Link
                        href="/universities"
                        className="text-[#9810FA] hover:underline flex items-center gap-1 font-bold text-lg sm:text-xl"
                    >
                        <ArrowLeft size={18} strokeWidth={2.5} />
                        Back to Universities
                    </Link>
                </div>

                {/* Page Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-1 sm:mb-2">Compare Universities</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">Select and compare the best universities and select the right choice</p>
                </div>

                <HeroSection />

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#803AF2]"></div>
                    </div>
                ) : (
                    <UniversitySelection
                        universities={universityList}
                        selectedUniversities={selectedUniversities}
                        onToggle={toggleUniversity}
                        onCompare={() => {
                            const nextState = !isTableOpen;
                            setIsTableOpen(nextState);
                            if (nextState) {
                                setTimeout(() => {
                                    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }, 100);
                            }
                        }}
                        isTableOpen={isTableOpen}
                    />
                )}

                <div ref={tableRef}>
                    {isTableOpen && selectedUniversities.length > 0 && (
                        <ComparisonTable
                            selectedData={selectedData}
                            onRemove={(id) => toggleUniversity(id)}
                        />
                    )}
                </div>

                <StatsSection />
            </div>
        </div>
    );
}
