import React from "react";

const Footer = ({ logoIcon }) => {
  return (
    <footer
      className="footer px-5 pb-[30px] pt-[60px] font-[family-name:var(--second-font)] text-[#525252] dark:!bg-[#101114]"
      data-reveal
    >
      <div className="footer-container mx-auto grid max-w-[1200px] grid-cols-[340px_repeat(3,1fr)] items-start gap-10 max-[950px]:grid-cols-2 max-[950px]:text-center max-[600px]:grid-cols-1">
        <div className="footer-col footer-brand max-[950px]:col-span-2 max-[600px]:col-span-1">
          <a
            href="#"
            className="footer-logo flex items-center gap-2.5 text-[#0a0b2b] no-underline dark:!text-white"
          >
            <img
              src={logoIcon}
              alt="Book Hive Logo"
              style={{ width: "60px", height: "auto" }}
              className="dark:brightness-[1.2] dark:invert"
            />
            <div className="logo-text">
              <span className="name font-[family-name:var(--body-font)] text-[22px] font-extrabold dark:!text-white">
                BookHive
              </span>
              <span className="sub -mt-1 block font-[family-name:var(--second-font)] text-xs font-semibold dark:!text-white">
                Library
              </span>
            </div>
          </a>
          <p className="footer-description mt-2.5 font-semibold leading-relaxed text-[#555] dark:!text-white">
            Find and explore the best <br />
            eBooks from all your <br />
            favorite writers.
          </p>
        </div>
        <div className="footer-col">
          <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-extrabold dark:!text-white">
            About
          </h3>
          <ul className="footer-links list-none">
            <li className="mb-2.5 font-bold text-[#333] dark:!text-white">
              <a
                href="#"
                className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b] dark:!text-white dark:hover:!bg-white dark:hover:!text-[#111214]"
              >
                Who are we ?
              </a>
            </li>
            <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
              <a
                href="#"
                className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b] dark:!text-white dark:hover:!bg-white dark:hover:!text-[#111214]"
              >
                Our Branches
              </a>
            </li>
            <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
              <a
                href="#"
                className="inline-flex items-center rounded-full px-3 py-1.5 text-[#333] no-underline transition-[color,background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#f2f2f6] hover:text-[#0a0b2b] dark:!text-white dark:hover:!bg-white dark:hover:!text-[#111214]"
              >
                Customer Feedback
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-extrabold dark:!text-white">
            Contact
          </h3>
          <ul className="footer-links list-none">
            <li className="mb-2.5 font-bold text-[#333] dark:!text-white">
              Cairo, Egypt
            </li>
            <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
              BookHive@gmail.com
            </li>
            <li className="mb-2.5 font-semibold text-[#333] dark:!text-white">
              01122334455
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="footer-title mb-4 font-[family-name:var(--body-font)] text-lg font-extrabold dark:!text-white">
            Social
          </h3>
          <div className="footer-social">
            <a
              href="#"
              className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60 dark:!text-white"
            >
              <i className="ri-facebook-circle-line"></i>
            </a>
            <a
              href="#"
              className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60 dark:!text-white"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="#"
              className="mr-3 text-[22px] text-[#0a0b2b] transition-all duration-200 hover:opacity-60 dark:!text-white"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
        </div>
      </div>
      <p className="footer-copy mt-10 text-center font-[family-name:var(--second-font)] font-bold text-[#333] dark:!text-white">
        &copy; All Rights Reserved By BookHive
      </p>
    </footer>
  );
};

export default Footer;
