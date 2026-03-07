import React from "react";

const plansData = [
  {
    id: "plan-discover",
    title: "Discover",
    price: "$99",
    features: [
      "Borrow up to 3 books per month.",
      "Loan period: 7 days per book.",
      "1 renewal per book",
    ],
    isPopular: false,
  },
  {
    id: "plan-enterprise",
    title: "Enterprise",
    price: "$299",
    features: [
      "Borrow up to 15 books per month",
      "Loan period: 21 days per book.",
      "3 renewal per book",
    ],
    isPopular: true,
  },
  {
    id: "plan-pro",
    title: "Professional",
    price: "$199",
    features: [
      "Borrow up to 10 books per month",
      "Loan period: 14 days per book.",
      "2 renewal per book",
    ],
    isPopular: false,
  },
];

const PricingCard = ({ plan, setIsLoginOpen }) => {
  const subscribeButtonClass =
    "border border-[#000035] text-[var(--accent)] hover:border-[#000022] hover:bg-[#000022] hover:text-[var(--card-bg)] group-hover:border-[#000035] group-hover:bg-[#000035] group-hover:text-[var(--card-bg)] dark:border-[#D7D7D7] dark:bg-transparent dark:text-[#D7D7D7] dark:hover:border-[#D7D7D7] dark:hover:bg-[#D7D7D7] dark:hover:text-black group-hover:dark:border-[#D7D7D7] group-hover:dark:bg-[#D7D7D7] group-hover:dark:text-black";

  return (
    <article
      className={`plan group flex w-full transform-gpu flex-col justify-start rounded-[18px] border-2 px-10 pb-[20px] pt-[60px] text-[var(--accent)] transition-all duration-[300ms] ease-in-out hover:-translate-y-3 hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)] max-[680px]:min-h-[380px] dark:hover:shadow-[0_20px_36px_rgba(0,0,0,0.5)] ${
        plan.isPopular
          ? "center flex-8 -mt-5 min-h-[520px] bg-[var(--center-bg)] pt-16 max-[1000px]:mt-0 max-[1000px]:min-h-[420px] dark:bg-transparent"
          : "flex-7 min-h-[660px] bg-[var(--card-bg)] dark:bg-transparent"
      } border-transparent hover:border-[#000035] dark:hover:!border-[#D7D7D7]`}
      role="listitem"
      aria-labelledby={plan.id}
    >
      <div
        id={plan.id}
        className={`font-[family-name:var(--body-font)] text-[55px] font-extrabold uppercase tracking-wider text-[var(--accent)]`}
      >
        {plan.title}
      </div>
      <div
        className={`price mb-10 font-[family-name:Inter,sans-serif] text-[50px] font-normal text-[var(--accent)] dark:!text-[#D7D7D7]`}
      >
        <span>{plan.price} / Per Month</span>
      </div>
      <div className="features mb-12 mt-4 flex-1 text-left">
        {plan.features.map((feature, index) => (
          <div
            key={index}
            className="my-8 flex items-start gap-3 font-[family-name:var(--second-font)] text-[23px] font-normal text-[#121317] dark:!text-[#cfd1d7]"
          >
            <span className="mt-1 inline-block flex-none text-[28px] leading-none text-[var(--accent)] dark:!text-[#e3e4e8]">
              &#10003;
            </span>
            {feature}
          </div>
        ))}
      </div>
      <a
        className={`btn mx-auto mt-4 inline-block rounded-[14px] px-20 py-3 font-[family-name:var(--second-font)] text-[28px] font-normal no-underline transition-all duration-[300ms] ease-in-out ${subscribeButtonClass}`}
        href="#"
        role="button"
        aria-label={`Subscribe to ${plan.title}`}
        onClick={(e) => {
          e.preventDefault();
          setIsLoginOpen(true);
        }}
      >
        Subscribe
      </a>
    </article>
  );
};

const Pricing = ({ setIsLoginOpen }) => {
  return (
    <section
      className="section px-24 py-14 pb-[72px]"
      id="plans"
      aria-labelledby="pricing-heading"
      data-reveal
    >
      <div className="mx-auto max-w-[1875px] text-center">
        <h1
          id="pricing-heading"
          className="mb-16 text-center font-[family-name:var(--body-font)] text-[80px] font-extrabold tracking-wide text-[var(--accent)] dark:!text-[var(--title-color)]"
        >
          Choose The best Plan
        </h1>
        <p className="subheading mb-20 font-[family-name:var(--second-font)] text-[26px] font-medium text-[var(--muted)] max-[680px]:text-sm dark:text-[#D7D7D7]">
          choose a plan that's right for your growing team. Simple pricing &amp;
          No hidden charges.
        </p>

        <div className="plans px-13 flex flex-col items-stretch gap-16 rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-[var(--card-bg)] py-14 shadow-[-5px_5px_5px_rgba(0,0,0,0.4)] max-[1000px]:p-7 max-[680px]:p-[22px] xl:flex-row dark:!border-none dark:!bg-transparent dark:!shadow-none">
          {plansData.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              setIsLoginOpen={setIsLoginOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
