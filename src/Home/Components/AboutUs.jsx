import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const AboutUs = ({ stats, setActivePopup, aboutBooks }) => {
  return (
    <section
      className="section-about px-7 py-18 pb-[96px]"
      id="about"
      aria-labelledby="about-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1688px] px-5">
        <h2
          id="about-heading"
          className="about-title mb-14 text-center font-[family-name:var(--body-font)] text-[76px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]"
        >
          ABOUT US
        </h2>
        <div className="about-grid grid grid-cols-[1fr_minmax(580px,780px)] items-center gap-18 max-[1150px]:grid-cols-1 max-[1150px]:text-center">
          <div className="about-left mx-auto max-w-[1200px]">
            <p className="about-text mb-18 text-center font-[family-name:var(--second-font)] text-[30px] font-bold leading-relaxed text-[#000035] dark:!text-[var(--muted)]">
              We are a smart, technology-driven library system that uses RFID to
              make book management faster and easier. Our platform helps
              students and staff search, borrow, and track books efficiently
              with a modern and user-friendly design.
            </p>
            <div
              className="stats mb-18 flex flex-wrap items-start justify-center gap-[110px]"
              role="list"
              aria-label="Quick facts"
            >
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-4 font-[family-name:var(--body-font)] text-[46px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.branches}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[23px] font-bold text-[#000035] dark:!text-[#9ea1a8]">
                  Branches
                </div>
              </div>
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-4 font-[family-name:var(--body-font)] text-[46px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.books}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[23px] font-bold text-[#000035] dark:!text-[#9ea1a8]">
                  Books
                </div>
              </div>
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-4 font-[family-name:var(--body-font)] text-[46px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.categories}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[23px] font-bold text-[#000035] dark:!text-[#9ea1a8]">
                  Category
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <HomeButton
                className="px-[48px] py-[21px]"
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
            className="about-right pointer-events-none relative flex h-[780px] items-center justify-center max-[1150px]:order-[-1] max-[1150px]:mb-[56px] max-[1150px]:h-[730px] max-[520px]:h-[440px]"
            aria-hidden="true"
          >
            {aboutBooks.length >= 2 ? (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[680px] w-[440px] origin-center -translate-y-4 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[630px] max-[1150px]:w-[390px] max-[520px]:h-[440px] max-[520px]:w-[310px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[0].image}
                  alt={aboutBooks[0].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[680px] w-[440px] origin-center translate-y-6 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[630px] max-[1150px]:w-[390px] max-[520px]:h-[440px] max-[520px]:w-[310px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[1].image}
                  alt={aboutBooks[1].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </>
            ) : (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[680px] w-[440px] origin-center -translate-y-4 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[630px] max-[1150px]:w-[390px] max-[520px]:h-[440px] max-[520px]:w-[310px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={null}
                  priority
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[680px] w-[440px] origin-center translate-y-6 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[630px] max-[1150px]:w-[390px] max-[520px]:h-[440px] max-[520px]:w-[310px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
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
