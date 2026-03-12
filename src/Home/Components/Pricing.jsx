import React from "react";

import { usePlans } from "../../hooks/usePlans";
import HomeButton from "./HomeButton";

const PricingCard = ({ plan, setIsLoginOpen }) => {

  return (
    <article
      className={`plan group flex w-full transform-gpu flex-col justify-start rounded-[18px] border-2 px-9 pb-[18px] pt-[55px] text-[var(--accent)] transition-all duration-[300ms] ease-in-out hover:-translate-y-3 hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)] max-[680px]:min-h-[380px] dark:hover:shadow-[0_20px_36px_rgba(255,255,255,0.2)] ${
        plan.isPopular
          ? "center flex-8 -mt-5 min-h-[500px] bg-[var(--center-bg)] pt-14 max-[1000px]:mt-0 max-[1000px]:min-h-[400px] dark:bg-transparent"
          : "flex-7 min-h-[640px] bg-[var(--card-bg)] dark:bg-transparent"
      } cursor-default border-transparent hover:border-[#000035] dark:hover:!border-[#D7D7D7]`}
      role="listitem"
      aria-labelledby={plan.id}
    >
      <div
        id={plan.id}
        className={`cursor-default font-[family-name:var(--body-font)] text-[50px] font-extrabold uppercase tracking-wider text-[var(--accent)]`}
      >
        {plan.title}
      </div>
      <div
        className={`price mb-9 cursor-default font-[family-name:Inter,sans-serif] text-[45px] font-normal text-[var(--accent)] dark:!text-[#D7D7D7]`}
      >
        <span>${plan.price_per_month} / Per Month</span>
      </div>
      <div className="features mb-10 mt-4 flex-1 text-left">
        {[
          `Borrow up to ${plan.borrow_limit} books per month${
            plan.borrow_limit === 3 ? "." : ""
          }`,
          `Loan period: ${plan.loan_period_days} days per book.`,
          `${plan.renewal_limit} renewal per book`,
        ].map((feature, index) => (
          <div
            key={index}
            className="my-7 flex cursor-default items-start gap-3 font-[family-name:var(--second-font)] text-[21px] font-normal text-[#121317] dark:!text-[#cfd1d7]"
          >
            <span className="mt-1 inline-block flex-none cursor-default text-[26px] leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
              &#10003;
            </span>
            {feature}
          </div>
        ))}
      </div>
      <HomeButton
        className="mx-auto mt-4 px-18 py-2.5"
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
      className="section px-24 py-12 pb-[65px]"
      id="plans"
      aria-labelledby="pricing-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1688px] text-center">
        <h1
          id="pricing-heading"
          className="mb-14 text-center font-[family-name:var(--body-font)] text-[72px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]"
        >
          Choose The best Plan
        </h1>
        <p className="subheading mb-18 font-[family-name:var(--second-font)] text-[24px] font-medium text-[var(--muted)] max-[680px]:text-sm dark:text-[#D7D7D7]">
          choose a plan that's right for your growing team. Simple pricing &amp;
          No hidden charges.
        </p>

        <div className="plans px-12 flex flex-col items-stretch gap-14 rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-[var(--card-bg)] py-12 shadow-[-5px_5px_5px_rgba(0,0,0,0.4)] max-[1000px]:p-7 max-[680px]:p-[22px] xl:flex-row dark:!border-none dark:!bg-transparent dark:!shadow-none">
          {isLoading ? (
            <div className="py-20 text-center text-xl text-[#000035] dark:text-[#D7D7D7] w-full">
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
            <div className="py-20 text-center text-xl text-[#e74c3c] dark:text-[#ff7675] w-full">
              Failed to load subscription plans. Please ensure the backend server is running.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
