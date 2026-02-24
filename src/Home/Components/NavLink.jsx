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
        className={`relative flex w-fit items-center justify-center font-[family-name:var(--body-font)] text-2xl leading-none tracking-wide text-[#1b1c20] transition-all duration-300 before:absolute before:-bottom-1 before:h-0.5 before:w-0 before:bg-[#1b1c20] before:transition-all before:duration-200 before:content-[''] hover:text-[#1b1c20] hover:before:w-full max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium dark:before:bg-white dark:hover:text-white ${
          activeSection === sectionId
            ? "text-[#1b1c20] before:w-full dark:text-white"
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
