import React from "react";
import LazyImage from "./LazyImage";

const BookCard = ({ book, onClick, scale = 1 }) => {
  return (
    <div
      className="flex items-center justify-center transition-all duration-300"
      style={{
        width: `calc(10rem * ${scale})`,
        height: `calc(18.75rem * ${scale})`,
        "--card-scale": scale,
      }}
    >
      <div
        className="flex h-75 w-40 shrink-0 flex-col overflow-hidden rounded-lg px-2 py-2 font-['Noto_Sans_Georgian',sans-serif]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-md">
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
          <h3 className="text-md line-clamp-2 min-h-11 text-center font-['Noto_Sans_Georgian',sans-serif]! font-bold text-[#000035] dark:text-[#D7D7D7]">
            {book.name || "Untitled"}
          </h3>
          <button
            className="w-full shrink-0 cursor-pointer whitespace-nowrap rounded-xl border border-(--title-color) py-1.5 text-[1.0625rem] font-bold text-(--title-color) no-underline transition-colors duration-500 hover:border-transparent hover:bg-(--title-color) hover:text-[#D7D7D7] dark:border-(--title-color) dark:text-(--title-color) dark:hover:border-transparent dark:hover:bg-(--title-color) dark:hover:text-[#121317]"
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
