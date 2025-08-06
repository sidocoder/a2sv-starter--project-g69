"use client";

import React from "react";
import SummaryCard from "./SummaryCard";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
      <SummaryCard title="Total Applications" value={124} />
      <SummaryCard title="Under Review" value={98} />
      <SummaryCard title="Interview Stage" value={26} />
      <SummaryCard title="Accepted" value={26} />

    </div>
  );
}
