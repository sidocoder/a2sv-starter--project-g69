"use client";

import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import FunnelChartComponent from "./components/FunnelChartComponent";
import PieChartComponent from "./components/PieChartComponent";
import BarChartComponent from "./components/BarChartComponent";

interface DashboardData {
  stats: {
    totalApplications: number;
    acceptanceRate: number;
    avgDecisionTime: string;
  };
  applicationFunnel: { name: string; value: number }[];
  universityDistribution: { name: string; value: number }[];
  geographicDistribution: { name: string; value: number }[];
}

export default function AdminAnalytics() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://a2sv-application-platform-backend-team12.onrender.com/docs"); 
        const json: DashboardData = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!data) return <p className="p-6 text-red-500">Failed to load data.</p>;

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Application Analytics</h1>
        <p className="text-sm text-gray-500">Insights for the 07 November Intake</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Applicants" value={data.stats.totalApplications.toLocaleString()} />
        <StatCard title="Acceptance Rate" value={`${data.stats.acceptanceRate}%`} />
        <StatCard title="Avg. Review Time" value={data.stats.avgDecisionTime} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-1">Application Funnel</h2>
          <p className="text-sm text-gray-500 mb-3">
            This chart visualizes the applicant’s journey from submission to acceptance.
          </p>
          <FunnelChartComponent data={data.applicationFunnel} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-1">University Distribution</h2>
          <p className="text-sm text-gray-500 mb-3">
            Breakdown of applicants by their university.
          </p>
          <PieChartComponent data={data.universityDistribution} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-1">Geographic Distribution</h2>
        <p className="text-sm text-gray-500 mb-3">
          Shows the number of applicants from each country.
        </p>
        <BarChartComponent data={data.geographicDistribution} />
      </div>
    </div>
  );
}
