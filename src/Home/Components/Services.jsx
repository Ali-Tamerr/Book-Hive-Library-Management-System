import React from "react";

const Services = ({ freeShippingIcon, secureInfoIcon, chatbotIcon }) => {
  return (
    <section className="services py-20 pb-4">
      <div
        className="services__container grid max-w-6xl px-5"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: 0,
          rowGap: "3rem",
          justifyContent: "stretch",
          margin: "0 auto",
        }}
      >
        <article
          className="services__card mt-10 flex flex-col items-center text-center"
          data-reveal
        >
          <div className="mb-4 flex h-20 items-end justify-center">
            <img
              src={freeShippingIcon}
              alt="Free Shipping"
              className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
            />
          </div>
          <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
            Smart Catalog
          </h3>
          <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
            Search, filter, and explore every book in your library easily
          </p>
        </article>
        <article
          className="services__card mt-10 flex flex-col items-center text-center"
          data-reveal
        >
          <div className="mb-4 flex h-20 items-end justify-center">
            <img
              src={secureInfoIcon}
              alt="Secure Information"
              className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
            />
          </div>
          <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
            Secure Information
          </h3>
          <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
            100% Secure Information
          </p>
        </article>
        <article
          className="services__card mt-10 flex flex-col items-center text-center"
          data-reveal
        >
          <div className="mb-4 flex h-20 items-end justify-center">
            <img
              src={chatbotIcon}
              alt="Chatbot"
              className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
            />
          </div>
          <h3 className="services__title mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
            ChatBot
          </h3>
          <p className="services__description font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
            Talk with us anytime
          </p>
        </article>
      </div>
    </section>
  );
};

export default Services;
