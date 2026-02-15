import React from "react";

const FormButton = ({ type = "button", onClick, children, isPrimary }) => {
  const baseClasses =
    "px-4 py-4 rounded-lg whitespace-nowrap transition-colors min-w-[100px] w-full max-w-[500px] font-semibold cursor-pointer";
  const primaryClasses =
    "bg-[#000035] dark:bg-transparent dark:border dark:border-white text-white hover:bg-[#1a1a6a] dark:hover:bg-[#1A1B20]";
  const secondaryClasses =
    "bg-gray-300 dark:bg-[#D7D7D7] dark:hover:bg-black dark:hover:text-white dark:hover:border-white text-[#000035] dark:text-black hover:bg-gray-400 border border-transparent";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
    >
      {children}
    </button>
  );
};

export default FormButton;
