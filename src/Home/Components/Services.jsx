import React from "react";
import ServiceCard from "./ServiceCard";

const Services = ({ freeShippingIcon, secureInfoIcon, chatbotIcon }) => {
  return (
    <section className="services pb-28" data-reveal>
      <div
        className="services__container grid grid-cols-2 min-[40rem]:grid-cols-3 gap-y-10 min-[40rem]:gap-y-[4.2rem] max-w-[105.5rem] px-5"
        style={{
          columnGap: 0,
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
        <div className="col-span-2 min-[40rem]:col-span-1">
          <ServiceCard
            iconSrc={chatbotIcon}
            iconAlt="Chatbot"
            title="ChatBot"
            description="Talk with us anytime"
            delay="0.6s"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
