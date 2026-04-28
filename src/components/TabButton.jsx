import React from "react";

const TabButton = ({
  label,
  isActive,
  onClick,
  position = "middle",
  className = "",
}) => {
  const activeClasses =
    "bg-[#000035] border-[#000035] dark:bg-[#F2F2F2] dark:border-[#F2F2F2] text-[#F2F2F2] dark:text-[#121317]";
  const inactiveClasses =
    "bg-transparent text-[#000035] dark:text-[#F2F2F2] border-[#000035] dark:border-[#F2F2F2]";

  // Prevent text from shifting by always keeping a 0.0625rem border
  const baseBorder = `border`;
  const firstBorder = `${baseBorder} rounded-l-xl `;
  const middleBorder = ` ${baseBorder}`;
  const lastBorder = ` ${baseBorder} rounded-r-xl`;

  const borderClasses =
    position === "first"
      ? firstBorder
      : position === "last"
        ? lastBorder
        : middleBorder;

  return (
    <button
      onClick={onClick}
      className={`min-[62.5rem]:h-10 w-full min-w-30 max-w-50 font-['Bebas_Neue',sans-serif]! h-12 cursor-pointer whitespace-nowrap text-lg min-[87.5rem]:text-xl font-semibold uppercase tracking-widest ${borderClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default TabButton;
