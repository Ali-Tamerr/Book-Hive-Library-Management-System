import React from "react";

const Hero = ({ scrollToSection, heroContainerRef, heroIndex, heroBooks }) => {
  return (
    <section className="home py-20 pb-4" id="home">
      <div className="home__container mx-auto grid w-full max-w-[1220px] gap-x-6 gap-y-10 px-6 pt-8 min-[1220px]:grid-cols-[435px_745px] min-[1220px]:items-center min-[1220px]:pb-8 min-[1220px]:pt-28">
        <div className="text-center min-[1220px]:text-left" data-reveal>
          <h1 className="mb-4 font-[family-name:var(--body-font)] text-[length:var(--biggest-font-size)] font-extrabold text-[var(--title-color)] dark:!text-[#c7c9cf]">
            One Library, <br />
            Infinite Stories
          </h1>
          <p className="mb-8 font-[family-name:var(--second-font)] text-[18px] font-medium text-[var(--title-color)] min-[1220px]:mb-16 dark:!text-[#b9bbc1]">
            With Bookhive, every book has a place and every reader has a path:
            search, borrow, and renew in a few clicks, while librarians track
            everything effortlessly.
          </p>
          <a
            href="#featured"
            className="inline-block rounded-lg border border-[#f7f7f7] bg-[#111214] px-6 py-4 font-[family-name:Montserrat,sans-serif] font-bold text-[#f7f7f7] duration-500 hover:border-[#111214] hover:bg-[#E8E8E8] hover:text-[#111214] dark:border-[#f7f7f7] dark:bg-[#111214] dark:text-[#f7f7f7] dark:hover:border-[#111214] dark:hover:bg-[#f7f7f7] dark:hover:text-[#111214] dark:hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
            onClick={(e) => scrollToSection(e, "featured")}
          >
            Explore Now
          </a>
        </div>
        <div className="grid gap-6" data-reveal>
          <div className="relative overflow-hidden" ref={heroContainerRef}>
            <div
              className="flex scale-85 transition-transform duration-500 ease-in-out"
              style={{
                transform: (() => {
                  const container = heroContainerRef.current;
                  if (!container) return "translateX(0px)";
                  const firstSlide = container.querySelector("article");
                  const slideWidth = firstSlide ? firstSlide.offsetWidth : 300;
                  const slideGap = 20;
                  const slideStep = slideWidth + slideGap;
                  const containerWidth = container.offsetWidth;
                  const offset =
                    containerWidth / 2 - heroIndex * slideStep - slideWidth / 2;
                  return `translateX(${offset}px)`;
                })(),
              }}
            >
              {heroBooks.length > 0
                ? heroBooks.map((book, i) => (
                    <article
                      key={book.book_id}
                      className="shrink-0 transition-[scale] duration-500 ease-in-out min-[1220px]:w-[290px] dark:!rounded-[6px] dark:!shadow-[0_16px_30px_rgba(0,0,0,0.35)]"
                      style={{
                        marginRight: "20px",
                        scale: i === heroIndex ? "1" : "0.8",
                      }}
                    >
                      <img
                        src={book.image}
                        alt={book.name}
                        className="!h-[400px] !w-[300px] !max-w-none rounded-xs !object-cover"
                      />
                    </article>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
