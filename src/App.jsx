import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Login = lazy(() => import('./shared/Login'));
const Signup = lazy(() => import('./shared/Signup'));
const ForgotPassword = lazy(() => import('./shared/ForgotPassword'));
const OTP = lazy(() => import('./shared/OTP'));
const ResetPassword = lazy(() => import('./shared/ResetPassword'));

const AdminDashboard = lazy(() => import('./Admin pages/Dashboard'));
const Overdue = lazy(() => import('./Admin pages/Overdue'));
const UserManagement = lazy(() => import('./Admin pages/UserManagement'));
const TestAPI = lazy(() => import('./Admin pages/TestAPI'));
const Catalog = lazy(() => import('./Admin pages/Catalog'));
const Books = lazy(() => import('./Admin pages/Books'));
const Categories = lazy(() => import('./Admin pages/Categories'));
const Reports = lazy(() => import('./Admin pages/Reports'));
const Settings = lazy(() => import('./Admin pages/Settings'));
const Branches = lazy(() => import('./Admin pages/Branches'));

const UserDashboard = lazy(() => import('./User pages/Dashboard'));
const UserBooks = lazy(() => import('./User pages/UserBooks'));
const UserBorrowedBooks = lazy(() => import('./User pages/UserBorrowedBooks'));
const UserReturnedBooks = lazy(() => import('./User pages/UserReturnedBooks'));
const UserLibraryLane = lazy(() => import('./User pages/UserLibraryLane'));
const UserCatalog = lazy(() => import('./User pages/UserCatalog'));

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

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
              <Route path="admin/branches" element={<Branches />} />

              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/books" element={<UserBooks />} />
              <Route path="/user/catalog" element={<UserCatalog />} />
              <Route path="/user/borrowed" element={<UserBorrowedBooks />} />
              <Route path="/user/returned" element={<UserReturnedBooks />} />
              <Route path="/user/library" element={<UserLibraryLane />} />

              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div >


  );
}

export default App;