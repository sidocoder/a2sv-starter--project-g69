"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Nav from '../../../components/AdminNavbar';
import Footer from '../../../components/AdminFooter';

const CreateCycle = () => {
  const [formData, setFormData] = useState({
    cycleName: '',
    country: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cycle created:', formData);
    // Call your API here (POST request)
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="max-w-3xl w-full">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create new cycle</h1>
            <p className="text-gray-600 mb-6">Use this form to create a new cycle and assign periods.</p>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cycleName" className="block text-sm font-medium text-gray-700 mb-1">
                    cycle name
                  </label>
                  <input
                    type="text"
                    id="cycleName"
                    name="cycleName"
                    value={formData.cycleName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    start date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    end date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Link href="/admin/admindashboard/admincycles">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default CreateCycle;
