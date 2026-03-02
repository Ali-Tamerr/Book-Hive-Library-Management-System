import React from "react";

const ServiceCard = ({ iconSrc, iconAlt, title, description, delay }) => {
  return (
    <article
      className="mt-14 flex flex-col items-center text-center"
      data-reveal
      style={delay ? { transitionDelay: delay } : undefined}
    >
      <div className="mb-[1.4rem] flex h-28 items-end justify-center">
        <img
          src={iconSrc}
          alt={iconAlt}
          className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert-[84%]"
        />
      </div>
      <h3 className="tracking-md mb-[0.7rem] font-[family-name:var(--body-font)] text-[28px] font-semibold text-[var(--first-color)] dark:!text-[#D7D7D7]">
        {title}
      </h3>
      <p className="font-[family-name:var(--second-font)] text-[20px] font-semibold text-[#525252] dark:!text-[#D7D7D7]">
        {description}
      </p>
    </article>
  );
};

export default ServiceCard;
