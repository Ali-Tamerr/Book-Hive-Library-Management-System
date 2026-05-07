import React, { useEffect, useMemo, useState } from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const FeaturedSection = ({
  featuredBooks,
  featuredPerView = 1,
  onExplore,
}) => {
  const [localIndex, setLocalIndex] = useState(-1); // Start at -1, initialize in effect
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);

  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);
  const swipeTimer = React.useRef(null);

  // Skeleton data for loading state
  const skeletons = Array.from({ length: 5 }).map((_, i) => ({
    book_id: `skeleton-featured-${i}`,
    name: "Loading...",
    image: null,
  }));

  const originalLength =
    featuredBooks.length > 0 ? featuredBooks.length : skeletons.length;

  // Initialize localIndex to start at the second block (for backward swiping)
  useEffect(() => {
    if (localIndex === -1 && originalLength > 0) {
      setLocalIndex(originalLength);
    }
  }, [originalLength, localIndex]);

  const displayBooks = useMemo(() => {
    const list = featuredBooks.length > 0 ? featuredBooks : skeletons;
    // Triple the array for seamless infinite looping
    return [...list, ...list, ...list];
  }, [featuredBooks]);

  const safePerView = featuredPerView || 1;
  const isCarousel = originalLength > safePerView;

  // Auto-scroll logic
  useEffect(() => {
    if (!isCarousel || isSwiping || localIndex === -1) return;
    const interval = setInterval(() => {
      setLocalIndex((prev) => prev + 1);
    }, 3500); // 3.5 seconds per slide
    return () => clearInterval(interval);
  }, [isCarousel, isSwiping, localIndex]);

  // Infinite loop snap-back logic
  useEffect(() => {
    if (originalLength === 0 || localIndex === -1) return;

    if (localIndex >= originalLength * 2) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setLocalIndex(originalLength); // Snap back to middle block
        setTimeout(() => setTransitionEnabled(true), 50);
      }, 700);
      return () => clearTimeout(timer);
    }

    if (localIndex < originalLength) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setLocalIndex(originalLength * 2 - 1);
        setTimeout(() => setTransitionEnabled(true), 50);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [localIndex, originalLength]);

  const handleDragStart = (clientX) => {
    setIsSwiping(true);
    if (swipeTimer.current) clearTimeout(swipeTimer.current);
    touchStartX.current = clientX;
    touchEndX.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!isSwiping) return;
    touchEndX.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isSwiping) return;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        setLocalIndex((prev) => prev + 1);
      } else {
        setLocalIndex((prev) => prev - 1);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;

    swipeTimer.current = setTimeout(() => {
      setIsSwiping(false);
    }, 1000);
  };

  const trackTransform = isCarousel && localIndex !== -1
    ? `translateX(-${localIndex * (100 / safePerView)}%)`
    : "none";

  return (
    <section className="featured overflow-hidden py-16 pb-4 max-[42.5rem]:py-10" id="featured">
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[4.5rem] font-extrabold tracking-wide text-[var(--title-color)] dark:!text-[var(--title-color)] max-[42.5rem]:mb-8 max-[42.5rem]:text-[2.75rem] max-[32.5rem]:text-[2.25rem]">
        FEATURED BOOKS
      </h2>

      <div
        // Changed from max-w-[78.125rem] to max-w-[93.75rem] to give cards breathing room when 4 fit
        className="featured__container mx-auto w-full max-w-[93.75rem]"
        data-reveal
      >
        <div 
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div
            className={`flex pointer-events-none ${
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
                className="pointer-events-auto duration-400 relative flex shrink-0 flex-col items-center overflow-hidden rounded-[1.5rem] border border-[var(--title-color)] p-[1.375rem_1.625rem] text-center transition-[box-shadow,background-color,border-color] max-[42.5rem]:rounded-[1.125rem] max-[42.5rem]:p-[1rem_0.875rem] dark:border-[var(--title-color)]"
                style={{
                  width: `calc(${100 / safePerView}% - ${safePerView > 2 ? "2.5rem" : "1.5rem"})`,
                  margin: `0 ${safePerView > 2 ? "1.25rem" : "0.75rem"}`, // Reduce margin on mobile to fit 2 cards better
                  height: "unset", // Keep natural or responsive sizing
                  minHeight: window.innerWidth < 680 ? "28.75rem" : "36.25rem", // ensure steady height
                }}
              >
                <LazyImage
                  src={book.image}
                  alt={book.name}
                  className="mx-auto mb-6 h-[23.75rem] !w-full !max-w-none rounded-[0.875rem] object-cover max-[42.5rem]:h-[16.875rem]"
                  priority
                />
                <h2 className="mb-6 flex grow items-end justify-center overflow-hidden text-ellipsis font-[family-name:var(--second-font)] text-[1.625rem] font-bold leading-tight text-[var(--title-color)] dark:!text-[var(--title-color)] max-[42.5rem]:text-[1.1rem]">
                  {book.name}
                </h2>
                <HomeButton
                  className="px-[2.5rem] py-[1.125rem] max-[42.5rem]:px-[1.25rem] max-[42.5rem]:py-[0.6rem] max-[42.5rem]:text-[1rem]"
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
