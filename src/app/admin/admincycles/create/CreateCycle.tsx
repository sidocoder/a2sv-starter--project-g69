'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Nav from '../../components/AdminNavbar';
import Footer from '../../components/AdminFooter';

const CreateCycle = () => {
  const [formData, setFormData] = useState({
    cycleName: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.cycleName,
      start_date: formData.startDate,
      end_date: formData.endDate,
      description: formData.description,
    };

    try {
      const response = await fetch('https://a2sv-application-platform-backend-team12.onrender.com/admin/cycles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create cycle');
      }

      const data = await response.json();
      console.log('Cycle created:', data);
      alert('Cycle created successfully!');
      // Optionally, redirect after success
    } catch (error) {
      console.error('Error creating cycle:', error);
      alert('Error creating cycle, please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-3xl w-full">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create new cycle</h1>
          <p className="text-gray-600 mb-6">Use this form to create a new cycle and assign periods.</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cycleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Cycle name
                </label>
                <input
                  type="text"
                  id="cycleName"
                  name="cycleName"
                  value={formData.cycleName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  rows={4}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/admincycles">
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
