import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [valid, setValid] = useState(null); // null = loading
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!token || !role || !allowedRoles.includes(role)) {
      setValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
        setValid(false);
      } else {
        setValid(true);
      }
    } catch (err) {
      console.error('JWT decode error:', err);
      localStorage.clear();
      setValid(false);
    }
  }, [token, role]);

  if (valid === null) {
    return <div className="text-center py-20 text-blue-500">🔒 Verifying token...</div>;
  }

  return valid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
