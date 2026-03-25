import React from "react";
import { BookCopy } from "lucide-react";
import Popup from "./Popup.jsx";

const BookCopiesViewPopup = ({ show, onClose, bookName, copies = [] }) => {
  return (
    <Popup
      show={show}
      onClose={onClose}
      title={`Book Copies${bookName ? ` - ${bookName}` : ""}`}
      icon={<BookCopy size={28} />}
      maxWidthClass="max-w-[760px]"
      closeButtonClassName="border-[#000035] text-[#000035] dark:border-[#d7d7d7] dark:text-[#d7d7d7]"
      dividerClassName="bg-[#d1d5db] dark:bg-[#D7D7D7]"
    >
      <div className="max-h-[420px] overflow-y-auto pr-1">
        {copies.length === 0 ? (
          <p className="py-8 text-center text-[#000035] dark:text-[#D7D7D7]">
            No copy IDs available.
          </p>
        ) : (
          <div className="grid gap-3">
            {copies.map((copy, index) => (
              <div
                key={copy.book_copy_id || copy.id || index}
                className="flex items-center justify-between rounded-lg border border-[#00003522] bg-[#f8f8fc] px-4 py-3 dark:border-[#D7D7D733] dark:bg-[#121317]"
              >
                <span className="text-sm font-semibold text-[#000035] dark:text-[#D7D7D7]">
                  {copy.book_copy_id || copy.id || "N/A"}
                </span>
                <span className="text-xs text-[#000035b3] dark:text-[#D7D7D7b3]">
                  Branch: {copy.branch_name || copy.branch_id || "N/A"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Popup>
  );
};

export default BookCopiesViewPopup;
