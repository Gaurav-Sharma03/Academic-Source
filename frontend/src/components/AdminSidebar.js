import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaStickyNote,
  FaBookOpen,
  FaFileAlt,
  FaUniversity,
  FaSignOutAlt,
  FaEdit,
  FaLayerGroup,
  FaPlus,
  FaUpload,
  FaBook,
  FaUserPlus,
  FaUserShield,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const closeSidebar = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const baseStyle =
    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-150 ease-in-out hover:scale-[1.02]';

  const activeStyle =
    'bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md';

  const sectionTitle = (title, color = 'bg-gray-100 dark:bg-gray-800') => (
    <div
      className={`flex items-center gap-2 mt-6 mb-3 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 rounded-md ${color} shadow-sm`}
    >
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      {title}
    </div>
  );

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 flex items-center justify-between px-4 h-14">
  {/* Left: Sidebar Toggle Button */}
  <div className="w-10 flex justify-start">
    <button
      onClick={toggleSidebar}
      className="text-gray-800 dark:text-white focus:outline-none"
    >
      {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
    </button>
  </div>

  {/* Center: Title and Subtitle */}
  <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
    <h1 className="text-lg font-extrabold text-blue-700 dark:text-white">
      🎓 Academic Source
    </h1>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Admin Dashboard
    </p>
  </div>

  {/* Right: Empty space to balance left icon width */}
  <div className="w-10" />
</div>


      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto pt-14 md:pt-0 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-blue-700 dark:text-white tracking-tight">
            Admin Dashboard
          </h2>
        
        </div>

        <nav className="flex flex-col text-sm text-gray-800 dark:text-gray-200 p-4 pb-10">
          {sectionTitle('Overview', 'bg-blue-100 dark:bg-blue-950')}
          <NavLink to="/admin" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-blue-50 dark:hover:bg-gray-700'}`}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          {sectionTitle('Manage Content', 'bg-green-100 dark:bg-green-950')}
          <NavLink to="/admin/add-notes" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaStickyNote />
            <span>Manage Notes</span>
          </NavLink>
          <NavLink to="/admin/add-syllabus" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaBookOpen />
            <span>Manage Syllabus</span>
          </NavLink>
          <NavLink to="/admin/add-paper" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaFileAlt />
            <span>Manage Papers</span>
          </NavLink>
          <NavLink to="/admin/courses" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaLayerGroup />
            <span>Manage Courses</span>
          </NavLink>
          <NavLink to="/admin/universities" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaUniversity />
            <span>Universities</span>
          </NavLink>
          <NavLink to="/admin/edit-departments" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaEdit />
            <span>Manage Departments</span>
          </NavLink>
          <NavLink to="/admin/add-books" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
            <FaBook />
            <span>Manage Books</span>
          </NavLink>

          {sectionTitle('Upload / Add', 'bg-purple-100 dark:bg-purple-950')}
          <NavLink to="/admin/add-department-or-course" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-purple-50 dark:hover:bg-gray-700'}`}>
            <FaPlus />
            <span>Add Dept/Course</span>
          </NavLink>
          <NavLink to="/admin/upload-resources" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-purple-50 dark:hover:bg-gray-700'}`}>
            <FaUpload />
            <span>Upload Resources</span>
          </NavLink>

          {sectionTitle('Manage Access', 'bg-orange-100 dark:bg-orange-950')}
          <NavLink to="/admin/register-admin" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}>
            <FaUserPlus />
            <span>Admin Register</span>
          </NavLink>
          <NavLink to="/admin/register-authority" onClick={closeSidebar} className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}>
            <FaUserShield />
            <span>Authority Register</span>
          </NavLink>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <NavLink to="/admin/logout" onClick={closeSidebar} className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : 'hover:bg-red-100 dark:hover:bg-gray-700'}`}>
              <FaSignOutAlt />
              <span>Logout</span>
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default AdminSidebar;
