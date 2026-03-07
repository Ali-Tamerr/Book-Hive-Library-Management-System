import React, { useEffect, useMemo, useState } from "react";
import { getImageUrl } from "../../services/api.config";
import LazyImage from "../../components/LazyImage";

const Testimonials = ({ feedbacks, testimonialPerView, isLoading = false }) => {
  const processedFeedbacks = useMemo(() => {
    if (!Array.isArray(feedbacks)) return [];

    // Keep only the latest feedback per user (later entries override earlier ones)
    const byUser = new Map();
    feedbacks.forEach((fb) => {
      const userKey = fb.user_id || fb.user_name || fb.email || "anonymous";
      byUser.set(userKey, fb);
    });

    const unique = Array.from(byUser.values());

    // Sort by rating (desc), then by date (newest first) if available
    unique.sort((a, b) => {
      const rateA = Number(a.rate || 0);
      const rateB = Number(b.rate || 0);
      if (rateB !== rateA) return rateB - rateA;

      const dateA = new Date(a.created_at || a.updated_at || 0);
      const dateB = new Date(b.created_at || b.updated_at || 0);
      return dateB - dateA;
    });

    // Take only the top 10 feedbacks
    return unique.slice(0, 10);
  }, [feedbacks]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [processedFeedbacks.length, testimonialPerView]);

  const safePerView = testimonialPerView || 1;
  const isCarousel = processedFeedbacks.length > 3;
  const maxIndex = Math.max(0, processedFeedbacks.length - safePerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const trackTransform =
    !isLoading && isCarousel
      ? `translateX(-${currentIndex * (100 / safePerView)}%)`
      : "none";

  const hasFeedbacks = processedFeedbacks.length > 0;

  return (
    <section className="py-20 pb-4" id="testimonial">
      <h2 className="mb-16 text-center font-[family-name:var(--body-font)] text-[80px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]">
        CUSTOMER OPINIONS
      </h2>
      <div className="mx-auto w-full max-w-[1875px] px-6" data-reveal>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: trackTransform,
              }}
            >
              {isLoading ? (
                Array.from({ length: safePerView }).map((_, idx) => (
                  <article
                    key={`skeleton-${idx}`}
                    className="duration-400 shrink-0 rounded-[24px] bg-[#D7D7D7] px-16 py-14 pb-16 text-center transition-colors dark:border dark:border-[#b9bdc8] dark:bg-[#121317]"
                    style={{
                      width: `calc(${100 / testimonialPerView}% - 60px)`,
                      margin: "0 30px",
                    }}
                  >
                    <div className="mx-auto mb-10 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#e6e7eb] dark:bg-[#171c29]">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D7D7D7]/30 border-t-transparent" />
                    </div>
                    <div className="mx-auto mb-6 h-8 w-48 rounded bg-[#e6e7eb] dark:bg-[#22293b]" />
                    <div className="mx-auto mb-10 h-20 w-3/4 rounded bg-[#e6e7eb] dark:bg-[#22293b]" />
                    <div className="text-[44px] text-[#000035] dark:text-[#d3d6de]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="ri-star-line"></i>
                      ))}
                    </div>
                  </article>
                ))
              ) : hasFeedbacks ? (
                processedFeedbacks.map((fb) => {
                  const rate = Number(fb.rate || 0);
                  const fullStars = Math.floor(rate);
                  const hasHalf = rate % 1 > 0;

                  return (
                    <article
                      key={fb.request_id}
                      className="duration-400 shrink-0 rounded-[24px] bg-[#D7D7D7] px-16 py-14 pb-16 text-center transition-colors dark:border dark:border-[#b9bdc8] dark:bg-[#121317]"
                      style={{
                        width: `calc(${100 / testimonialPerView}% - 60px)`,
                        margin: "0 30px",
                      }}
                    >
                      {fb.user_image || fb.image ? (
                        <LazyImage
                          src={getImageUrl(fb.user_image || fb.image)}
                          alt={fb.user_name || fb.user_id || "Guest"}
                          className="mx-auto mb-10 h-[140px] w-[140px] rounded-full object-cover"
                        />
                      ) : (
                        <div className="mx-auto mb-10 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#000035] text-[#D7D7D7] dark:bg-[#171c29] dark:text-[#d3d6de]">
                          <i className="ri-user-line text-[70px]"></i>
                        </div>
                      )}
                      <h2 className="mb-6 font-[family-name:var(--body-font)] text-[52px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#d3d6de]">
                        {fb.user_name || fb.user_id || "Guest"}
                      </h2>
                      <p className="mx-auto mb-10 max-w-[800px] font-[family-name:var(--second-font)] text-[30px] font-bold leading-relaxed text-[#000035] dark:!text-[#c3c7d1]">
                        {fb.feedback || fb.description || "Great experience!"}
                      </p>
                      <div className="text-[44px] text-[#000035] dark:text-[#d3d6de]">
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
                  <p className="font-[family-name:var(--second-font)] text-[32px] font-bold text-[var(--muted)]">
                    No feedback yet. Be the first to share your experience!
                  </p>
                </div>
              )}
            </div>
          </div>
          {isCarousel && !isLoading && hasFeedbacks && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-[#D7D7D7]"
              >
                <i className="ri-arrow-left-s-line text-4xl"></i>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 z-10 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-none bg-[var(--first-color)] font-[family-name:var(--body-font)] text-[length:var(--normal-font-size)] text-[#D7D7D7]"
              >
                <i className="ri-arrow-right-s-line text-4xl"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
