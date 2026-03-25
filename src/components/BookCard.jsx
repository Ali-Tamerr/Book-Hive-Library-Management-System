import React from "react";
import LazyImage from "./LazyImage.jsx";

const BookCard = ({ book, onClick, scale = 1, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m-2 flex w-full max-w-[260px] cursor-pointer flex-col overflow-hidden rounded-xl border border-[#0000351a] bg-white text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md dark:border-[#D7D7D726] dark:bg-[#171a24] ${className}`}
      style={{ transform: `scale(${scale})` }}
      aria-label={`View details for ${book?.name || "book"}`}
    >
      <div className="h-[260px] w-full overflow-hidden bg-[#f3f4f6] dark:bg-[#0f1118]">
        <LazyImage
          src={book?.image}
          alt={book?.name || "Book cover"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex min-h-[92px] flex-col px-3 py-3">
        <h3 className="line-clamp-2 text-sm font-bold text-[#000035] dark:text-[#E8E8E8]">
          {book?.name || "Untitled"}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-[#000035b3] dark:text-[#D7D7D7b3]">
          {book?.category_name || "Uncategorized"}
        </p>
      </div>
    </button>
  );
};

export default BookCard;
