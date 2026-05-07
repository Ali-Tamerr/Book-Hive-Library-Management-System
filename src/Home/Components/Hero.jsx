import React, { useEffect, useMemo, useRef, useState } from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const Hero = ({ scrollToSection, heroContainerRef: outerRef, heroBooks }) => {
  const heroContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimer = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const displayBooks = useMemo(() => {
    const list =
      heroBooks.length > 0
        ? heroBooks
        : Array.from({ length: 3 }).map((_, i) => ({
            book_id: `skeleton-hero-${i}`,
            name: "Loading...",
            image: null,
          }));
    // Triple for infinite effect
    return [...list, ...list, ...list];
  }, [heroBooks]);

  const originalLength = heroBooks.length > 0 ? heroBooks.length : 3;

  // Initial scroll to middle block
  useEffect(() => {
    const el = heroContainerRef.current;
    if (el && originalLength > 0) {
      const targetIndex = originalLength;
      const children = Array.from(el.children);
      if (children[targetIndex]) {
        const child = children[targetIndex];
        // Center the target child
        const scrollPos = child.offsetLeft - (el.clientWidth / 2) + (child.offsetWidth / 2);
        el.scrollLeft = scrollPos;
        setActiveIndex(targetIndex);
      }
    }
  }, [originalLength]);

  const handleScroll = () => {
    setIsHovered(true);
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    const el = heroContainerRef.current;
    if (!el) return;

    // Calculate active index
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    const children = Array.from(el.children);
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }

    // Infinite loop snap
    if (children.length > 0) {
      const slideWidth = children[0].offsetWidth + 20; // 20 is the gap
      // If we scrolled past the second block
      if (closestIndex >= originalLength * 2) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = el.scrollLeft - slideWidth * originalLength;
        el.style.scrollBehavior = "smooth";
      } 
      // If we scrolled before the second block
      else if (closestIndex < originalLength) {
        el.style.scrollBehavior = "auto";
        el.scrollLeft = el.scrollLeft + slideWidth * originalLength;
        el.style.scrollBehavior = "smooth";
      }
    }

    scrollTimer.current = setTimeout(() => {
      setIsHovered(false);
    }, 1000);
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || originalLength === 0) return;
    const interval = setInterval(() => {
      const el = heroContainerRef.current;
      if (el) {
        const children = Array.from(el.children);
        if (children.length > 0) {
          const slideWidth = children[0].offsetWidth + 20;
          el.style.scrollBehavior = "smooth";
          el.scrollBy({ left: slideWidth });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, originalLength]);

  return (
    <section className="home py-16 pb-4 max-[42.5rem]:py-12" id="home" data-reveal>
      <div className="home__container min-[71.875rem]:pt-35 mx-auto grid w-full max-w-[105.5rem] gap-x-9 gap-y-10 px-6 pt-16 max-[42.5rem]:px-4 max-[71.875rem]:grid-cols-1 max-[71.875rem]:text-center min-[71.875rem]:grid-cols-[38.25rem_65.25rem] min-[71.875rem]:items-center min-[71.875rem]:pb-7">
        <div className="text-center min-[71.875rem]:text-left">
          <h1 className="mb-4 font-[family-name:var(--body-font)] text-[2.7rem] font-extrabold leading-[1.1] text-[var(--title-color)] max-[32.5rem]:text-[2.15rem] min-[71.875rem]:text-[5.0625rem] dark:!text-[var(--title-color)]">
            One Library, <br />
            Infinite Stories
          </h1>
          <p className="min-[71.875rem]:mb-22 mb-4 font-[family-name:var(--second-font)] text-[1.125rem] font-medium leading-[1.5] text-[var(--text-color)] max-[32.5rem]:text-[1rem] dark:!text-[var(--text-color)] min-[71.875rem]:text-[1.5625rem]">
            With Bookhive, every book has a place and every reader has a path:
            search, borrow, and renew in a few clicks, while librarians track
            everything effortlessly.
          </p>
          <HomeButton
            href="#featured"
            className="px-9 py-5 max-[71.875rem]:mt-0 max-[42.5rem]:px-7 max-[42.5rem]:py-3.5"
            onClick={(e) => scrollToSection(e, "featured")}
          >
            Explore Now
          </HomeButton>
        </div>
        <div 
          className="grid w-full overflow-hidden"
        >
          <div
            className="flex h-full w-full snap-x snap-mandatory flex-row overflow-x-auto pb-4 pt-4 scrollbar-none gap-[20px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            ref={heroContainerRef}
            onScroll={handleScroll}
            onTouchStart={() => { setIsHovered(true); if (scrollTimer.current) clearTimeout(scrollTimer.current); }}
            onMouseEnter={() => { setIsHovered(true); if (scrollTimer.current) clearTimeout(scrollTimer.current); }}
            onMouseLeave={() => { scrollTimer.current = setTimeout(() => setIsHovered(false), 1000); }}
            onTouchEnd={() => { scrollTimer.current = setTimeout(() => setIsHovered(false), 1000); }}
          >
            {displayBooks.map((book, i) => {
              const isCurrent = i === activeIndex;
              return (
                <article
                  key={`${book.book_id}-${i}`}
                  className="shrink-0 snap-center select-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    width:
                      window.innerWidth >= 1150
                        ? "21.25rem"
                        : "min(15.625rem, 80vw)",
                    opacity: 1,
                    scale: isCurrent ? "1" : "0.85",
                  }}
                >
                  <LazyImage
                    src={book.image}
                    alt={book.name}
                    className="h-[29.375rem] w-full rounded-lg object-cover max-[42.5rem]:h-[26.5rem] max-[32.5rem]:h-[23.5rem] pointer-events-auto"
                    priority
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
