// components/VerifyLoginRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyLoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      navigate('/admin'); // 🔐 protected inside App.js
    } else if (role === 'authority') {
      navigate('/authority');
    } else if (role === 'user') {
      navigate('/user');
    } else {
      navigate('/login'); // fallback if token/role is invalid
    }
  }, [navigate]);

  return null;
};

export default VerifyLoginRedirect;
