'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Nav from '../../components/AdminNavbar';
import Button from '../../components/button/Button';

const EditUserPage = () => {
  const { id } = useParams(); 
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://a2sv-application-platform-backend-team12.onrender.com/users/${id}`);
        const data = await res.json();
        setUserData({
          name: data.name || '',
          email: data.email || '',
          role: data.role || '',
          password: '', 
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (id) fetchUser();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://a2sv-application-platform-backend-team12.onrender.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        console.log('User updated');
        router.push('/admin/admindashboard/adminusers'); 
      } else {
        console.error('Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

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
              name="name"
              value={userData.name}
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
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Leave blank to keep current"
              value={userData.password}
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
              <option value="admin">Admin</option>
              <option value="reviewer">Reviewer</option>
              <option value="applicant">Applicant</option>
              <option value="manager">Manager</option>
            </select>
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
