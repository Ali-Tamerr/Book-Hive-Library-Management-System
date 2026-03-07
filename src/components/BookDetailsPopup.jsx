import React from "react";
import Popup from "./Popup.jsx";
import { BookOpen } from "lucide-react";

function BookDetailsPopup({
  show,
  onClose,
  book,
  category,
  onBookNow,
  availableCopies,
}) {
  if (!show || !book) return null;

  const isAvailable =
    (availableCopies !== undefined ? availableCopies > 0 : book.quantity > 1) &&
    book.quantity > 1;

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Book Details"
      icon={<BookOpen size={24} />}
      maxWidthClass="max-w-[700px]"
    >
      <div className="flex flex-col items-center gap-8">
        {book.image_url ? (
          <img
            src={book.image_url}
            alt={book.name}
            className="h-56 w-40 rounded-lg object-cover shadow-lg"
          />
        ) : (
          <div className="flex h-56 w-40 items-center justify-center rounded-lg bg-gradient-to-br from-[#000035] to-[#192261] shadow-lg">
            <BookOpen size={48} className="text-white opacity-50" />
          </div>
        )}

        <div className="flex w-full gap-8">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#000035]">
                <span className="font-medium">Name : </span>
                {book.name}
              </span>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[#000035]">
                <span className="font-medium">Category : </span>
                {category || "N/A"}
              </span>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[#000035]">
                <span className="font-medium">Available Copies : </span>
                {availableCopies !== undefined
                  ? availableCopies
                  : book.quantity}{" "}
                / {book.quantity}
              </span>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>
          </div>

          <div className="w-[1px] self-stretch bg-gray-300"></div>

          <div className="flex flex-1 flex-col">
            <div className="flex flex-col gap-1">
              <span className="text-[#000035]">
                <span className="font-medium">Availability : </span>
                {book.quantity <= 1
                  ? "Reference Only"
                  : isAvailable
                    ? "Available"
                    : "Borrowed"}
              </span>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[#000035]">
                <span className="font-medium">Sale Price : </span>
                {book.sale_price ? `$${book.sale_price}` : "N/A"}
              </span>
              <div className="h-[1px] w-full bg-gray-300"></div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onBookNow}
                disabled={!isAvailable}
                className={`rounded-lg px-8 py-3 font-semibold transition-colors ${
                  isAvailable
                    ? "cursor-pointer bg-[#000035] text-white hover:bg-[#192261]"
                    : "cursor-not-allowed bg-gray-300 text-[#000035]"
                }`}
              >
                {book.quantity <= 1 ? "Reference Only" : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default BookDetailsPopup;
