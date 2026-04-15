import React from "react";
import { Plus } from "lucide-react";
const ButtonOne = ({ buttonBehaviour, text }) => {
  return (
    <button
      onClick={buttonBehaviour}
      className="group flex h-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#000035] px-5 text-sm font-medium text-[#000035] duration-300 transition-colors hover:bg-[#000035] hover:text-white dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D7] dark:hover:text-[#121317] max-[53.5rem]:w-full max-[53.5rem]:justify-center max-[53.5rem]:text-base"
    >
      <Plus className="h-5 w-5 rounded-full bg-[#000035] p-0.1 font-bold text-white transition-all group-hover:bg-[#D7D7D7] group-hover:text-[#000035] dark:bg-[#D7D7D7] dark:text-[#121317] dark:group-hover:bg-[#121317] dark:group-hover:text-[#D7D7D7]" />
      {text}
    </button>
  );
};

export default ButtonOne;
