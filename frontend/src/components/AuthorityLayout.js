import React from 'react';
import AuthoritySidebar from './AuthoritySidebar';
import AuthorityNavbar from './AuthorityNavbar';
import { Outlet } from 'react-router-dom';

const AuthorityLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="block md:w-64">
        <AuthoritySidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar */}
        <div className="hidden md:block sticky top-0 z-20">
          <AuthorityNavbar />
        </div>
        
        <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthorityLayout;
