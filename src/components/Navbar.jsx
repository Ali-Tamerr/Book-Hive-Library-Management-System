import React from 'react'
import { Settings, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/auth.api';
import SearchBar from './SearchBar';

const Navbar = ({ toggleSidebar, searchValue, setSearchValue }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [navVisibilty, setNavVisibilty] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const updateAuth = () => {
      const user = getCurrentUser();
      console.log('Navbar: Current user from localStorage:', user);
      setCurrentUser(user);
    };

    updateAuth();

    window.addEventListener('storage', updateAuth);
    window.addEventListener('userUpdated', updateAuth);

    const authRoutes = ['/login', '/signup', '/forgot-password', '/otp', '/reset-password'];
    if (authRoutes.includes(location.pathname)) {
      setNavVisibilty(false);
    } else {
      setNavVisibilty(true);
    }

    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('userUpdated', updateAuth);
    };
  }, [location.pathname]);

  const isDashboard = location.pathname === '/dashboard';
  const showSearchInput = !isDashboard;

  return (

    <header className={`${navVisibilty ? '' : 'hidden'} bg-white text-[#0a0f33] flex-1 flex items-center justify-between  h-min px-4 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]`}>
      <div className="flex items-center gap-3 flex-2">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div>
          <h3 className="text-lg font-semibold max-[480px]:text-sm max-[350px]:text-xs">
            {currentUser ? `${currentUser.first_name || currentUser.firstName || ''} ${currentUser.last_name || currentUser.lastName || ''}`.trim() || 'User' : 'Loading...'}
          </h3>
          <p className="text-sm max-[350px]:text-[10px] text-gray-600">{currentUser?.role || 'User'}</p>
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
        <div className='w-0.5 max-[1080px]:hidden h-10 rounded-full bg-[#0b0b3b]'></div>
        <button className=" max-[1080px]:hidden w-8 h-8"><Settings className='h-full w-full'/></button>
        <button onClick={toggleSidebar} className=" hidden max-[1080px]:block"><Menu className='h-full w-full'/></button>
      </div>
    </header>
  );
}

export default Navbar