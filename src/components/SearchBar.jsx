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
    <div className='flex w-full bg-white dark:bg-[#D7D7D7] border h-full border-zinc-400 dark:border-[#292D32] rounded-xl'>
      <button className="h-full text-gray-500 dark:text-[#121317] pl-3 py-1 cursor-pointer"><Search size={15} /></button>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-3 pr-15 py-1 w-full h-full bg-transparent outline-none text-xs dark:text-[#E8E8E8] dark:placeholder-[#121317]"
      />
    </div>
  )
}

export default SearchBar