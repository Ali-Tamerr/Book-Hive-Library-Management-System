import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  style,
  onClick,
  onError,
  priority = false,
}) => {
  const imgRef = useRef(null);
  const imgElRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
    if (priority) {
      setShouldLoad(true);
      return;
    }
    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "200px" },
      );
      obs.observe(imgRef.current);
      return () => obs.disconnect();
    }
    setShouldLoad(true);
  }, [priority]);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  // Some browsers may not reliably fire onLoad for cached images in all cases.
  // Ensure we mark it as loaded when the <img> is already complete.
  useEffect(() => {
    if (!shouldLoad || !src) return;
    const rafId = requestAnimationFrame(() => {
      const img = imgElRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        setLoaded(true);
      }
    });
    return () => cancelAnimationFrame(rafId);
  }, [shouldLoad, src]);

  const objectFitClass = className.includes("object-contain")
    ? "object-contain"
    : className.includes("object-fill")
    ? "object-fill"
    : "object-cover";

  return (
    <div ref={imgRef} className={`relative ${className}`} style={style}>
      <div className={`lazy-sizer relative h-full w-full overflow-hidden`}>
        {!loaded && !failed && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#D7D7D7] dark:bg-[#1a1b1e]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--first-color)] border-t-transparent dark:border-[#a9abb2]" />
          </div>
        )}

        {shouldLoad && src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            ref={imgElRef}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 h-full w-full ${objectFitClass} transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              setFailed(true);
              setLoaded(false);
              if (onError) onError(e);
            }}
            onClick={onClick}
          />
        ) : (
          <div aria-hidden="true" className="h-full w-full" />
        )}

        {failed && (
          <div className="absolute inset-0 z-30 flex items-center justify-center rounded-md bg-[#D7D7D7] p-4 text-center text-sm text-[#6b7280] dark:bg-[#1a1b1e]">
            Image unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default LazyImage;
