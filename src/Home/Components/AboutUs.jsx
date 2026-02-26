import React from "react";
import LazyImage from "../../components/LazyImage";

const AboutUs = ({ stats, setActivePopup, aboutBooks }) => {
  return (
    <section
      className="section-about px-7 py-20 pb-[100px]"
      id="about"
      aria-labelledby="about-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1875px] px-5">
        <h2
          id="about-heading"
          className="about-title mb-16 text-center font-[family-name:var(--body-font)] text-[80px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]"
        >
          ABOUT US
        </h2>
        <div className="about-grid grid grid-cols-[1fr_minmax(600px,800px)] items-center gap-20 max-[980px]:grid-cols-1 max-[980px]:text-center">
          <div className="about-left mx-auto max-w-[1200px]">
            <p className="about-text mb-20 text-center font-[family-name:var(--second-font)] text-[32px] font-bold leading-relaxed text-[#525252] dark:!text-[var(--muted)]">
              We are a smart, technology-driven library system that uses RFID to
              make book management faster and easier. Our platform helps
              students and staff search, borrow, and track books efficiently
              with a modern and user-friendly design.
            </p>
            <div
              className="stats mb-20 flex flex-wrap items-start justify-center gap-[120px]"
              role="list"
              aria-label="Quick facts"
            >
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-4 font-[family-name:var(--body-font)] text-[48px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.branches}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[24px] font-bold text-[#525252] dark:!text-[#9ea1a8]">
                  Branches
                </div>
              </div>
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-4 font-[family-name:var(--body-font)] text-[48px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.books}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[24px] font-bold text-[#525252] dark:!text-[#9ea1a8]">
                  Books
                </div>
              </div>
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-4 font-[family-name:var(--body-font)] text-[48px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.categories}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[24px] font-bold text-[#525252] dark:!text-[#9ea1a8]">
                  Category
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <a
                className="about-cta inline-block rounded-[10px] border border-[#f7f7f7] bg-[#000035] px-[50px] py-[22px] font-[family-name:var(--second-font)] text-[24px] font-bold text-[#f7f7f7] no-underline transition-[background-color,color,border-color] duration-300 hover:border-[#111214] hover:bg-[#f7f7f7] hover:text-[#111214] dark:border-[#f7f7f7] dark:bg-[#111214] dark:text-[#f7f7f7] dark:hover:border-[#111214] dark:hover:bg-[#f7f7f7] dark:hover:text-[#111214] dark:hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePopup("branches");
                }}
              >
                Where are we ?
              </a>
            </div>
          </div>
          <div
            className="about-right pointer-events-none relative flex h-[800px] items-center justify-center max-[980px]:order-[-1] max-[980px]:mb-[40px] max-[980px]:h-[600px] max-[520px]:h-[450px]"
            aria-hidden="true"
          >
            {aboutBooks.length >= 2 ? (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[700px] w-[450px] origin-center -translate-y-4 -rotate-12 rounded-lg bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[450px] max-[520px]:w-[320px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[0].image}
                  alt={aboutBooks[0].name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[700px] w-[450px] origin-center translate-y-6 rotate-12 rounded-lg bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[450px] max-[520px]:w-[320px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[1].image}
                  alt={aboutBooks[1].name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </>
            ) : (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[700px] w-[450px] origin-center -translate-y-4 -rotate-12 rounded-lg bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[450px] max-[520px]:w-[320px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={null}
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[700px] w-[450px] origin-center translate-y-6 rotate-12 rounded-lg bg-white object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[520px]:h-[450px] max-[520px]:w-[320px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={null}
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
