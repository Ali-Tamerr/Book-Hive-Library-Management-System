import React from 'react'
import { getCurrentUser } from '../admin/services/auth.api';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';



const SearchBar = ({ searchValue }) => {
  const location = useLocation();

  const [navVisibilty, setNavVisibilty] = useState(true);

  const [currentUser, setCurrentUser] = useState(getCurrentUser());

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
    <div className='flex bg-zinc-200 border h-full border-zinc-400 rounded-2xl'>
      <button className="h-full text-grey-500 px-2 py-1 cursor-pointer"><Search size={15} /></button>
      <input
        type="text"
        id="searchInput"
        placeholder="Search by ID or Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="px-3 py-1 w-full h-full bg-transparent outline-none text-xs"
      />
    </div>
  )
}

export default SearchBar