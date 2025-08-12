"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter, notFound } from "next/navigation";
import { store } from "@/store";
import Link from "next/link";


const Description = () => {
  const val = useParams() as { id: string | null };
  const router = useRouter();

  type Job = {
    id: string;
    name: string;
    date: string;
    status: string;
    github: string;
    leetcode: string;
    codeforces: string;
    essay1: string;
    essay2: string;
    resumeLink: string;
  };
  const [job, setJob] = useState<Job>({

    id: "",
    name: "",
    Date: "",
    status: "",
    github: "",
    leetcode: "",
    codeforces: "",
    essay1: "",
    essay2: "",
    resumeLink: "",
  });

  const [loading, setLoading] = useState(true);

  const [activityCheckNotes, setActivityCheckNotes] = useState("");
  const [resumeScore, setResumeScore] = useState<number | "">("");
  const [essayWhyScore, setEssayWhyScore] = useState<number | "">("");
  const [essayAboutYouScore, setEssayAboutYouScore] = useState<number | "">("");
  const [technicalInterviewScore, setTechnicalInterviewScore] = useState<
    number | ""
  >("");
  const [behavioralInterviewScore, setBehavioralInterviewScore] = useState<
    number | ""
  >("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage once on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenStr = localStorage.getItem("token");
      if (tokenStr) {
        const parsed = JSON.parse(tokenStr);
        setToken(parsed.access);
      }
    }
  }, []);

  // Fetch applicant data once token is ready and val.id is available
  useEffect(() => {
    if (!token) return;

    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://a2sv-application-platform-backend-team12.onrender.com/reviews/${val.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();

        if (json.success && json.data) {
          const apiJob = {
            id: json.data.id,
            name: json.data.applicant_details.applicant_name,
            Date: json.data.applicant_details.submitted_at,
            status: json.data.applicant_details.status,
            github: "", // if available extend here
            leetcode: json.data.applicant_details.leetcode_handle,
            codeforces: json.data.applicant_details.codeforces_handle,
            essay1: json.data.applicant_details.essay_about_you,
            essay2: json.data.applicant_details.essay_why_a2sv,
            resumeLink: json.data.applicant_details.resume_url,
          };
          setJob(apiJob);
        } else {
          router.push("/not-found");
        }
      } catch (err) {
        if (typeof window !== "undefined") {
          alert(`There was an error: ${err}`);
        } else {
          console.error("❌ Fetch review error:", err);
        }
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [token, val.id, router]);

  async function handleSubmit() {
    if (
      !resumeScore ||
      !essayWhyScore ||
      !essayAboutYouScore ||
      !technicalInterviewScore ||
      !behavioralInterviewScore
    ) {
      alert("Please fill all required scores");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team12.onrender.com/reviews/${val.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            activity_check_notes: activityCheckNotes,
            resume_score: resumeScore,
            essay_why_a2sv_score: essayWhyScore,
            essay_about_you_score: essayAboutYouScore,
            technical_interview_score: technicalInterviewScore,
            behavioral_interview_score: behavioralInterviewScore,
            interview_notes: interviewNotes,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update review");

      const json = await res.json();
      if (json.success) {
        alert("Review updated successfully!");
        router.push("/applicant/application");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating review");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://a2sv-application-platform-backend-team12.onrender.com/reviews/${val.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
            date: json.data.applicant_details.submitted_at,
            status: json.data.applicant_details.status,
            github: "", // Add if available or extend your UI to use these fields
            leetcode: json.data.applicant_details.leetcode_handle,
            codeforces: json.data.applicant_details.codeforces_handle,
            essay1: json.data.applicant_details.essay_about_you,
            essay2: json.data.applicant_details.essay_why_a2sv,
            resumeLink: json.data.applicant_details.resume_url,
          };
          setJob(apiJob);
        }
      } catch (err) {
        if (typeof window !== "undefined") {
          alert(`There was an error: ${err}`);
        } else {
          console.error("❌ Fetch review error:", err);
        }
        router.push("/not-found");
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
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:underline"
        >
          &lt; Back to Dashboard
        </button>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-800">{job.name}</span>

          <Link href="/" className="text-sm text-gray-500 hover:underline">Log Out</Link>

        </div>
      </div>

      <div className="w-full h-[52px] bg-[#1F2937] flex items-center justify-center text-sm text-gray-300">
        © 2023 A2SV. All rights reserved.
      </div>

      <div className="max-w-[1280px] mx-auto px-8 py-10">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 mb-2 hover:underline"
          >
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

                <strong>Application Date:</strong> {job.date}

              </p>
              <p>
                <strong>Status:</strong> {job.status?.replace("_", " ") ?? ""}
              </p>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">Coding Profiles</p>
              <div className="flex gap-4">
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
              <textarea
                value={activityCheckNotes}
                onChange={(e) => setActivityCheckNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Score
                </label>
                <input
                  type="number"
                  value={resumeScore}
                  onChange={(e) => setResumeScore(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Essay &quot;About You&quot; Score
                </label>
                <input
                  type="number"
                  value={essayAboutYouScore}
                  onChange={(e) =>
                    setEssayAboutYouScore(Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Essay &quot;Why A2SV&quot; Score
                </label>
                <input
                  type="number"
                  value={essayWhyScore}
                  onChange={(e) => setEssayWhyScore(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technical Interview Score
                </label>
                <input
                  type="number"
                  value={technicalInterviewScore}
                  onChange={(e) =>
                    setTechnicalInterviewScore(Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Behavioral Interview Score
                </label>
                <input
                  type="number"
                  value={behavioralInterviewScore}
                  onChange={(e) =>
                    setBehavioralInterviewScore(Number(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Notes
              </label>
              <textarea
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#6366F1] text-white py-2 rounded-md hover:bg-[#4F46E5] transition"
            >
              {submitting ? "Submitting..." : "Save & Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
