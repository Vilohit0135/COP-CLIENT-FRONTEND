import React from "react";
import { Breadcrumbs, Breadcrumb } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
  return (
    <div className="max-w-[95vw] md:max-w-[90vw] mx-auto px-5 pt-8 md:pt-12">
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 text-center uppercase tracking-[0.1em] mb-8 md:mb-12">
        {title}
      </h1>
      <Breadcrumbs items={breadcrumbs} className="mb-6 md:mb-8" />
    </div>
  );
};
