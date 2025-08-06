// src/components/UserLayout.js
import React from 'react';

const UserLayout = ({ children }) => {
  return (
    <div className="p-4 bg-blue-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">User Panel</h1>
      {children}
    </div>
  );
};

export default UserLayout;
