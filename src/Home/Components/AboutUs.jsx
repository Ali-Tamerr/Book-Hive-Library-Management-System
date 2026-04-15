import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const AboutUs = ({ stats, setActivePopup, aboutBooks }) => {
  return (
    <section
      className="section-about px-7 py-12 pb-[4rem] max-[42.5rem]:px-4 max-[42.5rem]:py-8"
      id="about"
      aria-labelledby="about-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[105.5rem] px-5 max-[42.5rem]:px-1">
        <h2
          id="about-heading"
          className="about-title mb-10 text-center font-[family-name:var(--body-font)] text-[3.875rem] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)] max-[42.5rem]:mb-6 max-[42.5rem]:text-[2.75rem] max-[32.5rem]:text-[2.25rem]"
        >
          ABOUT US
        </h2>
        <div className="about-grid grid grid-cols-[1fr_minmax(32.5rem,43.75rem)] items-center gap-12 max-[71.875rem]:grid-cols-1 max-[71.875rem]:text-center">
          <div className="about-left mx-auto max-w-[75rem]">
            <p className="about-text mb-12 text-center font-[family-name:var(--second-font)] text-[1.5rem] font-bold leading-[1.55] text-[#000035] dark:!text-[var(--muted)] max-[42.5rem]:mb-8 max-[42.5rem]:text-[1.125rem] max-[32.5rem]:text-[1rem]">
              We are a smart, technology-driven library system that uses RFID to
              make book management faster and easier. Our platform helps
              students and staff search, borrow, and track books efficiently
              with a modern and user-friendly design.
            </p>
            <div
              className="stats mb-12 flex flex-wrap items-start justify-center gap-[4.5rem] max-[42.5rem]:mb-8 max-[42.5rem]:gap-6"
              role="list"
              aria-label="Quick facts"
            >
              <div className="stat min-w-[10rem] text-center max-[42.5rem]:min-w-[6.25rem]" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[2.375rem] font-bold text-[var(--accent)] dark:!text-[var(--title-color)] max-[42.5rem]:text-[1.875rem]">
                  {stats.branches}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[1.1875rem] font-bold text-[#000035] dark:!text-[#9ea1a8] max-[42.5rem]:text-[1rem]">
                  Branches
                </div>
              </div>
              <div className="stat min-w-[10rem] text-center max-[42.5rem]:min-w-[6.25rem]" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[2.375rem] font-bold text-[var(--accent)] dark:!text-[var(--title-color)] max-[42.5rem]:text-[1.875rem]">
                  {stats.books}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[1.1875rem] font-bold text-[#000035] dark:!text-[#9ea1a8] max-[42.5rem]:text-[1rem]">
                  Books
                </div>
              </div>
              <div className="stat min-w-[10rem] text-center max-[42.5rem]:min-w-[6.25rem]" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[2.375rem] font-bold text-[var(--accent)] dark:!text-[var(--title-color)] max-[42.5rem]:text-[1.875rem]">
                  {stats.categories}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[1.1875rem] font-bold text-[#000035] dark:!text-[#9ea1a8] max-[42.5rem]:text-[1rem]">
                  Category
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <HomeButton
                className="px-[2.5rem] py-[1rem] max-[42.5rem]:px-[1.625rem] max-[42.5rem]:py-[0.75rem]"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePopup("branches");
                }}
              >
                Where are we ?
              </HomeButton>
            </div>
          </div>
          <div
            className="about-right pointer-events-none relative flex h-[40rem] items-center justify-center max-[71.875rem]:order-[-1] max-[71.875rem]:mb-[2.75rem] max-[71.875rem]:h-[36.875rem] max-[42.5rem]:h-[26.875rem] max-[32.5rem]:h-[20rem]"
            aria-hidden="true"
          >
            {aboutBooks.length >= 2 ? (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[35rem] w-[22.5rem] origin-center -translate-y-3 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_1.125rem_1.875rem_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[71.875rem]:h-[32.5rem] max-[71.875rem]:w-[20.625rem] max-[42.5rem]:h-[24.375rem] max-[42.5rem]:w-[16.25rem] max-[32.5rem]:h-[18.125rem] max-[32.5rem]:w-[11.875rem] dark:shadow-[0_1.125rem_2rem_rgba(0,0,0,0.55)]"
                  src={aboutBooks[0].image}
                  alt={aboutBooks[0].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[35rem] w-[22.5rem] origin-center translate-y-5 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_1.125rem_1.875rem_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[71.875rem]:h-[32.5rem] max-[71.875rem]:w-[20.625rem] max-[42.5rem]:h-[24.375rem] max-[42.5rem]:w-[16.25rem] max-[32.5rem]:h-[18.125rem] max-[32.5rem]:w-[11.875rem] dark:shadow-[0_1.125rem_2rem_rgba(0,0,0,0.55)]"
                  src={aboutBooks[1].image}
                  alt={aboutBooks[1].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </>
            ) : (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[35rem] w-[22.5rem] origin-center -translate-y-3 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_1.125rem_1.875rem_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[71.875rem]:h-[32.5rem] max-[71.875rem]:w-[20.625rem] max-[42.5rem]:h-[24.375rem] max-[42.5rem]:w-[16.25rem] max-[32.5rem]:h-[18.125rem] max-[32.5rem]:w-[11.875rem] dark:shadow-[0_1.125rem_2rem_rgba(0,0,0,0.55)]"
                  src={null}
                  priority
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[35rem] w-[22.5rem] origin-center translate-y-5 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_1.125rem_1.875rem_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[71.875rem]:h-[32.5rem] max-[71.875rem]:w-[20.625rem] max-[42.5rem]:h-[24.375rem] max-[42.5rem]:w-[16.25rem] max-[32.5rem]:h-[18.125rem] max-[32.5rem]:w-[11.875rem] dark:shadow-[0_1.125rem_2rem_rgba(0,0,0,0.55)]"
                  src={null}
                  priority
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
