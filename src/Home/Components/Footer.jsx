import React from "react";

const Footer = ({ logoIcon, setActivePopup }) => {
  return (
    <footer
      className="footer px-5 pb-[2.5rem] pt-[4.5rem] font-[family-name:var(--second-font)] text-[var(--text-color)] max-[42.5rem]:px-4 max-[42.5rem]:pt-[3.125rem] max-[64rem]:pb-32 dark:!bg-[#101114]"
      data-reveal
    >
      <div className="footer-container mx-auto grid max-w-[100rem] grid-cols-[1.5fr_1fr_1fr_1fr] items-start gap-12 max-[59.375rem]:grid-cols-2 max-[59.375rem]:text-center max-[37.5rem]:grid-cols-1">
        <div className="footer-col footer-brand max-[59.375rem]:col-span-2 max-[37.5rem]:col-span-1">
          <a
            href="#"
            className="footer-logo mb-6 flex items-center gap-3 text-[var(--title-color)] no-underline max-[59.375rem]:justify-center dark:!text-[var(--title-color)]"
          >
            <div
              className="h-[3.75rem] w-[4.375rem] bg-[var(--title-color)] dark:bg-[var(--title-color)]"
              style={{
                mask: `url(${logoIcon}) no-repeat center`,
                WebkitMask: `url(${logoIcon}) no-repeat center`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
            />
            <div className="logo-text flex flex-col justify-center text-left">
              <span className="name font-[family-name:var(--body-font)] text-[2rem] font-extrabold uppercase leading-none tracking-wide text-[var(--title-color)] max-[42.5rem]:text-[1.625rem] dark:!text-[var(--title-color)]">
                BOOKHIVE
              </span>
              <span className="sub mt-1 block font-[family-name:var(--second-font)] text-[1.125rem] font-normal text-[var(--text-color)] max-[42.5rem]:text-[1rem] dark:!text-[var(--text-color)]">
                Library
              </span>
            </div>
          </a>
          <p className="footer-description font-[family-name:var(--second-font)] text-[1.125rem] font-bold leading-[1.8] text-[var(--text-color)] max-[42.5rem]:text-[1rem] dark:!text-[var(--text-color)]">
            Find and explore the best <br className="max-[59.375rem]:hidden" />
            eBooks from all your <br className="max-[59.375rem]:hidden" />
            favorite writers.
          </p>
        </div>

        <div className="footer-col max-[59.375rem]:mt-6">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[2.5rem] font-extrabold uppercase tracking-wide text-[var(--title-color)] max-[42.5rem]:mb-4 max-[42.5rem]:text-[2rem] dark:!text-[var(--title-color)]">
            ABOUT
          </h3>
          <ul className="footer-links list-none space-y-5">
            <li className="flex group justify-center max-[59.375rem]:justify-center min-[59.375rem]:justify-start">
              <a href="#" className="relative w-fit font-[family-name:var(--second-font)] text-[1.125rem] font-bold text-[var(--text-color)] no-underline transition-all duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[0.1875rem] before:w-0 before:bg-[var(--text-color)] before:transition-all before:duration-300 before:content-[''] hover:before:w-full max-[42.5rem]:text-[1rem] dark:text-[var(--text-color)] dark:before:bg-[var(--text-color)]">
                Who are we ?
              </a>
            </li>
            <li className="flex group justify-center max-[59.375rem]:justify-center min-[59.375rem]:justify-start">
              <a
                href="#"
                className="relative w-fit font-[family-name:var(--second-font)] text-[1.125rem] font-bold text-[var(--text-color)] no-underline transition-all duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[0.1875rem] before:w-0 before:bg-[var(--text-color)] before:transition-all before:duration-300 before:content-[''] hover:before:w-full max-[42.5rem]:text-[1rem] dark:text-[var(--text-color)] dark:before:bg-[var(--text-color)]"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePopup("branches");
                }}
              >
                Our Branches
              </a>
            </li>
            <li className="flex group justify-center max-[59.375rem]:justify-center min-[59.375rem]:justify-start">
              <a href="#" className="relative w-fit font-[family-name:var(--second-font)] text-[1.125rem] font-bold text-[var(--text-color)] no-underline transition-all duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[0.1875rem] before:w-0 before:bg-[var(--text-color)] before:transition-all before:duration-300 before:content-[''] hover:before:w-full max-[42.5rem]:text-[1rem] dark:text-[var(--text-color)] dark:before:bg-[var(--text-color)]">
                Customer Feedback
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col max-[59.375rem]:mt-6">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[2.5rem] font-extrabold uppercase tracking-wide text-[var(--title-color)] max-[42.5rem]:mb-4 max-[42.5rem]:text-[2rem] dark:!text-[var(--title-color)]">
            CONTACT
          </h3>
          <ul className="footer-links list-none space-y-5">
            <li className="font-[family-name:var(--second-font)] text-[1.125rem] font-bold text-[var(--text-color)] max-[42.5rem]:text-[1rem] dark:!text-[var(--text-color)]">
              Cairo, Egypt
            </li>
            <li className="font-[family-name:var(--second-font)] text-[1.125rem] font-bold text-[var(--text-color)] max-[42.5rem]:text-[1rem] dark:!text-[var(--text-color)]">
              BookHive@gmail.com
            </li>
            <li className="font-[family-name:var(--second-font)] text-[1.125rem] font-bold text-[var(--text-color)] max-[42.5rem]:text-[1rem] dark:!text-[var(--text-color)]">
              01122334455
            </li>
          </ul>
        </div>

        <div className="footer-col max-[59.375rem]:mt-6 max-[59.375rem]:flex max-[59.375rem]:flex-col max-[59.375rem]:items-center">
          <h3 className="footer-title mb-6 font-[family-name:var(--body-font)] text-[2.5rem] font-extrabold uppercase tracking-wide text-[var(--title-color)] max-[42.5rem]:mb-4 max-[42.5rem]:text-[2rem] dark:!text-[var(--title-color)]">
            SOCIAL
          </h3>
          <div className="footer-social flex gap-5 max-[42.5rem]:gap-4">
            <a
              href="#"
              className="text-[2rem] text-[var(--text-color)] transition-colors hover:text-[var(--text-color)] max-[42.5rem]:text-[1.75rem] dark:!text-[var(--text-color)] dark:hover:!text-[var(--text-color)]"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              href="#"
              className="text-[2rem] text-[var(--text-color)] transition-colors hover:text-[var(--text-color)] max-[42.5rem]:text-[1.75rem] dark:!text-[var(--text-color)] dark:hover:!text-[var(--text-color)]"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="#"
              className="text-[2rem] text-[var(--text-color)] transition-colors hover:text-[var(--text-color)] max-[42.5rem]:text-[1.75rem] dark:!text-[var(--text-color)] dark:hover:!text-[var(--text-color)]"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[100rem] max-[42.5rem]:mt-14">
        <p className="text-center font-[family-name:var(--second-font)] text-[1.375rem] font-extrabold text-[var(--text-color)] max-[42.5rem]:text-[1.125rem] dark:!text-[var(--text-color)]">
          &#169; All Rights Reserved By BookHive
        </p>
      </div>
    </footer>
  );
};

export default Footer;
