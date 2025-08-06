import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/login', formData);
      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // 🔁 Use role-based redirect page
      navigate('/verify-login');
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <FaLock className="text-4xl text-blue-600 dark:text-white mb-2" />
          <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-white">
            Academic Source Login
          </h2>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Email
          </label>
          <div className="relative">
            <span className="absolute top-2.5 left-3 text-gray-400">
              <FaUser />
            </span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Password
          </label>
          <div className="relative">
            <span className="absolute top-2.5 left-3 text-gray-400">
              <FaLock />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Select Role
          </label>
          <div className="relative">
            <span className="absolute top-2.5 left-3 text-gray-400">
              <FaUserShield />
            </span>
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="authority">Authority</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>

        {/* Registration Link */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link to="/user-register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
