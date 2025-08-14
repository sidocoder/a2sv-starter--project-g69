"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ApplicationCard from "./Card/ReviewerCard";
import { fetch_review } from "./lib/temp";

interface Review {
  application_id: number;
  applicant_name: string;
  submission_date: string;
  status: string;
}

const Reviewer = () => {
  const [filtered, setFilter] = useState<"All" | "Complete" | "Under_Review">(
    "All"
  );
  const criteria = ["Alphabetic", "submission_date"];
  const [sortType, setSortType] = useState(criteria[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<Review[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const temp = await fetch_review(currentPage, itemsPerPage); // ✅ send page, not offset
      // console.log(temp.reviews[0].status);


      const filteredData: Review[] =
        filtered === "All"
          ? temp.reviews || []
          : (temp.reviews || []).filter(
              (item: Review) => item.status === filtered
            );
      console.log(filteredData)

      if (sortType === "Alphabetic") {

  filteredData.sort((a: Review, b: Review) => a.applicant_name.localeCompare(b.applicant_name));

      } else {
        filteredData.sort(
          (a: Review, b: Review) =>
            new Date(a.submission_date).getTime() - new Date(b.submission_date).getTime()
        );
      }

      setList(filteredData);
      setTotalItems(temp.total || filteredData.length);
      setLoading(false);
    }

    getData();
  }, [filtered, sortType, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading applicant data...
      </div>
    );
  } 

  return (
    <main className="m-auto w-full">
      {/* Navbar */}
      <nav className="w-4/5 mx-auto h-16 bg-white pl-24 flex justify-between items-center text-black">
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" className="w-24 h-auto" />
        </Link>
        <div className="text-sm w-[7%] text-center border-b-2 border-indigo-500">
          <a href="/applicant/application"> Dashboard</a>
        </div>
        <div className="flex space-x-4 w-[27%] justify-between text-sm">
          <a href="/profile" className="text-indigo-600">
            Your Profile
          </a>
          <div>Registered Name</div>
          <Link href="/">Log out</Link>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gray-100 w-full">
        <div className="w-4/5 pl-24 mx-auto pb-52">
          <header className="w-full pt-24">
            <h1 className="text-black text-2xl font-bold">
              Assigned Applications
            </h1>
            <h6 className="text-gray-600 text-base mb-3.5">
              You have {totalItems} applications waiting for your review.
            </h6>

            {/* Filters */}
            <div className="flex justify-between w-full h-12 pt-5">
              <div className="flex gap-2 items-center">
                {["All", "Under_Review", "Complete"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as "All" | "Complete" | "Under_Review")}
                    className={`px-4 py-1 rounded ${
                      filtered === status
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {status.replace("_", " ")}
                  </button>
                ))}
              </div>
              <div className="pr-12">
                <label className="text-gray-400">Sorted by: </label>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="w-44 h-7 rounded border border-gray-300"
                >
                  {criteria.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </header>

          {/* Applications */}
          <main className="w-full mt-12">
            <div className="flex flex-wrap gap-4">
              {list.length === 0 ? (
                <p className="w-full text-center text-gray-500 text-lg py-8">
                  No applications found. Please check back later.
                </p>
              ) : (
                list.map((item, index) => (
                  
                  <ApplicationCard
                    key={index}
                    name={item.applicant_name}
                    date={item.submission_date.split("T")[0]}
                    status={item.status}
                    id={item.application_id}
                  />
                ))
              )}
            </div>
          </main>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-6 text-sm text-gray-700">
            <span className="text-gray-500">
              Showing{" "}
              <span className="font-semibold text-black">
                {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-black">
                {totalItems > 0
                  ? Math.min(currentPage * itemsPerPage, totalItems)
                  : 0}
              </span>{" "}
              of <span className="font-semibold text-black">{totalItems}</span>{" "}
              results
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || totalPages <= 1}
                className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-30"
              >
                &lt;
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages <= 1}
                className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-30"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 px-80 pt-8 pb-16">
        <div className="text-center text-sm text-gray-300 pt-12 border-t border-gray-700">
          © 2023 A2SV. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Reviewer;
