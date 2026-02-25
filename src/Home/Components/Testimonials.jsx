import React from "react";
import { getImageUrl } from "../../services/api.config";

const Testimonials = ({
  feedbacks,
  testimonialIndex,
  testimonialPerView,
  testimonialImg1,
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
              {feedbacks.length > 0 ? (
                feedbacks.map((fb) => {
                  const fullStars = Math.floor(fb.rate);
                  const hasHalf = fb.rate % 1 >= 0.5;
                  return (
                    <article
                      key={fb.request_id}
                      className="duration-400 shrink-0 rounded-[24px] bg-white px-16 py-14 pb-16 text-center transition-colors dark:bg-[#D4D4D4]"
                      style={{
                        width: `${90 / testimonialPerView}%`,
                        margin: "0 30px",
                      }}
                    >
                      {fb.user_image || fb.image ? (
                        <img
                          src={getImageUrl(fb.user_image || fb.image)}
                          alt={fb.user_name || fb.user_id || "Guest"}
                          className="mx-auto mb-10 h-[140px] w-[140px] rounded-full object-cover"
                        />
                      ) : (
                        <div className="mx-auto mb-10 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#000035] text-white dark:bg-black">
                          <i className="ri-user-line text-[70px]"></i>
                        </div>
                      )}
                      <h2 className="mb-6 font-[family-name:var(--body-font)] text-[52px] font-extrabold uppercase tracking-wide text-[#000035] dark:!text-black">
                        {fb.user_name || fb.user_id || "Guest"}
                      </h2>
                      <p className="mx-auto mb-10 max-w-[800px] font-[family-name:var(--second-font)] text-[30px] font-bold leading-relaxed text-[#525252] dark:!text-[#1a1a1a]">
                        {fb.feedback || fb.description || "Great experience!"}
                      </p>
                      <div className="text-[44px] text-[#000035] dark:text-black">
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
