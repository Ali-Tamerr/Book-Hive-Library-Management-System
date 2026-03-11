import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const Hero = ({ scrollToSection, heroContainerRef, heroIndex, heroBooks }) => {
  return (
    <section className="home py-20 pb-4" id="home">
      <div className="home__container min-[1220px]:pt-35 mx-auto grid w-full max-w-[1688px] gap-x-9 gap-y-14 px-6 pt-20 min-[1220px]:grid-cols-[612px_1044px] min-[1220px]:items-center min-[1220px]:pb-7">
        <div className="text-center min-[1220px]:text-left" data-reveal>
          <h1 className="mb-4 font-[family-name:var(--body-font)] text-[5.375rem] font-extrabold leading-[1.1] text-[var(--title-color)] min-[1220px]:text-[5.0625rem] dark:!text-[#c7c9cf]">
            One Library, <br />
            Infinite Stories
          </h1>
          <p className="min-[1220px]:mb-22 font-[family-name:var(--second-font)] text-[25px] font-medium text-[var(--title-color)] max-[1220px]:mt-10 dark:!text-[#b9bbc1]">
            With Bookhive, every book has a place and every reader has a path:
            search, borrow, and renew in a few clicks, while librarians track
            everything effortlessly.
          </p>
          <HomeButton
            href="#featured"
            className="px-9 py-5 max-[1220px]:mt-10"
            onClick={(e) => scrollToSection(e, "featured")}
          >
            Explore Now
          </HomeButton>
        </div>
        <div className="grid gap-6" data-reveal>
          <div className="relative overflow-hidden" ref={heroContainerRef}>
            <div
              className="scale-84 flex transition-transform duration-500 ease-in-out"
              style={{
                transform: (() => {
                  const container = heroContainerRef.current;
                  if (!container) return "translateX(0px)";
                  const firstSlide = container.querySelector("article");
                  const slideWidth = firstSlide ? firstSlide.offsetWidth : 422;
                  const slideGap = 27;
                  const slideStep = slideWidth + slideGap;
                  const containerWidth = container.offsetWidth;
                  const offset =
                    containerWidth / 2 - heroIndex * slideStep - slideWidth / 2;
                  return `translateX(${offset}px)`;
                })(),
              }}
            >
              {(heroBooks.length > 0
                ? heroBooks
                : Array.from({ length: 3 }).map((_, i) => ({
                    book_id: `skeleton-hero-${i}`,
                    name: "Loading...",
                    image: null,
                  }))
              ).map((book, i) => (
                <article
                  key={book.book_id}
                  className="shrink-0 transition-[scale] duration-500 ease-in-out min-[1220px]:w-[407px] dark:!rounded-[6px] dark:!shadow-[0_16px_30px_rgba(0,0,0,0.35)]"
                  style={{
                    marginRight: "27px",
                    scale: i === heroIndex ? "1" : "0.8",
                  }}
                >
                  <LazyImage
                    src={book.image}
                    alt={book.name}
                    className="rounded-xs !h-[563px] !w-[422px] !max-w-none !object-cover"
                    priority
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
