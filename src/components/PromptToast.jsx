import React, { useState, useEffect, useRef } from "react";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";

const PromptToast = ({
  show,
  message,
  defaultValue = "esp32",
  onSubmit,
  onCancel,
  submitText = "OK",
  cancelText = "Cancel",
}) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  useEffect(() => {
    if (show) {
      setValue(defaultValue);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [show, defaultValue]);

  if (!show) return null;

  return (
    <div className="popup-typography fixed bottom-6 left-6 z-[9999] flex flex-col items-center gap-6 rounded-xl border border-[#000035] bg-white px-10 py-6 shadow-2xl dark:border-[#D7D7D7] dark:bg-[#121317] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div 
        className="flex w-full flex-col gap-3"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit(value);
          if (e.key === "Escape") onCancel();
        }}
      >
        <p className="whitespace-nowrap text-base font-semibold text-[#000035] dark:text-[#D7D7D7]">
          {message}
        </p>
        <FormInput
          inputRef={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between mt-2">
        <FormButton
          fullWidth={false}
          onClick={onCancel}
          className="!py-2.5 !px-5 !min-w-[6rem] !text-sm !rounded-md"
        >
          {cancelText}
        </FormButton>
        <FormButton
          fullWidth={false}
          onClick={() => onSubmit(value)}
          className="!py-2.5 !px-5 !min-w-[6rem] !text-sm !rounded-md"
        >
          {submitText}
        </FormButton>
      </div>
    </div>
  );
};

export default PromptToast;
