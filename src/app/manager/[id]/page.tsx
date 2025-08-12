"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";

type ApplicationDetail = {
  id: string;
  applicant_name: string;
  school: string;
  degree_program: string;
  coding_profiles: {
    github?: string;
    leetcode?: string;
    codeforces?: string;
  };
  essays: {
    essay1: string;
    essay2: string;
  };
  resume_url: string;
  reviewer_feedback: {
    reviewer_name: string;
    activity_check: string;
    resume_score: number;
    essay_score: number;
    tech_interview: number;
    behavioral: number;
    interviewer_notes: string;
  };
  assigned_reviewer: string | null;
  status: string;
};

export default function ManagerDetailPage() {
  // Always call hooks first:
  const params = useParams();

  const [data, setData] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // We cannot early return before hooks

  // Extract ID safely:
  const applicationId = params?.id ?? null;

  useEffect(() => {
    if (!applicationId) {
      // No ID to fetch, stop loading and set error
      setError("No application ID provided.");
      setLoading(false);
      return;
    }

    async function fetchApplication() {
      try {
        setLoading(true);
        setError(null);

        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString)?.access : null;

        if (!token) {
          setError("No access token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/${applicationId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch application.");
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, [applicationId]);

  // Now conditional returns based on state, AFTER hooks called:

  if (loading) return <div>Loading application details...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  if (!data)
    return (
      <div className="p-6 text-gray-700 font-semibold">
        No application data found.
      </div>
    );

  // Render the detailed page:
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <Link href="/manager" className="text-sm pl-15 text-gray-500 hover:underline">
          ← Back to Dashboard
        </Link>
        <div className="text-sm text-gray-700 pr-20 flex items-center">
          <p className="mr-5">{data.assigned_reviewer || "Unassigned"}</p>
          <button className="hover:underline">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div className="flex flex-col w-full lg:w-2/3 gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage: {data.applicant_name}</h2>

          {/* Applicant Profile */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Applicant Profile</h3>

            <div className="text-sm text-gray-700 space-y-3">
              <div className="flex space-x-20 mb-6">
                <div>
                  <p className="text-gray-500 font-semibold">School:</p>
                  <p className="font-semibold">{data.school}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Degree Program:</p>
                  <p className="font-semibold">{data.degree_program}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Coding Profiles:</p>
                <div className="space-x-4">
                  {data.coding_profiles.github && (
                    <a href={data.coding_profiles.github} target="_blank" rel="noreferrer" className="text-blue-600">
                      GitHub
                    </a>
                  )}
                  {data.coding_profiles.leetcode && (
                    <a href={data.coding_profiles.leetcode} target="_blank" rel="noreferrer" className="text-blue-600">
                      LeetCode
                    </a>
                  )}
                  {data.coding_profiles.codeforces && (
                    <a href={data.coding_profiles.codeforces} target="_blank" rel="noreferrer" className="text-blue-600">
                      Codeforces
                    </a>
                  )}
                </div>
              </div>

              <div>
                <p className="text-gray-500 font-semibold">Essay 1: Tell us about yourself?</p>
                <p className="font-semibold">{data.essays.essay1}</p>
              </div>

              <div>
                <p className="text-gray-500 font-semibold">Essay 2: Why do you want to join us?</p>
                <p className="font-semibold">{data.essays.essay2}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Resume:</p>
                <p>
                  <a href={data.resume_url} target="_blank" rel="noreferrer" className="text-blue-600">
                    View Resume.pdf
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Reviewer Feedback */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Reviewer’s Feedback ({data.reviewer_feedback.reviewer_name})</h3>

            <div className="text-sm text-gray-700 space-y-3">
              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Activity Check:</p>
                <p className="font-semibold">{data.reviewer_feedback.activity_check}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Resume Score:</p>
                  <p className="font-semibold">{data.reviewer_feedback.resume_score}/100</p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Essay Score:</p>
                  <p className="font-semibold">{data.reviewer_feedback.essay_score}/100</p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Tech Interview:</p>
                  <p className="font-semibold">{data.reviewer_feedback.tech_interview}/100</p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Behavioral:</p>
                  <p className="font-semibold">{data.reviewer_feedback.behavioral}/100</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Interviewer Notes:</p>
                <p className="font-semibold">{data.reviewer_feedback.interviewer_notes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Manager Actions) */}
        <div className="w-full lg:w-1/3 pt-14">
          <div className="bg-white p-7 rounded-lg shadow flex flex-col space-y-8">
            {/* Section 1: Assign Reviewer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Manager Actions</h3>
              <label className="text-sm text-gray-600 block mb-1">Assign Reviewer</label>
              <input
                type="text"
                value={data.assigned_reviewer || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium">
                Confirm
              </button>
            </div>

            {/* Section 2: Final Decision */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Final Decision</strong>
                <br />
                <span className="text-xs text-gray-400">(This action is final and will notify the applicant.)</span>
              </p>
              <div className="flex gap-4 mt-2">
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium">
                  Reject
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-center text-white text-sm py-4">© 2023 A2SV. All rights reserved.</footer>
    </div>
  );
}
