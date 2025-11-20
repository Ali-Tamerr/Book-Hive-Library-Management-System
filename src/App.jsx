import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

// import AdminLayout from './AdminLayout';
// import UserLayout from './UserLayout';

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

import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';

function App() {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#F2F2F2] text-[#0a0f33]">

      <Router>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 h-full flex flex-col overflow-hidden montserrat-regular">
          <Navbar searchValue={searchValue} setSearchValue={setSearchValue} toggleSidebar={toggleSidebar} />
          <div className="flex-1 h-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/overdue" element={<Overdue />} />
              <Route path="admin/user-management" element={<UserManagement />} />
              <Route path="admin/test-api" element={<TestAPI />} />
              <Route path="admin/catalog" element={<Catalog />} />
              <Route path="admin/books" element={<Books />} />
              <Route path="admin/categories" element={<Categories />} />
              <Route path="admin/reports" element={<Reports />} />
              <Route path="admin/settings" element={<Settings />} />

              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/borrowed" element={<UserBorrowedBooks />} />
              <Route path="/user/returned" element={<UserReturnedBooks />} />
              <Route path="/user/library" element={<UserLibraryLane />} />

              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          {/* </Suspense> */}
        </div>
      </main>
    </Router>
    </div >


  );
}

export default App;