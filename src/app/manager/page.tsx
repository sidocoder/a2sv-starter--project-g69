"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ApplicationsTable from "./components/ApplicationsTable";
import TeamPerformance from "./components/TeamPerformance";
import Footer from "./components/Footer";
import { selectApplications, selectReviewers } from "./selectors/managerSelectors";
import { fetchApplications, fetchReviewers } from "../../store/managerSlice";
import type { AppDispatch } from "../../store/index";

export default function ManagerDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  // Select data from Redux store
  const applications = useSelector(selectApplications);
  const reviewers = useSelector(selectReviewers);

  // Fetch applications and reviewers on component mount
  useEffect(() => {
    dispatch(fetchApplications());
    dispatch(fetchReviewers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-0 mb-50 py-10 flex flex-col gap-8">
        <section className="flex-grow">
          <div className="ml-20 mb-10">
            <h1 className="text-xl font-bold mb-1">Manager Dashboard</h1>
            <p className="mb-6 text-gray-600 text-sm">G7 November Intake</p>
          </div>

          <div className="ml-2">
            <SummaryCards />
          </div>

          <div className="flex gap-8 ml-2 mt-8 flex-wrap">
            <div className="mr-43">
              <ApplicationsTable
                applications={applications}
                reviewers={reviewers}
                // pass onAssignReviewer if you have the handler here
              />
            </div>
            <div className="mr-1">
              <TeamPerformance />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
