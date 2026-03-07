import React, { useState, useEffect } from "react";
import Popup from "./Popup.jsx";
import FormButton from "./FormButton.jsx";
import { BookOpen, Calendar } from "lucide-react";

function BorrowBookPopup({
  show,
  onClose,
  book,
  onConfirm,
  isLoading,
  availableCopies,
}) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [dueDate, setDueDate] = useState(formatDateForInput(maxDate));

  useEffect(() => {
    if (show) {
      setDueDate(formatDateForInput(maxDate));
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book) return;

    const selectedDate = new Date(dueDate);
    const daysDiff = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));

    if (daysDiff > 30) {
      alert("Maximum borrow duration is 30 days.");
      return;
    }

    if (daysDiff < 1) {
      alert("Due date must be at least 1 day from today.");
      return;
    }

    onConfirm({
      quantity: 1,
      dueDate: selectedDate.toISOString(),
    });
  };

  if (!book) return null;

  return (
    <Popup
      show={show}
      onClose={onClose}
      title="Borrow Book"
      icon={<BookOpen size={24} />}
      maxWidthClass="max-w-[500px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="rounded-lg bg-[#f5f5f5] p-4">
          <p className="text-lg font-semibold text-[#000035]">{book.name}</p>
          <p className="text-sm text-gray-600">
            Available copies:{" "}
            {availableCopies !== undefined ? availableCopies : book.quantity}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#000035]">
            <Calendar size={16} />
            Return By (Due Date)
          </label>
          <input
            type="date"
            value={dueDate}
            min={formatDateForInput(
              new Date(today.getTime() + 24 * 60 * 60 * 1000),
            )}
            max={formatDateForInput(maxDate)}
            onChange={(e) => setDueDate(e.target.value)}
            className="h-12 w-full rounded-lg border border-[#D7D7D7] px-4 text-sm outline-none"
          />
          <p className="text-xs text-[#000035]">
            Maximum borrow duration: 30 days from today
          </p>
        </div>

        <div className="flex w-full items-center justify-end gap-3 border-t border-gray-200 pt-4">
          <FormButton type="button" onClick={onClose}>
            Cancel
          </FormButton>
          <FormButton type="submit" isPrimary disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Confirm Borrow"}
          </FormButton>
        </div>
      </form>
    </Popup>
  );
}

export default BorrowBookPopup;
