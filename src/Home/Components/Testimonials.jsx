import React from "react";
import { getImageUrl } from "../../services/api.config";
import LazyImage from "../../components/LazyImage";

const Testimonials = ({
  feedbacks,
  testimonialIndex,
  testimonialPerView,
  isLoading = false,
}) => {
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
                transform:
                  feedbacks.length > 0
                    ? `translateX(-${testimonialIndex * (100 / testimonialPerView)}%)`
                    : "none",
              }}
            >
              {isLoading ? (
                Array.from({ length: testimonialPerView }).map((_, idx) => (
                  <article
                    key={`skeleton-${idx}`}

                    className="duration-400 shrink-0 rounded-[24px] bg-white px-16 py-14 pb-16 text-center transition-colors dark:border dark:border-[#b9bdc8] dark:bg-[#121317]"                    style={{
                      width: `calc(${100 / testimonialPerView}% - 60px)`,
                      margin: "0 30px",
                    }}
                  >
                    <div className="mx-auto mb-10 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#e6e7eb] dark:bg-[#171c29]">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-white/30" />
                    </div>
                    <div className="mb-6 h-8 w-48 mx-auto rounded bg-[#e6e7eb] dark:bg-[#22293b]" />
                    <div className="mx-auto mb-10 h-20 w-3/4 rounded bg-[#e6e7eb] dark:bg-[#22293b]" />
                    <div className="text-[44px] text-[#000035] dark:text-[#d3d6de]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className="ri-star-line"></i>
                      ))}
                    </div>
                  </article>
                ))
              ) : feedbacks.length > 0 ? (
                feedbacks.map((fb) => {
                  const fullStars = Math.floor(fb.rate);
                  const hasHalf = fb.rate % 1 >= 0.5;
                  return (
                    <article
                      key={fb.request_id}

                      className="duration-400 shrink-0 rounded-[24px] bg-white px-16 py-14 pb-16 text-center transition-colors dark:border dark:border-[#b9bdc8] dark:bg-[#121317]"                      style={{
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
                        <div className="mx-auto mb-10 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#000035] text-white dark:bg-[#171c29] dark:text-[#d3d6de]">
                          <i className="ri-user-line text-[70px]"></i>
                        </div>
                      )}
                      <h2 className="mb-6 font-[family-name:var(--body-font)] text-[52px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-[#d3d6de]">
                        {fb.user_name || fb.user_id || "Guest"}
                      </h2>
                      <p className="mx-auto mb-10 max-w-[800px] font-[family-name:var(--second-font)] text-[30px] font-bold leading-relaxed text-[#525252] dark:!text-[#c3c7d1]">
                        {fb.feedback || fb.description || "Great experience!"}
                      </p>
                      <div className="text-[44px] text-[#000035] dark:text-[#d3d6de]">
                        {Array.from({ length: fullStars }, (_, i) => (
                          <i key={`full-${i}`} className="ri-star-fill"></i>
                        ))}
                        {hasHalf && <i className="ri-star-half-fill"></i>}
                        {Array.from(
                          { length: 5 - fullStars - (hasHalf ? 1 : 0) },
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
