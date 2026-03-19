import React from "react";
import { BookCopy } from "lucide-react";
import Popup from "./Popup.jsx";

function BookCopiesViewPopup({ show, onClose, bookName, copies = [] }) {
  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Book Copy IDs"
      icon={<BookCopy size={28} strokeWidth={2.2} />}
      iconWrapperClassName="min-h-[60px] min-w-[60px]"
      maxWidthClass="max-w-[640px]"
      contentClassName="px-6 py-6"
    >
      <div className="flex flex-col gap-5">
        {bookName && (
          <p className="text-[15px] font-semibold text-[#000035] dark:text-[#D7D7D7]">
            {bookName}
          </p>
        )}

        {copies.length === 0 ? (
          <p className="text-center text-sm text-[#000035]/60 dark:text-[#D7D7D7]/60">
            No copies found for this book.
          </p>
        ) : (
          <div className="flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-1">
            {copies.map((copy, index) => (
              <div
                key={copy.book_copy_id || index}
                className="flex items-stretch overflow-hidden rounded-2xl border border-[#000035] dark:border-[#D7D7D7]"
                style={{ height: "56px" }}
              >
                <div className="flex w-[180px] shrink-0 items-center px-5 text-[16px] font-semibold text-[#000035] dark:text-[#D7D7D7]">
                  {copy.book_copy_id}
                </div>
                <div className="w-px self-[80%] mx-0 h-[80%] self-center bg-[#000035] dark:bg-[#D7D7D7]" />
                <div className="flex flex-1 items-center px-5 text-[16px] font-semibold text-[#000035] dark:text-[#D7D7D7]">
                  {copy.branch_name || copy.branch?.name || `Branch ${copy.branch_id}` || "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Popup>
  );
}

export default BookCopiesViewPopup;
