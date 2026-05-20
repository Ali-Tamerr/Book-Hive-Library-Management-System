import React, { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import FormInput from "./FormInput.jsx";

const RejectReasonPopup = ({
  show,
  onClose,
  onConfirm,
  isSubmitting = false
}) => {
  const [reasonText, setReasonText] = useState("");

  useEffect(() => {
    if (show) {
      setReasonText("");
    }
  }, [show]);

  const handleSubmit = () => {
    onConfirm(reasonText.trim());
  };

  const handleCancel = () => {
    setReasonText("");
    onClose();
  };

  return (
    <Popup
      show={show}
      onClose={handleCancel}
      title="REJECT REQUEST"
      icon={<MessageSquareText size={24} />}
      maxWidthClass="max-w-[43.75rem]"
    >
      <div className="flex w-full flex-col gap-6 px-4 pb-4">
        <div className="flex w-full items-center justify-center">
          <FormInput
            type="textarea"
            className="h-45 w-full resize-none text-[#000035] placeholder:text-[#000035] dark:text-[#D7D7D7] dark:placeholder:text-[#D7D7D7] border-[#000035] dark:border-[#D7D7D7] text-[1rem] "
            placeholder="Type a reason for rejection (optional). If left blank, the default rejection email will be sent."
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
          />
        </div>

        <div className="mt-4 flex gap-4">
          <FormButton
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            CANCEL
          </FormButton>
          <FormButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            isPrimary
          >
            {isSubmitting ? "REJECTING..." : "REJECT"}
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default RejectReasonPopup;
