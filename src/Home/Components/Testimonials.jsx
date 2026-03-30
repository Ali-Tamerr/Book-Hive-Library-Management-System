import React, { useEffect, useMemo, useState } from "react";
import { getImageUrl } from "../../services/api.config";
import LazyImage from "../../components/LazyImage";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";


const Testimonials = ({ feedbacks, testimonialPerView, isLoading = false }) => {
  const processedFeedbacks = useMemo(() => {
    if (!Array.isArray(feedbacks)) return [];

    const byUser = new Map();
    feedbacks.forEach((fb) => {
      const userKey = fb.user_id || fb.user_name || fb.email || "anonymous";
      byUser.set(userKey, fb);
    });

    const unique = Array.from(byUser.values());

    unique.sort((a, b) => {
      const rateA = Number(a.rate || 0);
      const rateB = Number(b.rate || 0);
      if (rateB !== rateA) return rateB - rateA;

      const dateA = new Date(a.created_at || a.updated_at || 0);
      const dateB = new Date(b.created_at || b.updated_at || 0);
      return dateB - dateA;
    });

    return unique.slice(0, 10);
  }, [feedbacks]);

  // Triple the list for the infinite loop effect
  const displayFeedbacks = useMemo(() => {
    if (processedFeedbacks.length === 0) return [];
    return [...processedFeedbacks, ...processedFeedbacks, ...processedFeedbacks];
  }, [processedFeedbacks]);

  const [localIndex, setLocalIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const safePerView = testimonialPerView || 1;
  const isCarousel = processedFeedbacks.length > safePerView;

  // Auto-scroll logic
  useEffect(() => {
    if (!isCarousel || isLoading) return;
    const interval = setInterval(() => {
      setLocalIndex((prev) => prev + 1);
    }, 3500); // 3.5 seconds per slide
    return () => clearInterval(interval);
  }, [isCarousel, isLoading]);

  // Infinite loop snap-back logic
  useEffect(() => {
    const originalLength = processedFeedbacks.length;
    if (originalLength === 0) return;

    // When we've scrolled a full original set, snap back silently
    if (localIndex > 0 && localIndex % originalLength === 0) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setLocalIndex(0); // Snap back to the real 0
        
        // Re-enable transition after snap
        setTimeout(() => setTransitionEnabled(true), 50);
      }, 700); // Wait for the smooth CSS transition (duration-700) to finish
      
      return () => clearTimeout(timer);
    }
  }, [localIndex, processedFeedbacks.length]);

  const trackTransform =
    !isLoading && isCarousel
      ? `translateX(-${localIndex * (100 / safePerView)}%)`
      : "none";

  const hasFeedbacks = processedFeedbacks.length > 0;

  return (
    <section className="py-8 pb-0 max-[42.5rem]:py-6" id="testimonial">
      <h2 className="mb-7 text-center font-[family-name:var(--body-font)] text-[2.875rem] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)] max-[42.5rem]:mb-5 max-[42.5rem]:text-[2.375rem] max-[32.5rem]:text-[2rem]">
        CUSTOMER OPINIONS
      </h2>
      <div className="mx-auto w-full max-w-[100rem] px-6 max-[42.5rem]:px-4" data-reveal>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex ${transitionEnabled ? "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" : ""}`}
              style={{
                transform: trackTransform,
              }}
            >
              {isLoading ? (
                Array.from({ length: safePerView }).map((_, idx) => (
                  <article
                    key={`skeleton-${idx}`}
                    className="duration-400 shrink-0 rounded-[1.25rem] bg-[#D7D7D7] px-6 py-5 pb-6 text-center transition-colors max-[42.5rem]:px-4 max-[42.5rem]:py-4 dark:border dark:border-[#b9bdc8] dark:bg-[#121317]"
                    style={{
                      width: `calc(${100 / safePerView}% - 1.75rem)`,
                      margin: "0 0.875rem",
                    }}
                  >
                    <div className="mx-auto mb-4 flex h-[4.625rem] w-[4.625rem] items-center justify-center rounded-full bg-[#e6e7eb] dark:bg-[#171c29]">
                      <LoadingSpinner size="lg" />
                    </div>
                    <div className="mx-auto mb-3 h-5 w-28 rounded bg-[#e6e7eb] dark:bg-[#22293b]" />
                    <div className="mx-auto mb-4 h-12 w-3/4 rounded bg-[#e6e7eb] dark:bg-[#22293b]" />
                    <div className="text-[1.5rem] text-[#000035] dark:text-[#d3d6de]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="ri-star-line"></i>
                      ))}
                    </div>
                  </article>
                ))
              ) : hasFeedbacks ? (
                displayFeedbacks.map((fb, idx) => {
                  const rate = Number(fb.rate || 0);
                  const fullStars = Math.floor(rate);
                  const hasHalf = rate % 1 > 0;

                  return (
                    <article
                      key={`${fb.request_id ?? fb.feedback_id ?? fb.user_id}-${idx}`}
                      className="duration-400 shrink-0 rounded-[1.25rem] border border-[#000035] px-6 py-5 pb-6 text-center transition-colors max-[42.5rem]:px-4 max-[42.5rem]:py-4 dark:border-[#D7D7D7]"
                      style={{
                        width: `calc(${100 / safePerView}% - 1.75rem)`,
                        margin: "0 0.875rem",
                      }}
                    >
                      {fb.user_image || fb.image || fb.user_image_url ? (
                        <LazyImage
                          src={getImageUrl(fb.user_image || fb.image || fb.user_image_url)}
                          alt={fb.user_name || fb.user_id || "Guest"}
                          className="mx-auto mb-4 !h-[4rem] !w-[4rem] overflow-hidden rounded-full object-cover max-[42.5rem]:!h-[3.5rem] max-[42.5rem]:!w-[3.5rem]"
                        />
                      ) : (
                        <div className="mx-auto mb-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-[#000035] text-[#D7D7D7] max-[42.5rem]:h-[3.5rem] max-[42.5rem]:w-[3.5rem] dark:bg-[#171c29] dark:text-[#d3d6de]">
                          <i className="ri-user-line text-[2.375rem] max-[42.5rem]:text-[1.875rem]"></i>
                        </div>
                      )}
                      <h2 className="mb-3 font-[family-name:var(--body-font)] text-[1.75rem] font-extrabold uppercase tracking-wide text-[#000035] max-[42.5rem]:text-[1.375rem] dark:!text-[#d3d6de]">
                        {fb.user_name || fb.user_id || "Guest"}
                      </h2>
                      <p className="mx-auto mb-4 max-w-[33.75rem] font-[family-name:var(--second-font)] text-[1.0625rem] font-bold leading-[1.45] text-[#000035] max-[42.5rem]:text-[0.9375rem] dark:!text-[#c3c7d1]">
                        {fb.feedback || fb.description || "Great experience!"}
                      </p>
                      <div className="text-[1.5rem] text-[#000035] max-[42.5rem]:text-[1.25rem] dark:text-[#d3d6de]">
                        {Array.from({ length: fullStars }, (_, i) => (
                          <i key={`full-${i}`} className="ri-star-fill"></i>
                        ))}
                        {hasHalf && <i className="ri-star-half-fill"></i>}
                        {Array.from(
                          {
                            length: Math.max(
                              0,
                              5 - fullStars - (hasHalf ? 1 : 0),
                            ),
                          },
                          (_, i) => (
                            <i key={`empty-${i}`} className="ri-star-line"></i>
                          ),
                        )}
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="flex w-full items-center justify-center py-20">
                  <p className="font-[family-name:var(--second-font)] text-[1.875rem] font-bold text-[var(--muted)] max-[42.5rem]:text-[1.375rem]">
                    No feedback yet. Be the first to share your experience!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

