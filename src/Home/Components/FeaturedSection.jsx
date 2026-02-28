import React from "react";
import LazyImage from "../../components/LazyImage";

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
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[80px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]">
        FEATURED BOOKS
      </h2>
      <div
        className="featured__container mx-auto w-full max-w-[1875px] px-6"
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
              {(featuredBooks.length > 0
                ? featuredBooks
                : Array.from({ length: 5 }).map((_, i) => ({
                    book_id: `skeleton-featured-${i}`,
                    name: "Loading...",
                    image: null,
                  }))
              ).map((book) => (
                <article
                  key={book.book_id}
                  className="duration-400 relative flex h-[760px] min-w-[400px] shrink-0 flex-col items-center overflow-hidden rounded-[24px] border-none bg-white p-[30px_35px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,background-color] dark:border-[#e4e4e7] dark:bg-[#f7f7f7] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                  style={{
                    width: `calc(${80 / featuredPerView}% - 60px)`,
                    margin: "0 30px",
                  }}
                >
                  <LazyImage
                    src={book.image}
                    alt={book.name}
                    className="mx-auto mb-8 h-[500px] !w-full !max-w-none rounded-[14px] object-cover"
                  />
                  <h2 className="mb-6 flex grow items-end justify-center overflow-hidden text-ellipsis font-[family-name:var(--second-font)] text-[2rem] font-bold leading-tight text-[#000035] dark:!text-[#1b1c20]">
                    {book.name}
                  </h2>
                  <button
                    className="inline-block rounded-lg border border-[#000035] bg-[#000035] px-[45px] py-[20px] font-[family-name:Montserrat,sans-serif] text-[20px] font-bold text-[#f7f7f7] duration-500 hover:border-[#000035] hover:bg-[#E8E8E8] hover:text-[#111214] dark:border-[#000035] dark:bg-[#000035] dark:text-[#f7f7f7] dark:hover:border-[#000035] dark:hover:bg-[#f7f7f7] dark:hover:text-[#111214]"
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
            className="absolute left-0 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-white"
          >
            <i className="ri-arrow-left-s-line text-4xl"></i>
          </button>
          <button
            onClick={featuredNext}
            className="absolute right-0 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-white"
          >
            <i className="ri-arrow-right-s-line text-4xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
