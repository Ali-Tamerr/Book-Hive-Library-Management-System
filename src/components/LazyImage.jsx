import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt, className = "", style, onClick, onError }) => {
  const imgRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
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
  }, []);

  return (
    <div ref={imgRef} className="relative" style={style}>
      <div className={`lazy-sizer relative overflow-hidden ${className}`}>
        {!loaded && !failed && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#f3f4f6] dark:bg-[#111214]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-white/30" />
          </div>
        )}

        {shouldLoad ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
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
          <div aria-hidden="true" style={{ width: "100%", height: "100%" }} />
        )}

        {failed && (
          <div className="absolute inset-0 z-30 flex items-center justify-center rounded-md bg-[#f8fafc] text-sm text-[#6b7280]">
            Image unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default LazyImage;
