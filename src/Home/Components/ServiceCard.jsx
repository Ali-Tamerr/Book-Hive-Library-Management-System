import React from "react";

const ServiceCard = ({ iconSrc, iconAlt, title, description }) => {
  return (
    <article
      className="mt-10 flex flex-col items-center text-center"
      data-reveal
    >
      <div className="mb-4 flex h-20 items-end justify-center">
        <img
          src={iconSrc}
          alt={iconAlt}
          className="block max-h-full w-auto object-contain dark:brightness-0 dark:invert"
        />
      </div>
      <h3 className="mb-2 font-[family-name:var(--body-font)] text-[30px] font-normal text-[var(--first-color)] dark:!text-[#f1f1f3]">
        {title}
      </h3>
      <p className="font-[family-name:var(--second-font)] font-bold text-[#525252] dark:!text-[#a9abb2]">
        {description}
      </p>
    </article>
  );
};

export default ServiceCard;
