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
  className = "",
}: SummaryCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-6 flex items-center space-x-4 border border-gray-200 ${className}`}
      style={{
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
