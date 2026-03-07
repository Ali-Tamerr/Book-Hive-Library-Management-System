import React from "react";

const FormButton = ({
  type = "button",
  onClick,
  children,
  isPrimary,
  className,
  fullWidth = true,
}) => {
  const baseClasses =
    "px-4 py-4 rounded-lg whitespace-nowrap border transition-colors min-w-[100px] font-semibold cursor-pointer";
  const primaryClasses =
    "border-[#000035] dark:border-[#D7D7D7] text-[#000035] dark:text-[#D7D7D7] hover:bg-[#000035] hover:text-[#F2F2F2] dark:hover:bg-[#D7D7D7] dark:hover:text-[#121317]";
  const secondaryClasses = primaryClasses;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${fullWidth ? "w-full max-w-[500px]" : ""} ${isPrimary ? primaryClasses : secondaryClasses} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default FormButton;
