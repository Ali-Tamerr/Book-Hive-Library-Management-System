import React from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { RotateCcw } from "lucide-react";

const RenewConfirmationPopup = ({ show, onClose, user, onConfirm }) => {
  const [selectedPlan, setSelectedPlan] = React.useState("");

  React.useEffect(() => {
    if (!show) {
      setSelectedPlan("");
      return;
    }

    setSelectedPlan(user?.plan || "Discover");
  }, [show, user]);

  const calculateNewDate = () => {
    if (!user) return "";
    const currentEnd = user.subscription_end_date
      ? new Date(user.subscription_end_date)
      : new Date();
    const now = new Date();
    const baseDate = currentEnd > now ? currentEnd : now;
    const newEndDate = new Date(baseDate);
    newEndDate.setMonth(newEndDate.getMonth() + 1);
    return newEndDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
      maxWidthClass="max-w-[900px]"
      closeButtonClassName="border-[#000035] text-[#000035] dark:border-[#d7d7d7] dark:text-[#d7d7d7]"
      dividerClassName="bg-[#d1d5db] dark:bg-[#D7D7D7]"
    >
      <div className="flex flex-col items-center gap-6 text-[#000035]">
        <div className="flex w-full gap-8 max-[650px]:flex-col">
          <input
            type="text"
            readOnly
            value={
              `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
              user?.user_id ||
              ""
            }
            placeholder="Name"
            className="h-[50px] w-full rounded-xl border border-[#D7D7D7] bg-transparent px-4 py-3 text-[13px] text-[#000035] outline-none dark:border-[#D7D7D7] dark:text-gray-300"
          />
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="h-[50px] w-full rounded-xl border border-[#D7D7D7] bg-transparent px-4 py-3 text-[13px] text-[#000035] outline-none dark:border-[#D7D7D7] dark:text-gray-300"
          >
            {user?.plan &&
              !["Discover", "Enterprise", "Professional"].includes(
                user.plan,
              ) && (
                <option
                  value={user.plan}
                  className="font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:text-[#D7D7D7]"
                >
                  {user.plan}
                </option>
              )}
            <option
              value="Discover"
              className="bg-[#D7D7D7] font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
            >
              Discover
            </option>
            <option
              value="Enterprise"
              className="bg-[#D7D7D7] font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
            >
              Enterprise
            </option>
            <option
              value="Professional"
              className="bg-[#D7D7D7] font-['Noto_Sans_Georgian',sans-serif] text-[#000035] dark:bg-[#121317] dark:text-[#D7D7D7]"
            >
              Professional
            </option>
          </select>
        </div>

        <p className="max-w-[420px] text-lg leading-relaxed text-[#000035] dark:text-gray-300">
          Are you certain you wish to proceed with the renew of the selected
          entry?
        </p>

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
