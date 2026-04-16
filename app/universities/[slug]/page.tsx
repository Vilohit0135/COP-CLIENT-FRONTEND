import React from "react";
import UniversityDetailPage from "@/app/components/pages/universityPage/UniversityDetailPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  return <UniversityDetailPage id={slug} />;
}