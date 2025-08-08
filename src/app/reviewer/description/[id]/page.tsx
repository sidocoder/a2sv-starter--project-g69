"use client";

import React from "react";
import data from "../../data/Data" 
import { fetch_review } from "../../lib/temp";
import { useParams } from "next/navigation";


const data2 = await fetch_review();
const Description = () => {
  if (data2.length === 0){
    console.log("empty");
  }else{
  console.log(data2);
  }
  // Convert params.id to a number to match data IDs
  const val =useParams();
  var job = data.find((item) => item.id === Number(val.id));

  if (!job) {
    return (
      <div className="p-10 text-center text-red-500">
        No applicant found with ID: {Number(val.id)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Header */}
      <div className="w-full h-16 bg-white px-32 flex items-center justify-between border-b">
        <button className="text-sm text-gray-500 hover:underline">
          &lt; Back to Dashboard
        </button>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-800">Jane Reviewer</span>
          <button className="text-sm text-gray-500 hover:underline">
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[52px] bg-[#1F2937] flex items-center justify-center text-sm text-gray-300">
        © 2023 A2SV. All rights reserved.
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-8 py-10">
        <div className="mb-8">
          <button className="text-sm text-gray-500 mb-2 hover:underline">
            &lt; Back to Dashboard
          </button>
          <h1 className="text-3xl font-semibold">Review: {job.name}</h1>
        </div>

        <div className="flex gap-8">
          {/* Left Side - Applicant Info */}
          <div className="w-2/3 bg-white shadow-md rounded-md p-6">
            <h2 className="text-lg font-semibold mb-4">Applicant Profile</h2>
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {job.name}
              </p>
              <p>
                <strong>Application Date:</strong> {job.Date}
              </p>
              <p>
                <strong>Status:</strong> {job.status.replace("_", " ")}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">Coding Profiles</p>
              <div className="flex gap-4">
                <a href="#" className="text-blue-600 underline">
                  GitHub
                </a>
                <a href="#" className="text-blue-600 underline">
                  LeetCode
                </a>
                <a href="#" className="text-blue-600 underline">
                  Codeforces
                </a>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">
                Essay 1: Tell us about yourself?
              </p>
              <p className="text-gray-700">
                I am passionate about solving complex problems.
              </p>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">
                Essay 2: Why do you want to join us?
              </p>
              <p className="text-gray-700">
                I want to join because it will help improve my problem-solving
                skills.
              </p>
            </div>

            <div>
              <p className="font-medium mb-1">Resume</p>
              <a href="#" className="text-blue-600 underline">
                View Resume.pdf
              </a>
            </div>
          </div>

          {/* Right Side - Evaluation Form */}
          <div className="w-1/3 bg-white shadow-md rounded-md p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Evaluation Form</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Check Notes
              </label>
              <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Score
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Essay Score
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            <button className="w-full bg-[#6366F1] text-white py-2 rounded-md hover:bg-[#4F46E5] transition">
              Save & Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
