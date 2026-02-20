import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoIcon from "../assets/logo.svg?react";
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

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, toggleSidebar }) => {
  const currentUser = getCurrentUser();
  const isAdmin =
    currentUser &&
    (currentUser.role === "Admin" || currentUser.role === "Super Admin");
  // Sidebar behavior: Always expanded for Admins, Always collapsed for Users (no hover)
  const isExpanded = isAdmin;

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
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#0000009a] bg-opacity-50 backdrop-blur-lg transition-opacity duration-300 ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} hidden max-[1080px]:block`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`flex flex-col items-stretch justify-start overflow-hidden bg-[#0a0f33] pb-3 pt-6 text-white transition-all duration-300 dark:bg-[#D7D7D7] dark:text-black ${isExpanded ? "w-55" : "w-24"} max-[1080px]:fixed max-[1080px]:z-50 max-[1080px]:h-full max-[1080px]:w-64 max-[1080px]:transition-transform max-[1080px]:duration-300 ${isSidebarOpen ? "max-[1080px]:translate-x-0" : "max-[1080px]:translate-x-full"} relative shadow-lg max-[1080px]:right-0`}
      >
        <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[1px] bg-gray-200 dark:bg-gray-200" />

        <div className="relative z-10 h-40 self-center px-4 text-center">
          <LogoIcon
            className={` invert dark:invert-0 mx-auto transition-all duration-300 ${isExpanded ? "h-13 w-13" : "h-14 w-12"} max-[1080px]:h-22 max-[1080px]:w-20`}
          />

          <h2
            className={`text-center text-3xl leading-none transition-all duration-300 ${isExpanded ? "max-w-full scale-100 opacity-100" : "max-w-0 scale-50 overflow-hidden opacity-0"} whitespace-nowrap max-[1080px]:mt-2 max-[1080px]:max-w-full max-[1080px]:scale-100 max-[1080px]:text-center max-[1080px]:opacity-100`}
          >
            BookHive
            <span className="-mt-0.5 block text-center font-['Merienda_One',cursive] text-xl text-[#b5b8d1] dark:text-black">
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
                  navigate("/user/dashboard");
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
                  navigate("/user/catalog");
                }}
                icon={<Compass size={18} strokeWidth={2.3} />}
                text="Catalog"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/user/chatbot"}
                onClick={() => {
                  navigate("/user/chatbot");
                }}
                icon={<MessageSquare size={18} strokeWidth={2.3} />}
                text="Chatbot"
                toggleSidebar={toggleSidebar}
              />
            </nav>
            <div className="pointer-events-none absolute bottom-0 left-0 -ml-[0.6px] h-20 w-full bg-gradient-to-t from-[#0a0f33] to-transparent dark:from-[#D7D7D7]" />
          </div>
        )}
        {isAdmin && (
          <div className="relative z-10 mt-10 flex w-full flex-1 flex-col overflow-hidden">
            <nav className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pb-3 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/dashboard"}
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
                icon={<Home size={18} strokeWidth={2.3} />}
                text="Dashboard"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname.startsWith("/admin/catalog")}
                onClick={() => {
                  navigate("/admin/catalog");
                }}
                icon={<Compass size={18} strokeWidth={2.3} />}
                text="Catalog"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/books"}
                onClick={() => {
                  navigate("/admin/books");
                }}
                icon={<BookOpen size={18} strokeWidth={2.3} />}
                text="Books"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/user-management"}
                onClick={() => {
                  navigate("/admin/user-management");
                }}
                icon={<Users size={18} strokeWidth={2.3} />}
                text="Users"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/branches"}
                onClick={() => {
                  navigate("/admin/branches");
                }}
                icon={<MapPin size={18} strokeWidth={2.3} />}
                text="Branches"
                toggleSidebar={toggleSidebar}
              />
              <NavLink
                isExpanded={isExpanded}
                active={location.pathname === "/admin/categories"}
                onClick={() => {
                  navigate("/admin/categories");
                }}
                icon={<Shapes size={18} strokeWidth={2.3} />}
                text="Categories"
                toggleSidebar={toggleSidebar}
              />
            </nav>
            <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#0a0f33] to-transparent dark:from-[#D7D7D7]" />
          </div>
        )}
        <div
          className={`mt-auto flex w-full flex-col gap-2 transition-all duration-300 dark:bg-[#D7D7D7] ${isExpanded ? "" : "flex justify-center"}`}
        >
          <div className="hidden max-[1080px]:block">
            <NavLink
              isExpanded={isExpanded}
              active={location.pathname === "/admin/settings"}
              onClick={() => {
                navigate("/settings");
              }}
              icon={<Settings size={18} strokeWidth={2.3} />}
              text="Settings"
              toggleSidebar={toggleSidebar}
            />
          </div>

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
