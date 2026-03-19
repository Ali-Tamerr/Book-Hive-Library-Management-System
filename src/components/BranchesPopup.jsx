import { createPortal } from "react-dom";
import { useBranches } from "../hooks/useBranches";
import ColorableLogo from "./ColorableLogo";

function BranchesPopup({ isOpen, onClose }) {
  const { data: branches = [], isLoading } = useBranches();

  if (!isOpen) return null;

  const popupContent = (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="popup-typography relative h-full max-h-none w-full overflow-hidden rounded-none bg-white shadow-2xl min-[769px]:h-auto min-[769px]:max-h-[90vh] min-[769px]:w-[95%] min-[769px]:max-w-[900px] min-[769px]:rounded-2xl max-[768px]:flex max-[768px]:flex-col max-[768px]:justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 min-[769px]:p-8">
          <div className="mb-8 flex items-start justify-between">
            <h2 className="font-['Bebas_Neue',sans-serif] text-3xl font-bold text-[#000035]">
              Our Branches
            </h2>
            <div className="flex items-center gap-2">
              <ColorableLogo className="h-16 w-16 text-[#000035]" />
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue',sans-serif] text-xl text-[#000035]">
                  BookHive
                </span>
                <span className="text-center font-['Bebas_Neue',sans-serif] text-lg text-[#000035]">
                  Library
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#000035]">
                  <th className="px-4 py-4 text-left font-semibold text-[#000035]">
                    Name
                  </th>
                  <th className="px-4 py-4 text-left font-semibold text-[#000035]">
                    Contact No
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-[#000035]">
                    Location
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-[#000035]">
                    Book Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#000035]">
                      Loading branches...
                    </td>
                  </tr>
                ) : branches.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#000035]">
                      No branches found.
                    </td>
                  </tr>
                ) : (
                  branches.map((branch, index) => (
                    <tr
                      key={branch.branch_id || index}
                      className="border-b border-gray-200"
                    >
                      <td className="px-4 py-6 text-[#000035]">
                        {branch.name || "N/A"}
                      </td>
                      <td className="px-4 py-6 text-[#000035]">
                        {branch.contact_number || branch.phone_number || "N/A"}
                      </td>
                      <td className="px-4 py-6 text-center text-[#000035]">
                        {branch.location || branch.address || "N/A"}
                      </td>
                      <td className="px-4 py-6 text-center text-[#000035]">
                        {branch.book_quantity || branch.total_books || 0}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="cursor-pointer rounded-[20px] bg-[#000035] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#192261]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

export default BranchesPopup;
