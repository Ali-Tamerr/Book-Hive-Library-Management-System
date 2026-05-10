import React from "react";
import { getCurrentUser } from "../services/auth.api";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchValue, setSearchValue }) => {
  const location = useLocation();

  const [navVisibilty, setNavVisibilty] = useState(true);

  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    const authRoutes = [
      "/login",
      "/signup",
      "/forgot-password",
      "/otp",
      "/reset-password",
    ];
    if (authRoutes.includes(location.pathname)) {
      setNavVisibilty(false);
    } else {
      setNavVisibilty(true);
    }
  }, [location.pathname]);

  const isDashboard = location.pathname === "/dashboard";
  const showSearchInput = !isDashboard;
  return (
    <div className="flex h-full w-full rounded-xl border border-[#000035] dark:border-[#D7D7D7]">
      <button className="h-full cursor-pointer pl-3 py-2 font-[Noto_Sans_Georgian,sans-serif] text-[#000035] dark:text-[#D7D7D7]">
        <Search className="h-full w-full" />
      </button>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pr-15 h-full w-full bg-transparent pl-3 text-[0.9375rem] text-[#000035] outline-none dark:text-[#D7D7D7] placeholder:text-[#000035] dark:placeholder:text-[#D7D7D7]"
      />
    </div>
  );
};

export default SearchBar;
