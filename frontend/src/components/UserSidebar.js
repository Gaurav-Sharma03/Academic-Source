// src/components/UserSidebar.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaUniversity,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStickyNote,
  FaFileAlt,
} from "react-icons/fa";

const UserSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch username from backend
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user", {
          credentials: "include",
        });
        const data = await res.json();
        setUsername(data.username || "User");
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const baseStyle =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-150 ease-in-out hover:scale-[1.02]";
  const activeStyle =
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md";

  const sectionTitle = (title, color = "bg-gray-100 dark:bg-gray-800") => (
    <div
      className={`flex items-center gap-2 mt-6 mb-3 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-md ${color} shadow-sm`}
    >
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      {title}
    </div>
  );

  return (
    <>
      {/* 📱 Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-4 h-14">
        <div className="w-10 flex justify-start">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 dark:text-white focus:outline-none"
          >
            {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-lg font-extrabold text-blue-700 dark:text-white">
            🎓 Academic Source
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            User Dashboard
          </p>
        </div>

        <div className="w-10" />
      </div>

      {/* 🖥 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto pt-14 md:pt-0 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-blue-700 dark:text-white">
            User Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Welcome, <span className="font-semibold">{username}</span>
          </p>
        </div>

        <nav className="flex flex-col text-sm text-gray-800 dark:text-gray-200 p-4 pb-10">
          {sectionTitle("Overview", "bg-blue-100 dark:bg-blue-950")}
          <NavLink
            to="/user"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? activeStyle
                  : "hover:bg-blue-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          {sectionTitle("My Resources", "bg-green-100 dark:bg-green-950")}
          <NavLink
            to="/user/notes"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? activeStyle
                  : "hover:bg-green-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaStickyNote />
            <span>My Notes</span>
          </NavLink>
          <NavLink
            to="/user/syllabus"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? activeStyle
                  : "hover:bg-green-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaBookOpen />
            <span>My Syllabus</span>
          </NavLink>
          <NavLink
            to="/user/papers"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? activeStyle
                  : "hover:bg-green-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaFileAlt />
            <span>My Papers</span>
          </NavLink>

          {sectionTitle("Explore", "bg-purple-100 dark:bg-purple-950")}
          <NavLink
            to="/user/university"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive
                  ? activeStyle
                  : "hover:bg-purple-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaUniversity />
            <span>Explore Universities</span>
          </NavLink>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <NavLink
              to="/logout"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${baseStyle} ${
                  isActive
                    ? activeStyle
                    : "hover:bg-red-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* 🔳 Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default UserSidebar;
