"use client";

import React from "react";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  className = "",
}: SummaryCardProps) {
  return (
    <div
      className={`bg-white shadow rounded p-6 flex items-center space-x-4 ${className}`}
    >
      {icon && <div className="text-3xl text-blue-600">{icon}</div>}
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
