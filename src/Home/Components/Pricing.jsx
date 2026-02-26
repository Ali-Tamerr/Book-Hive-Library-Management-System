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
  return (
    <article
      className={`plan group flex w-full flex-col justify-start rounded-[18px] px-10 pb-[20px] pt-[60px] text-[var(--accent)] transition-[transform,box-shadow] duration-[300ms] ease-in-out max-[680px]:min-h-[380px] ${
        plan.isPopular
          ? "center flex-8 -mt-5 min-h-[520px] border-2 border-transparent bg-[var(--center-bg)] pt-16 hover:border-[#000035] max-[1000px]:mt-0 max-[1000px]:min-h-[420px] dark:!shadow-[0_18px_28px_rgba(0,0,0,0.4)] dark:hover:!border-[#E3E3E3]"
          : "flex-7 min-h-[660px] bg-[var(--card-bg)]"
      }`}
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
        className={`price mb-10 font-[family-name:Inter,sans-serif] text-[50px] font-normal text-[var(--accent)] dark:!text-[#e3e4e8]`}
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
        className={`btn mx-auto mt-4 inline-block rounded-[14px] px-20 py-3 font-[family-name:var(--second-font)] text-[28px] font-normal no-underline transition-all duration-[300ms] ease-in-out ${
          plan.isPopular
            ? "border border-[#000035] bg-[#000035] text-white hover:border-[#000022] hover:bg-[#000022] dark:border-[#E3E3E3] dark:bg-[#E3E3E3] dark:text-black dark:hover:border-[#E3E3E3] dark:hover:bg-black dark:hover:text-[#e3e4e8]"
            : "border border-[#000035] bg-white text-[var(--accent)] hover:border-[#000035] hover:bg-[#E3E3E3] hover:text-[#0a0b2b] dark:border-[#E3E3E3] dark:bg-transparent dark:text-[#e3e4e8] dark:hover:border-[#E3E3E3] dark:hover:bg-[#E3E3E3] dark:hover:text-black"
        }`}
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
        <p className="subheading mb-20 font-[family-name:var(--second-font)] text-[26px] font-medium text-[var(--muted)] max-[680px]:text-sm dark:text-[#b3b6bd]">
          choose a plan that's right for your growing team. Simple pricing &amp;
          No hidden charges.
        </p>

        <div
          className="plans px-13 flex flex-col items-stretch gap-16 rounded-[18px] border border-[rgba(10,11,43,0.08)] bg-white py-14 shadow-[-5px_5px_5px_rgba(0,0,0,0.4)] max-[1000px]:p-7 max-[680px]:p-[22px] xl:flex-row dark:!border-none dark:!bg-transparent dark:!shadow-none"
          role="list"
        >
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
