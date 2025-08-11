'use client';
import React, { useState, useEffect } from 'react';
import ApplicationCard from '../components/ApplicationCard';
import Link from 'next/link';
import Nav from '../components/AdminNavbar';
import Footer from '../components/AdminFooter';

interface ApplicationCycle {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    cycles: ApplicationCycle[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}

const ApplicationCycles: React.FC = () => {
  const [applicationCycles, setApplicationCycles] = useState<ApplicationCycle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(applicationCycles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = applicationCycles.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const response = await fetch(
          'https://a2sv-application-platform-backend-team12.onrender.com/api/cycles'
        );
        if (!response.ok) throw new Error('Failed to fetch data');

        const json: ApiResponse = await response.json();
        setApplicationCycles(json.data.cycles);
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching application cycles.');
      } finally {
        setLoading(false);
      }
    };

    fetchCycles();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Application Cycles</h1>
          <Link href="/admin/admincycles/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create New Cycle
            </button>
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : applicationCycles.length === 0 ? (
          <p>No application cycles found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleItems.map((cycle) => (
                <ApplicationCard
                  key={cycle.id}
                  name={cycle.name}
                  start_date={cycle.start_date}
                  end_date={cycle.end_date}
                  status={cycle.is_active ? 'Active' : 'Closed'}
                />
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + itemsPerPage, applicationCycles.length)} of{' '}
              {applicationCycles.length} results
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 border rounded disabled:opacity-50"
              >
                {'<'}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 border rounded disabled:opacity-50"
              >
                {'>'}
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationCycles;
