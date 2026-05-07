import React, { useEffect, useMemo, useRef, useState } from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const FeaturedSection = ({
  featuredBooks,
  featuredPerView = 1,
  onExplore,
}) => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimer = useRef(null);

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

  // Initial scroll to middle block
  useEffect(() => {
    const el = carouselRef.current;
    if (el && originalLength > 0 && isCarousel) {
      el.style.scrollBehavior = "auto";
      const slideWidth = el.scrollWidth / (originalLength * 3);
      el.scrollLeft = slideWidth * originalLength;
      el.style.scrollBehavior = "smooth";
    }
  }, [originalLength, isCarousel]);

  // Handle native scroll
  const handleScroll = () => {
    setIsHovered(true);
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    const el = carouselRef.current;
    if (el && originalLength > 0 && isCarousel) {
      const slideWidth = el.scrollWidth / (originalLength * 3);
      // If we scrolled past the second block
      if (el.scrollLeft >= slideWidth * originalLength * 2) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = el.scrollLeft - slideWidth * originalLength;
        el.style.scrollBehavior = "smooth";
      } 
      // If we scrolled before the second block
      else if (el.scrollLeft <= slideWidth * (originalLength - 1)) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = el.scrollLeft + slideWidth * originalLength;
        el.style.scrollBehavior = "smooth";
      }
    }

    scrollTimer.current = setTimeout(() => {
      setIsHovered(false);
    }, 1000);
  };

  // Mouse drag logic
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsHovered(true);
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    
    const el = carouselRef.current;
    if (el) {
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftRef.current = el.scrollLeft;
      // Disable snap temporarily to allow fluid dragging
      el.style.scrollBehavior = "auto";
      el.classList.remove("snap-x", "snap-mandatory");
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      const el = carouselRef.current;
      if (el) {
        el.style.scrollBehavior = "smooth";
        el.classList.add("snap-x", "snap-mandatory");
      }
    }
    scrollTimer.current = setTimeout(() => setIsHovered(false), 1000);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      const el = carouselRef.current;
      if (el) {
        el.style.scrollBehavior = "smooth";
        el.classList.add("snap-x", "snap-mandatory");
      }
    }
    scrollTimer.current = setTimeout(() => setIsHovered(false), 1000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = carouselRef.current;
    if (el) {
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!isCarousel || isHovered || isDragging) return;
    const interval = setInterval(() => {
      const el = carouselRef.current;
      if (el) {
        const slideWidth = el.scrollWidth / (originalLength * 3);
        el.style.scrollBehavior = "smooth";
        el.scrollBy({ left: slideWidth });
      }
    }, 3500); // 3.5 seconds per slide
    return () => clearInterval(interval);
  }, [isCarousel, isHovered, isDragging, originalLength]);

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
          ref={carouselRef}
          onScroll={handleScroll}
          onTouchStart={() => { setIsHovered(true); if (scrollTimer.current) clearTimeout(scrollTimer.current); }}
          onTouchEnd={() => { scrollTimer.current = setTimeout(() => setIsHovered(false), 1000); }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex h-full w-full snap-x snap-mandatory flex-row overflow-x-auto pb-4 scrollbar-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayBooks.map((book, index) => (
            <article
              key={`${book.book_id}-${index}`}
              className="select-none snap-center pointer-events-auto duration-400 relative flex shrink-0 flex-col items-center overflow-hidden rounded-[1.5rem] border border-[var(--title-color)] p-[1.375rem_1.625rem] text-center transition-[box-shadow,background-color,border-color] max-[42.5rem]:rounded-[1.125rem] max-[42.5rem]:p-[1rem_0.875rem] dark:border-[var(--title-color)]"
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
    </section>
  );
};

export default FeaturedSection;
