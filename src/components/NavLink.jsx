import React from "react";

const NavLink = ({
  isExpanded,
  active,
  onClick,
  icon,
  text,
  toggleSidebar,
}) => {
  const handleClick = () => {
    onClick();
    if (window.innerWidth <= 1080) {
      toggleSidebar();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`sidebar-stable-transition my-1 flex h-12 min-h-12 w-full cursor-pointer items-center justify-start overflow-x-hidden pl-[1.5625rem] font-bold ${
        active
          ? "bg-white text-[#000035] dark:bg-black dark:text-white"
          : "text-[#b5b8d1] hover:bg-white/10 dark:bg-[#D7D7D7] dark:text-black dark:hover:bg-black/5"
      } max-[67.5rem]:gap-2 max-[67.5rem]:px-8`}
    >
      <span
        className="flex shrink-0 items-center"
        style={{ width: 22, height: 22 }}
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt="icon"
            style={{ width: "1.375rem", height: "1.375rem" }}
          />
        ) : (
          React.cloneElement(icon, { width: 22, height: 22 })
        )}
      </span>
      <span
        className={`logo-stable-transition flex-1 text-start text-sm ${isExpanded ? "ml-3 max-w-[12.5rem] opacity-100" : "ml-0 max-w-0 opacity-0"} max-[67.5rem]:ml-2 max-[67.5rem]:max-w-full max-[67.5rem]:opacity-100`}
      >
        {text}
      </span>
    </button>
  );
};

export default NavLink;
