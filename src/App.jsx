import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import Login from './shared/Login';
const Signup = lazy(() => import('./shared/Signup'));
const ForgotPassword = lazy(() => import('./shared/ForgotPassword'));
const OTP = lazy(() => import('./shared/OTP'));
const ResetPassword = lazy(() => import('./shared/ResetPassword'));

const AdminDashboard = lazy(() => import('./Admin pages/Dashboard'));
const Overdue = lazy(() => import('./Admin pages/Overdue'));
const UserManagement = lazy(() => import('./Admin pages/UserManagement'));
const Catalog = lazy(() => import('./Admin pages/Catalog'));
const Books = lazy(() => import('./Admin pages/Books'));
const Categories = lazy(() => import('./Admin pages/Categories'));
const Settings = lazy(() => import('./shared/Settings'));
const Branches = lazy(() => import('./Admin pages/Branches'));

const UserDashboard = lazy(() => import('./User pages/Dashboard'));
const UserBooks = lazy(() => import('./User pages/UserBooks'));
const UserBorrowedBooks = lazy(() => import('./User pages/UserBorrowedBooks'));
const UserReturnedBooks = lazy(() => import('./User pages/UserReturnedBooks'));
const UserLibraryLane = lazy(() => import('./User pages/UserLibraryLane'));
const UserCatalog = lazy(() => import('./User pages/UserCatalog'));

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { NFCReaderProvider } from './contexts/NFCReaderContext';

function Layout({ children, activeTab, setActiveTab, isSidebarOpen, toggleSidebar, searchValue, setSearchValue }) {
  const location = useLocation();
  const authRoutes = ['/login', '/signup', '/forgot-password', '/otp', '/reset-password', '/'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  if (isAuthRoute) {
    return (
      <div className="h-screen bg-[#F2F2F2] text-[#0a0f33]">
        <Suspense fallback={<div className="h-screen bg-[#F2F2F2]"></div>}>
          {children}
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F2F2F2] text-[#0a0f33]">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 h-full flex flex-col overflow-hidden montserrat-regular">
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} toggleSidebar={toggleSidebar} />
        <div className="flex-99 h-full">
          <Suspense fallback={<div className="h-full bg-[#F2F2F2]"></div>}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = React.useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <NFCReaderProvider>
      <Router>
        <Layout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        >
          <Routes>
            <Route path="/user/returned" element={<UserReturnedBooks />} />
            <Route path="/user/library" element={<UserLibraryLane />} />

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </Router>
    </NFCReaderProvider>
  );
}

export default App;