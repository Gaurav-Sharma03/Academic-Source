import React, { useState } from 'react';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

const UserRegister = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const sendVerificationCode = async () => {
    if (!email) return setError('Email is required');
    try {
      setLoading(true);
      const res = await API.post('/api/user/register/send-code', { email });
      setFormData((prev) => ({ ...prev, email }));
      setMessage('✅ Verification code sent to your email.');
      setStep(2);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || '❌ Failed to send verification code');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndRegister = async () => {
    const { name, password } = formData;
    if (!name || !password || !code) return setError('All fields are required');
    try {
      setLoading(true);
      await API.post('/api/user/register/verify', { ...formData, code });
      setMessage('🎉 Registration successful! You can now log in.');
      setError('');
      setTimeout(() => setRedirect(true), 1500); // auto redirect after 1.5s
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || '❌ Registration failed');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  if (redirect) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <FaUserPlus className="text-blue-600 text-3xl mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">User Registration</h2>
        </div>

        {/* Error / Message */}
        {error && <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded mb-4">{error}</p>}
        {message && <p className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded mb-4">{message}</p>}

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendVerificationCode}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              placeholder="Create a strong password"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block text-sm font-medium mb-1">Verification Code</label>
            <input
              type="text"
              value={code}
              placeholder="Enter code from email"
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={verifyAndRegister}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              {loading ? 'Registering...' : 'Verify & Register'}
            </button>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center">
            <p className="text-green-700 text-lg font-semibold mb-2">
              🎉 You're successfully registered!
            </p>
            <p className="text-blue-600">
              Redirecting to <span className="underline">Login</span>...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegister;
