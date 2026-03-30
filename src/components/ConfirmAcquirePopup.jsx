import React, { useState, useEffect } from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { ShoppingCart, Trash2, Calendar } from "lucide-react";

function ConfirmAcquirePopup({
  show,
  onClose,
  selectedBooks,
  onRemoveBook,
  onConfirm,
  isLoading,
  categories,
}) {
  if (!show) return null;

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [globalDueDate, setGlobalDueDate] = useState(
    formatDateForInput(maxDate),
  );

  useEffect(() => {
    if (show) {
      setGlobalDueDate(formatDateForInput(maxDate));
    }
  }, [show]);

  const getCategoryName = (categoryId) => {
    return (
      categories?.find((cat) => cat.category_id === categoryId)
        ?.category_name || "N/A"
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, " - ");
  };

  const totalBooks = selectedBooks.length;

  const latestDueDate = selectedBooks.reduce((latest, book) => {
    if (!book.borrowDetails?.dueDate) return latest;
    const bookDate = new Date(book.borrowDetails.dueDate);
    return bookDate > latest ? bookDate : latest;
  }, new Date(globalDueDate));

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Confirm Acquisition"
      icon={<ShoppingCart size={24} />}
      maxWidthClass="max-w-[43.75rem]"
    >
      <div className="flex flex-col gap-6">
        <div className="max-h-[18.75rem] overflow-y-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-gray-300">
                <th className="p-3 font-semibold text-[#000035]">Name</th>
                <th className="p-3 font-semibold text-[#000035]">Category</th>
                <th className="p-3 font-semibold text-[#000035]">Due Date</th>
                <th className="p-3 text-center font-semibold text-[#000035]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedBooks.map((book) => (
                <tr
                  key={book.book_id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 text-[#000035]">{book.name}</td>
                  <td className="p-3 text-gray-600">
                    {getCategoryName(book.category_id)}
                  </td>
                  <td className="p-3 text-gray-600">
                    {book.borrowDetails?.dueDate
                      ? formatDate(book.borrowDetails.dueDate)
                      : formatDate(globalDueDate)}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => onRemoveBook(book.book_id)}
                      className="cursor-pointer p-2 text-[#000035] transition-colors hover:text-red-600"
                      title="Remove from selection"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBooks.length === 0 && (
          <div className="py-8 text-center text-[#000035]">
            No books selected. Please go back and select books to borrow.
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#000035]">
            <Calendar size={16} />
            Global Due Date (Max 30 days)
          </label>
          <input
            type="date"
            value={globalDueDate}
            min={formatDateForInput(
              new Date(today.getTime() + 24 * 60 * 60 * 1000),
            )}
            max={formatDateForInput(maxDate)}
            onChange={(e) => setGlobalDueDate(e.target.value)}
            className="h-12 w-full rounded-lg border border-[#D7D7D7] px-4 text-sm text-[#000035] outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center gap-4 rounded-lg bg-[#f5f5f5] px-4 py-3">
            <div className="flex flex-col">
              <span className="text-xs text-[#000035]">Total Books</span>
              <span className="text-lg font-bold text-[#000035]">
                {totalBooks.toString().padStart(2, "0")}{" "}
                {totalBooks === 1 ? "Book" : "Books"}
              </span>
            </div>
            <div className="h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col">
              <span className="text-xs text-[#000035]">Latest Due Date</span>
              <span className="text-lg font-bold text-[#000035]">
                {formatDate(latestDueDate.toISOString())}
              </span>
            </div>
          </div>
          <div className="flex flex-col-reverse min-[48.0625rem]:flex-row gap-3">
            <FormButton type="button" onClick={onClose}>
              CANCEL
            </FormButton>
            <FormButton
              type="button"
              isPrimary
              onClick={() => onConfirm(globalDueDate)}
              disabled={isLoading || selectedBooks.length === 0}
            >
              {isLoading ? "PROCESSING..." : "CONFIRM"}
            </FormButton>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default ConfirmAcquirePopup;
