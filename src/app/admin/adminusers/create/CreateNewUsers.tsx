'use client';
import React, { useState } from 'react';
import Nav from '../../components/AdminNavbar';
import { useRouter } from 'next/navigation';
import Button from '../../components/button/Button';

const CreateNewUsers = () => {
  const router = useRouter();

  // STEP 1: Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'reviewer',
  });

  // STEP 2: Handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // STEP 3: Handle submit
  const handleCreateUser = async () => {
    try {
      const res = await fetch('https://a2sv-application-platform-backend-team12.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log('User created!');
        router.push('/admin/adminusers'); // Navigate back to the user management page
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
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
              <option value="reviewer">Reviewer</option>
              <option value="admin">Admin</option>
              <option value="applicant">Applicant</option>
              <option value="manager">Manager</option>
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
