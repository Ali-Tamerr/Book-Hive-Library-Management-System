import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const FeaturedSection = ({ featuredBooks, setSelectedFeaturedBook }) => {
  // Skeleton data for loading state
  const skeletons = Array.from({ length: 5 }).map((_, i) => ({
    book_id: `skeleton-featured-${i}`,
    name: "Loading...",
    image: null,
  }));

  const displayBooks = featuredBooks.length > 0 ? featuredBooks : skeletons;

  // Double the list for seamless infinite scroll
  const doubledBooks = [...displayBooks, ...displayBooks];

  return (
    <section className="featured overflow-hidden py-20 pb-4" id="featured">
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[72px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]">
        FEATURED BOOKS
      </h2>

      <div
        className="featured__container mx-auto w-full max-w-[1520px]"
        data-reveal
      >
        <div className="animate-infinite-scroll flex w-max">
          {doubledBooks.map((book, index) => (
            <article
              key={`${book.book_id}-${index}`}
              className="duration-400 relative mx-[25px] flex h-[680px] w-[360px] shrink-0 flex-col items-center overflow-hidden rounded-[24px] border border-[#000035] p-[25px_30px] text-center transition-[box-shadow,background-color,border-color] dark:border-[#D7D7D7]"
            >
              <LazyImage
                src={book.image}
                alt={book.name}
                className="mx-auto mb-8 h-[450px] !w-full !max-w-none rounded-[14px] object-cover"
                priority
              />
              <h2 className="mb-6 flex grow items-end justify-center overflow-hidden text-ellipsis font-[family-name:var(--second-font)] text-[1.8rem] font-bold leading-tight text-[#03030f] dark:!text-[#d3d6de]">
                {book.name}
              </h2>
              <HomeButton
                className="px-[40px] py-[18px]"
                onClick={() => setSelectedFeaturedBook(book)}
              >
                Book Now
              </HomeButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
