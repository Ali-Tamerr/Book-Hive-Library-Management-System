import React from "react";
import FormButton from "./FormButton.jsx";

const ConfirmToast = ({
  show,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-center gap-6 rounded-xl border border-[#000035] bg-white px-10 py-6 shadow-2xl dark:border-[#D7D7D7] dark:bg-[#121317] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <p className="whitespace-nowrap text-base font-semibold text-[#000035] dark:text-[#D7D7D7]">
        {message}
      </p>
      <div className="flex w-full justify-end gap-6">
        <FormButton
          fullWidth={false}
          onClick={onCancel}
          className="!py-2.5 !px-5 !min-w-[6rem] !text-sm !rounded-md"
        >
          {cancelText}
        </FormButton>
        <FormButton
          fullWidth={false}
          onClick={onConfirm}
          className="!py-2.5 !px-5 !min-w-[6rem] !text-sm !rounded-md"
        >
          {confirmText}
        </FormButton>
      </div>
    </div>
  );
};

export default ConfirmToast;
