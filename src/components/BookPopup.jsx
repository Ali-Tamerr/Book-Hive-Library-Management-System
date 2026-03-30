import React from "react";

const BookPopup = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="popup-typography w-[50rem] max-w-[95%] rounded-xl bg-white px-[1.875rem] py-[1.25rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer rounded-xl border border-[#ccc] bg-white px-3 py-1"
          onClick={onClose}
        >
          Back
        </button>

        <div className="mt-[1.25rem] flex items-center justify-between">
          <img
            src={book.image}
            alt={book.name}
            className="w-[9.375rem] rounded-lg"
          />

          <div className="flex flex-col gap-3">
            <p>
              <strong>Name:</strong> {book.name}
            </p>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Language:</strong> {book.language}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p>
              <strong>Availability:</strong>{" "}
              {book.available ? "Available" : "Not Available"}
            </p>
            <p>
              <strong>Branch:</strong> {book.branch}
            </p>

            <button className="cursor-pointer rounded-lg border-none bg-[#0a0f5c] px-[1rem] py-[0.625rem] text-white">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPopup;
