"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

type Application = {
  id: string;
  assigned_reviewer_name: string | null;
  submitted_date?: string; // adjust if backend has this
  reviewed_date?: string;  // optional, for avgDays calc if available
  status: string;
};

type TeamMember = {
  name: string;
  assigned: number;
  avgDays: number;  // dummy for now, replace if you have data
  reviews: number;
};

export default function TeamPerformance() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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

        // Fetch all applications
        const res = await axios.get(
          "https://a2sv-application-platform-backend-team12.onrender.com/manager/applications/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.data.success) {
          setError(res.data.message || "Failed to fetch applications");
          setLoading(false);
          return;
        }

        const applications: Application[] = res.data.data.applications;

        // Group applications by assigned_reviewer_name
        const reviewerStats: Record<string, { assigned: number; reviews: number; totalDays: number; countDays: number }> = {};

        applications.forEach((app) => {
          const reviewer = app.assigned_reviewer_name || "Unassigned";
          if (!reviewerStats[reviewer]) {
            reviewerStats[reviewer] = { assigned: 0, reviews: 0, totalDays: 0, countDays: 0 };
          }
          reviewerStats[reviewer].assigned += 1;

          // Suppose a review is done if status is 'Reviewed' or 'Accepted' (adjust as per your API)
          if (app.status.toLowerCase() === "reviewed" || app.status.toLowerCase() === "accepted") {
            reviewerStats[reviewer].reviews += 1;

            // Calculate days between submitted_date and reviewed_date if available
            if (app.submitted_date && app.reviewed_date) {
              const submitted = new Date(app.submitted_date);
              const reviewed = new Date(app.reviewed_date);
              const diffDays = (reviewed.getTime() - submitted.getTime()) / (1000 * 3600 * 24);
              reviewerStats[reviewer].totalDays += diffDays;
              reviewerStats[reviewer].countDays += 1;
            }
          }
        });

        // Convert grouped data to TeamMember[]
        const teamData: TeamMember[] = Object.entries(reviewerStats).map(([name, stats]) => ({
          name,
          assigned: stats.assigned,
          reviews: stats.reviews,
          avgDays: stats.countDays > 0 ? parseFloat((stats.totalDays / stats.countDays).toFixed(1)) : 0,
        }));

        setTeam(teamData);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading team performance...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <aside className="bg-white shadow rounded p-6 w-72">
      <h3 className="font-semibold text-lg mb-6">Team Performance</h3>

      {team.length === 0 ? (
        <div>No team data available.</div>
      ) : (
        team.map(({ name, assigned, avgDays, reviews }) => (
          <div key={name} className="mb-6 last:mb-0 text-sm flex flex-col space-y-1">
            <div className="font-semibold">{name}</div>
            <div className="flex justify-between text-gray-600">
              <span>
                {assigned} Assigned / Avg. {avgDays} days
              </span>
              <span>{reviews} Reviews</span>
            </div>
          </div>
        ))
      )}
    </aside>
  );
}
