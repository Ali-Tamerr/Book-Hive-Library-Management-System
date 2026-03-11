import React, { useState, useEffect } from "react";
import { useUser } from "../hooks/useUsers";
import { usePlans } from "../hooks/usePlans";
import { getImageUrl } from "../services/api.config";
import {
  Settings,
  Menu,
  UserRound,
  Search,
  Sun,
  Moon,
  Bell,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/auth.api";
import SearchBar from "./SearchBar";
import GlobalSearchPopup from "./GlobalSearchPopup";
import SettingsPopup from "./SettingsPopup";
import AdminNotifications from "./AdminNotifications";
import FeedbackPopup from "./FeedbackPopup";
import FeedbackIcon from "../assets/img/ix_feedback-filled.svg?react";

const Navbar = ({ toggleSidebar, searchValue, setSearchValue }) => {
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [, setForceUpdate] = useState(0);
  const location = useLocation();

  const localUser = getCurrentUser();
  const { data: userProfile } = useUser(localUser?.user_id);
  const currentUser =
    userProfile && userProfile.user_id ? userProfile : localUser;

  const { data: plansData } = usePlans();

  const getRoleLabel = () => {
    const role = currentUser?.role?.toLowerCase();
    if (role === "admin") return "Librarian";
    if (role === "user") {
      const planId = currentUser?.plan || "plan-discover";
      const planObj = plansData?.find((p) => p.id === planId);
      return planObj ? `Plan: ${planObj.title}` : "User";
    }
    return currentUser?.role || "User";
  };
  const roleLabel = getRoleLabel();

  useEffect(() => {
    const handleUpdate = () => {
      setForceUpdate((prev) => prev + 1);
    };

    const handlePageShow = (event) => {
      if (event.persisted) {
        setForceUpdate((prev) => prev + 1);
      }
    };

    const handleStorageChange = () => {
      const theme = localStorage.getItem("selected-theme");
      setIsDarkMode(theme === "dark");
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("userUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("storage", handleStorageChange); // Listen for theme changes

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("userUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Initialize theme state
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selected-theme");
    if (selectedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("selected-theme", "light");
      setIsDarkMode(false);
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("selected-theme", "dark");
      setIsDarkMode(true);
    }
    // Dispatch storage event to sync across tabs/windows if needed,
    // though 'storage' event fires naturally on other tabs.
    // To sync same-page components immediately if they relied on listener:
    window.dispatchEvent(new Event("storage"));
  };

  const isDashboard = location.pathname === "/dashboard";
  const showSearchInput = !isDashboard;

  return (
    <>
      <header className="flex h-min w-full items-center justify-between px-4 py-4 text-[#000035] dark:text-[#E8E8E8]">
        <div className="flex-2 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]">
            {currentUser?.image_url ? (
              <img
                src={getImageUrl(currentUser.image_url)}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound className="h-12 w-12 dark:text-[#121317]" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-xl font-semibold tracking-wider max-[480px]:text-sm max-[350px]:text-xs">
              {currentUser
                ? currentUser.first_name + " " + currentUser.last_name || "User"
                : "Loading..."}
            </h3>
            <p className="text-[12px] -mt-[4px] font-semibold max-[350px]:text-[10px]">
              {roleLabel}
            </p>
          </div>
        </div>
        <div className="flex h-min flex-1 items-center justify-end gap-3">
          <div className="flex flex-col text-right max-[1080px]:hidden">
            <span className="font-['Bebas_Neue'] text-xl font-bold leading-none">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <p className="mt-[1px] text-xs font-medium leading-none">
              {new Date().toLocaleDateString(undefined, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="h-10 w-0.5 rounded-full bg-[#0b0b3b] max-[1080px]:hidden dark:bg-white"></div>
          {roleLabel === "Admin" ||
          roleLabel === "Super Admin" ||
          roleLabel === "Librarian" ||
          currentUser?.role?.toLowerCase() === "admin" ||
          currentUser?.role?.toLowerCase() === "super admin" ? (
            <AdminNotifications />
          ) : (
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center p-0.5 transition-colors hover:text-[#1e255e] max-[1080px]:hidden dark:hover:text-[#9CA3AF]"
              onClick={() => setShowFeedbackPopup(true)}
              title="Give Feedback"
            >
              <FeedbackIcon className="h-full w-full" />
            </button>
          )}
          <button
            className="h-8 w-8 cursor-pointer transition-colors hover:text-[#1e255e] max-[1080px]:hidden dark:hover:text-[#9CA3AF]"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="h-full w-full" />
            ) : (
              <Moon className="h-full w-full" />
            )}
          </button>
          <button
            className="h-8 w-8 cursor-pointer transition-colors hover:text-[#1e255e] max-[1080px]:hidden dark:hover:text-[#9CA3AF]"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            <Settings className="h-full w-full" />
          </button>
          <button
            onClick={toggleSidebar}
            className="hidden cursor-pointer max-[1080px]:block"
          >
            <Menu className="h-full w-full" />
          </button>
        </div>
      </header>
      <GlobalSearchPopup
        show={showGlobalSearch}
        onClose={() => setShowGlobalSearch(false)}
      />
      <SettingsPopup
        show={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <FeedbackPopup
        show={showFeedbackPopup}
        onClose={() => setShowFeedbackPopup(false)}
      />
    </>
  );
};

export default Navbar;
