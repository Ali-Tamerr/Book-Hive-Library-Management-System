import React from "react";

const NavLink = ({
  href,
  sectionId,
  activeSection,
  scrollToSection,
  iconClass,
  label,
}) => {
  return (
    <li>
      <a
        href={href}
        className={`relative flex w-fit items-center justify-center font-[family-name:var(--body-font)] text-[33px] font-normal uppercase leading-none tracking-wide text-[#000035] transition-all duration-300 before:absolute before:-bottom-1 before:h-[3px] before:w-0 before:bg-[#000035] before:transition-all before:duration-200 before:content-[''] hover:text-[#000035] hover:before:w-full max-[1150px]:rounded-[10px] max-[1150px]:px-2 max-[1150px]:py-1 max-[680px]:px-1.5 max-[680px]:py-1 dark:text-[#D7D7D7] dark:before:bg-[#D7D7D7] dark:hover:text-[#D7D7D7] ${
          activeSection === sectionId
            ? "text-[#000035] before:w-full dark:text-[#D7D7D7]"
            : ""
        }`}
        onClick={(e) => scrollToSection(e, sectionId)}
      >
        <i
          className={`${iconClass} text-[20px] text-inherit min-[1150px]:hidden max-[680px]:text-[18px]`}
        ></i>
        <span className="hidden min-[1150px]:block">{label}</span>
      </a>
    </li>
  );
};

export default NavLink;
