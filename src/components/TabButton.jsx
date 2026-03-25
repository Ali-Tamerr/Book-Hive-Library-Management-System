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
      className={`h-12 min-[1000px]:h-10 w-full min-[1000px]:w-auto cursor-pointer whitespace-nowrap px-4 max-[1400px]:min-[1000px]:px-8 min-[1400px]:px-16 font-['Bebas_Neue',sans-serif]! text-xl font-semibold uppercase tracking-widest ${borderClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default TabButton;
