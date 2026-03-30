import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColorableLogo from "./ColorableLogo";
import {
  Home,
  BookOpen,
  Library,
  Users,
  BarChart2,
  Folder,
  LogOut,
  Settings,
  Book,
  RotateCcw,
  Globe,
  MapPin,
  Compass,
  Shapes,
  MessageSquare,
} from "lucide-react";
import { logout, getCurrentUser } from "../services/auth.api";

import NavLink from "./NavLink";

const Sidebar = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  toggleSidebar,
  setSidebarOpen,
}) => {
  const currentUser = getCurrentUser();
  const isAdmin =
    currentUser &&
    (currentUser.role === "Admin" || currentUser.role === "Super Admin");
  const isSuperAdmin = currentUser?.role === "Super Admin";
  // Sidebar behavior: Expand/collapse on hover using isSidebarOpen variable
  const isExpanded = isSidebarOpen;

  const [, setForceUpdate] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleUpdate = () => {
      setForceUpdate((prev) => prev + 1);
    };

    const handlePageShow = (event) => {
      if (event.persisted) {
        setForceUpdate((prev) => prev + 1);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("userUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("userUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { flushSync: true });
  };

  const goTo = (path) => {
    navigate(path, { flushSync: true });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#0000009a] bg-opacity-50 backdrop-blur-lg transition-opacity duration-[350ms] ease-[cubic-bezier(0.61,-0.01,0.34,0.99)] ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} hidden max-[67.5rem]:block`}
        onClick={toggleSidebar}
      ></div>
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => window.innerWidth > 1080 && setSidebarOpen(false)}
        className={`sidebar-stable-transition relative flex shrink-0 flex-col items-stretch justify-start overflow-hidden bg-[#000035] pb-3 pt-6 text-white dark:bg-[#D7D7D7] dark:text-black ${isExpanded ? "w-[16rem]" : "w-[4.5rem]"} max-[67.5rem]:fixed max-[67.5rem]:right-0 max-[67.5rem]:z-50 max-[67.5rem]:h-full max-[67.5rem]:w-64 ${isSidebarOpen ? "sidebar-mobile-active" : "sidebar-mobile-inactive"} shadow-lg`}
      >
        <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[0.0625rem] bg-gray-200 dark:bg-gray-200 max-[67.5rem]:hidden" />

        <div className="relative z-10 flex h-40 flex-col items-center justify-start text-center">
          <ColorableLogo
            className={`logo-stable-transition mx-auto ${isExpanded ? "h-16 w-16" : "h-10 w-10"} text-white dark:text-black`}
          />

          <h2
            className={`logo-stable-transition text-center text-3xl leading-none ${isExpanded ? "max-w-[12.5rem] scale-100 opacity-100" : "max-w-0 scale-50 overflow-hidden opacity-0"} whitespace-nowrap max-[67.5rem]:mt-2 max-[67.5rem]:max-w-full max-[67.5rem]:scale-100 max-[67.5rem]:text-center max-[67.5rem]:opacity-100`}
          >
            BookHive
            <span className="-mt-0.5 block text-center font-['Bebas_Neue',sans-serif] text-xl text-[#b5b8d1] dark:text-black">
              Library
            </span>
          </h2>
        </div>

        {!isAdmin && (
          <div className="relative z-10 mt-10 flex w-full flex-1 flex-col overflow-hidden">
            <nav className="h-full w-full overflow-y-auto overflow-x-hidden pb-10">
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/user/dashboard"}
                onClick={() => {
                  goTo("/user/dashboard");
                }}
                icon={<Home size={18} strokeWidth={2.3} />}
                text="Dashboard"
                toggleSidebar={toggleSidebar}
              />
              {/* Books NavLink Removed */}
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/user/catalog"}
                onClick={() => {
                  goTo("/user/catalog");
                }}
                icon={<Compass size={18} strokeWidth={2.3} />}
                text="Catalog"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/user/chatbot"}
                onClick={() => {
                  goTo("/user/chatbot");
                }}
                icon={<MessageSquare size={18} strokeWidth={2.3} />}
                text="Chatbot"
                toggleSidebar={toggleSidebar}
              />
            </nav>
            <div className="pointer-events-none absolute bottom-0 left-0 -ml-[0.0375rem] h-20 w-full bg-gradient-to-t from-[#000035] to-transparent dark:from-[#D7D7D7]" />
          </div>
        )}
        {isAdmin && (
          <div className="relative z-10 mt-10 flex w-full flex-1 flex-col overflow-hidden">
            <nav className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-3 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/dashboard"}
                onClick={() => {
                  goTo("/admin/dashboard");
                }}
                icon={<Home size={18} strokeWidth={2.3} />}
                text="Dashboard"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname.startsWith("/admin/catalog")}
                onClick={() => {
                  goTo("/admin/catalog");
                }}
                icon={<Compass size={18} strokeWidth={2.3} />}
                text="Catalog"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/books"}
                onClick={() => {
                  goTo("/admin/books");
                }}
                icon={<BookOpen size={18} strokeWidth={2.3} />}
                text="Books"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/user-management"}
                onClick={() => {
                  goTo("/admin/user-management");
                }}
                icon={<Users size={18} strokeWidth={2.3} />}
                text="Users"
                toggleSidebar={toggleSidebar}
              />
              {isSuperAdmin && (
                <>
                  <NavLink
                    isExpanded={isExpanded}
                    active={location.pathname === "/admin/branches"}
                    onClick={() => {
                      goTo("/admin/branches");
                    }}
                    icon={<MapPin size={18} strokeWidth={2.3} />}
                    text="Branches"
                    toggleSidebar={toggleSidebar}
                  />
                  <NavLink
                    isExpanded={isExpanded}
                    active={location.pathname === "/admin/categories"}
                    onClick={() => {
                      goTo("/admin/categories");
                    }}
                    icon={<Shapes size={18} strokeWidth={2.3} />}
                    text="Categories"
                    toggleSidebar={toggleSidebar}
                  />
                </>
              )}
            </nav>
            <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#000035] to-transparent dark:from-[#D7D7D7]" />
          </div>
        )}
        <div
          className={`mt-auto flex w-full flex-col gap-2 transition-all duration-[350ms] ease-[cubic-bezier(0.61,-0.01,0.34,0.99)] dark:bg-[#D7D7D7] ${isExpanded ? "" : "flex justify-center"}`}
        >
          <NavLink
            isExpanded={isExpanded}
            active={false}
            onClick={handleLogout}
            icon={<LogOut size={18} strokeWidth={2.3} />}
            text="Logout"
            toggleSidebar={toggleSidebar}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
