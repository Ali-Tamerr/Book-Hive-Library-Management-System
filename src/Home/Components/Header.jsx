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
        className={`duration-400 transition-alldark:border-b fixed left-0 right-0 top-0 z-[100] mx-auto w-full bg-[var(--body-color)] dark:border-[rgba(255,255,255,0.06)] ${showShadowHeader ? "shadow-[0_2px_16px_hsla(0,0%,0%,0.1)] dark:shadow-[0_2px_16px_hsla(0,0%,0%,0.4)]" : ""}`}
        id="header"
      >
        <nav className="flex h-[72px] items-center justify-between px-6 xl:pr-12">
          <a
            href="#"
            className="inline-flex items-center gap-x-2 font-medium text-[var(--first-color)]"
          >
            <div
              className="h-[42px] w-[48px] bg-[#000035] dark:bg-[#D7D7D7]"
              style={{
                mask: `url(${logoIcon}) no-repeat center`,
                WebkitMask: `url(${logoIcon}) no-repeat center`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
          </a>

          <div className="max-[1150px]:shadow-[0_-8px_32px_hsla(0,0%,0%,0.1) max-[1150px]:fixed max-[1150px]:inset-x-0 max-[1150px]:bottom-0 max-[1150px]:w-full max-[1150px]:px-16 max-[1150px]:py-5 min-[1150px]:mx-auto min-[1150px]:flex min-[1150px]:flex-1 min-[1150px]:justify-center max-[1150px]:bg-[var(--container-color)] dark:shadow-[0_-8px_32px_hsla(0,0%,0%,0.4)] dark:max-[1150px]:shadow-none">
            <ul className="min-[1150px]:px-12 flex w-full items-center justify-around">
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
              className="ri-search-line duration-400 cursor-pointer text-[22px] font-bold text-[#000035] transition-colors dark:text-[#D7D7D7] dark:hover:!text-[#c7c9cf]"
              onClick={() => setIsSearchOpen(true)}
            ></i>
            <i
              className="ri-user-line login-button duration-400 cursor-pointer text-[22px] font-bold text-[#000035] transition-colors dark:text-[#D7D7D7] dark:hover:!text-[#c7c9cf]"
              id="login-button"
              onClick={() => setIsLoginOpen(true)}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className={`${themeIcon} change-theme duration-400 cursor-pointer text-[22px] font-bold text-[#000035] transition-colors dark:text-[#D7D7D7] dark:hover:!text-[#c7c9cf]`}
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
