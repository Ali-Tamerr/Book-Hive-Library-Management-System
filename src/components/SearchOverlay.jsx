import React from "react";

const SearchOverlay = ({
  isOpen,
  onClose,
  onBookClick,
  setIsLoginOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#171a24]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#000035] dark:text-[#E8E8E8]">
            Search Books
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-[#000035] hover:bg-[#00003514] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D720]"
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-[#000035cc] dark:text-[#D7D7D7b3]">
          Search is currently available from the dashboard. Please log in to
          continue.
        </p>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => {
              onClose?.();
              setIsLoginOpen?.(true);
            }}
            className="rounded-full bg-[#000035] px-5 py-2 text-sm font-semibold text-[#E8E8E8] hover:bg-[#1d2260]"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              onClose?.();
              onBookClick?.(null);
            }}
            className="rounded-full border border-[#000035] px-5 py-2 text-sm font-semibold text-[#000035] hover:bg-[#00003514] dark:border-[#D7D7D7] dark:text-[#D7D7D7] dark:hover:bg-[#D7D7D720]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
