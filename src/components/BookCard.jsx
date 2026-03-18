import React from "react";
import LazyImage from "./LazyImage";

const BookCard = ({ book, onClick, scale = 1 }) => {
  return (
    <div
      className="flex items-center justify-center transition-all duration-300"
      style={{
        width: `calc(160px * ${scale})`,
        height: `calc(300px * ${scale})`,
        "--card-scale": scale,
      }}
    >
      <div
        className="flex h-[300px] w-40 cursor-pointer flex-col overflow-hidden rounded-lg px-2 py-2 font-['Noto_Sans_Georgian',sans-serif] shrink-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative flex h-[160px] w-full shrink-0 items-center justify-center overflow-hidden rounded-md">
          {book.image ? (
            <LazyImage
              src={book.image}
              alt={book.name}
              className="h-full w-full object-contain text-[#000035] dark:text-[#D7D7D7]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-2 text-center text-[#000035] dark:text-[#D7D7D7]">
              <div className="line-clamp-2 font-['Noto_Sans_Georgian',sans-serif] text-xs font-bold uppercase tracking-wider text-[#000035] opacity-80 dark:text-[#D7D7D7]">
                {book.name}
              </div>
            </div>
          )}
        </div>
        <div className="mt-1 flex w-full shrink-0 flex-col gap-1">
          <h3 className="text-md min-h-[44px] line-clamp-2 text-center !font-['Noto_Sans_Georgian',sans-serif] font-bold text-[#000035] dark:text-[#D7D7D7]">
            {book.name || "Untitled"}
          </h3>
          <button
            className="w-full shrink-0 cursor-pointer whitespace-nowrap rounded-xl border border-[#000035] py-1.5 text-[17px] font-bold text-[#000035] transition-colors dark:border-[#D7D7D7] dark:text-[#D7D7D7]"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
