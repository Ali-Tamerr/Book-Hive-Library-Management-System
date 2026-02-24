import React from "react";

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
}) => {
  return (
    <>
      <header
        className={`duration-400 fixed top-0 z-[100] w-full bg-[var(--body-color)] transition-[box-shadow,background-color] dark:border-b dark:border-[rgba(255,255,255,0.06)] dark:bg-[#15161a] ${showShadowHeader ? "shadow-[0_2px_16px_hsla(0,0%,0%,0.1)] dark:shadow-[0_2px_16px_hsla(0,0%,0%,0.4)]" : ""}`}
        id="header"
      >
        <nav className="flex h-[var(--header-height)] items-center justify-between px-[4.5rem]">
          <a
            href="#"
            className=" inline-flex items-center gap-x-2 font-medium text-[var(--first-color)]"
          >
            <img
              src={logoIcon}
              alt="Book Hive Logo"
              style={{ width: "60px", height: "auto" }}
              className="dark:brightness-[1.2] dark:invert"
            />
          </a>

          <div className="max-[1150px]:duration-400 max-[1150px]:fixed max-[1150px]:inset-x-0 max-[1150px]:bottom-0 max-[1150px]:w-full max-[1150px]:bg-[var(--container-color)] max-[1150px]:px-16 max-[1150px]:py-5 max-[1150px]:shadow-[0_-8px_32px_hsla(0,0%,0%,0.1)] max-[1150px]:transition-[background-color] min-[1150px]:mx-auto min-[1150px]:flex min-[1150px]:flex-1 min-[1150px]:justify-center dark:bg-[#15161a] dark:shadow-[0_-8px_32px_hsla(0,0%,0%,0.4)] dark:min-[1150px]:shadow-none">
            <ul className="flex items-center justify-between min-[1150px]:gap-x-24">
              <li className="">
                <a
                  href="#home"
                  className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "home" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                  onClick={(e) => scrollToSection(e, "home")}
                >
                  <i className="ri-home-4-line text-xl text-inherit min-[1150px]:hidden"></i>
                  <span className="hidden min-[1150px]:block">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "about" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                  onClick={(e) => scrollToSection(e, "about")}
                >
                  <i className="ri-information-line text-xl text-inherit min-[1150px]:hidden"></i>
                  <span className="hidden min-[1150px]:block">About</span>
                </a>
              </li>
              <li>
                <a
                  href="#featured"
                  className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "featured" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                  onClick={(e) => scrollToSection(e, "featured")}
                >
                  <i className="ri-book-3-line text-xl text-inherit min-[1150px]:hidden"></i>
                  <span className="hidden min-[1150px]:block">Featured</span>
                </a>
              </li>
              <li>
                <a
                  href="#plans"
                  className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "plans" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                  onClick={(e) => scrollToSection(e, "plans")}
                >
                  <i className="ri-price-tag-3-line text-xl text-inherit min-[1150px]:hidden"></i>
                  <span className="hidden min-[1150px]:block">Plans</span>
                </a>
              </li>
              <li>
                <a
                  href="#testimonial"
                  className={`inline-flex min-h-[2.4rem] items-center justify-center rounded-md bg-transparent !px-[1.4rem] !py-[0.45rem] leading-none text-[var(--text-color)] transition-[color,background-color,box-shadow] duration-300 hover:bg-[#e9e9e9] hover:text-[#1b1c20] hover:shadow-[0_8px_18px_rgba(0,0,0,0.25)] max-[1150px]:rounded-[10px] max-[1150px]:px-[0.65rem] max-[1150px]:py-[0.35rem] min-[1150px]:font-medium ${activeSection === "testimonial" ? "!bg-[#e9e9e9] !text-[#1b1c20] !shadow-[0_8px_18px_rgba(0,0,0,0.25)]" : ""}`}
                  onClick={(e) => scrollToSection(e, "testimonial")}
                >
                  <i className="ri-message-3-line text-xl text-inherit min-[1150px]:hidden"></i>
                  <span className="hidden min-[1150px]:block">Testimonial</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="nav__actions flex items-center gap-x-4">
            <i
              className="ri-search-line duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors dark:hover:!text-[#c7c9cf]"
              onClick={() => setIsSearchOpen(true)}
            ></i>
            <i
              className="ri-user-line login-button duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors dark:hover:!text-[#c7c9cf]"
              id="login-button"
              onClick={() => setIsLoginOpen(true)}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className={`${themeIcon} change-theme duration-400 cursor-pointer text-xl text-[var(--title-color)] transition-colors dark:hover:!text-[#c7c9cf]`}
              onClick={toggleTheme}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </nav>
      </header>

      <div
        className={`duration-400 fixed left-0 z-[100] h-full w-full bg-[hsla(230,12%,96%,0.6)] px-6 pt-32 backdrop-blur-[12px] transition-[top] dark:bg-[rgba(17,18,20,0.88)] ${isSearchOpen ? "top-0" : "top-[-100%]"}`}
      >
        <form
          action=""
          className="flex items-center gap-x-2 rounded-xl border border-[var(--border-color)] bg-[var(--container-color)] px-4 dark:border-[#2a2c31] dark:bg-[#1d1e23]"
        >
          <i className="ri-search-line dark:text-[#f1f1f3]"></i>
          <input
            type="search"
            placeholder="What are you looking for?"
            className="w-full border-none bg-[var(--container-color)] py-4 font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-[var(--text-color)] outline-none dark:bg-[#1d1e23] dark:text-[#f1f1f3]"
          />
        </form>
        <i
          className="ri-close-line absolute right-8 top-8 cursor-pointer text-[2rem] text-[var(--title-color)] dark:text-[#f1f1f3]"
          onClick={() => setIsSearchOpen(false)}
        ></i>
      </div>
    </>
  );
};

export default Header;
