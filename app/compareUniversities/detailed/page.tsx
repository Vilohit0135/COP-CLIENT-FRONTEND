"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { University } from '../../components/pages/compareUniversitiesPage/universityData';
import DetailedComparisonTable from '../../components/pages/compareUniversitiesPage/DetailedComparisonTable';
import Footer from '../../components/layout/Footer';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import ProtectedRoute from '@/app/components/ProtectedRoute';

function DetailedComparisonContent() {
    const searchParams = useSearchParams();
    const idsString = searchParams.get('ids');
    const [universityList, setUniversityList] = useState<University[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    const selectedIds = idsString ? idsString.split(',') : [];
    const selectedData = universityList.filter(u => selectedIds.includes(u.id));

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFF]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#803AF2] mb-4"></div>
                <p className="text-gray-500 font-medium">Loading comparison data...</p>
            </div>
        );
    }

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
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
                <div className="mb-2 ml-4">
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
        <ProtectedRoute>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading comparison...</div>}>
                <DetailedComparisonContent />
            </Suspense>
        </ProtectedRoute>
    );
}
