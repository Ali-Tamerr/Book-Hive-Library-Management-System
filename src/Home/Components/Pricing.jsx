import React from "react";

import { usePlans } from "../../hooks/usePlans";
import HomeButton from "./HomeButton";

const PricingCard = ({ plan, setIsLoginOpen }) => {
  return (
    <article
      className={`plan group flex w-full transform-gpu flex-col justify-start rounded-[1.125rem] border-2 px-8 pb-4 pt-12 text-[var(--accent)] transition-all duration-[300ms] ease-in-out hover:-translate-y-3 hover:shadow-[0_1rem_2.125rem_rgba(0,0,0,0.2)] max-[42.5rem]:min-h-[21.25rem] max-[42.5rem]:px-5 max-[42.5rem]:pb-5 max-[42.5rem]:pt-8 dark:hover:shadow-[0_1.25rem_2.25rem_rgba(255,255,255,0.2)] ${
        plan.isPopular
          ? "center flex-8 -mt-4 min-h-[28.75rem] bg-[var(--center-bg)] pt-12 max-[62.5rem]:mt-0 max-[62.5rem]:min-h-[22.5rem] max-[42.5rem]:min-h-[21.875rem] dark:bg-transparent"
          : "flex-7 min-h-[36.25rem] bg-[var(--card-bg)] max-[42.5rem]:min-h-[25rem] dark:bg-transparent"
      } cursor-default border-transparent hover:border-[#000035] dark:hover:!border-[#D7D7D7]`}
      role="listitem"
      aria-labelledby={plan.id}
    >
      <div
        id={plan.id}
        className={`cursor-default font-[family-name:var(--body-font)] text-[2.625rem] font-extrabold uppercase tracking-wider text-[var(--accent)] max-[42.5rem]:text-[2rem]`}
      >
        {plan.title}
      </div>
      <div
        className={`price mb-7 cursor-default font-[family-name:Inter,sans-serif] text-[2.375rem] font-normal text-[var(--accent)] max-[42.5rem]:mb-5 max-[42.5rem]:text-[1.875rem] dark:!text-[#D7D7D7]`}
      >
        <span>${plan.price_per_month} / Per Month</span>
      </div>
      <div className="features mb-8 mt-3 flex-1 text-left max-[42.5rem]:mb-6 max-[42.5rem]:mt-2">
        {[
          `Borrow up to ${plan.borrow_limit} books per month${
            plan.borrow_limit === 3 ? "." : ""
          }`,
          `Loan period: ${plan.loan_period_days} days per book.`,
          `${plan.renewal_limit} renewal per book`,
        ].map((feature, index) => (
          <div
            key={index}
            className="my-5 flex cursor-default items-start gap-3 font-[family-name:var(--second-font)] text-[1.1875rem] font-normal text-[#121317] max-[42.5rem]:my-3 max-[42.5rem]:text-[1rem] dark:!text-[#cfd1d7]"
          >
            <span className="mt-1 inline-block flex-none cursor-default text-[1.5rem] leading-none text-[var(--accent)] max-[42.5rem]:text-[1.25rem] dark:!text-[#e3e4e8]">
              &#10003;
            </span>
            {feature}
          </div>
        ))}
      </div>
      <HomeButton
        className="px-18 mx-auto mt-4 py-2.5 max-[42.5rem]:px-[1.5rem] max-[42.5rem]:py-[0.625rem]"
        href="#"
        aria-label={`Subscribe to ${plan.title}`}
        onClick={(e) => {
          e.preventDefault();
          setIsLoginOpen(true);
        }}
      >
        Subscribe
      </HomeButton>
    </article>
  );
};

const Pricing = ({ setIsLoginOpen }) => {
  const { data: backendPlans, isLoading } = usePlans();

  return (
    <section
      className="section px-24 py-10 pb-[3.125rem] max-[71.875rem]:px-8 max-[42.5rem]:px-4 max-[42.5rem]:py-8"
      id="plans"
      aria-labelledby="pricing-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[105.5rem] text-center">
        <h1
          id="pricing-heading"
          className="mb-10 text-center font-[family-name:var(--body-font)] text-[3.875rem] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)] max-[42.5rem]:mb-6 max-[42.5rem]:text-[2.625rem] max-[32.5rem]:text-[2.125rem]"
        >
          Choose The best Plan
        </h1>
        <p className="subheading mb-12 font-[family-name:var(--second-font)] text-[1.3125rem] font-medium text-[var(--muted)] max-[42.5rem]:mb-8 max-[42.5rem]:text-[1rem] dark:text-[#D7D7D7]">
          choose a plan that's right for your growing team. Simple pricing &amp;
          No hidden charges.
        </p>

        <div className="plans dark:!shadow-[-0.3125rem_0.3125rem_0.3125rem_rgba(255,255,255,0.4)] flex flex-col items-stretch gap-10 rounded-[1.125rem] border border-[rgba(10,11,43,0.08)] bg-[var(--card-bg)] px-10 py-10 shadow-[-0.3125rem_0.3125rem_0.3125rem_rgba(0,0,0,0.4)] max-[62.5rem]:p-6 max-[42.5rem]:gap-6 max-[42.5rem]:p-4 xl:flex-row dark:!border-none dark:!bg-transparent">
          {isLoading ? (
            <div className="w-full py-20 text-center text-xl text-[#000035] dark:text-[#D7D7D7]">
              Loading plans...
            </div>
          ) : backendPlans && backendPlans.length > 0 ? (
            backendPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                setIsLoginOpen={setIsLoginOpen}
              />
            ))
          ) : (
            <div className="w-full py-20 text-center text-xl text-[#e74c3c] dark:text-[#ff7675]">
              Failed to load subscription plans. Please ensure the backend
              server is running.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
