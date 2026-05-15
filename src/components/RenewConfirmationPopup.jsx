import React from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { RotateCcw } from "lucide-react";
import { usePlans } from "../hooks/usePlans.js";

const RenewConfirmationPopup = ({ show, onClose, user, onConfirm }) => {
  const [selectedPlan, setSelectedPlan] = React.useState("");
  const { data: plans = [] } = usePlans();

  React.useEffect(() => {
    if (!show) {
      setSelectedPlan("");
      return;
    }

    setSelectedPlan(user?.plan || "Discover");
  }, [show, user]);


  return (
    <Popup
      show={show}
      onClose={onClose}
      title={
        <span className="text-[#000035] dark:text-[#D7D7D7]">
          Renew Confirmation
        </span>
      }
      icon={<RotateCcw size={26} />}
      maxWidthClass="max-w-[56.25rem]"
      closeButtonClassName="border-[#000035] text-[#000035] dark:border-[#d7d7d7] dark:text-[#d7d7d7]"
      dividerClassName="bg-[#d1d5db] dark:bg-[#D7D7D7]"
    >
      <div className="flex flex-col items-center gap-6 text-[#000035]">
        <div className="flex w-full gap-8 max-[40.625rem]:flex-col">
          <input
            type="text"
            readOnly
            value={
              `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
              user?.user_id ||
              ""
            }
            placeholder="Name"
            className="h-12.5 w-full rounded-xl border border-[#D7D7D7] bg-transparent px-4 py-3 text-[0.8125rem] text-[#000035] outline-none dark:border-[#D7D7D7] dark:text-gray-300"
          />
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="h-12.5 w-full rounded-xl border border-[#D7D7D7] bg-transparent px-4 py-3 text-[0.8125rem] text-[#000035] outline-none dark:border-[#D7D7D7] dark:text-gray-300"
          >
            {plans.map((p) => (
              <option
                key={p.id}
                value={p.id}
                className="bg-[#D7D7D7] font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
              >
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="max-w-105 text-lg leading-relaxed text-[#000035] dark:text-gray-300">
            Are you certain you wish to proceed with the renew of the selected
            entry?
          </p>
          
        </div>

        <div className="flex w-full justify-center pt-2">
          <FormButton
            type="button"
            isPrimary={false}
            onClick={() => onConfirm(selectedPlan)}
          >
            CONFIRM
          </FormButton>
        </div>
      </div>
    </Popup>
  );
};

export default RenewConfirmationPopup;
