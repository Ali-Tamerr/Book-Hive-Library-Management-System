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
        className={`relative flex w-fit items-center justify-center font-[family-name:var(--body-font)] text-[36px] font-normal uppercase leading-none tracking-wider text-[#000035] transition-all duration-300 before:absolute before:-bottom-2 before:h-[4px] before:w-0 before:bg-[#000035] before:transition-all before:duration-200 before:content-[''] hover:text-[#000035] hover:before:w-full max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] dark:text-white dark:before:bg-white dark:hover:text-white ${
          activeSection === sectionId
            ? "text-[#000035] before:w-full dark:text-white"
            : ""
        }`}
        onClick={(e) => scrollToSection(e, sectionId)}
      >
        <i
          className={`${iconClass} text-xl text-inherit min-[1150px]:hidden`}
        ></i>
        <span className="hidden min-[1150px]:block">{label}</span>
      </a>
    </li>
  );
};

export default NavLink;
