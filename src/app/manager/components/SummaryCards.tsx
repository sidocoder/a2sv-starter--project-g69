'use client';

import React, { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hook";
import { createAxiosInstance } from "../../../utils/axiosInstance";
import SummaryCard from "./SummaryCard";

interface Application {
  id: string;
  applicant_name: string;
  status: "in_progress" | "under_review" | "interview" | "accepted" | string;
  assigned_reviewer_name?: string | null;
}

interface SummaryData {
  totalApplications: number;
  underReview: number;
  interviewStage: number;
  accepted: number;
}

export default function SummaryCards() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token?.access ?? null);
  const axiosInstance = useMemo(() => createAxiosInstance(dispatch), [dispatch]);

  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("No access token. Please login.");
      return;
    }

    setLoading(true);
    setError(null);

    axiosInstance
      .get<{ 
        success: boolean; 
        data: { 
          applications: Application[], 
          total_count?: number 
        } 
      }>("/manager/applications/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data?.success) {
          const applications = response.data.data.applications;
          const totalCount = response.data.data.total_count ?? applications.length;

          const counts: SummaryData = {
            totalApplications: totalCount,
            underReview: applications.filter(
              (app) => app.status === "in_progress" || app.status === "under_review"
            ).length,
            interviewStage: applications.filter(
              (app) => app.status === "interview"
            ).length,
            accepted: applications.filter(
              (app) => app.status === "accepted"
            ).length,
          };

          setData(counts);
        } else {
          setError("Failed to load summary data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching summary data:", error);
        setError("Error fetching summary data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, axiosInstance]);

  if (loading) return <div>Loading summary...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <SummaryCard title="Total Applications" value={data.totalApplications} />
      <SummaryCard title="Under Review" value={data.underReview} />
      <SummaryCard title="Interview Stage" value={data.interviewStage} />
      <SummaryCard title="Accepted" value={data.accepted} />
    </div>
  );
}
