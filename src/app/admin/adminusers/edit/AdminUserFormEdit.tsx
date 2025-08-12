'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Nav from '../../components/AdminNavbar';
import Button from '../../components/button/Button';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { createAxiosInstance } from '../../../../utils/axiosInstance';

const EditUserPage = () => {
  // Get user ID from URL params and initialize router and redux dispatch
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get auth token from Redux store
  const token = useAppSelector((state) => state.auth.token?.access ?? null);

  // Create axios instance with token handling for API requests
  const axiosInstance = React.useMemo(() => createAxiosInstance(dispatch), [dispatch]);

  // State to hold user data form inputs
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    role: '',
    is_active: true,
  });

  // Fetch user data from API when component mounts or ID/token change
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error('No token found, cannot fetch user');
        return;
      }
      try {
        const res = await axiosInstance.get(`/admin/users/${id}`);
        if (res.data?.success && res.data.data) {
          setUserData({
            full_name: res.data.data.full_name || '',
            email: res.data.data.email || '',
            role: res.data.data.role || '',
            is_active: res.data.data.is_active ?? true,
          });
        } else {
          console.error('Failed to fetch user:', res.data);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (id) fetchUser();
  }, [id, token, axiosInstance]);

  // Handle input/select/checkbox changes and update state accordingly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      newValue = e.target.checked;
    }

    setUserData({
      ...userData,
      [name]: newValue,
    });
  };

  // Send updated user data to API to update user info
  const handleUpdate = async () => {
    if (!token) {
      console.error('No access token — please log in.');
      return;
    }
    try {
      const res = await axiosInstance.put(`/admin/users/${id}`, userData);
      if (res.data?.success) {
        console.log('User updated successfully');
        router.push('/admin/adminusers');
      } else {
        console.error('Failed to update user:', res.data);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Render UI form for editing user details and controls for submit/cancel
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Edit User:</h1>
          <p className="text-gray-500">Update the user's details and role.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={userData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">admin</option>
              <option value="reviewer">reviewer</option>
              <option value="applicant">applicant</option>
              <option value="manager">manager</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={userData.is_active}
              onChange={handleChange}
            />
            <label>Active</label>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => router.back()}
            className="bg-white text-gray-700 border border-gray-300 shadow-2xl hover:bg-gray-100 font-medium py-2 px-4 rounded transition-all"
          >
            Cancel
          </button>
          <Button onClick={handleUpdate}>Update User</Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
