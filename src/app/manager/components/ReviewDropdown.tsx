"use client";

import React, { useState } from "react";

type ReviewOption = "Excellent" | "Good" | "Average" | "Poor";

interface ReviewDropdownProps {
  options?: ReviewOption[];
  onSelect?: (value: ReviewOption) => void;
}

const defaultOptions: ReviewOption[] = ["Excellent", "Good", "Average", "Poor"];

export default function ReviewDropdown({
  options = defaultOptions,
  onSelect,
}: ReviewDropdownProps) {
  const [selected, setSelected] = useState<ReviewOption>(options[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as ReviewOption;
    setSelected(val);
    if (onSelect) onSelect(val);
  };

  return (
    <div className="inline-block relative w-48">
      <select
        value={selected}
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548l4.484 4.482 4.484-4.482L15 9.066 10 14 5 9.066z" />
        </svg>
      </div>
    </div>
  );
}
