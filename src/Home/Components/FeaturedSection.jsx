import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const FeaturedSection = ({
  featuredBooks,
  featuredIndex = 0,
  featuredPerView = 1,
  setSelectedFeaturedBook,
}) => {
  const trackRef = React.useRef(null);
  const [offset, setOffset] = React.useState(0);
  const [transitionEnabled, setTransitionEnabled] = React.useState(false);

  // Skeleton data for loading state
  const skeletons = Array.from({ length: 5 }).map((_, i) => ({
    book_id: `skeleton-featured-${i}`,
    name: "Loading...",
    image: null,
  }));

  const displayBooks = featuredBooks.length > 0 ? featuredBooks : skeletons;
  const maxIndex = Math.max(0, displayBooks.length - featuredPerView);
  const clampedIndex = Math.min(featuredIndex, maxIndex);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.querySelector("article");
    if (!firstSlide) return;

    const computed = window.getComputedStyle(firstSlide);
    const margin =
      parseFloat(computed.marginLeft || "0") +
      parseFloat(computed.marginRight || "0");
    const step = firstSlide.offsetWidth + margin;

    if (displayBooks.length <= featuredPerView) {
      setOffset(0);
      return;
    }

    setOffset(-(clampedIndex * step));
    if (!transitionEnabled) {
      requestAnimationFrame(() => setTransitionEnabled(true));
    }
  }, [clampedIndex, displayBooks.length, featuredPerView, transitionEnabled]);

  React.useEffect(() => {
    const handleResize = () => {
      setTransitionEnabled(false);
      setOffset(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="featured overflow-hidden py-20 pb-4" id="featured">
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[72px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]">
        FEATURED BOOKS
      </h2>

      <div
        className="featured__container mx-auto w-full max-w-[1250px]"
        data-reveal
      >
        <div
          ref={trackRef}
          className={`flex w-max ${
            transitionEnabled
              ? "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              : ""
          }`}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {displayBooks.map((book, index) => (
            <article
              key={`${book.book_id}-${index}`}
              className="duration-400 relative mx-[20px] flex h-[620px] w-[320px] shrink-0 flex-col items-center overflow-hidden rounded-[24px] border border-[#000035] p-[22px_26px] text-center transition-[box-shadow,background-color,border-color] dark:border-[#D7D7D7]"
            >
              <LazyImage
                src={book.image}
                alt={book.name}
                className="mx-auto mb-6 h-[400px] !w-full !max-w-none rounded-[14px] object-cover"
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
