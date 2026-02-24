import React from "react";

const Pricing = ({ setIsLoginOpen }) => {
  return (
    <section
      className="section px-5 py-14 pb-[72px]"
      id="plans"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[var(--max-w)] px-5 text-center">
        <h1
          id="pricing-heading"
          className="heading mb-2.5 font-[family-name:var(--body-font)] text-[44px] font-normal text-[var(--accent)] max-[680px]:text-[32px] dark:text-[#e3e4e8]"
        >
          Choose The best Plan
        </h1>
        <p className="subheading mb-10 font-[family-name:var(--second-font)] font-medium text-[var(--muted)] max-[680px]:text-sm dark:text-[#b3b6bd]">
          choose a plan that's right for your growing team. Simple pricing &amp;
          No hidden charges.
        </p>

        <div
          className="plans grid grid-cols-3 items-stretch gap-[var(--gap)] rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-white p-9 shadow-[var(--card-shadow)] max-[1000px]:grid-cols-2 max-[1000px]:p-7 max-[680px]:grid-cols-1 max-[680px]:p-[22px] dark:!border-none dark:!bg-transparent dark:!shadow-none"
          role="list"
        >
          <article
            className="plan flex min-h-[420px] flex-col justify-start rounded-[var(--card-radius)] border-none bg-[var(--card-bg)] px-7 py-[34px] text-[var(--accent)] shadow-[0_10px_18px_rgba(10,10,35,0.08)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[var(--card-shadow-hover)] max-[680px]:min-h-[380px] dark:border-none dark:shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
            role="listitem"
            aria-labelledby="plan-discover"
          >
            <div
              id="plan-discover"
              className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-2xl font-normal uppercase tracking-wider text-[var(--accent)]"
            >
              Discover
            </div>
            <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[30px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]">
              <span className="small-price text-[30px]">$99</span>
              <small className="ml-2 text-lg font-normal text-[var(--accent)] dark:!text-[#b9bbc1]">
                / Per Month
              </small>
            </div>
            <div className="features mb-7 mt-1.5 flex-1 text-left">
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                Borrow up to 3 books per month.
              </div>
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                Loan period: 7 days per book.
              </div>
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                1 renewal per book
              </div>
            </div>
            <a
              className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-white px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-[var(--accent)] no-underline transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out hover:border-[#D7D7D7] hover:bg-[#D7D7D7] hover:text-[#0a0b2b] dark:!border-[#7b7f88] dark:!bg-transparent dark:!text-[#e3e4e8] dark:!shadow-none dark:hover:!border-[#d7d7d7] dark:hover:!bg-[#d7d7d7] dark:hover:!text-[#0a0b2b]"
              href="#"
              role="button"
              aria-label="Subscribe to Discover"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginOpen(true);
              }}
            >
              Subscribe
            </a>
          </article>

          <article
            className="plan center -mt-2.5 flex min-h-[450px] flex-col justify-start rounded-[var(--card-radius)] border-2 border-[var(--center-border)] bg-[var(--center-bg)] px-7 py-[34px] pt-10 text-[var(--accent)] shadow-[0_16px_28px_rgba(10,10,35,0.14)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[0_18px_32px_rgba(10,10,35,0.16)] max-[1000px]:mt-0 max-[1000px]:min-h-[420px] max-[680px]:min-h-[380px] dark:!border-2 dark:!border-[#d7d7d7] dark:!shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
            role="listitem"
            aria-labelledby="plan-enterprise"
          >
            <div
              id="plan-enterprise"
              className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-[26px] font-normal uppercase tracking-wider text-[var(--accent)]"
            >
              Enterprise
            </div>
            <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[34px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]">
              <span>$299</span>
              <small className="ml-2 text-lg font-normal text-[var(--accent)] dark:!text-[#b9bbc1]">
                / Per Month
              </small>
            </div>
            <div className="features mb-7 mt-1.5 flex-1 text-left">
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                Borrow up to 15 books per month
              </div>
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                Loan period: 21 days per book.
              </div>
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-base font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                3 renewal per book
              </div>
            </div>
            <a
              className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-[var(--accent)] px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-white no-underline shadow-[0_8px_16px_rgba(10,11,43,0.18)] transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out dark:!border-[#d7d7d7] dark:!bg-[#d7d7d7] dark:!text-[#111214] dark:!shadow-[0_10px_18px_rgba(0,0,0,0.35)] dark:hover:!border-[#f0f0f0] dark:hover:!bg-[#f0f0f0] dark:hover:!text-[#15161b]"
              href="#"
              role="button"
              aria-label="Subscribe to Enterprise"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginOpen(true);
              }}
            >
              Subscribe
            </a>
          </article>

          <article
            className="plan flex min-h-[420px] flex-col justify-start rounded-[var(--card-radius)] border-none bg-[var(--card-bg)] px-7 py-[34px] text-[var(--accent)] shadow-[0_10px_18px_rgba(10,10,35,0.08)] transition-[transform,box-shadow] duration-[280ms] ease-in-out hover:shadow-[var(--card-shadow-hover)] max-[680px]:min-h-[380px] dark:border-none dark:shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
            role="listitem"
            aria-labelledby="plan-pro"
          >
            <div
              id="plan-pro"
              className="plan-title mb-[18px] font-[family-name:var(--body-font)] text-2xl font-normal uppercase tracking-wider text-[var(--accent)]"
            >
              Professional
            </div>
            <div className="price mb-6 font-[family-name:Inter,sans-serif] text-[30px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]">
              <span className="small-price text-[30px]">$199</span>
              <small className="ml-2 text-lg font-normal text-[var(--accent)] dark:!text-[#b9bbc1]">
                / Per Month
              </small>
            </div>
            <div className="features mb-7 mt-1.5 flex-1 text-left">
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                Borrow up to 10 books per month
              </div>
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                Loan period: 14 days per book.
              </div>
              <div className="feature my-3 flex items-start gap-3 font-[family-name:var(--second-font)] text-[15px] font-normal text-[var(--accent)] dark:!text-[#cfd1d7]">
                <span className="tick mt-px inline-block flex-none text-lg leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
                  &#10003;
                </span>
                2 renewal per book
              </div>
            </div>
            <a
              className="btn mx-auto mt-3 inline-block rounded-xl border border-[var(--accent)] bg-white px-8 py-2.5 font-[family-name:var(--second-font)] font-normal text-[var(--accent)] no-underline transition-[background,color,transform,box-shadow] duration-[180ms] ease-in-out hover:border-[#D7D7D7] hover:bg-[#D7D7D7] hover:text-[#0a0b2b] dark:!border-[#7b7f88] dark:!bg-transparent dark:!text-[#e3e4e8] dark:!shadow-none dark:hover:!border-[#d7d7d7] dark:hover:!bg-[#d7d7d7] dark:hover:!text-[#0a0b2b]"
              href="#"
              role="button"
              aria-label="Subscribe to Professional"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginOpen(true);
              }}
            >
              Subscribe
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
