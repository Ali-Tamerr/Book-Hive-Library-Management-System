import React, { useState } from "react";
import BranchDetailsPopup from "./BranchDetailsPopup";

const branches = [
  {
    name: "BookHive Cairo",
    phone: "01245615282",
    location: "Cairo",
    quantity: 1,
  },
];

const BranchesModal = ({ isOpen, onClose }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!isOpen) return null;

  const openDetail = (branch) => {
    setSelectedBranch(branch);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedBranch(null);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45"
      onClick={onClose}
    >
      <div
        className="popup-typography relative h-full max-h-none w-full rounded-none bg-white px-4 py-8 dark:bg-[#121317] dark:text-[#E8E8E8] min-[48.0625rem]:h-auto min-[48.0625rem]:min-h-[31.25rem] min-[48.0625rem]:w-[90%] min-[48.0625rem]:max-w-[75rem] min-[48.0625rem]:px-10 min-[48.0625rem]:rounded-[0.875rem] max-[48rem]:flex max-[48rem]:flex-col max-[48rem]:justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-5 top-4 cursor-pointer border-none bg-transparent text-base"
          onClick={onClose}
        >
          Close
        </button>

        <div className="mb-3 flex items-center justify-between">
          <h2 className="m-0 text-[2rem] font-extrabold text-[#0a0f5c] dark:text-[#E8E8E8]">
            Our Branches
          </h2>
          <img
            src={new URL("../assets/logo.svg", import.meta.url).href}
            alt="BookHive Logo"
            className="h-[0.625rem] w-[3.75rem]"
          />
        </div>

        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-[20%] border-b border-[#12161f] px-2.5 py-3 text-left text-base text-[#0a0f5c] dark:border-[#D7D7D7] dark:text-[#E8E8E8]">
                Name
              </th>
              <th className="w-[25%] border-b border-[#12161f] px-2.5 py-3 text-left text-base text-[#0a0f5c] dark:border-[#D7D7D7] dark:text-[#E8E8E8]">
                Contact
              </th>
              <th className="w-[25%] border-b border-[#12161f] px-2.5 py-3 text-left text-base text-[#0a0f5c] dark:border-[#D7D7D7] dark:text-[#E8E8E8]">
                Location
              </th>
              <th className="w-[10%] border-b border-[#12161f] px-2.5 py-3 text-center text-base text-[#0a0f5c] dark:border-[#D7D7D7] dark:text-[#E8E8E8]">
                Bo Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr
                key={index}
                onClick={() => openDetail(branch)}
                className="cursor-pointer hover:bg-[#f9fafb] dark:hover:bg-[#202020]"
              >
                <td className="w-[20%]">{branch.name}</td>
                <td className="w-[25%]">{branch.phone}</td>
                <td className="w-[25%]">{branch.location}</td>
                <td className="w-[10%] whitespace-nowrap text-center">
                  {branch.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <BranchDetailsPopup
          isOpen={isDetailOpen}
          onClose={closeDetail}
          branch={selectedBranch}
        />
      </div>
    </div>
  );
};

export default BranchesModal;
