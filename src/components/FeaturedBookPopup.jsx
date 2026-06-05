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
      className="fixed inset-0 z-310 flex items-center justify-center bg-[rgba(140,140,140,0.7)] p-8 dark:bg-[rgba(10,10,12,0.7)]"
      onClick={onClose}
    >
      <div
        className="popup-typography flex max-h-[90vh] w-[min(58.75rem,96vw)] flex-col gap-2.5 overflow-hidden rounded-[0.625rem] border border-[#d1d1dd] bg-white px-5.5 pb-7 pt-3 shadow-[0_0.75rem_1.75rem_rgba(10,10,35,0.18)] max-[43.75rem]:gap-1.5 max-[43.75rem]:p-3.5 max-[43.75rem]:pb-5 dark:border-[#242732] dark:bg-[#14161b] dark:shadow-[0_0.75rem_1.75rem_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-label="Book details"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            className="cursor-pointer rounded-xl border border-[#0a0b2b] bg-white px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.0187rem] text-[#0a0b2b] hover:bg-[#0a0b2b] hover:text-white dark:border-[#e3e6f0] dark:bg-transparent dark:text-[#e3e6f0] dark:hover:bg-[#e3e6f0] dark:hover:text-[#0f1116]"
            onClick={onClose}
          >
            Back
          </button>
          <div className="flex items-center gap-2">
            <img
              src={new URL("../assets/logo.svg", import.meta.url).href}
              alt="Book Hive Logo"
              className="h-auto w-11"
            />
            <div>
              <span className="text-base font-extrabold text-[#0a0b2b] dark:text-[#f1f2f6]">
                BookHive
              </span>
              <span className="-mt-1 block text-[0.6875rem] text-[#0a0b2b] dark:text-[#f1f2f6]">
                Library
              </span>
            </div>
          </div>
        </div>

        <h3
          id="featured-popup-title"
          className="mt-2 font-(family-name:--body-font) text-2xl font-extrabold uppercase text-[#0a0b2b] max-[43.75rem]:text-[1.25rem] dark:text-[#f1f2f6]"
        >
          Book Details
        </h3>

        <div className="mt-2.5 flex flex-col items-center gap-8 overflow-auto border-t border-[#9a9aa7] pt-6 max-[43.75rem]:gap-6 max-[43.75rem]:pt-4 sm:flex-row sm:items-stretch sm:justify-center dark:border-[#2b2f3a]">
          <div className="w-35 shrink-0 sm:w-40">
            {book.image ? (
              <img
                src={book.image}
                alt={book.name}
                className="h-auto w-full rounded-md shadow-[0_0.625rem_1.25rem_rgba(10,10,35,0.15)]"
              />
            ) : (
              <div className="flex h-50 w-full items-center justify-center rounded-md bg-[#f1f1f6] text-[0.75rem] font-semibold text-[#6f6f76] sm:h-60 dark:bg-[#26272d] dark:text-[#5a5a6a]">
                No Image
              </div>
            )}
            
            <button
              type="button"
              className="mt-5 w-full cursor-pointer rounded-md border-none bg-[#0a0b2b] px-4 py-2.5 text-center text-[0.8125rem] font-bold uppercase tracking-wider text-white hover:bg-[#14145a] max-[37.5rem]:mt-4 dark:border dark:border-[#3a3f4c] dark:bg-[#0f1116] dark:text-[#e3e6f0] dark:hover:bg-[#e3e6f0] dark:hover:text-[#0f1116]"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>

          <div className="flex w-full min-w-75 grow flex-col">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="*:border-b *:border-[#9a9aa7] *:py-4 *:align-middle *:text-sm *:text-[#0a0b2b] dark:*:border-[#2b2f3a] dark:*:text-[#d8dbe6]">
                  <td className="w-1/3 py-4 font-bold uppercase tracking-wide dark:text-[#e3e6f0]">Name</td>
                  <td className="w-2/3 py-4 font-semibold">{displayName}</td>
                </tr>
                <tr className="*:border-b *:border-[#9a9aa7] *:py-4 *:align-middle *:text-sm *:text-[#0a0b2b] dark:*:border-[#2b2f3a] dark:*:text-[#d8dbe6]">
                  <td className="w-1/3 py-4 font-bold uppercase tracking-wide dark:text-[#e3e6f0]">Category</td>
                  <td className="w-2/3 py-4 font-semibold">{book.category || "N/A"}</td>
                </tr>
                <tr className="*:border-b *:border-[#9a9aa7] *:py-4 *:align-middle *:text-sm *:text-[#0a0b2b] dark:*:border-[#2b2f3a] dark:*:text-[#d8dbe6]">
                  <td className="w-1/3 py-4 font-bold uppercase tracking-wide dark:text-[#e3e6f0]">Language</td>
                  <td className="w-2/3 py-4 font-semibold">{book.language || "N/A"}</td>
                </tr>
                <tr className="*:border-b *:border-[#9a9aa7] *:py-4 *:align-middle *:text-sm *:text-[#0a0b2b] dark:*:border-[#2b2f3a] dark:*:text-[#d8dbe6]">
                  <td className="w-1/3 py-4 font-bold uppercase tracking-wide dark:text-[#e3e6f0]">Availability</td>
                  <td className="w-2/3 py-4 font-semibold">{book.availability || "N/A"}</td>
                </tr>
                <tr className="*:border-b *:border-[#9a9aa7] *:py-4 *:align-middle *:text-sm *:text-[#0a0b2b] dark:*:border-[#2b2f3a] dark:*:text-[#d8dbe6]">
                  <td className="w-1/3 py-4 font-bold uppercase tracking-wide dark:text-[#e3e6f0]">Quantity</td>
                  <td className="w-2/3 py-4 font-semibold">{book.quantity ?? "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBookPopup;
