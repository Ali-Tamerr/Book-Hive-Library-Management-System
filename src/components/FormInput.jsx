import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  rows,
  autocomplete,
  step,
}) => {
  const commonProps = {
    name,
    value: value || "",
    onChange,
    placeholder,
    required,
    autoComplete: autocomplete || "off",
    className:
      "w-full h-[50px] px-4 py-3 rounded-xl border-1 border-[#3D3E3E] dark:border-[#2C2D33] bg-white dark:bg-[#1A1B20] text-black dark:text-[#D7D7D7] placeholder-[#727374] dark:placeholder-[#5A5B60] outline-none focus:border-[#1e255e] dark:focus:border-[#D7D7D7] text-[13px]",
  };

  if (step) {
    commonProps.step = step;
  }

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows || 3} />
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};

export default FormInput;
