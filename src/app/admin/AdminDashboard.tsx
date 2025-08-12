'use client';

import React, { useState, useEffect } from 'react';
import Nav from './components/AdminNavbar';
import Footer from './components/AdminFooter';
import Link from 'next/link';
import {UserPlus} from 'lucide-react'
import {Calendar} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { createAxiosInstance } from '../../utils/axiosInstance';


interface ApplicationCycle {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token?.access ?? null);
  const axiosInstance = React.useMemo(() => createAxiosInstance(dispatch), [dispatch]);

  const [cycles, setCycles] = useState<ApplicationCycle[]>([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingCycleId, setActivatingCycleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError('No access token found.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch active cycles from /cycles/active  // ADD
        const activeCyclesResponse = await axiosInstance.get('/cycles/active', { params: { page: 1, limit: 10 } }); // ADD
        if (activeCyclesResponse.data?.success) { // ADD
          setCycles(activeCyclesResponse.data.data.cycles || []); // ADD
        } else { // ADD
          setError('Failed to fetch active cycles'); // ADD
        } // ADD

        // Fetch applications
        const appsResponse = await axiosInstance.get('/manager/applications/', { params: { page: 1, limit: 10 } });
        if (appsResponse.data?.success) {
          setTotalApplicants(appsResponse.data.data.total_count || 0);
        } else {
          setError('Failed to fetch applications');
        }

        // Fetch total users
        const usersResponse = await axiosInstance.get('/admin/users', { params: { page: 1, limit: 10 } });
        if (usersResponse.data?.success) {
          setTotalUsers(usersResponse.data.data.total_count || 0);
        } else {
          setError('Failed to fetch users');
        }

      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, axiosInstance]);

  const activeCyclesCount = cycles.filter(cycle => cycle.is_active).length;

  if (loading) return <p>Loading dashboard data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;


  return (
    <div className='min-h-screen bg-gray-100'>
        <Nav />
        <div className="p-8 px-50 bg-gray-100 min-h-screen font-sans">
        <h1 className="text-2xl font-semibold mb-6">Admin Command Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white p-4 shadow-2xl">
            <p className="text-sm">Total Users</p>
            <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 text-white p-4 shadow-2xl">
            <p className="text-sm">Total Applicants (67)</p>
            <p className="text-3xl font-bold">{totalApplicants}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-400 text-white p-4 shadow-2xl">
            <p className="text-sm">Active Cycles</p>
            <p className="text-3xl font-bold">{activeCyclesCount}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className=" rounded-xl bg-white p-4 shadow-md hover:shadow-2xl transition pb-25">
            <h2 className="font-semibold mb-2">Manage Users</h2>
            <p className="text-sm text-gray-600 mb-4">
                Create, edit, and manage user accounts and roles.
            </p>
            <Link href="/admin/adminusers/" className="text-indigo-600 text-sm font-medium hover:underline">
                Go to Users →
            </Link>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-md hover:shadow-2xl transition pb-25">
            <h2 className="font-semibold mb-2">Manage Cycles</h2>
            <p className="text-sm text-gray-600 mb-4">
                Create and manage application cycles.
            </p>
            <Link href="/admin/admincycles" className="text-indigo-600 text-sm font-medium hover:underline">
                Go to Cycles →
            </Link>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-md hover:shadow-2xl transition pb-25">
                <h2 className="font-semibold mb-2">Recent Admin Activity</h2>
                <div className='gap-3 flex flex-col'>
                    <div>
                        <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 text-green-600 text-xs font-bold flex items-center justify-center rounded-full">
                            <UserPlus className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm">New user "Jane R." created.</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center rounded-full">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm">New user "Jane R." created.</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-md hover:shadow-2xl transition">
            <h2 className="font-semibold mb-2">View Analytics</h2>
            <p className="text-sm text-gray-600 mb-4">
            Explore application data and platform insights.
            </p>
            <Link href="/admin/adminanalytics" className="text-indigo-600 text-sm font-medium hover:underline">
            Go to Analytics →
            </Link>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default AdminDashboard