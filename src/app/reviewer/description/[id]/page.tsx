"use client";

import React, { useEffect, useState } from "react";
import data from "../../data/Data";
import { useParams } from "next/navigation";

const Description = () => {
  const val = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/reviews/${val.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();

        if (json.success && json.data) {
          // Map API response shape to your job object shape used in UI:
          const apiJob = {
            id: json.data.id,
            name: json.data.applicant_details.applicant_name,
            Date: json.data.applicant_details.submitted_at,
            status: json.data.applicant_details.status,
            github: "", // Add if available or extend your UI to use these fields
            leetcode: json.data.applicant_details.leetcode_handle,
            codeforces: json.data.applicant_details.codeforces_handle,
            essay1: json.data.applicant_details.essay_about_you,
            essay2: json.data.applicant_details.essay_why_a2sv,
            resumeLink: json.data.applicant_details.resume_url,
          };
          setJob(apiJob);
        } else {
          // fallback to local data if API response empty
          const localJob = data.find((item) => item.id === Number(val.id));
          setJob(localJob || null);
        }
      } catch (err) {
        // fallback to local data on error too
        const localJob = data.find((item) => item.id === Number(val.id));
        setJob(localJob || null);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [val.id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading applicant data...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-10 text-center text-red-500">
        No applicant found with ID: {val.id}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
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

      <div className="w-full h-[52px] bg-[#1F2937] flex items-center justify-center text-sm text-gray-300">
        © 2023 A2SV. All rights reserved.
      </div>

      <div className="max-w-[1280px] mx-auto px-8 py-10">
        <div className="mb-8">
          <button className="text-sm text-gray-500 mb-2 hover:underline">
            &lt; Back to Dashboard
          </button>
          <h1 className="text-3xl font-semibold">Review: {job.name}</h1>
        </div>

        <div className="flex gap-8">
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
                {/* You can expand these with actual URLs if you want */}
                <a href={job.github || "#"} className="text-blue-600 underline">
                  GitHub
                </a>
                <a
                  href={job.leetcode || "#"}
                  className="text-blue-600 underline"
                >
                  LeetCode
                </a>
                <a
                  href={job.codeforces || "#"}
                  className="text-blue-600 underline"
                >
                  Codeforces
                </a>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">
                Essay 1: Tell us about yourself?
              </p>
              <p className="text-gray-700">
                {job.essay1 || "No answer provided"}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">
                Essay 2: Why do you want to join us?
              </p>
              <p className="text-gray-700">
                {job.essay2 || "No answer provided"}
              </p>
            </div>

            <div>
              <p className="font-medium mb-1">Resume</p>
              <a
                href={job.resumeLink || "#"}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume.pdf
              </a>
            </div>
          </div>

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

