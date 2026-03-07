import React from "react";

const BranchDetailsPopup = ({ isOpen, onClose, branch }) => {
  if (!isOpen || !branch) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="popup-typography w-[90%] max-w-[420px] rounded-lg bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:bg-[#121317] dark:text-[#E8E8E8]">
        <h2 className="mt-0 dark:text-[#E8E8E8]">Branch Details</h2>

        <p>
          <strong>Name:</strong> {branch.name}
        </p>
        <p>
          <strong>Phone:</strong> {branch.phone}
        </p>
        <p>
          <strong>Location:</strong> {branch.location}
        </p>
        <p>
          <strong>Quantity:</strong> {branch.quantity}
        </p>

        <button
          className="mt-3 cursor-pointer rounded-md border-none bg-[#bec3ce] px-3 py-2 text-white dark:bg-[#D7D7D7] dark:text-[#E8E8E8]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BranchDetailsPopup;
