'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Nav from '../components/AdminNavbar';
import Footer from '../components/AdminFooter';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../../../store/hook';
import { createAxiosInstance } from '../../../utils/axiosInstance';


interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

const roles = ["All Roles", "Applicant", "Reviewer", "Manager", "Admin"];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 4;

  const dispatch = useAppDispatch();

  // Getting the token from the Redux store
  const token = useAppSelector((state) => state.auth.token?.access ?? null);

  // Create axios instance once per component lifecycle
  const axiosInstance = React.useMemo(() => createAxiosInstance(dispatch), [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error("No access token found.");
        setUsers([]);
        setTotalUsers(0);
        return;
      }

      try {
        const params: any = {
          page: currentPage,
          limit: usersPerPage,
        };

        if (search.trim()) {
          params.search = search.trim();
        }

        if (selectedRole !== "All Roles") {
          params.role = selectedRole.toLowerCase();
        }
          // response from the API
        const response = await axiosInstance.get("/admin/users", { params });

        if (response.data?.success) {
          const items = response.data.data?.users;
          if (Array.isArray(items)) {
            setUsers(items);
            setTotalUsers(response.data.data.total_count || 0);
          } else {
            console.warn("Users items is not an array, setting empty array");
            setUsers([]);
            setTotalUsers(0);
          }
        } else {
          console.error("API call unsuccessful", response.data);
          setUsers([]);
          setTotalUsers(0);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setTotalUsers(0);
      }
    };

    fetchUsers();
  }, [currentPage, search, selectedRole, token, axiosInstance]);

  // Defensive: ensure users is always an array before filter
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        const matchesSearch =
          user.full_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole =
          selectedRole === "All Roles" || user.role.toLowerCase() === selectedRole.toLowerCase();
        return matchesSearch && matchesRole;
      })
    : [];

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleDelete = async (id: string) => {
    if (!token) {
      console.error("No access token found — please log in.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/admin/users/${id}`);

      // Remove deleted user from local state
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setTotalUsers((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="p-8 bg-gray-100 min-h-screen font-sans">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-sm text-gray-500">Administer and manage all users on the platform.</p>
          </div>
          <Link href="/admin/adminusers/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create New User
            </button>
          </Link>
        </div>

        {/* Search and Role Filter */}
        <div className="flex gap-3 mb-4 bg-white p-3 shadow-2xl rounded-2xl">
          <div className="relative w-full">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            className="border border-gray-300 rounded px-4 py-2"
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setCurrentPage(1);
            }}
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="bg-white overflow-hidden rounded-2xl shadow-2xl">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm bg-gray-100">
              <tr>
                <th className="p-3">NAME</th>
                <th className="p-3">ROLE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                      <div>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.is_active ? (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Active</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">Inactive</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Link href={`/admin/adminusers/edit/${user.id}`}>
                      <button className="text-blue-600 hover:underline mr-4">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text-sm text-gray-500">
            <div>
              Showing {(currentPage - 1) * usersPerPage + 1} to{' '}
              {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} results
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserManagement;
