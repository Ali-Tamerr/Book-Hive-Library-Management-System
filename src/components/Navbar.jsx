import React, { useState, useEffect } from 'react'
import { Settings, Menu, UserRound, Search, Sun, Moon, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/auth.api';
import SearchBar from './SearchBar';
import GlobalSearchPopup from './GlobalSearchPopup';
import SettingsPopup from './SettingsPopup';

const Navbar = ({ toggleSidebar, searchValue, setSearchValue }) => {
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [, setForceUpdate] = useState(0);
  const location = useLocation();

  const currentUser = getCurrentUser();
  const roleLabel =
    currentUser?.role?.toLowerCase() === 'admin'
      ? 'Librarian'
      : currentUser?.role || 'User';

  useEffect(() => {
    const handleUpdate = () => {
      setForceUpdate(prev => prev + 1);
    };

    const handlePageShow = (event) => {
      if (event.persisted) {
        setForceUpdate(prev => prev + 1);
      }
    };

    const handleStorageChange = () => {
      const theme = localStorage.getItem('selected-theme');
      setIsDarkMode(theme === 'dark');
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('userUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('storage', handleStorageChange); // Listen for theme changes

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('userUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Initialize theme state
  useEffect(() => {
    const selectedTheme = localStorage.getItem('selected-theme');
    if (selectedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('selected-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('selected-theme', 'dark');
      setIsDarkMode(true);
    }
    // Dispatch storage event to sync across tabs/windows if needed, 
    // though 'storage' event fires naturally on other tabs.
    // To sync same-page components immediately if they relied on listener:
    window.dispatchEvent(new Event('storage'));
  };

  const isDashboard = location.pathname === '/dashboard';
  const showSearchInput = !isDashboard;

  return (
    <>
      <header className="bg-white dark:bg-[#121317] text-[#0a0f33] dark:text-[#E8E8E8] flex-1 flex items-center justify-between h-min px-4 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 flex-2">
          <UserRound className="w-12 h-12" />
          <div>
            <h3 className="text-lg font-semibold max-[480px]:text-sm max-[350px]:text-xs">
              {currentUser ? currentUser.name || 'User' : 'Loading...'}
            </h3>
            <p className="text-sm font-semibold max-[350px]:text-[10px]">{roleLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-1 h-min justify-end">
          <div className="text-right max-[1080px]:hidden ">
            <span className="text-sm font-bold">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <p className="text-xs font-medium ">
              {new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
            </p>
          </div>
          <div className='w-0.5 max-[1080px]:hidden h-10 rounded-full bg-[#0b0b3b] dark:bg-white'></div>
          <button
            className="max-[1080px]:hidden w-8 h-8 cursor-pointer hover:text-[#1e255e] dark:hover:text-[#9CA3AF] transition-colors"
            title="Notifications"
            onClick={() => {
              if (location.pathname === '/admin/user-management') {
                window.dispatchEvent(new Event('openUserRequests'));
              }
            }}
            type="button"
          >
            <Bell className='h-full w-full' />
          </button>
          <button
            className="max-[1080px]:hidden w-8 h-8 hover:text-[#1e255e] dark:hover:text-[#9CA3AF] transition-colors cursor-pointer"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className='h-full w-full' /> : <Moon className='h-full w-full' />}
          </button>
          <button
            className="max-[1080px]:hidden w-8 h-8 cursor-pointer hover:text-[#1e255e] dark:hover:text-[#9CA3AF] transition-colors"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            <Settings className='h-full w-full' />
          </button>
          <button onClick={toggleSidebar} className=" hidden max-[1080px]:block cursor-pointer"><Menu className='h-full w-full' /></button>
        </div>
      </header>
      <GlobalSearchPopup show={showGlobalSearch} onClose={() => setShowGlobalSearch(false)} />
      <SettingsPopup show={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

export default Navbar
