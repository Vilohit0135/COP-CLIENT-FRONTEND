import React from "react";
import { Breadcrumbs, Breadcrumb } from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
  return (
    <div className="max-w-[90vw] mx-auto px-5 pt-12">
      <h1 className="text-3xl font-black text-gray-900 text-center uppercase tracking-[0.1em] mb-12">
        {title}
      </h1>
      <Breadcrumbs items={breadcrumbs} className="mb-8" />
    </div>
  );
};
