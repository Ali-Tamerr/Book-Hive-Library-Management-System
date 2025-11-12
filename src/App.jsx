import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import AdminLayout from './AdminLayout';
import UserLayout from './UserLayout';

const Login = lazy(() => import('./admin/pages/Login'));
const Signup = lazy(() => import('./admin/pages/Signup'));
const ForgotPassword = lazy(() => import('./admin/pages/ForgotPassword'));
const OTP = lazy(() => import('./admin/pages/OTP'));
const ResetPassword = lazy(() => import('./admin/pages/ResetPassword'));

const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));
const Overdue = lazy(() => import('./admin/pages/Overdue'));
const UserManagement = lazy(() => import('./admin/pages/UserManagement'));
const TestAPI = lazy(() => import('./admin/pages/TestAPI'));
const Catalog = lazy(() => import('./admin/pages/Catalog'));
const Books = lazy(() => import('./admin/pages/Books'));
const Categories = lazy(() => import('./admin/pages/Categories'));
const Reports = lazy(() => import('./admin/pages/Reports'));
const Settings = lazy(() => import('./admin/pages/Settings'));

const UserDashboard = lazy(() => import('./user/pages/Dashboard'));
const UserBorrowedBooks = lazy(() => import('./user/pages/UserBorrowedBooks'));
const UserReturnedBooks = lazy(() => import('./user/pages/UserReturnedBooks'));
const UserLibraryLane = lazy(() => import('./user/pages/UserLibraryLane'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="overdue" element={<Overdue />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="test-api" element={<TestAPI />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="books" element={<Books />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="borrowed" element={<UserBorrowedBooks />} />
            <Route path="returned" element={<UserReturnedBooks />} />
            <Route path="library" element={<UserLibraryLane />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;