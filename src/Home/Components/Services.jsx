import React from "react";
import ServiceCard from "./ServiceCard";

const Services = ({ freeShippingIcon, secureInfoIcon, chatbotIcon }) => {
  return (
    <section className="services pb-28 pb-[1.4rem]" data-reveal>
      <div
        className="services__container grid max-w-[1700px] px-5"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: 0,
          rowGap: "4.2rem",
          justifyContent: "stretch",
          margin: "0 auto",
        }}
      >
        <ServiceCard
          iconSrc={freeShippingIcon}
          iconAlt="Free Shipping"
          title="Smart Catalog"
          description="Search, filter, and explore every book in your library easily"
        />
        <ServiceCard
          iconSrc={secureInfoIcon}
          iconAlt="Secure Information"
          title="Secure Information"
          description="100% Secure Information"
          delay="0.4s"
        />
        <ServiceCard
          iconSrc={chatbotIcon}
          iconAlt="Chatbot"
          title="ChatBot"
          description="Talk with us anytime"
          delay="0.6s"
        />
      </div>
    </section>
  );
};

export default Services;
