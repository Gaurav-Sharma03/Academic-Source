import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

const AdminRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/admin/register', form);
      if (res.status === 201) {
        setMessage({ type: 'success', text: '✅ Admin registered successfully' });
        setForm({ name: '', email: '', password: '' });
      }
    } catch (err) {
      const error = err.response?.data?.error || '❌ Registration failed';
      setMessage({ type: 'error', text: error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-300">
          Admin Registration
        </h2>

        {message.text && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="Admin Name"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          placeholder="admin@example.com"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
            placeholder="Enter secure password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-2 right-2 text-sm text-gray-500 dark:text-gray-300"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
