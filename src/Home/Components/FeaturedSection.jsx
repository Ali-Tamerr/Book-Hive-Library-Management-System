import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const FeaturedSection = ({
  featuredBooks,
  setSelectedFeaturedBook,
}) => {
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
    <section className="featured py-20 pb-4 overflow-hidden" id="featured">
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[80px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]">
        FEATURED BOOKS
      </h2>
      
      <div className="featured__container w-full" data-reveal>
        <div className="flex w-max animate-infinite-scroll">
          {doubledBooks.map((book, index) => (
            <article
              key={`${book.book_id}-${index}`}
              className="duration-400 relative flex h-[760px] w-[400px] shrink-0 flex-col items-center overflow-hidden rounded-[24px] p-[30px_35px] text-center border border-[#000035] dark:border-[#D7D7D7] transition-[box-shadow,background-color,border-color] mx-[30px]"
            >
              <LazyImage
                src={book.image}
                alt={book.name}
                className="mx-auto mb-8 h-[500px] !w-full !max-w-none rounded-[14px] object-cover"
                priority
              />
              <h2 className="mb-6 flex grow items-end justify-center overflow-hidden text-ellipsis font-[family-name:var(--second-font)] text-[2rem] font-bold leading-tight text-[#03030f] dark:!text-[#d3d6de]">
                {book.name}
              </h2>
              <HomeButton
                className="px-[45px] py-[20px]"
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
