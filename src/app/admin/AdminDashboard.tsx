import React from 'react'
import Nav from '../components/AdminNavbar';
import Footer from '../components/AdminFooter';
import Link from 'next/link';
import {UserPlus} from 'lucide-react'
import {Calendar} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
        <Nav />
        <div className="p-8 px-50 bg-gray-100 min-h-screen font-sans">
        <h1 className="text-2xl font-semibold mb-6">Admin Command Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white p-4 shadow-2xl">
            <p className="text-sm">Total Users</p>
            <p className="text-3xl font-bold">125</p>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 text-white p-4 shadow-2xl">
            <p className="text-sm">Total Applicants (67)</p>
            <p className="text-3xl font-bold">1,204</p>
            </div>
            <div className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-400 text-white p-4 shadow-2xl">
            <p className="text-sm">Active Cycles</p>
            <p className="text-3xl font-bold">1</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className=" rounded-xl bg-white p-4 shadow-md hover:shadow-2xl transition pb-25">
            <h2 className="font-semibold mb-2">Manage Users</h2>
            <p className="text-sm text-gray-600 mb-4">
                Create, edit, and manage user accounts and roles.
            </p>
            <Link href="/admin/admindashboard/adminusers/" className="text-indigo-600 text-sm font-medium hover:underline">
                Go to Users →
            </Link>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-md hover:shadow-2xl transition pb-25">
            <h2 className="font-semibold mb-2">Manage Cycles</h2>
            <p className="text-sm text-gray-600 mb-4">
                Create and manage application cycles.
            </p>
            <Link href="/admin/admindashboard/admincycles" className="text-indigo-600 text-sm font-medium hover:underline">
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
            <Link href="/admin/admindashboard/adminanalytics" className="text-indigo-600 text-sm font-medium hover:underline">
            Go to Analytics →
            </Link>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default AdminDashboard