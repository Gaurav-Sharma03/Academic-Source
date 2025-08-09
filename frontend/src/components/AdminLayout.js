// src/components/AdminLayout.js
import React from 'react';
import Sidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - visible on all screens now */}
      <div className="block md:w-64">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar - hidden on small screens */}
        <div className="hidden md:block sticky top-0 z-20">
          <AdminNavbar />
        </div>
        <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
