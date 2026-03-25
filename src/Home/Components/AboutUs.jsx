import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const AboutUs = ({ stats, setActivePopup, aboutBooks }) => {
  return (
    <section
      className="section-about px-7 py-12 pb-[64px] max-[680px]:px-4 max-[680px]:py-8"
      id="about"
      aria-labelledby="about-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1688px] px-5 max-[680px]:px-1">
        <h2
          id="about-heading"
          className="about-title mb-10 text-center font-[family-name:var(--body-font)] text-[62px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)] max-[680px]:mb-6 max-[680px]:text-[44px] max-[520px]:text-[36px]"
        >
          ABOUT US
        </h2>
        <div className="about-grid grid grid-cols-[1fr_minmax(520px,700px)] items-center gap-12 max-[1150px]:grid-cols-1 max-[1150px]:text-center">
          <div className="about-left mx-auto max-w-[1200px]">
            <p className="about-text mb-12 text-center font-[family-name:var(--second-font)] text-[24px] font-bold leading-[1.55] text-[#000035] dark:!text-[var(--muted)] max-[680px]:mb-8 max-[680px]:text-[18px] max-[520px]:text-[16px]">
              We are a smart, technology-driven library system that uses RFID to
              make book management faster and easier. Our platform helps
              students and staff search, borrow, and track books efficiently
              with a modern and user-friendly design.
            </p>
            <div
              className="stats mb-12 flex flex-wrap items-start justify-center gap-[72px] max-[680px]:mb-8 max-[680px]:gap-6"
              role="list"
              aria-label="Quick facts"
            >
              <div className="stat min-w-[160px] text-center max-[680px]:min-w-[100px]" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[38px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)] max-[680px]:text-[30px]">
                  {stats.branches}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[19px] font-bold text-[#000035] dark:!text-[#9ea1a8] max-[680px]:text-[16px]">
                  Branches
                </div>
              </div>
              <div className="stat min-w-[160px] text-center max-[680px]:min-w-[100px]" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[38px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)] max-[680px]:text-[30px]">
                  {stats.books}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[19px] font-bold text-[#000035] dark:!text-[#9ea1a8] max-[680px]:text-[16px]">
                  Books
                </div>
              </div>
              <div className="stat min-w-[160px] text-center max-[680px]:min-w-[100px]" role="listitem">
                <div className="num mb-2 font-[family-name:var(--body-font)] text-[38px] font-bold text-[var(--accent)] dark:!text-[var(--title-color)] max-[680px]:text-[30px]">
                  {stats.categories}+
                </div>
                <div className="label font-[family-name:var(--second-font)] text-[19px] font-bold text-[#000035] dark:!text-[#9ea1a8] max-[680px]:text-[16px]">
                  Category
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <HomeButton
                className="px-[40px] py-[16px] max-[680px]:px-[26px] max-[680px]:py-[12px]"
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
            className="about-right pointer-events-none relative flex h-[640px] items-center justify-center max-[1150px]:order-[-1] max-[1150px]:mb-[44px] max-[1150px]:h-[590px] max-[680px]:h-[430px] max-[520px]:h-[320px]"
            aria-hidden="true"
          >
            {aboutBooks.length >= 2 ? (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[560px] w-[360px] origin-center -translate-y-3 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[680px]:h-[390px] max-[680px]:w-[260px] max-[520px]:h-[290px] max-[520px]:w-[190px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[0].image}
                  alt={aboutBooks[0].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[560px] w-[360px] origin-center translate-y-5 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[680px]:h-[390px] max-[680px]:w-[260px] max-[520px]:h-[290px] max-[520px]:w-[190px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={aboutBooks[1].image}
                  alt={aboutBooks[1].name}
                  priority
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </>
            ) : (
              <>
                <LazyImage
                  className="book back absolute left-0 z-[1] h-[560px] w-[360px] origin-center -translate-y-3 -rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[680px]:h-[390px] max-[680px]:w-[260px] max-[520px]:h-[290px] max-[520px]:w-[190px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
                  src={null}
                  priority
                />
                <LazyImage
                  className="book front absolute right-0 z-[2] h-[560px] w-[360px] origin-center translate-y-5 rotate-12 rounded-lg bg-[#D7D7D7] object-cover shadow-[0_18px_30px_rgba(10,10,35,0.12)] transition-transform duration-[220ms] ease-in-out max-[1150px]:h-[520px] max-[1150px]:w-[330px] max-[680px]:h-[390px] max-[680px]:w-[260px] max-[520px]:h-[290px] max-[520px]:w-[190px] dark:shadow-[0_18px_32px_rgba(0,0,0,0.55)]"
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
