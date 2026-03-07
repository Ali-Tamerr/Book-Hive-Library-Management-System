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
      className={`my-1 flex h-12 min-h-12 w-full cursor-pointer items-center justify-start overflow-x-hidden font-bold transition-all duration-300 ${
        isExpanded ? "gap-2 px-8" : "gap-0 px-[25px]"
      } ${
        active
          ? "bg-white text-[#000035] dark:bg-black dark:text-white"
          : "text-[#b5b8d1] hover:bg-white/10 dark:bg-[#D7D7D7] dark:text-black dark:hover:bg-black/5"
      } max-[1080px]:gap-2 max-[1080px]:px-8`}
    >
      <span className="flex items-center" style={{ width: 20, height: 20 }}>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt="icon"
            style={{ width: "22px", height: "22px" }}
          />
        ) : (
          React.cloneElement(icon, { width: 22, height: 22 })
        )}
      </span>
      <span
        className={`flex-1 text-start text-sm transition-all duration-300 ${isExpanded ? "ml-2 max-w-full opacity-100" : "ml-0 max-w-0 opacity-0"} max-[1080px]:ml-2 max-[1080px]:max-w-full max-[1080px]:opacity-100`}
      >
        {text}
      </span>
    </button>
  );
};

export default NavLink;
