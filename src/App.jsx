import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./Home/Home"));
import Login from "./shared/Login";
const Signup = lazy(() => import("./shared/Signup"));
const ForgotPassword = lazy(() => import("./shared/ForgotPassword"));
const OTP = lazy(() => import("./shared/OTP"));
const ResetPassword = lazy(() => import("./shared/ResetPassword"));

const AdminDashboard = lazy(() => import("./Admin pages/Dashboard"));
const Overdue = lazy(() => import("./Admin pages/Overdue"));
const UserManagement = lazy(() => import("./Admin pages/UserManagement"));
const Catalog = lazy(() => import("./Admin pages/Catalog"));
const Books = lazy(() => import("./Admin pages/Books"));
const Categories = lazy(() => import("./Admin pages/Categories"));
const Settings = lazy(() => import("./shared/Settings"));
const Branches = lazy(() => import("./Admin pages/Branches"));

const UserDashboard = lazy(() => import("./User pages/Dashboard"));
// const UserBooks = lazy(() => import("./User pages/UserBooks"));
const UserBorrowedBooks = lazy(() => import("./User pages/UserBorrowedBooks"));
const UserReturnedBooks = lazy(() => import("./User pages/UserReturnedBooks"));
const UserLibraryLane = lazy(() => import("./User pages/UserLibraryLane"));
const UserCatalog = lazy(() => import("./User pages/UserCatalog"));

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { NFCReaderProvider } from "./contexts/NFCReaderContext";
import { getCurrentUser } from "./services/auth.api";

function Layout({
  children,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  toggleSidebar,
  searchValue,
  setSearchValue,
}) {
  const location = useLocation();
  const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/otp",
    "/reset-password",
  ];
  const isAuthRoute = authRoutes.includes(location.pathname);
  const isHomePage = location.pathname === "/";
  const isProtectedRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user");
  const currentUser = getCurrentUser();

  useEffect(() => {
    window.dispatchEvent(new Event("userUpdated"));

    // Enforce theme sync on route change
    const selectedTheme = localStorage.getItem("selected-theme");
    if (selectedTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [location.pathname]);

  // Global Theme Initialization
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selected-theme");
    if (selectedTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, []);

  if (isProtectedRoute && !currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser && location.pathname.startsWith("/user")) {
    const role = currentUser.role?.toLowerCase();
    if (role === "admin" || role === "super admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  if (currentUser && location.pathname.startsWith("/admin")) {
    const role = currentUser.role?.toLowerCase();
    if (role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  if (isHomePage) {
    return (
      <Suspense
        fallback={
          <PageLoader className="bg-[hsl(230,100%,96%)] dark:bg-[#111214]" />
        }
      >
        {children}
      </Suspense>
    );
  }

  if (isAuthRoute) {
    return (
      <div className="h-screen bg-[#F2F2F2] text-[#0a0f33]">
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F2F2F2] text-[#0a0f33] transition-colors duration-300 dark:bg-[#121317] dark:text-[#E8E8E8]">
      <Sidebar
        key={`sidebar-${location.pathname}`}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="montserrat-regular flex h-full flex-1 flex-col overflow-hidden">
        <Navbar
          key={`navbar-${location.pathname}`}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-99 [1540px]:py-0 h-0 min-h-0 overflow-auto">
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = React.useState("");
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <NFCReaderProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="admin/overdue"
              element={
                <Overdue
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route
              path="admin/user-management"
              element={
                <UserManagement
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route
              path="admin/catalog"
              element={
                <Catalog
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route
              path="admin/books"
              element={
                <Books
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route
              path="admin/categories"
              element={
                <Categories
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route path="admin/settings" element={<Settings />} />
            <Route
              path="admin/branches"
              element={
                <Branches
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />

            <Route path="/user/dashboard" element={<UserDashboard />} />
            {/* <Route path="/user/books" element={<UserBooks />} /> */}
            <Route path="/user/catalog" element={<UserCatalog />} />
            <Route
              path="/user/catalog/borrowed"
              element={<UserBorrowedBooks />}
            />
            <Route
              path="/user/catalog/returned"
              element={<UserReturnedBooks />}
            />
            <Route path="/user/library" element={<UserLibraryLane />} />
          </Routes>
        </Layout>
      </Router>
    </NFCReaderProvider>
  );
}

export default App;
