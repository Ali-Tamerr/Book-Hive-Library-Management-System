import React, { useEffect } from "react";

const FeaturedBookPopup = ({ isOpen, onClose, book, onBookNow }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const handleBookNow = () => {
    if (onBookNow) onBookNow(book);
  };

  const displayName = book.version
    ? `${book.name} ~ ${book.version}`
    : book.name;

  return (
    <div
      className="fixed inset-0 z-[310] flex items-center justify-center bg-[rgba(140,140,140,0.7)] p-8 dark:bg-[rgba(10,10,12,0.7)]"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-[min(900px,96vw)] flex-col gap-4 overflow-hidden rounded-[10px] border border-[#d1d1dd] bg-white px-6 pb-8 pt-3 shadow-[0_12px_28px_rgba(10,10,35,0.18)] dark:border-[#242732] dark:bg-[#14161b] dark:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-label="Book details"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <button
            type="button"
            className="cursor-pointer rounded-xl border border-[#0a0b2b] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3px] text-[#0a0b2b] hover:bg-[#0a0b2b] hover:text-white dark:border-[#e3e6f0] dark:bg-transparent dark:text-[#e3e6f0] dark:hover:bg-[#e3e6f0] dark:hover:text-[#0f1116]"
            onClick={onClose}
          >
            Back
          </button>
        </div>

        <div className="-mt-2 flex justify-center">
          {book.image ? (
            <img
              src={book.image}
              alt={book.name}
              className="h-auto w-[120px] rounded-[6px] shadow-[0_10px_20px_rgba(10,10,35,0.15)]"
            />
          ) : (
            <div className="flex h-[170px] w-[120px] items-center justify-center rounded-[6px] bg-[#f1f1f6] text-[12px] font-semibold text-[#6f6f76] dark:bg-[#26272d] dark:text-[#5a5a6a]">
              No Image
            </div>
          )}
        </div>

        <div className="mt-2 grid grid-cols-[1fr_auto_1fr] gap-8 max-[600px]:grid-cols-1 max-[600px]:gap-4 max-[600px]:overflow-auto">
          <div className="flex flex-col gap-[18px]">
            <div className="flex items-baseline gap-1.5 text-[15px] font-semibold text-[#0a0b2b] dark:text-[#f1f2f6]">
              <span className="font-bold dark:text-[#e3e6f0]">Name :</span>
              <span className="value">{displayName}</span>
            </div>
            <div className="h-px w-full bg-[#b8b8c4] dark:bg-[#2b2f3a]"></div>

            <div className="flex items-baseline gap-1.5 text-[15px] font-semibold text-[#0a0b2b] dark:text-[#f1f2f6]">
              <span className="font-bold dark:text-[#e3e6f0]">Category :</span>
              <span className="value">{book.category || "N/A"}</span>
            </div>
            <div className="h-px w-full bg-[#b8b8c4] dark:bg-[#2b2f3a]"></div>

            <div className="flex items-baseline gap-1.5 text-[15px] font-semibold text-[#0a0b2b] dark:text-[#f1f2f6]">
              <span className="font-bold dark:text-[#e3e6f0]">Language :</span>
              <span className="value">{book.language || "N/A"}</span>
            </div>
            <div className="h-px w-full bg-[#b8b8c4] dark:bg-[#2b2f3a]"></div>
          </div>

          <div className="w-px self-stretch bg-[#b8b8c4] max-[600px]:hidden dark:bg-[#2b2f3a]"></div>

          <div className="flex flex-col gap-[18px]">
            <div className="flex items-baseline gap-1.5 text-[15px] font-semibold text-[#0a0b2b] dark:text-[#f1f2f6]">
              <span className="font-bold dark:text-[#e3e6f0]">
                Availability :
              </span>
              <span className="value">{book.availability || "N/A"}</span>
            </div>
            <div className="h-px w-full bg-[#b8b8c4] dark:bg-[#2b2f3a]"></div>

            <div className="flex items-baseline gap-1.5 text-[15px] font-semibold text-[#0a0b2b] dark:text-[#f1f2f6]">
              <span className="font-bold dark:text-[#e3e6f0]">Branch :</span>
              <span className="value">{book.branch || "N/A"}</span>
            </div>
            <div className="h-px w-full bg-[#b8b8c4] dark:bg-[#2b2f3a]"></div>

            <div className="mt-1.5 flex justify-center">
              <button
                type="button"
                className="cursor-pointer rounded-[10px] border-none bg-[#0a0b2b] px-7 py-2.5 font-bold text-white hover:bg-[#14145a] dark:border dark:border-[#3a3f4c] dark:bg-[#0f1116] dark:text-[#e3e6f0] dark:hover:bg-[#e3e6f0] dark:hover:text-[#0f1116]"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBookPopup;
