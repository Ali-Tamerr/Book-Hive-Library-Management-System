import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const AboutUs = ({ stats, setActivePopup, aboutBooks }) => {
  return (
    <section
      className="section-about px-7 py-12 pb-[64px]"
      id="about"
      aria-labelledby="about-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1688px] px-5">
        <h2
          id="about-heading"
          className="about-title mb-10 text-center font-[family-name:var(--body-font)] text-[62px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]"
        >
          ABOUT US
        </h2>
        <div className="about-grid grid grid-cols-[1fr_minmax(520px,700px)] items-center gap-12 max-[1150px]:grid-cols-1 max-[1150px]:text-center">
          <div className="about-left mx-auto max-w-[1200px]">
            <p className="about-text mb-12 text-center font-[family-name:var(--second-font)] text-[24px] font-bold leading-[1.55] text-[#000035] dark:!text-[var(--muted)]">
              We are a smart, technology-driven library system that uses RFID to
              make book management faster and easier. Our platform helps
              students and staff search, borrow, and track books efficiently
              with a modern and user-friendly design.
            </p>
            <div
              className="stats mb-12 flex flex-wrap items-start justify-center gap-[72px]"
              role="list"
              aria-label="Quick facts"
            >
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[38px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.branches}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[19px] font-bold text-[#000035] dark:!text-[#9ea1a8]">
                  Branches
                </div>
              </div>
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[38px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.books}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[19px] font-bold text-[#000035] dark:!text-[#9ea1a8]">
                  Books
                </div>
              </div>
              <div className="stat min-w-[160px] text-center" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[38px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)]">
                  {stats.categories}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[19px] font-bold text-[#000035] dark:!text-[#9ea1a8]">
                  Category
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <HomeButton
                className="px-[40px] py-[16px]"
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
            className="about-right pointer-events-none relative flex h-[640px] items-center justify-center max-[1150px]:order-[-1] max-[1150px]:mb-[44px] max-[1150px]:h-[590px] max-[520px]:h-[380px]"
            aria-hidden="true"
          >
            {aboutBooks.length >= 2 ? (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[560px] w-[360px] origin-center -translate-y-3 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[520px]:h-[360px] max-[520px]:w-[250px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[0].image}
                  alt={aboutBooks[0].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[560px] w-[360px] origin-center translate-y-5 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[520px]:h-[360px] max-[520px]:w-[250px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[1].image}
                  alt={aboutBooks[1].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </>
            ) : (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[560px] w-[360px] origin-center -translate-y-3 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[520px]:h-[360px] max-[520px]:w-[250px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={null}
                  priority
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[560px] w-[360px] origin-center translate-y-5 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[520px]:h-[360px] max-[520px]:w-[250px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
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
