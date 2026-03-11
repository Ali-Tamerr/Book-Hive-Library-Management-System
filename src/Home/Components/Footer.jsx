import React from "react";

const Footer = ({ logoIcon, setActivePopup }) => {
  return (
    <footer
      className="footer px-5 pb-[40px] pt-[110px] font-[family-name:var(--second-font)] text-[#000035] dark:!bg-[#101114]"
      data-reveal
    >
      <div className="footer-container mx-auto grid max-w-[1600px] grid-cols-[1.5fr_1fr_1fr_1fr] items-start gap-12 max-[950px]:grid-cols-2 max-[950px]:text-center max-[600px]:grid-cols-1">
        <div className="footer-col footer-brand max-[950px]:col-span-2 max-[600px]:col-span-1">
          <a
            href="#"
            className="footer-logo mb-6 flex items-center gap-3 text-[#000035] no-underline max-[950px]:justify-center dark:!text-[#D7D7D7]"
          >
            <div
              className="h-[60px] w-[70px] bg-[#000035] dark:bg-[#D7D7D7]"
              style={{
                mask: `url(${logoIcon}) no-repeat center`,
                WebkitMask: `url(${logoIcon}) no-repeat center`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
            <div className="logo-text flex flex-col justify-center text-left">
              <span className="name font-[family-name:var(--body-font)] text-[32px] font-extrabold uppercase leading-none tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
                BOOKHIVE
              </span>
              <span className="sub mt-1 block font-[family-name:var(--second-font)] text-[18px] font-normal text-[#000035] dark:!text-gray-300">
                Library
              </span>
            </div>
          </a>
          <p className="footer-description font-[family-name:var(--second-font)] text-[18px] font-bold leading-[1.8] text-[#000035] dark:!text-[#D7D7D7]">
            Find and explore the best <br className="max-[950px]:hidden" />
            eBooks from all your <br className="max-[950px]:hidden" />
            favorite writers.
          </p>
        </div>

        <div className="footer-col max-[950px]:mt-6">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[40px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
            ABOUT
          </h3>
          <ul className="footer-links list-none space-y-5">
            <li className="flex group justify-center max-[950px]:justify-center min-[950px]:justify-start">
              <a href="#" className="relative w-fit font-[family-name:var(--second-font)] text-[18px] font-bold text-[#000035] no-underline transition-all duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:w-0 before:bg-[#000035] before:transition-all before:duration-300 before:content-[''] hover:before:w-full dark:text-[#D7D7D7] dark:before:bg-[#D7D7D7]">
                Who are we ?
              </a>
            </li>
            <li className="flex group justify-center max-[950px]:justify-center min-[950px]:justify-start">
              <a
                href="#"
                className="relative w-fit font-[family-name:var(--second-font)] text-[18px] font-bold text-[#000035] no-underline transition-all duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:w-0 before:bg-[#000035] before:transition-all before:duration-300 before:content-[''] hover:before:w-full dark:text-[#D7D7D7] dark:before:bg-[#D7D7D7]"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePopup("branches");
                }}
              >
                Our Branches
              </a>
            </li>
            <li className="flex group justify-center max-[950px]:justify-center min-[950px]:justify-start">
              <a href="#" className="relative w-fit font-[family-name:var(--second-font)] text-[18px] font-bold text-[#000035] no-underline transition-all duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:w-0 before:bg-[#000035] before:transition-all before:duration-300 before:content-[''] hover:before:w-full dark:text-[#D7D7D7] dark:before:bg-[#D7D7D7]">
                Customer Feedback
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col max-[950px]:mt-6">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[40px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
            CONTACT
          </h3>
          <ul className="footer-links list-none space-y-5">
            <li className="font-[family-name:var(--second-font)] text-[18px] font-bold text-[#000035] dark:!text-[#D7D7D7]">
              Cairo, Egypt
            </li>
            <li className="font-[family-name:var(--second-font)] text-[18px] font-bold text-[#000035] dark:!text-[#D7D7D7]">
              BookHive@gmail.com
            </li>
            <li className="font-[family-name:var(--second-font)] text-[18px] font-bold text-[#000035] dark:!text-[#D7D7D7]">
              01122334455
            </li>
          </ul>
        </div>

        <div className="footer-col max-[950px]:mt-6 max-[950px]:flex max-[950px]:flex-col max-[950px]:items-center">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[40px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#D7D7D7]">
            SOCIAL
          </h3>
          <div className="footer-social flex gap-5">
            <a
              href="#"
              className="text-[32px] text-[#000035] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href="#"
              className="text-[32px] text-[#000035] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="#"
              className="text-[32px] text-[#000035] transition-colors hover:text-[#000035] dark:!text-[#D7D7D7] dark:hover:!text-[#D7D7D7]"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1600px]">
        <p className="text-center font-[family-name:var(--second-font)] text-[22px] font-extrabold text-[#000035] dark:!text-[#D7D7D7]">
          &#169; All Rights Reserved By BookHive
        </p>
      </div>
    </footer>
  );
};

export default Footer;
