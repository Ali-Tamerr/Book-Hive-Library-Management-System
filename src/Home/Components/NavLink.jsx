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
        className={`relative flex w-fit items-center justify-center font-[family-name:var(--body-font)] text-[2.0625rem] font-normal uppercase leading-none tracking-wide text-[var(--title-color)] transition-all duration-300 before:absolute before:-bottom-1 before:h-[0.1875rem] before:w-0 before:bg-[var(--title-color)] before:transition-all before:duration-200 before:content-[''] hover:text-[var(--title-color)] hover:before:w-full max-[71.875rem]:rounded-[0.625rem] max-[71.875rem]:px-2 max-[71.875rem]:py-1 max-[42.5rem]:px-1.5 max-[42.5rem]:py-1 dark:text-[var(--title-color)] dark:before:bg-[var(--title-color)] dark:hover:text-[var(--title-color)] ${
          activeSection === sectionId
            ? "text-[var(--title-color)] before:w-full dark:text-[var(--title-color)]"
            : ""
        }`}
        onClick={(e) => scrollToSection(e, sectionId)}
      >
        <i
          className={`${iconClass} text-[1.25rem] text-inherit min-[71.875rem]:hidden max-[42.5rem]:text-[1.125rem]`}
        ></i>
        <span className="hidden min-[71.875rem]:block">{label}</span>
      </a>
    </li>
  );
};

export default NavLink;
