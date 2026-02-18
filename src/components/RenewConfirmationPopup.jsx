import React from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { RotateCcw } from "lucide-react";

const RenewConfirmationPopup = ({ show, onClose, user, onConfirm }) => {
  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Renew Confirmation"
      icon={<RotateCcw size={26} />}
      maxWidthClass="max-w-[900px]"
      closeButtonClassName="border-[#0a0f33] text-[#0a0f33] dark:border-[#d7d7d7] dark:text-[#d7d7d7]"
      dividerClassName="bg-[#d1d5db] dark:bg-[#2C2D33]"
    >
      <div className="flex flex-col gap-6 text-[#0a0f33] dark:text-[#D7D7D7]">
        <div className="flex w-full gap-8 max-[650px]:flex-col">
          <input
            type="text"
            value={user?.name || ""}
            placeholder="Name"
            readOnly
            className="h-14 w-full rounded-2xl border border-[#3D3E3E] bg-white px-6 text-sm font-medium text-black outline-none placeholder:text-[#727374] dark:border-[#2C2D33] dark:bg-[#1A1B20] dark:text-[#D7D7D7] dark:placeholder:text-[#5A5B60]"
          />
          <input
            type="text"
            value={user?.plan || ""}
            placeholder="Plan"
            readOnly
            className="h-14 w-full rounded-2xl border border-[#3D3E3E] bg-white px-6 text-sm font-medium text-black outline-none placeholder:text-[#727374] dark:border-[#2C2D33] dark:bg-[#1A1B20] dark:text-[#D7D7D7] dark:placeholder:text-[#5A5B60]"
          />
        </div>

        <p className="max-w-[520px] text-lg leading-relaxed text-[#0a0f33] dark:text-[#D7D7D7]">
          Are you certain you wish to proceed with the renew of the selected
          entry?
        </p>

        <div className="flex justify-center pt-2">
          <FormButton
            type="button"
            isPrimary
            onClick={onConfirm}
            className="max-w-[360px] rounded-2xl py-3 text-base dark:bg-[#D7D7D7] dark:text-[#121317] dark:border dark:border-[#D7D7D7] dark:hover:bg-[#E3E3E3] dark:hover:text-[#121317]"
          >
            CONFIRM
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default RenewConfirmationPopup;
