"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

type Reviewer = {
  id: string;
  full_name: string;
  email: string;
};

type Application = {
  id: string;
  applicant: string;
  slug: string;
  submitted: string;
  assignedReviewer: string | null;
  status: "Under Review" | "New" | string;
};

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const [openAssignId, setOpenAssignId] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  useEffect(() => {
    async function fetchData() {
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

        const [appsRes, reviewersRes] = await Promise.all([
          axios.get(
            "https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            "https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/available-reviewers/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        if (appsRes.data.success) {
          const mappedApps: Application[] = appsRes.data.data.applications.map(
            (app: {
              id: string;
              applicant_name: string;
              status: string;
              assigned_reviewer_name: string | null;
            }) => ({
              id: app.id,
              applicant: app.applicant_name || "Unknown",
              slug: slugify(app.applicant_name || "unknown"),
              submitted: "N/A",
              assignedReviewer: app.assigned_reviewer_name,
              status: app.status || "New",
            })
          );
          setApplications(mappedApps);
        } else {
          setError(appsRes.data.message || "Failed to fetch applications");
        }

        if (reviewersRes.data && reviewersRes.data.success) {
          setReviewers(reviewersRes.data.data.reviewers || []);
        } else {
          setReviewers([]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function assignReviewer(applicationId: string, reviewerId: string, reviewerName: string) {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString)?.access : null;

    if (!token) {
      alert("You need to login again.");
      return;
    }

    setAssigningId(applicationId);

    try {
      await axios.patch(
        `https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/${applicationId}/assign/`,
        { reviewer_id: reviewerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === applicationId
            ? { ...app, assignedReviewer: reviewerName }
            : app
        )
      );
      alert(`Assigned ${reviewerName} to application ${applicationId}`);
      setOpenAssignId(null);
      setOpenActionsId(null);
    } catch (error) {
      alert("Failed to assign reviewer.");
    } finally {
      setAssigningId(null);
    }
  }

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div className="text-red-600 font-semibold">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded p-6 max-w-3xl w-full">
      <header className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">All Applications</h2>
        <select className="text-xs border border-gray-300 rounded px-2 py-1">
          <option>Filter by Status</option>
          <option>Under Review</option>
          <option>New</option>
          <option>Accepted</option>
        </select>
      </header>

      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-left text-xs">
            <th className="p-3 w-1/4">Applicant</th>
            <th className="p-3 w-1/4">Submitted</th>
            <th className="p-3 w-1/4">Assigned Reviewer</th>
            <th className="p-3 w-1/4">Status</th>
            <th className="p-3 w-20">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 && (
            <tr>
              <td colSpan={5} className="p-3 text-center italic text-gray-400">
                No applications found.
              </td>
            </tr>
          )}

          {applications.map(({ id, applicant, submitted, assignedReviewer, status }) => (
            <tr
              key={id}
              className="border-b border-gray-200 hover:bg-gray-50 relative"
            >
              <td className="p-3">
                <Link href={`/manager/${id}`} className="text-blue-600 hover:underline">
                  {applicant}
                </Link>
              </td>
              <td className="p-3">{submitted}</td>
              <td className="p-3 text-gray-400">
                {assignedReviewer || (
                  <span className="italic text-gray-300">Not Assigned</span>
                )}
              </td>
              <td className="p-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    status === "Under Review"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {status}
                </span>
              </td>
              <td className="p-3 relative">
                <button
                  onClick={() => setOpenActionsId(openActionsId === id ? null : id)}
                  className="text-blue-600 text-sm hover:underline focus:outline-none"
                >
                  Actions ▼
                </button>

                {openActionsId === id && (
                  <div
                    className="absolute top-full right-0 mt-1 w-44 bg-white shadow-md rounded border border-gray-200 z-10"
                    onMouseLeave={() => {
                      setOpenActionsId(null);
                      setOpenAssignId(null);
                    }}
                  >
                    <Link
                      href={`/manager/${id}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                    >
                      View Details
                    </Link>
                    <div className="relative group">
                      <button
                        className="flex w-full text-left px-4 py-2 hover:bg-gray-100 justify-between items-center"
                        onClick={() => setOpenAssignId(openAssignId === id ? null : id)}
                      >
                        Assign to Reviewer &raquo;
                      </button>

                      {openAssignId === id && (
                        <div
                          className="absolute top-0 left-full mt-0 ml-1 w-48 bg-white shadow-md rounded border border-gray-200 z-20"
                          onMouseLeave={() => setOpenAssignId(null)}
                        >
                          <div className="p-2 border-b text-sm font-semibold">
                            Select a reviewer
                          </div>
                          {Array.isArray(reviewers) && reviewers.length > 0 ? (
                            reviewers.map((rev) => (
                              <button
                                key={rev.id}
                                disabled={assigningId === id}
                                onClick={() => assignReviewer(id, rev.id, rev.full_name)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {rev.full_name}
                              </button>
                            ))
                          ) : (
                            <div className="p-2 text-gray-400 text-sm italic">
                              No reviewers available
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
                            