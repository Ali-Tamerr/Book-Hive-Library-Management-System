import React from 'react'
import { getCurrentUser } from '../services/auth.api';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchValue, setSearchValue }) => {
  const location = useLocation();

  const [navVisibilty, setNavVisibilty] = useState(true);

  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    const authRoutes = ['/login', '/signup', '/forgot-password', '/otp', '/reset-password'];
    if (authRoutes.includes(location.pathname)) {
      setNavVisibilty(false);
    } else {
      setNavVisibilty(true);
    }
  }, [location.pathname]);

  const isDashboard = location.pathname === '/dashboard';
  const showSearchInput = !isDashboard;
  return (
    <div className='flex w-full bg-white border h-full border-zinc-400 rounded-2xl'>
      <button className="h-full text-grey-500 px-2 py-1 cursor-pointer"><Search size={15} /></button>
      <input
        type="text"
        placeholder="Search by ID or Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="px-3 py-1 w-full h-full bg-transparent outline-none text-xs"
      />
    </div>
  )
}

export default SearchBar