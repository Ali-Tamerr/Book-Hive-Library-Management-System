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
  className,
  rightIcon,
  onRightIconClick,
  inputRef,
}) => {
  const commonProps = {
    name,
    ref: inputRef,
    value: value || "",
    onChange,
    placeholder,
    required,
    autoComplete: autocomplete || "off",
    className: `w-full h-[50px] px-4 py-4 rounded-xl border border-[#000035] dark:border-[#D7D7D7]   text-black dark:text-[#D7D7D7] placeholder-[#000035] dark:placeholder-[#D7D7D7] outline-none text-[13px] ${className || ""}`,
  };

  if (step) {
    commonProps.step = step;
  }

  const inputElement =
    type === "textarea" ? (
      <textarea {...commonProps} rows={rows || 3} />
    ) : (
      <input type={type} {...commonProps} />
    );

  if (!label && !rightIcon) {
    return inputElement;
  }

  return (
    <div className={rightIcon ? "relative w-full" : ""}>
      {label && <label className="block text-sm font-medium">{label}</label>}
      {inputElement}
      {rightIcon && (
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#0b0b3b] dark:text-[#D7D7D7]"
          onClick={onRightIconClick}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default FormInput;
