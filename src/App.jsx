import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect,lazy } from 'react';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const OTP = lazy(() => import('./pages/OTP'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Overdue = lazy(() => import('./pages/Overdue'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const TestAPI = lazy(() => import('./pages/TestAPI'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Books = lazy(() => import('./pages/Books'));
const Categories = lazy(() => import('./pages/Categories'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


function AppContent() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setActiveTab(location.pathname.substring(1));
  }, [location.pathname]);

  const [showPopup, setShowPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);
  return (
    <div className="flex h-screen bg-[#f5f7fb] text-[#0a0f33]">

      <Sidebar
        activeTab={activeTab}
        isExpanded={isExpanded}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} toggleSidebar={toggleSidebar} />

          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            <Route path="/overdue" element={<ProtectedRoute><Overdue /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/test-api" element={<ProtectedRoute><TestAPI /></ProtectedRoute>} />
            <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>

        {showPopup && (
          <div className="fixed inset-0 bg-[rgba(10,15,51,0.5)] flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-[0_5px_25px_rgba(0,0,0,0.1)]">
              <h3 className="text-center text-lg mb-4">Change Credentials</h3>
              <form className="space-y-3">
                <label className="text-sm font-medium block">Enter Current Password</label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <label className="text-sm font-medium block">Enter New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <label className="text-sm font-medium block">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
                />
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="w-[48%] bg-gray-300 text-black rounded-lg py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[48%] bg-[#0a0f33] text-white rounded-lg py-2 hover:bg-[#192261]"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;