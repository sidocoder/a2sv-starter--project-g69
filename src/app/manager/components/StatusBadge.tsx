"use client";

import React from "react";

type StatusType = "Pending" | "Approved" | "Rejected";

interface StatusBadgeProps {
  status: StatusType;
}

const statusColors: Record<StatusType, string> = {
  Pending: "bg-yellow-200 text-yellow-800",
  Approved: "bg-green-200 text-green-800",
  Rejected: "bg-red-200 text-red-800",
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
