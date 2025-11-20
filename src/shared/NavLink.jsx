import React from 'react';

const NavLink = ({ isExpanded, active, onClick, icon, text, toggleSidebar }) => {
  const handleClick = () => {
    onClick();
    if (window.innerWidth <= 1080) {
      toggleSidebar();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`h-12 w-full my-1 transition-all duration-300 flex justify-start items-center ${
        isExpanded ? 'px-8 gap-2' : 'px-[39px] gap-0'
      } ${
        active
          ? 'bg-white text-[#0a0f33] rounded-l-[30px] font-medium'
          : 'text-[#b5b8d1] hover:bg-white/10'
      } max-[1080px]:gap-2 max-[1080px]:px-8`}
    >
      <span className="flex items-center" style={{ width: 20, height: 20 }}>
        {typeof icon === 'string' ? (
          <img src={icon} alt="icon" style={{ width: '22px', height: '22px' }} />
        ) : (
          React.cloneElement(icon, { width: 22, height: 22 })
        )}
      </span>
      <span
        className={`transition-all duration-300 text-sm flex-1 text-start ${isExpanded ? 'max-w-full opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'} max-[1080px]:max-w-full max-[1080px]:opacity-100 max-[1080px]:ml-2`}>
        {text}
      </span>
    </button>
  );
};

export default NavLink;