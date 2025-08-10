import React from 'react';
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
  FaShieldAlt,
  FaUserShield,
  FaUserPlus
} from 'react-icons/fa';

const Sidebar = () => {
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
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl flex flex-col overflow-y-auto">
      <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700 backdrop-blur-md">
        <h2 className="text-2xl font-extrabold text-blue-700 dark:text-white tracking-tight">
          🎓 Academic Source
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Admin Panel</p>
      </div>

      <nav className="flex flex-col text-sm text-gray-800 dark:text-gray-200 p-4">
        {sectionTitle('Overview', 'bg-blue-100 dark:bg-blue-950')}
        <NavLink to="/admin" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-blue-50 dark:hover:bg-gray-700'}`}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {sectionTitle('Manage Content', 'bg-green-100 dark:bg-green-950')}
        <NavLink to="/admin/add-notes" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaStickyNote />
          <span>Manage Notes</span>
        </NavLink>
        <NavLink to="/admin/add-syllabus" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaBookOpen />
          <span>Manage Syllabus</span>
        </NavLink>
        <NavLink to="/admin/add-paper" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaFileAlt />
          <span>Manage Papers</span>
        </NavLink>
        <NavLink to="/admin/courses" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaLayerGroup />
          <span>Manage Courses</span>
        </NavLink>
        <NavLink to="/admin/universities" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaUniversity />
          <span>Universities</span>
        </NavLink>
        <NavLink to="/admin/edit-departments" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaEdit />
          <span>Manage Departments</span>
        </NavLink>
        <NavLink to="/admin/add-books" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-green-50 dark:hover:bg-gray-700'}`}>
          <FaBook />
          <span>Manage Books</span>
        </NavLink>

        {sectionTitle('Upload / Add', 'bg-purple-100 dark:bg-purple-950')}
        <NavLink to="/admin/add-department-or-course" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-purple-50 dark:hover:bg-gray-700'}`}>
          <FaPlus />
          <span>Add Dept/Course</span>
        </NavLink>
        <NavLink to="/admin/upload-resources" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-purple-50 dark:hover:bg-gray-700'}`}>
          <FaUpload />
          <span>Upload Resources</span>
        </NavLink>

        {sectionTitle('Manage Access', 'bg-orange-100 dark:bg-orange-950')}
        <NavLink to="/admin/register-admin" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}>
          <FaUserPlus />
          <span>Admin Register</span>
        </NavLink>
        <NavLink to="/admin/register-authority" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-orange-50 dark:hover:bg-gray-700'}`}>
          <FaUserShield />
          <span>Authority Register</span>
        </NavLink>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <NavLink to="/admin/logout" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : 'hover:bg-red-100 dark:hover:bg-gray-700'}`}>
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
