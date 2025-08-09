// src/components/UserNavbar.js
import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 sm:px-6 flex justify-between items-center relative">
      {/* Left: Title + Mobile Menu Button */}
      <div className="flex items-center gap-2">
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
          🎓 Academic Source
        </h1>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-2xl text-gray-600 dark:text-gray-300" />
        <span className="hidden sm:block text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
          Welcome, User
        </span>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 md:hidden z-50">
          <p className="text-gray-700 dark:text-gray-200">Dashboard</p>
          <p className="text-gray-700 dark:text-gray-200">My Notes</p>
          <p className="text-gray-700 dark:text-gray-200">Logout</p>
        </div>
      )}
    </header>
  );
};

export default UserNavbar;
