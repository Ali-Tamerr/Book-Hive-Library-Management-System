import React from 'react'

import { useState } from 'react';
import { getCurrentUser } from '../services/auth.api';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [currentUser] = useState(getCurrentUser());
    // Hide search bar if on dashboard route
    const isDashboard = window.location.pathname === '/dashboard';
    const showSearchInput = !isDashboard;
  return (
    
        <header className="bg-white flex justify-between items-center px-6 py-3 border-b-2 border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            <div>
            <h3 className="text-lg font-semibold">
              {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Loading...'}
            </h3>
            <p className="text-sm text-gray-600">{currentUser?.role || 'User'}</p>
          </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-semibold">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <p className="text-xs text-gray-600">
                {new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
              </p>
            </div>
            <div className={`relative bg-gray-100 rounded flex items-center overflow-hidden ${showSearchInput ? '' : 'hidden'}`}>
              <input
                type="text"
                id="searchInput"
                placeholder="Search by ID or Name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-3 py-1 bg-transparent outline-none text-xs"
              />
              <button className="bg-[#0b0c2a] text-white px-2 py-1">🔍</button>
            </div>
            <button className="text-2xl">⚙️</button>
            
          </div> 
        </header>
  );
}

export default Navbar