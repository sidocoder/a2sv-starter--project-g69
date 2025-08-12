import Link from "next/link";
import React from "react";

interface ApplicationCardProps {
  name: string;
  status: string;
  date: string;
  id: number;
}

export default function ApplicationCard({
  name,
  status,
  date,
  id,
}: ApplicationCardProps) {
  const text =
    status === "New"
      ? "Start Review"
      : status === "pending_review"
      ? "Continue Review"
      : "View Detail";
  var button_color =
    text === "View Detail"
      ? "bg-[#FFFFFF] text-[#374151] "
      : "bg-[#4F46E5] text-white";

  return (
    <Link href={`reviewer/description/${id}`} className="w-[32%] max-w-sm mb-7 rounded-lg bg-[#F9FAFB] shadow">
      <div className="bg-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <img
            src="/images/first.png"
            alt="Applicant"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="text-lg font-bold">{name}</div>
            <div className="text-sm text-gray-500">Submitted: {date}</div>
          </div>
        </div>
      
        <div
          className={`mt-3 w-fit px-3 py-1 rounded-2xl text-sm font-medium 
            ${
              status === "New"
                ? "bg-[#DBEAFE] text-[#166534]"
                : status === "Complete"
                ? "bg-[#DBEAFE] text-[#166534]"
                : status === "pending_review" ? "bg-[#FEF9C3] text-[#854D0E]" : ""
            }
            
            `}
        >
          {status.replace("_", " ")}
        </div>
      </div>

      <div className="p-4 bg-[#F3F4F6] flex justify-center rounded-b-lg">
        <button
          className={` bg-[#4F46E5] text-sm px-5 py-2 rounded-lg hover:bg-[#4338CA] transition ${button_color}`}
        >
          {text}
        </button>
      </div>
    </Link>
  );
}
