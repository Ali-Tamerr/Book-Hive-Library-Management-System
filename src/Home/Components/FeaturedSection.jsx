import React from "react";

const FeaturedSection = ({
  featuredBooks,
  featuredIndex,
  featuredPerView,
  setSelectedFeaturedBook,
  featuredPrev,
  featuredNext,
}) => {
  return (
    <section className="featured py-20 pb-4" id="featured">
      <h2 className="section__title mb-8 text-center font-[family-name:var(--body-font)] text-[length:var(--h1-font-size)] font-extrabold">
        Featured Books
      </h2>
      <div
        className="featured__container mx-auto w-full max-w-[1220px] px-6"
        data-reveal
      >
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${featuredIndex * (100 / featuredPerView)}%)`,
              }}
            >
              {featuredBooks.map((book) => (
                <article
                  key={book.book_id}
                  className="duration-400 relative flex h-[500px] shrink-0 flex-col items-center overflow-hidden rounded-[18px] border-none bg-white p-[20px_25px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,background-color] dark:border-[#e4e4e7] dark:bg-[#f7f7f7] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                  style={{
                    width: `${100 / featuredPerView}%`,
                    margin: "0 8px",
                  }}
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    className="mx-auto mb-6 !h-[280px] !w-full !max-w-none rounded-[10px] object-cover"
                  />
                  <h2 className="mb-4 flex grow items-end justify-center font-[family-name:var(--second-font)] text-[28px] font-bold text-[#000035] dark:!text-[#1b1c20]">
                    {book.name}
                  </h2>
                  <button
                    className="button duration-400 inline-block cursor-pointer rounded-xl border border-[var(--first-color)] bg-[var(--first-color)] px-6 py-4 font-[family-name:var(--second-font)] font-bold text-[var(--white-color)] transition-[box-shadow] hover:border-[#000035] hover:bg-white hover:text-[#000035] dark:!border-[#1b1c20] dark:!bg-[#1b1c20] dark:!text-white dark:hover:!border-[#1b1c20] dark:hover:!bg-white dark:hover:!text-[#1b1c20]"
                    onClick={() => setSelectedFeaturedBook(book)}
                  >
                    Book Now
                  </button>
                </article>
              ))}
            </div>
          </div>
          <button
            onClick={featuredPrev}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-white"
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            onClick={featuredNext}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-white"
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
