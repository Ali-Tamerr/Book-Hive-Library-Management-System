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
  ChevronDown,
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
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
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
      const planId = currentUser?.plan || "Discover";
      const planObj = plansData?.find((p) => p.id === planId);
      return planObj ? `${planObj.title}` : "User";
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

  const notificationOrFeedbackItem = (roleLabel === "Admin" ||
    roleLabel === "Super Admin" ||
    roleLabel === "Librarian" ||
    currentUser?.role?.toLowerCase() === "admin" ||
    currentUser?.role?.toLowerCase() === "super admin") ? (
      <AdminNotifications />
    ) : (
      <button
        className="flex h-9 w-9 cursor-pointer items-center justify-center p-0.5 transition-colors hover:text-[#1e255e] dark:hover:text-[#9CA3AF]"
        onClick={() => setShowFeedbackPopup(true)}
        title="Give Feedback"
      >
        <FeedbackIcon className="h-full w-full" />
      </button>
    );

  return (
    <>
      <header className="flex h-min w-full items-center justify-between px-4 py-4 text-[#000035] dark:text-[#E8E8E8]">
        {/* LEFT SIDE: Profile Section */}
        <div className="flex-2 relative flex items-center gap-3">
          <div
            className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#D7D7D7]"
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          >
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

          <ChevronDown
            className="max-[67.5rem]:block hidden h-5 w-5 cursor-pointer hover:opacity-80"
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          />

          <div className="max-[67.5rem]:hidden flex flex-col text-left">
            <h3 className="max-[30rem]:text-sm text-xl font-semibold tracking-wider">
              {currentUser
                ? currentUser.first_name + " " + currentUser.last_name || "User"
                : "Loading..."}
            </h3>
            <p className="-mt-[0.25rem] text-[0.75rem] font-semibold">
              {roleLabel}
            </p>
          </div>

          {/* MOBILE DROPDOWN */}
          {isMobileDropdownOpen && (
            <div className="max-[67.5rem]:flex absolute left-0 top-14 z-50 hidden w-48 flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-[#121317]">
              <div className="flex flex-col border-b pb-3 text-left dark:border-gray-700">
                <h3 className="truncate text-base font-semibold text-[#000035] dark:text-[#E8E8E8]">
                  {currentUser
                    ? currentUser.first_name + " " + currentUser.last_name ||
                      "User"
                    : "Loading..."}
                </h3>
                <p className="mt-1 text-xs text-[#000035] opacity-80 dark:text-[#E8E8E8]">
                  {roleLabel}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                {notificationOrFeedbackItem}
                <button
                  className="h-7 w-7 cursor-pointer transition-colors hover:text-[#1e255e] dark:hover:text-[#9CA3AF]"
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
                  className="h-7 w-7 cursor-pointer transition-colors hover:text-[#1e255e] dark:hover:text-[#9CA3AF]"
                  onClick={() => setShowSettings(true)}
                  title="Settings"
                >
                  <Settings className="h-full w-full" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Time, Icons, Hamburger */}
        <div className="flex h-min flex-1 items-center justify-end gap-3">
          {/* Always visible Time & Date (Including mobile) */}
          <div className="flex flex-col text-right">
            <span className="whitespace-nowrap font-['Bebas_Neue'] text-xl font-bold leading-none">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <p className="whitespace-nowrap leading-none mt-[0.0625rem] text-xs font-medium">
              {new Date().toLocaleDateString(undefined, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="max-[67.5rem]:hidden h-10 w-0.5 rounded-full bg-[#0b0b3b] dark:bg-white"></div>

          <div className="max-[67.5rem]:hidden flex items-center gap-3">
            {notificationOrFeedbackItem}
            <button
              className="h-8 w-8 cursor-pointer transition-colors hover:text-[#1e255e] dark:hover:text-[#9CA3AF]"
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
              className="h-8 w-8 cursor-pointer transition-colors hover:text-[#1e255e] dark:hover:text-[#9CA3AF]"
              onClick={() => setShowSettings(true)}
              title="Settings"
            >
              <Settings className="h-full w-full" />
            </button>
          </div>

          <button
            onClick={toggleSidebar}
            className="max-[67.5rem]:block ml-2 hidden cursor-pointer"
          >
            <Menu className="h-8 w-8" />
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
