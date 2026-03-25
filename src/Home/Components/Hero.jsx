import React from "react";
import LazyImage from "../../components/LazyImage";
import HomeButton from "./HomeButton";

const Hero = ({ scrollToSection, heroContainerRef, heroIndex, heroBooks }) => {
  const [offset, setOffset] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [transitionEnabled, setTransitionEnabled] = React.useState(false);

  const displayBooks = React.useMemo(() => {
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
  const [localIndex, setLocalIndex] = React.useState(heroIndex);

  // Sync heroIndex to localIndex with seamless wrapping logic
  React.useEffect(() => {
    if (heroIndex === localIndex % originalLength) return;

    // Detect if we wrapped (e.g. from 2 to 0)
    const isWrapForward =
      heroIndex === 0 && localIndex % originalLength === originalLength - 1;

    if (isWrapForward) {
      setLocalIndex((prev) => prev + 1);
      // After animation, snap back to the 'original' range
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setLocalIndex(heroIndex);
        setTimeout(() => setTransitionEnabled(true), 50);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setLocalIndex(heroIndex);
    }
  }, [heroIndex, originalLength]);

  React.useLayoutEffect(() => {
    const calculate = () => {
      const container = heroContainerRef.current;
      if (!container) return;

      const firstSlide = container.querySelector("article");
      const slideWidth = firstSlide ? firstSlide.offsetWidth : (window.innerWidth >= 1150 ? 340 : 250);
      const gap = 20;
      const step = slideWidth + gap;
      const containerWidth = container.offsetWidth;

      if (containerWidth === 0) return;

      const baseIndex = originalLength + localIndex;
      const centerPos = (containerWidth / 2) - (slideWidth / 2);
      const newOffset = centerPos - (baseIndex * step);
      
      if (!isReady) {
        setOffset(newOffset);
        setIsReady(true);
        // Wait for next tick to enable transitions to avoid initial snap slide
        setTimeout(() => setTransitionEnabled(true), 200);
      } else {
        setOffset(newOffset);
      }
    };

    calculate();
    const timer = setTimeout(calculate, 100);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculate);
    };
  }, [localIndex, originalLength, heroContainerRef, isReady]);

  return (
    <section className="home py-16 pb-4 max-[680px]:py-12" id="home" data-reveal>
      <div className="home__container min-[1150px]:pt-35 mx-auto grid w-full max-w-[1688px] gap-x-9 gap-y-10 px-6 pt-16 max-[680px]:px-4 max-[1150px]:grid-cols-1 max-[1150px]:text-center min-[1150px]:grid-cols-[612px_1044px] min-[1150px]:items-center min-[1150px]:pb-7">
        <div className="text-center min-[1150px]:text-left">
          <h1 className="mb-4 font-[family-name:var(--body-font)] text-[2.7rem] font-extrabold leading-[1.1] text-[var(--title-color)] max-[520px]:text-[2.15rem] min-[1150px]:text-[5.0625rem] dark:!text-[#c7c9cf]">
            One Library, <br />
            Infinite Stories
          </h1>
          <p className="min-[1150px]:mb-22 mb-8 font-[family-name:var(--second-font)] text-[18px] font-medium leading-[1.5] text-[var(--title-color)] max-[520px]:text-[16px] dark:!text-[#b9bbc1] min-[1150px]:text-[25px]">
            With Bookhive, every book has a place and every reader has a path:
            search, borrow, and renew in a few clicks, while librarians track
            everything effortlessly.
          </p>
          <HomeButton
            href="#featured"
            className="px-9 py-5 max-[1150px]:mt-10 max-[680px]:px-7 max-[680px]:py-3.5"
            onClick={(e) => scrollToSection(e, "featured")}
          >
            Explore Now
          </HomeButton>
        </div>
        <div className="grid w-full overflow-hidden">
          <div
            className="relative w-full overflow-hidden"
            ref={heroContainerRef}
          >
            <div
              className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" : ""}`}
              style={{
                transform: `translateX(${offset}px)`,
              }}
            >
              {[...displayBooks, displayBooks[0]].map((book, i) => {
                const isCurrent =
                  i % originalLength === heroIndex &&
                  i >= originalLength &&
                  i < originalLength * 2;
                return (
                  <article
                    key={`${book.book_id}-${i}`}
                    className="shrink-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      width:
                        window.innerWidth >= 1150
                          ? "340px"
                          : "min(250px, 80vw)",
                      marginRight: "20px",
                      opacity: 1,
                      scale: isCurrent ? "1" : "0.85",
                    }}
                  >
                    <LazyImage
                      src={book.image}
                      alt={book.name}
                      className="h-[470px] w-full rounded-lg object-cover max-[680px]:h-[360px] max-[520px]:h-[300px]"
                      priority
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
