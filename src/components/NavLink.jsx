import React from 'react';

const NavLink = ({ isExpanded, active, onClick, icon, text }) => {
  return (
    <button
      onClick={onClick}
      className={`h-15 w-full my-1 transition-all duration-300 flex items-center ${
        isExpanded ? 'px-8 gap-2' : 'px-[39px] gap-0'
      } ${
        active
          ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium'
          : 'text-[#b5b8d1] hover:bg-white/10'
      }`}
    >
      {icon}
      <span className={`transition-all duration-300 ${isExpanded ? 'max-w-full opacity-100 ml-2' : 'max-w-0 opacity-0 overflow-hidden ml-0'}`}>{text}</span>
    </button>
  );
};

export default NavLink;