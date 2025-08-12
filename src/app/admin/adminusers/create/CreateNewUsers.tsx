'use client';

import React, { useState } from 'react';
import Nav from '../../components/AdminNavbar';
import { useRouter } from 'next/navigation';
import Button from '../../components/button/Button';
import { useAppSelector, useAppDispatch } from '../../../../store/hook';
import { createAxiosInstance } from '../../../../utils/axiosInstance';

const CreateNewUsers = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Token from Redux store
  const token = useAppSelector((state) => state.auth.token?.access ?? null);
  console.log(token)

  // Axios instance (will auto-attach token if configured in utils)
  const axiosInstance = createAxiosInstance(dispatch);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'reviewer',
  });

  // Handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle submit
  const handleCreateUser = async () => {
    if (!token) {
      console.error('No access token — please log in.');
      return;
    }

    try {
      const res = await axiosInstance.post('/admin/users', formData);

      if (res.data.success) {
        console.log('User created!');
        router.push('/admin/adminusers');
      } else {
        console.error('Failed to create user:', res.data);
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        // @ts-expect-error: error.response is expected from Axios
        console.error('Error creating user:', error.response.data);
      } else if (error && typeof error === 'object' && 'message' in error) {

        console.error('Error creating user:', error.message);
      } else {
        console.error('Error creating user:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Create New User</h1>
          <p className="text-gray-500">Use this form to create a new user and assign them a role.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jane Reviewer"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="jane@a2sv.org"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Set a new password"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="reviewer">reviewer</option>
              <option value="admin">admin</option>
              <option value="manager">manager</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => router.back()}
            className="bg-white text-gray-700 border border-gray-300 shadow-2xl hover:bg-gray-100 font-medium py-2 px-4 rounded transition-all"
          >
            Cancel
          </button>
          <Button onClick={handleCreateUser}>Create User</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewUsers;