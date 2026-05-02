import React from "react";

const HomeButton = ({ children, onClick, href, className = "", type = "button" }) => {
  const baseStyles =
    "dark:border-[var(--title-color)] dark:text-[var(--title-color)] inline-block rounded-lg border border-[var(--title-color)] hover:bg-[var(--title-color)] font-[family-name:Montserrat,sans-serif] text-[1.25rem] font-bold text-[var(--title-color)] hover:text-[#D7D7D7] duration-500 hover:border-transparent  hover:text-[var(--title-color)]  dark:hover:border-transparent dark:hover:bg-[var(--title-color)] dark:hover:text-[#121317] dark:hover:shadow-[0_0.375rem_1.875rem_rgba(0,0,0,0.25)] no-underline cursor-pointer";

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
