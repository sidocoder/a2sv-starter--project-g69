'use client';
import React, { useState } from 'react';
import Nav from '../../components/AdminNavbar';
import Footer from '../../components/AdminFooter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../../../../store/hook';
import { createAxiosInstance } from '../../../../utils/axiosInstance';
import { Axios, AxiosError } from 'axios';

const CreateCycle = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token?.access ?? null);
  const axiosInstance = createAxiosInstance(dispatch);

  const [formData, setFormData] = useState({
    cycleName: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  // Function to normalize date to yyyy-mm-dd
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'date') {
      setFormData({ ...formData, [name]: formatDate(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.error('No access token — please log in.');
      return;
    }

    const payload = {
      name: formData.cycleName,
      start_date: formData.startDate,
      end_date: formData.endDate,
      description: formData.description,
    };

    try {
      const res = await axiosInstance.post('/admin/cycles', payload);
      if (res.data) {
        router.push('/admin/admincycles');
      } else {
        console.error('Failed to create cycle:', res.data);
      }
  } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        // @ts-expect-error: error may be AxiosError
        console.error('Error creating cycle:', error.response.data);
      } else if (error instanceof Error) {
        console.error('Error creating cycle:', error.message);
      } else {
        console.error('Error creating cycle:', error);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Create New Cycle</h1>
          <p className="text-gray-600 mt-1">
            Fill in the details below to create a new cycle and assign periods.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cycle Name */}
            <div>
              <label
                htmlFor="cycleName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cycle Name
              </label>
              <input
                type="text"
                id="cycleName"
                name="cycleName"
                value={formData.cycleName}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2 shadow-sm"
                placeholder="Enter cycle name"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2 shadow-sm"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2 shadow-sm"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Provide a brief description of this cycle..."
                className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <Link href="/admin/admincycles">
              <button
                type="button"
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition"
            >
              Save Cycle
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCycle;
