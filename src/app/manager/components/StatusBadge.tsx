"use client";

import React from "react";

type StatusType = "UnderReview" | "InterviewStage" | "Accepted";

interface StatusBadgeProps {
  status: StatusType;
}

const statusColors: Record<StatusType, string> = {
 UnderReview: "bg-yellow-200 text-yellow-800",
InterviewStage: "bg-green-200 text-green-800",
 Accepted: "bg-red-200 text-red-800",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
