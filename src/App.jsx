import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import OTP from './pages/OTP';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Overdue from './pages/Overdue';
import UserManagement from './pages/UserManagement';
import TestAPI from './pages/TestAPI';
import Catalog from './pages/Catalog';
import Books from './pages/Books';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react';


function AppContent() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    // Extracts path like "dashboard" from "/dashboard"
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
      />
      <main className="flex-1 flex flex-col">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />

          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/overdue" element={<Overdue />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/test-api" element={<TestAPI />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/books" element={<Books />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
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