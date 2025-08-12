'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/AdminNavbar';
import Footer from '../components/AdminFooter';
import ApplicationCard from '../components/ApplicationCard';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { createAxiosInstance } from '../../../utils/axiosInstance';

interface ApplicationCycle {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

const ApplicationCycles: React.FC = () => {
  const [applicationCycles, setApplicationCycles] = useState<ApplicationCycle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCycles, setTotalCycles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 4;

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token?.access ?? null);
  const axiosInstance = React.useMemo(() => createAxiosInstance(dispatch), [dispatch]);

  useEffect(() => {
    const fetchCycles = async () => {
      if (!token) {
        console.error('No access token found.');
        setApplicationCycles([]);
        setTotalCycles(0);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get('/cycles', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        if (response.data?.success) {
          setApplicationCycles(response.data.data?.cycles || []);
          setTotalCycles(response.data.data?.total_count || 0);
        } else {
          console.error('API call unsuccessful', response.data);
          setApplicationCycles([]);
          setTotalCycles(0);
        }
      } catch (err) {
        console.error('Error fetching application cycles:', err);
        setError('Something went wrong while fetching application cycles.');
        setApplicationCycles([]);
        setTotalCycles(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCycles();
  }, [currentPage, token, axiosInstance]);

  const totalPages = Math.ceil(totalCycles / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // New: toggle status handler
  const toggleCycleStatus = async (id: number) => {
    try {
      // Find the cycle to toggle
      const cycle = applicationCycles.find((c) => c.id === id);
      if (!cycle) return;

      // Optimistically update UI
      setApplicationCycles((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, is_active: !c.is_active } : c
        )
      );

      // Send update to server - assuming PATCH /cycles/:id/status or similar
      const response = await axiosInstance.patch(`/cycles/${id}`, {
        is_active: !cycle.is_active,
      });


      if (!response.data?.success) {
        // If update failed, revert state change
        setApplicationCycles((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, is_active: cycle.is_active } : c
          )
        );
        alert('Failed to update cycle status.');
      }
    } catch (error) {
      console.error('Error toggling cycle status:', error);
      alert('An error occurred while toggling status.');

      // Revert UI update on error
      setApplicationCycles((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, is_active: c.is_active } : c
        )
      );
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
              {applicationCycles.map((cycle) => (
                <ApplicationCard
                  key={cycle.id}
                  name={cycle.name}
                  start_date={cycle.start_date}
                  description={cycle.description ?? ''}
                  end_date={cycle.end_date}
                  status={cycle.is_active ? 'Active' : 'Closed'}
                  onToggleStatus={() => toggleCycleStatus(cycle.id)}
                />
              ))}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalCycles)} of {totalCycles} results
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
