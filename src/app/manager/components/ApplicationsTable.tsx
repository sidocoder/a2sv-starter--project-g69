'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Application = {
  id: number;
  applicant: string;
  slug: string;
  submitted: string;
  assignedReviewer: string | null;
  status: 'Under Review' | 'New';
};

const applications: Application[] = [
  {
    id: 1,
    applicant: 'Abel Tadesse',
    slug: 'abel-tadesse',
    submitted: 'Oct 26, 2023',
    assignedReviewer: 'Jane R.',
    status: 'Under Review',
  },
  {
    id: 2,
    applicant: 'Bethlehem Tadesse',
    slug: 'bethlehem-tadesse',
    submitted: 'Oct 25, 2023',
    assignedReviewer: null,
    status: 'New',
  },
];

const reviewers = ['Abebe Kebede', 'Alemu Mossia'];

export default function ApplicationsTable() {
  const [openActionsId, setOpenActionsId] = useState<number | null>(null);
  const [openAssignId, setOpenAssignId] = useState<number | null>(null);

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
          {applications.map(({ id, applicant, slug, submitted, assignedReviewer, status }) => (
            <tr key={id} className="border-b border-gray-200 hover:bg-gray-50 relative">
              <td className="p-3">
                <Link href={`/manager/${slug}`} className="text-blue-600 hover:underline">
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
                    status === 'Under Review'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}
                >
                  {status}
                </span>
              </td>
              <td className="p-3 relative">
                <button
                  onClick={() =>
                    setOpenActionsId(openActionsId === id ? null : id)
                  }
                  className="text-blue-600 text-sm hover:underline focus:outline-none"
                >
                  Actions ▼
                </button>

                {/* Actions Dropdown */}
                {openActionsId === id && (
                  <div
                    className="absolute top-full right-0 mt-1 w-40 bg-white shadow-md rounded border border-gray-200 z-10"
                    onMouseLeave={() => {
                      setOpenActionsId(null);
                      setOpenAssignId(null);
                    }}
                  >
                    <Link
                      href={`/manager/${slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                    >
                      View Details
                    </Link>
                    <div className="relative group">
                      <button
                        className="flex w-full text-left px-4 py-2 hover:bg-gray-100 justify-between items-center"
                        onClick={() =>
                          setOpenAssignId(openAssignId === id ? null : id)
                        }
                      >
                        Assign to Reviewer &raquo;
                      </button>

                      {/* Assign Dropdown */}
                      {openAssignId === id && (
                        <div
                          className="absolute top-0 left-full mt-0 ml-1 w-48 bg-white shadow-md rounded border border-gray-200 z-20"
                          onMouseLeave={() => setOpenAssignId(null)}
                        >
                          <div className="p-2 border-b text-sm font-semibold">
                            Search for a reviewer
                          </div>
                          {reviewers.map((rev) => (
                            <button
                              key={rev}
                              onClick={() =>
                                alert(`Assign ${applicant} to ${rev}`)
                              }
                              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {rev}
                            </button>
                          ))}
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
