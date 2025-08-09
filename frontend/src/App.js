import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Authentication middleware
import ProtectedRoute from './components/ProtectedRoute';

// Import from common
import Logout from './common/Logout';

// Admin layout and pages
import AdminLayout from './components/AdminLayout';
import Dashboard from './admin-pages/Dashboard';
import Universities from './admin-pages/ManageUniversities';
import Courses from './admin-pages/ManageCourses';
import AddDepartmentOrCourse from './admin-pages/AddDepartmentOrCourse';
import AdminDepartments from './admin-pages/AdminDepartments';
import ManagePaper from './admin-pages/ManagePapers';
import ManageSyllabus from './admin-pages/ManageSyllabus';
import ManageNotes from './admin-pages/ManageNotes';
import UploadResources from './admin-pages/UploadResources';
import AdminBooks from './admin-pages/AdminBooks';
import AdminRegister from './admin-pages/AdminRegister';
import AuthorityRegister from './admin-pages/AuthorityRegister';

// ✅ Authority layout and pages
import AuthorityLayout from './components/AuthorityLayout';
import AuthorityDashboard from './authority-pages/AuthorityDashboard';
import AuthorityProfile from './authority-pages/AuthorityProfile';

// ✅ User layout and pages
import UserLayout from './components/UserLayout';
import UserDashboard from './user-pages/UserDashboard';
import UserProfile from './user-pages/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>

        {/* 🌐 Public Routes */}
        <Route path="/*" element={<Index />} />

        {/* 🔐 Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="universities" element={<Universities />} />
          <Route path="courses" element={<Courses />} />
          <Route path="add-department-or-course" element={<AddDepartmentOrCourse />} />
          <Route path="edit-departments" element={<AdminDepartments />} />
          <Route path="add-paper" element={<ManagePaper />} />
          <Route path="add-syllabus" element={<ManageSyllabus />} />
          <Route path="add-notes" element={<ManageNotes />} />
          <Route path="upload-resources" element={<UploadResources />} />
          <Route path="add-books" element={<AdminBooks />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register-admin" element={<AdminRegister />} />
          <Route path="register-authority" element={<AuthorityRegister />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* 🔐 Authority Protected Routes */}
        <Route
          path="/authority"
          element={
            <ProtectedRoute allowedRoles={['authority']}>
              <AuthorityLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AuthorityDashboard />} />
          <Route path="profile" element={<AuthorityProfile />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* 🔐 User Protected Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* 🚫 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
