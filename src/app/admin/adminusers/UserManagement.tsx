'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Nav from '../components/AdminNavbar';
import Footer from '../components/AdminFooter';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const roles = ['All Roles', 'Applicant', 'Reviewer', 'Manager', 'Admin'];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Example fetch — replace with real API call
  useEffect(() => {
    // Simulated API response
    const fetchedUsers: User[] = [
      { id: 1, name: 'Abebe Kebede', email: 'abe@a2sv.org', role: 'Applicant', status: 'Active' },
      { id: 2, name: 'Cheltu Benti', email: 'cheltu@a2sv.org', role: 'Reviewer', status: 'Active' },
      { id: 3, name: 'Yosef Lemma', email: 'yosef@a2sv.org', role: 'Manager', status: 'Inactive' },
      { id: 4, name: 'Fatuma Ahmed', email: 'fatuma@a2sv.org', role: 'Admin', status: 'Active' },
      { id: 5, name: 'Kebede Tesfaye', email: 'kebede@a2sv.org', role: 'Applicant', status: 'Active' },
      // ...more users
    ];
    setUsers(fetchedUsers);
  }, []);

  // Filtered and searched users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Nav />
      <div className="p-8 px-50 bg-gray-100 min-h-screen font-sans">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-sm text-gray-500">Administer and manage all users on the platform.</p>
          </div>
          <Link href= '/admin/adminusers/create'>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create New User</button>
          </Link>
        </div>
        {/* Search and Role Filter */}
        <div className="flex gap-3 mb-4 bg-white p-3 shadow-2xl rounded-2xl ">
          <div className="relative w-full">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            className="border border-gray-300 rounded px-4 py-2"
            value={selectedRole}
            onChange={e => {
              setSelectedRole(e.target.value);
              setCurrentPage(1);
            }}
          >
            {roles.map(role => (
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
              {paginatedUsers.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.status === 'Active' ? (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Active</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">Inactive</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Link href={`/admin/adminusers/edit/${user.id}`}><button className="text-blue-600 hover:underline mr-4">Edit</button></Link>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4 text-sm text-gray-500">
            <div>
              Showing {Math.min((currentPage - 1) * usersPerPage + 1, filteredUsers.length)} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} results
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
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
