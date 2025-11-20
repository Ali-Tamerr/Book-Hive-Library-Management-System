import React from 'react'
import { Settings, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from '../admin/services/auth.api';
import SearchBar from '../components/SearchBar';

const Navbar = ({ toggleSidebar, searchValue, setSearchValue }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [navVisibilty, setNavVisibilty] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Update the user whenever the route changes
    setCurrentUser(getCurrentUser());

    const authRoutes = ['/login', '/signup', '/forgot-password', '/otp', '/reset-password'];
    if (authRoutes.includes(location.pathname)) {
      setNavVisibilty(false);
    } else {
      setNavVisibilty(true);
    }
  }, [location.pathname]);

  // Hide search bar if on dashboard route
  const isDashboard = location.pathname === '/dashboard';
  const showSearchInput = !isDashboard;

  return (

    <header className={`${navVisibilty ? '' : 'hidden'} bg-white text-black flex items-center justify-between  h-min px-6 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]`}>
      <div className="flex items-center gap-3 flex-2">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div>
          <h3 className="text-lg font-semibold max-[480px]:text-sm max-[350px]:text-xs">
            {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Loading...'}
          </h3>
          <p className="text-sm max-[350px]:text-[10px] text-gray-600">{currentUser?.role || 'User'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-1 h-min justify-end">
        <div className="text-right max-[1080px]:hidden ">
          <span className="text-xs font-semibold">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <p className="text-xs text-gray-600">
            {new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
          </p>
        </div>
        <button className="text-2xl max-[1080px]:hidden"><Settings /></button>
        <button onClick={toggleSidebar} className="text-2xl hidden max-[1080px]:block"><Menu /></button>
      </div>
    </header>
  );
}

export default Navbar