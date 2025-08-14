"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";

type Reviewer = {
  id: string;
  full_name: string;
  email: string;
};

type ReviewerFeedback = {
  reviewer_name: string;
  activity_check: string;
  resume_score: number;
  essay_score: number;
  tech_interview: number;
  behavioral: number;
  interviewer_notes: string;
};

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
  reviewer_feedback?: ReviewerFeedback;
  assigned_reviewer: string | null;
  status: "pending" | "accepted" | "rejected";
  reviewer_confirmed?: boolean;
};

export default function ManagerDetailPage() {
  const params = useParams() as { id?: string } | null;
  const id = params?.id;

  const [data, setData] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decisionLoading, setDecisionLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Application ID not found in URL.");
      setLoading(false);
      return;
    }

    async function fetchApplication() {
      setLoading(true);
      setError(null);

      try {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString)?.access : null;

        if (!token) {
          setError("No access token found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.data.success || !res.data.data) {
          setError(res.data.message || "Failed to fetch application data.");
          setLoading(false);
          return;
        }

        const applicationRaw = res.data.data.application;
        const reviewRaw = res.data.data.review;

        const reviewersRes = await axios.get(
          `https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/available-reviewers/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const reviewers: Reviewer[] = reviewersRes.data.data?.reviewers || [];
        const reviewer = reviewers.find((r) => r.id === reviewRaw?.reviewer_id);

        const mappedData: ApplicationDetail = {
          id: applicationRaw.id,
          applicant_name: applicationRaw.applicant_name,
          school: applicationRaw.school,
          degree_program: applicationRaw.degree,
          coding_profiles: {
            github: applicationRaw.github_handle || "",
            leetcode: applicationRaw.leetcode_handle || "",
            codeforces: applicationRaw.codeforces_handle || "",
          },
          essays: {
            essay1: applicationRaw.essay_why_a2sv || "",
            essay2: applicationRaw.essay_about_you || "",
          },
          resume_url: applicationRaw.resume_url,
          reviewer_feedback: reviewRaw
            ? {
                reviewer_name: reviewer?.full_name || "Unknown",
                activity_check: reviewRaw.activity_check_notes,
                resume_score: reviewRaw.resume_score,
                essay_score: reviewRaw.essay_why_a2sv_score + reviewRaw.essay_about_you_score,
                tech_interview: reviewRaw.technical_interview_score,
                behavioral: reviewRaw.behavioral_interview_score,
                interviewer_notes: reviewRaw.interview_notes,
              }
            : undefined,
          assigned_reviewer: reviewer?.full_name || null,
          status: (applicationRaw.status as "pending" | "accepted" | "rejected") || "pending",
          reviewer_confirmed: reviewRaw?.confirmed || false,
        };

        setData(mappedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch application.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  async function handleDecision(decision: "accept" | "reject") {
    if (!id || !data) return;

    if (!data.reviewer_feedback) {
      alert("Reviewer feedback not completed yet. You cannot make a decision.");
      return;
    }

    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString)?.access : null;
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    const decisionMap = {
      accept: "accepted",
      reject: "rejected",
    } as const;

    const notes = prompt("Enter decision notes for this application:") || "";

    setDecisionLoading(true);
    try {
      await axios.patch(
        `https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/${id}/decide/`,
        {
          status: decisionMap[decision],
          decision_notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData((prev) =>
        prev ? { ...prev, status: decisionMap[decision] } : prev
      );
      alert(`Application has been ${decisionMap[decision]} successfully.`);
    } catch (err: unknown) {
      console.error("Decision error:", err);
      alert("Failed to update decision. Please try again.");
    } finally {
      setDecisionLoading(false);
    }
  }

  async function confirmReviewerFeedback() {
    if (!id || !data) return;

    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString)?.access : null;
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    setConfirmLoading(true);
    try {
      await axios.patch(
        `https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/${id}/confirm-review/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData((prev) => (prev ? { ...prev, reviewer_confirmed: true } : prev));
      alert("Reviewer feedback confirmed.");
    } catch (err) {
      console.error("Confirm feedback error:", err);
      alert("Failed to confirm reviewer feedback.");
    } finally {
      setConfirmLoading(false);
    }
  }

  if (loading) return <div>Loading application...</div>;
  if (error) return <div className="text-red-600 font-semibold">Error: {error}</div>;
  if (!data) return null;

  const hasDecided = data.status === "accepted" || data.status === "rejected";
  const canDecide = data.reviewer_feedback && !hasDecided;

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <Link href="/manager" className="text-sm text-gray-500 hover:underline">
          ← Back to Dashboard
        </Link>
        <div className="text-sm text-gray-700 flex items-center">
          <p className="mr-5">{data.assigned_reviewer || "Unassigned"}</p>
          <button className="hover:underline">Logout</button>
        </div>
      </div>

      <main className="flex-1 px-6 py-10 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col w-full lg:w-2/3 gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage: {data.applicant_name}
          </h2>

          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Applicant Profile
            </h3>
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
                    <a
                      href={data.coding_profiles.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      GitHub
                    </a>
                  )}
                  {data.coding_profiles.leetcode && (
                    <a
                      href={data.coding_profiles.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      LeetCode
                    </a>
                  )}
                  {data.coding_profiles.codeforces && (
                    <a
                      href={data.coding_profiles.codeforces}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      Codeforces
                    </a>
                  )}
                </div>
              </div>

              <div>
                <p className="text-gray-500 font-semibold">Essay 1:</p>
                <p className="font-semibold">{data.essays.essay1}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Essay 2:</p>
                <p className="font-semibold">{data.essays.essay2}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Resume:</p>
                <a
                  href={data.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  View Resume.pdf
                </a>
              </div>
            </div>
          </div>

          {!data.reviewer_feedback ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-700 font-semibold">
                No reviewer feedback has been submitted yet.
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reviewer’s Feedback ({data.reviewer_feedback.reviewer_name})
                </h3>
                
              </div>

              <div className="text-sm text-gray-700 space-y-3">
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Activity Check:</p>
                  <p className="font-semibold">{data.reviewer_feedback.activity_check}</p>
                </div>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div>
                    <p className="text-gray-500 font-semibold">Resume Score:</p>
                    <p className="font-semibold">{data.reviewer_feedback.resume_score}/100</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Essay Score:</p>
                    <p className="font-semibold">{data.reviewer_feedback.essay_score}/100</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Tech Interview:</p>
                    <p className="font-semibold">{data.reviewer_feedback.tech_interview}/100</p>
                  </div>
                  <div>
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
          )}
        </div>

      <div className="bg-white p-7 rounded-lg shadow flex flex-col space-y-6">
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Manager Actions
    </h3>
    <label className="text-sm text-gray-600 block mb-1">
      Assign Reviewer
    </label>
    <input
      type="text"
      value={data.assigned_reviewer || ""}
      readOnly
      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
    />
    {!data.reviewer_confirmed && data.assigned_reviewer && (
      <button
        onClick={confirmReviewerFeedback}
        disabled={confirmLoading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
      >
        {confirmLoading ? "Confirming..." : "Confirm"}
      </button>
    )}
  </div>

  <div>
    <p className="text-sm text-gray-600 mb-2">
      <strong>Final Decision</strong>
      <br />
      <span className="text-xs text-gray-400">
        (This action is final and will notify the applicant.)
      </span>
    </p>
    <div className="flex gap-4 mt-2">
      <button
        onClick={() => handleDecision("reject")}
        disabled={!canDecide || decisionLoading}
        className={`flex-1 py-2 rounded-md text-sm font-medium text-white ${
          data.status === "rejected" ? "bg-red-700" : "bg-red-600 hover:bg-red-700"
        } disabled:opacity-50`}
      >
        {data.status === "rejected" ? "Rejected" : "Reject"}
      </button>
      <button
        onClick={() => handleDecision("accept")}
        disabled={!canDecide || decisionLoading}
        className={`flex-1 py-2 rounded-md text-sm font-medium text-white ${
          data.status === "accepted" ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
        } disabled:opacity-50`}
      >
        {data.status === "accepted" ? "Accepted" : "Accept"}
      </button>
    </div>
  </div>
</div>

      </main>

      <footer className="bg-[#1E293B] text-center text-white text-sm py-4">
        © 2023 A2SV. All rights reserved.
      </footer>
    </div>
  );
}
