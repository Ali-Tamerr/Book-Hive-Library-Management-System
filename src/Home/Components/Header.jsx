import React from "react";
import NavLink from "./NavLink";
import SearchOverlay from "../../components/SearchOverlay";

const Header = ({
  logoIcon,
  activeSection,
  scrollToSection,
  setIsSearchOpen,
  setIsLoginOpen,
  themeIcon,
  toggleTheme,
  showShadowHeader,
  isSearchOpen,
  onBookClick, // Pass a handler from Home.jsx to open the book details
}) => {
  return (
    <>
      <header
        className={`duration-400 fixed left-0 right-0 top-0 z-[100] mx-auto w-full bg-[var(--body-color)] transition-all dark:border-b dark:border-[rgba(255,255,255,0.06)] ${showShadowHeader ? "shadow-[0_0.125rem_1rem_hsla(0,0%,0%,0.1)] dark:shadow-[0_0.125rem_1rem_hsla(0,0%,0%,0.4)]" : ""}`}
        id="header"
      >
        <nav className="flex h-[5rem] items-center justify-between px-6 max-[42.5rem]:h-[4.5rem] max-[42.5rem]:px-4 xl:pr-14">
          <a
            href="#"
            className="inline-flex items-center gap-x-2 font-medium text-[var(--first-color)]"
          >
            <div
              className="h-[2.75rem] w-[3.25rem] bg-[var(--title-color)] dark:bg-[var(--title-color)]"
              style={{
                mask: `url(${logoIcon}) no-repeat center`,
                WebkitMask: `url(${logoIcon}) no-repeat center`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
          </a>

          <div className="max-[71.875rem]:fixed max-[71.875rem]:inset-x-0 max-[71.875rem]:bottom-0 max-[71.875rem]:w-full max-[71.875rem]:bg-[var(--container-color)] max-[71.875rem]:px-10 max-[71.875rem]:py-10 max-[42.5rem]:px-8 max-[42.5rem]:py-8 max-[71.875rem]:shadow-[0_-0.5rem_2rem_hsla(0,0%,0%,0.1)] min-[71.875rem]:mx-auto min-[71.875rem]:flex min-[71.875rem]:flex-1 min-[71.875rem]:justify-center dark:max-[71.875rem]:shadow-[0_-0.5rem_2rem_hsla(0,0%,0%,0.4)]">
            <ul className="flex w-full items-center justify-between min-[71.875rem]:justify-around min-[71.875rem]:px-12">
              <NavLink
                href="#home"
                sectionId="home"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                iconClass="ri-home-4-line"
                label="Home"
              />
              <NavLink
                href="#about"
                sectionId="about"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                iconClass="ri-information-line"
                label="About"
              />
              <NavLink
                href="#featured"
                sectionId="featured"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                iconClass="ri-book-3-line"
                label="Featured"
              />
              <NavLink
                href="#plans"
                sectionId="plans"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                iconClass="ri-price-tag-3-line"
                label="Plans"
              />
              <NavLink
                href="#testimonial"
                sectionId="testimonial"
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                iconClass="ri-message-3-line"
                label="Testimonial"
              />
            </ul>
          </div>

          <div className="nav__actions flex items-center gap-x-4">
            <i
              className="ri-search-line duration-400 cursor-pointer text-[1.5rem] font-bold text-[var(--title-color)] transition-colors dark:text-[var(--title-color)] dark:hover:!text-[var(--title-color)]"
              onClick={() => setIsSearchOpen(true)}
            ></i>
            <i
              className="ri-user-line login-button duration-400 cursor-pointer text-[1.5rem] font-bold text-[var(--title-color)] transition-colors dark:text-[var(--title-color)] dark:hover:!text-[var(--title-color)]"
              id="login-button"
              onClick={() => setIsLoginOpen(true)}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className={`${themeIcon} change-theme duration-400 cursor-pointer text-[1.5rem] font-bold text-[var(--title-color)] transition-colors dark:text-[var(--title-color)] dark:hover:!text-[var(--title-color)]`}
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </nav>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onBookClick={onBookClick}
        setIsLoginOpen={setIsLoginOpen}
      />



    </>
  );
};

export default Header;
