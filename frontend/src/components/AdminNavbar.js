import React, { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef();

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 sm:px-6 w-full">
      <div className="flex items-center justify-between flex-wrap max-w-7xl mx-auto">
        {/* Logo & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h1 className="text-lg sm:text-2xl font-extrabold items-center text-blue-700 dark:text-white">
            🎓 Academic Source
          </h1>
        
        </div>

        {/* User Profile */}
        <div className="relative flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0" ref={dropdownRef}>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Hi, {adminName}
          </span>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-xl text-blue-600 dark:text-white focus:outline-none"
            aria-label="User menu"
          >
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-44 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-50 animate-fade-in">
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