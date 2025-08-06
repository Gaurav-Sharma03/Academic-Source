import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  withCredentials: true,
});

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await API.get('/api/admin/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setAdminName(res.data.name);
      } catch (err) {
        console.error('Failed to fetch admin info', err);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Centered Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-xl sm:text-2xl font-extrabold text-blue-700 dark:text-white tracking-tight">
            🎓 Academic Source
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
        </div>

        {/* Right: Admin Info */}
        <div className="ml-auto relative flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="hidden sm:inline font-medium">Hi, {adminName}</span>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="focus:outline-none"
          >
            <FaUserCircle className="text-2xl text-blue-600 dark:text-white cursor-pointer" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-12 right-0 w-44 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg animate-fade-in z-50">
              <Link
                to="/admin/logout"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaSignOutAlt />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
