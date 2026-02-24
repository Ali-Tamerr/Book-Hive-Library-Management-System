import React from "react";

const BookPopup = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[800px] max-w-[95%] rounded-xl bg-white px-[30px] py-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer rounded-xl border border-[#ccc] bg-white px-3 py-1"
          onClick={onClose}
        >
          Back
        </button>

        <div className="mt-[20px] flex items-center justify-between">
          <img
            src={book.image}
            alt={book.name}
            className="w-[150px] rounded-lg"
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

            <button className="cursor-pointer rounded-lg border-none bg-[#0a0f5c] px-[16px] py-[10px] text-white">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPopup;
