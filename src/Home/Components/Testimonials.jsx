import React from "react";

const Testimonials = ({
  feedbacks,
  testimonialIndex,
  testimonialPerView,
  testimonialImg1,
}) => {
  return (
    <section className="py-20 pb-4" id="testimonial">
      <h2 className="mb-8 text-center font-[family-name:var(--body-font)] text-[length:var(--h1-font-size)] font-extrabold">
        Customer Opinions
      </h2>
      <div className="mx-auto w-full max-w-[1220px] px-6" data-reveal>
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
                      className="duration-400 shrink-0 border-2 border-[var(--border-color)] bg-[var(--container-color)] px-12 py-8 pb-10 text-center transition-[border,background-color] dark:border-[#e4e4e7] dark:bg-[#f7f7f7] dark:shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                      style={{ width: `${100 / testimonialPerView}%` }}
                    >
                      {fb.user_image || fb.image ? (
                        <img
                          src={fb.user_image || fb.image}
                          alt={fb.user_name || fb.user_id || "Guest"}
                          className="mx-auto mb-6 h-[100px] w-[100px] rounded-full object-cover"
                        />
                      ) : (
                        <div className="mx-auto mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                          <i className="ri-user-line text-5xl"></i>
                        </div>
                      )}
                      <h2 className="mb-3 font-[family-name:var(--body-font)] text-[length:var(--h2-font-size)] font-normal dark:!text-[#1b1c20]">
                        {fb.user_name || fb.user_id || "Guest"}
                      </h2>
                      <p className="mb-5 font-[family-name:var(--second-font)] text-[length:var(--small-font-size)] font-bold dark:!text-[#5f6167]">
                        {fb.description || "Great experience!"}
                      </p>
                      <div className="text-[var(--first-color)]">
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
                <div className="flex w-full items-center justify-center py-16">
                  <p className="font-[family-name:var(--second-font)] text-lg font-bold text-[var(--muted)]">
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
