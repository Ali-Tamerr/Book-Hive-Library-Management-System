import React from "react";

const HomeButton = ({ children, onClick, href, className = "", type = "button" }) => {
  const baseStyles =
    "dark:border-[#D7D7D7] dark:text-[#D7D7D7] inline-block rounded-lg border border-[#000035] hover:bg-[#000035] font-[family-name:Montserrat,sans-serif] text-[1.25rem] font-bold text-[#000035] hover:text-[#D7D7D7] duration-500 hover:border-transparent  hover:text-[#000035]  dark:hover:border-transparent dark:hover:bg-[#D7D7D7] dark:hover:text-[#121317] dark:hover:shadow-[0_0.375rem_1.875rem_rgba(0,0,0,0.25)] no-underline cursor-pointer";

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      className={`${baseStyles} ${className}`.trim()}
      onClick={onClick}
      type={!href ? type : undefined}
    >
      {children}
    </Component>
  );
};

export default HomeButton;
