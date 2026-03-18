import React, { useEffect, useMemo, useState } from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const FeaturedSection = ({
  featuredBooks,
  featuredPerView = 1,
  onExplore,
}) => {
  const [localIndex, setLocalIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Skeleton data for loading state
  const skeletons = Array.from({ length: 5 }).map((_, i) => ({
    book_id: `skeleton-featured-${i}`,
    name: "Loading...",
    image: null,
  }));

  const originalLength =
    featuredBooks.length > 0 ? featuredBooks.length : skeletons.length;

  const displayBooks = useMemo(() => {
    const list = featuredBooks.length > 0 ? featuredBooks : skeletons;
    // Triple the array for seamless infinite looping
    return [...list, ...list, ...list];
  }, [featuredBooks]);

  const safePerView = featuredPerView || 1;
  const isCarousel = originalLength > safePerView;

  // Auto-scroll logic
  useEffect(() => {
    if (!isCarousel) return;
    const interval = setInterval(() => {
      setLocalIndex((prev) => prev + 1);
    }, 3500); // 3.5 seconds per slide
    return () => clearInterval(interval);
  }, [isCarousel]);

  // Infinite loop snap-back logic
  useEffect(() => {
    if (originalLength === 0) return;

    // When we've scrolled a full original set, snap back silently
    if (localIndex > 0 && localIndex % originalLength === 0) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setLocalIndex(0); // Snap back to the real 0

        // Re-enable transition after snap
        setTimeout(() => setTransitionEnabled(true), 50);
      }, 700); // Wait for the CSS transition (duration-700) to finish

      return () => clearTimeout(timer);
    }
  }, [localIndex, originalLength]);

  const trackTransform = isCarousel
    ? `translateX(-${localIndex * (100 / safePerView)}%)`
    : "none";

  return (
    <section className="featured overflow-hidden py-20 pb-4" id="featured">
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[72px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]">
        FEATURED BOOKS
      </h2>

      <div
        // Changed from max-w-[1250px] to max-w-[1500px] to give cards breathing room when 4 fit
        className="featured__container mx-auto w-full max-w-[1500px]"
        data-reveal
      >
        <div className="overflow-hidden">
          <div
            className={`flex ${
              transitionEnabled
                ? "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                : ""
            }`}
            style={{
              transform: trackTransform,
            }}
          >
            {displayBooks.map((book, index) => (
              <article
                key={`${book.book_id}-${index}`}
                className="duration-400 relative flex shrink-0 flex-col items-center overflow-hidden rounded-[24px] border border-[#000035] p-[22px_26px] text-center transition-[box-shadow,background-color,border-color] dark:border-[#D7D7D7]"
                style={{
                  width: `calc(${100 / safePerView}% - 40px)`,
                  margin: "0 20px", // mx-[20px] equals 40px total margin per card
                  height: "unset", // Keep natural or responsive sizing
                  minHeight: "580px", // ensure steady height
                }}
              >
                <LazyImage
                  src={book.image}
                  alt={book.name}
                  className="mx-auto mb-6 h-[380px] !w-full !max-w-none rounded-[14px] object-cover"
                  priority
                />
                <h2 className="mb-6 flex grow items-end justify-center overflow-hidden text-ellipsis font-[family-name:var(--second-font)] text-[26px] font-bold leading-tight text-[#03030f] dark:!text-[#d3d6de]">
                  {book.name}
                </h2>
                <HomeButton
                  className="px-[40px] py-[18px]"
                  onClick={() => onExplore()}
                >
                  Explore Now
                </HomeButton>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
