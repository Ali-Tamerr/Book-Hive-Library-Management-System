import React from "react";
import ServiceCard from "./ServiceCard";

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
        />
        <ServiceCard
          iconSrc={chatbotIcon}
          iconAlt="Chatbot"
          title="ChatBot"
          description="Talk with us anytime"
        />
      </div>
    </section>
  );
};

export default Services;
