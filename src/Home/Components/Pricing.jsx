import React from "react";

import { usePlans } from "../../hooks/usePlans";
import HomeButton from "./HomeButton";

const PricingCard = ({ plan, setIsLoginOpen }) => {
  return (
    <article
      className={`plan group flex w-full transform-gpu flex-col justify-start rounded-[18px] border-2 px-8 pb-4 pt-12 text-[var(--accent)] transition-all duration-[300ms] ease-in-out hover:-translate-y-3 hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)] max-[680px]:min-h-[340px] max-[680px]:px-5 max-[680px]:pb-5 max-[680px]:pt-8 dark:hover:shadow-[0_20px_36px_rgba(255,255,255,0.2)] ${
        plan.isPopular
          ? "center flex-8 -mt-4 min-h-[460px] bg-[var(--center-bg)] pt-12 max-[1000px]:mt-0 max-[1000px]:min-h-[360px] max-[680px]:min-h-[350px] dark:bg-transparent"
          : "flex-7 min-h-[580px] bg-[var(--card-bg)] max-[680px]:min-h-[400px] dark:bg-transparent"
      } cursor-default border-transparent hover:border-[#000035] dark:hover:!border-[#D7D7D7]`}
      role="listitem"
      aria-labelledby={plan.id}
    >
      <div
        id={plan.id}
        className={`cursor-default font-[family-name:var(--body-font)] text-[42px] font-extrabold uppercase tracking-wider text-[var(--accent)] max-[680px]:text-[32px]`}
      >
        {plan.title}
      </div>
      <div
        className={`price mb-7 cursor-default font-[family-name:Inter,sans-serif] text-[38px] font-normal text-[var(--accent)] max-[680px]:mb-5 max-[680px]:text-[30px] dark:!text-[#D7D7D7]`}
      >
        <span>${plan.price_per_month} / Per Month</span>
      </div>
      <div className="features mb-8 mt-3 flex-1 text-left max-[680px]:mb-6 max-[680px]:mt-2">
        {[
          `Borrow up to ${plan.borrow_limit} books per month${
            plan.borrow_limit === 3 ? "." : ""
          }`,
          `Loan period: ${plan.loan_period_days} days per book.`,
          `${plan.renewal_limit} renewal per book`,
        ].map((feature, index) => (
          <div
            key={index}
            className="my-5 flex cursor-default items-start gap-3 font-[family-name:var(--second-font)] text-[19px] font-normal text-[#121317] max-[680px]:my-3 max-[680px]:text-[16px] dark:!text-[#cfd1d7]"
          >
            <span className="mt-1 inline-block flex-none cursor-default text-[24px] leading-none text-[var(--accent)] max-[680px]:text-[20px] dark:!text-[#e3e4e8]">
              &#10003;
            </span>
            {feature}
          </div>
        ))}
      </div>
      <HomeButton
        className="px-18 mx-auto mt-4 py-2.5 max-[680px]:px-[24px] max-[680px]:py-[10px]"
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
      className="section px-24 py-10 pb-[50px] max-[1150px]:px-8 max-[680px]:px-4 max-[680px]:py-8"
      id="plans"
      aria-labelledby="pricing-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1688px] text-center">
        <h1
          id="pricing-heading"
          className="mb-10 text-center font-[family-name:var(--body-font)] text-[62px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)] max-[680px]:mb-6 max-[680px]:text-[42px] max-[520px]:text-[34px]"
        >
          Choose The best Plan
        </h1>
        <p className="subheading mb-12 font-[family-name:var(--second-font)] text-[21px] font-medium text-[var(--muted)] max-[680px]:mb-8 max-[680px]:text-[16px] dark:text-[#D7D7D7]">
          choose a plan that's right for your growing team. Simple pricing &amp;
          No hidden charges.
        </p>

        <div className="plans dark:!shadow-[-5px_5px_5px_rgba(255,255,255,0.4)] flex flex-col items-stretch gap-10 rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-[var(--card-bg)] px-10 py-10 shadow-[-5px_5px_5px_rgba(0,0,0,0.4)] max-[1000px]:p-6 max-[680px]:gap-6 max-[680px]:p-4 xl:flex-row dark:!border-none dark:!bg-transparent">
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
