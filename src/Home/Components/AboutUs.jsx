import React from "react";

const AboutUs = ({ stats, setActivePopup, aboutBooks }) => {
  return (
    <section
      className="section-about px-5 py-14 pb-[72px]"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[var(--max-w)] px-5">
        <h2
          id="about-heading"
          className="about-title mb-7 text-center font-[family-name:var(--body-font)] text-[34px] font-normal text-[var(--accent)] dark:!text-[var(--title-color)]"
        >
          About Us
        </h2>
        <div className="about-grid grid grid-cols-[1fr_minmax(300px,420px)] items-center gap-8 max-[980px]:grid-cols-1 max-[980px]:text-center">
          <div className="about-left mx-auto max-w-[760px]">
            <p className="about-text mb-[30px] text-center font-[family-name:var(--second-font)] text-base font-bold leading-relaxed text-[var(--muted)] dark:!text-[var(--muted)]">
              We are a smart, technology-driven library system that uses RFID to
              make book management faster and easier. Our platform helps
              students and staff search, borrow, and track books efficiently
              with a modern and user-friendly design.
            </p>
            <div
              className="stats mb-7 flex flex-wrap items-start justify-center gap-12"
              role="list"
              aria-label="Quick facts"
            >
              <div className="stat min-w-[90px] text-center" role="listitem">
                <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.branches}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)] dark:!text-[#9ea1a8]">
                  Branches
                </div>
              </div>
              <div className="stat min-w-[90px] text-center" role="listitem">
                <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.books}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)] dark:!text-[#9ea1a8]">
                  Books
                </div>
              </div>
              <div className="stat min-w-[90px] text-center" role="listitem">
                <div className="num mb-1.5 font-[family-name:var(--body-font)] text-xl font-normal text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.categories}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[13px] font-bold text-[var(--muted)] dark:!text-[#9ea1a8]">
                  Categories
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <a
                className="about-cta inline-block rounded-xl border border-[#f7f7f7] bg-[#111214] px-6 py-3 font-[family-name:var(--second-font)] font-bold text-[#f7f7f7] no-underline transition-[background-color,color,border-color] duration-300 hover:border-[#111214] hover:bg-[#f7f7f7] hover:text-[#111214] dark:border-[#f7f7f7] dark:bg-[#111214] dark:text-[#f7f7f7] dark:hover:border-[#111214] dark:hover:bg-[#f7f7f7] dark:hover:text-[#111214] dark:hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePopup("branches");
                }}
              >
                Where are we?
              </a>
            </div>
          </div>
          <div
            className="about-right pointer-events-none relative flex h-[360px] items-center justify-center max-[980px]:order-[-1] max-[980px]:mb-[18px] max-[980px]:h-[280px] max-[520px]:h-[220px]"
            aria-hidden="true"
          >
            {aboutBooks.length >= 2 ? (
              <>
                <img
                  className="book back absolute left-4 z-[1] h-[320px] w-[220px] origin-center -translate-y-1.5 -rotate-12 rounded-md bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[230px] max-[520px]:w-[160px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[0].image}
                  alt={aboutBooks[0].name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <img
                  className="book front absolute right-[10px] z-[2] h-[320px] w-[220px] origin-center translate-y-1.5 rotate-12 rounded-md bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[230px] max-[520px]:w-[160px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[1].image}
                  alt={aboutBooks[1].name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
