import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// Pages
import NotFound from './NotFound';
import Home from './Home';
import AboutUs from './AboutUs';
import Teams from './Teams';
import Books from './Books';
import Universities from './Universities';
import CoursePages from './CoursePages';
import CourseDetailsPage from './CourseDetailsPage';
import EPlatform from './EPlatform';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from './LoginPage';
import VerifyLoginRedirect from '../components/VerifyLoginRedirect';

// ✅ Registration Pages

import UserRegister from './UserRegister'; // ✅ Make sure this file exists

const Index = () => {
  const location = useLocation();

  

  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen">
        <Routes>
          <Route path="/verify-login" element={<VerifyLoginRedirect />} />

          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/books" element={<Books />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/coursepages/:id/courses" element={<CoursePages />} />
          <Route path="/eplatform" element={<EPlatform />} />
          <Route path="/course/:universityId/:department/:courseName" element={<CourseDetailsPage />} />

          {/* 🔐 Authentication & Registration Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />

          {/* ❌ Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default Index;
