import React from "react";

const Footer = ({ logoIcon }) => {
  return (
    <footer
      className="footer px-5 pb-[40px] pt-[80px] font-[family-name:var(--second-font)] text-[#525252] dark:!bg-[#101114]"
      data-reveal
    >
      <div className="footer-container mx-auto grid max-w-[1400px] grid-cols-[1.5fr_1fr_1fr_1fr] items-start gap-12 max-[950px]:grid-cols-2 max-[950px]:text-center max-[600px]:grid-cols-1">
        <div className="footer-col footer-brand max-[950px]:col-span-2 max-[600px]:col-span-1">
          <a
            href="#"
            className="footer-logo mb-6 flex items-center gap-3 text-[#000035] no-underline max-[950px]:justify-center dark:!text-[#D7D7D7]"
          >
            <img
              src={logoIcon}
              alt="Book Hive Logo"
              style={{ width: "55px", height: "auto" }}
              className="dark:brightness-[1.2] dark:invert"
            />
            <div className="logo-text flex flex-col justify-center text-left">
              <span className="name font-[family-name:var(--body-font)] text-[26px] font-extrabold uppercase leading-none tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
                BOOKHIVE
              </span>
              <span className="sub mt-1 block font-[family-name:var(--second-font)] text-[15px] font-normal text-[#000035] dark:!text-gray-300">
                Library
              </span>
            </div>
          </a>
          <p className="footer-description font-[family-name:var(--second-font)] text-[15px] font-bold leading-[1.8] text-[#525252] dark:!text-[#D7D7D7]">
            Find and explore the best <br className="max-[950px]:hidden" />
            eBooks from all your <br className="max-[950px]:hidden" />
            favorite writers.
          </p>
        </div>

        <div className="footer-col max-[950px]:mt-6">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[34px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
            ABOUT
          </h3>
          <ul className="footer-links list-none space-y-5">
            <li className="font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]">
              <a href="#" className="text-inherit no-underline">
                Who are we ?
              </a>
            </li>
            <li className="font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]">
              <a href="#" className="text-inherit no-underline">
                Our Branches
              </a>
            </li>
            <li className="font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]">
              <a href="#" className="text-inherit no-underline">
                Customer Feedback
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col max-[950px]:mt-6">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[34px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
            CONTACT
          </h3>
          <ul className="footer-links list-none space-y-5">
            <li className="font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252] dark:!text-[#D7D7D7]">
              Cairo, Egypt
            </li>
            <li className="font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252] dark:!text-[#D7D7D7]">
              BookHive@gmail.com
            </li>
            <li className="font-[family-name:var(--second-font)] text-[15px] font-bold text-[#525252] dark:!text-[#D7D7D7]">
              01122334455
            </li>
          </ul>
        </div>

        <div className="footer-col max-[950px]:mt-6 max-[950px]:flex max-[950px]:flex-col max-[950px]:items-center">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[34px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
            SOCIAL
          </h3>
          <div className="footer-social flex gap-5">
            <a
              href="#"
              className="text-[26px] text-[#525252] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href="#"
              className="text-[26px] text-[#525252] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="#"
              className="text-[26px] text-[#525252] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1400px]">
        <p className="text-center font-[family-name:var(--second-font)] text-[18px] font-extrabold text-[#525252] dark:!text-gray-400">
          All Rights Reserved By BookHive
        </p>
      </div>
    </footer>
  );
};

export default Footer;
