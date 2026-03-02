import React from "react";

const TabButton = ({
  label,
  isActive,
  onClick,
  position = "middle",
  className = "",
}) => {
  const activeClasses =
    "bg-[#0b0b3b] border-[#0b0b3b] dark:bg-[#D7D7D7] dark:border-[#D7D7D7] text-white dark:text-black";
  const inactiveClasses =
    "bg-transparent text-[#0b1730] dark:text-white border-[#0b1730] dark:border-white";

  // Prevent text from shifting by always keeping a 1px border
  const baseBorder = `border`;
  const firstBorder = `${baseBorder} rounded-l-xl `;
  const middleBorder = ` ${baseBorder}`;
  const lastBorder = ` ${baseBorder} rounded-r-xl pr-20`;

  const borderClasses =
    position === "first"
      ? firstBorder
      : position === "last"
        ? lastBorder
        : middleBorder;

  return (
    <button
      onClick={onClick}
      className={`h-10 cursor-pointer whitespace-nowrap px-16 text-2xl uppercase tracking-widest ${borderClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default TabButton;
